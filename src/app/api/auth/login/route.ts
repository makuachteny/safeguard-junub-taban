import { NextRequest, NextResponse } from 'next/server';
import { createToken } from '@/lib/auth-token';

// Rate limiting: track failed attempts in memory
const failedAttempts: Record<string, { count: number; lockedUntil: number }> = {};

// Periodic cleanup of expired rate-limit entries to prevent memory leaks
const CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes
let lastCleanup = Date.now();
function cleanupExpiredEntries() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const key of Object.keys(failedAttempts)) {
    if (failedAttempts[key].lockedUntil > 0 && failedAttempts[key].lockedUntil < now) {
      delete failedAttempts[key];
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body with explicit error handling
    let body: { username?: string; password?: string; hospitalId?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { username, password, hospitalId } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    // Validate username format - reject invalid characters instead of silently stripping
    const trimmedUsername = username.trim().toLowerCase();
    if (!/^[a-z0-9._-]+$/.test(trimmedUsername)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const sanitizedUsername = trimmedUsername;

    // Periodic cleanup of expired entries
    cleanupExpiredEntries();

    // Rate limiting check
    const attempt = failedAttempts[sanitizedUsername];
    if (attempt && attempt.lockedUntil > Date.now()) {
      const remainingMinutes = Math.ceil((attempt.lockedUntil - Date.now()) / 60000);
      return NextResponse.json({ error: `Account temporarily locked. Try again in ${remainingMinutes} minutes.` }, { status: 429 });
    }

    // Server-safe user authentication (no PouchDB — uses static user registry)
    const { authenticateUser } = await import('@/lib/server-users');

    const user = await authenticateUser(sanitizedUsername, password);

    if (!user) {
      // Track failed attempt
      if (!failedAttempts[sanitizedUsername]) {
        failedAttempts[sanitizedUsername] = { count: 0, lockedUntil: 0 };
      }
      failedAttempts[sanitizedUsername].count++;
      if (failedAttempts[sanitizedUsername].count >= 5) {
        failedAttempts[sanitizedUsername].lockedUntil = Date.now() + 15 * 60 * 1000;
      }
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Check hospital assignment — super_admin, org_admin, government bypass
    const ROLES_WITHOUT_HOSPITAL = ['super_admin', 'org_admin', 'government'];
    if (!ROLES_WITHOUT_HOSPITAL.includes(user.role) && hospitalId && user.hospitalId && user.hospitalId !== hospitalId) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Clear failed attempts
    delete failedAttempts[sanitizedUsername];

    // Create JWT
    const token = await createToken({
      _id: user._id,
      username: user.username,
      role: user.role,
      name: user.name,
      hospitalId: user.hospitalId,
      orgId: user.orgId,
    });

    const response = NextResponse.json({
      user: {
        _id: user._id,
        username: user.username,
        name: user.name,
        role: user.role,
        hospitalId: user.hospitalId,
        hospitalName: user.hospitalName,
        orgId: user.orgId,
      },
    });

    // Set HTTP-only cookie
    response.cookies.set('taban-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('Login error:', err instanceof Error ? err.message : 'Unknown error');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
