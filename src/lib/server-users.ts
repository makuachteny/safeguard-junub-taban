/**
 * Server-safe user registry for API route authentication.
 *
 * PouchDB (pouchdb-browser) cannot run in Node.js API routes because it
 * references `self` (a browser global). This module provides a static user
 * list with pre-hashed passwords so the login API can authenticate users
 * without importing any browser-only modules.
 *
 * Passwords are hashed at module load time using bcryptjs (Node-compatible).
 */

import bcrypt from 'bcryptjs';

export interface ServerUser {
  _id: string;
  username: string;
  passwordHash: string;
  name: string;
  role: string;
  hospitalId?: string;
  hospitalName?: string;
  orgId?: string;
  isActive: boolean;
}

const PUBLIC_ORG_ID = 'org-moh-ss';
const PRIVATE_ORG_ID = 'org-mercy-hospital';

// Seed users with plain-text passwords — hashed lazily on first lookup
const SEED_USERS = [
  { username: 'superadmin', password: 'Super@Taban2026!', name: 'Taban Platform Admin', role: 'super_admin', hospitalId: undefined, hospitalName: undefined, orgId: undefined },
  { username: 'admin', password: 'TabanGov#2026!Ss', name: 'Ministry of Health', role: 'government', hospitalId: undefined, hospitalName: undefined, orgId: PUBLIC_ORG_ID },
  { username: 'dr.wani', password: 'Dr.Wani@JTH2026', name: 'Dr. James Wani Igga', role: 'doctor', hospitalId: 'hosp-001', hospitalName: 'Juba Teaching Hospital', orgId: PUBLIC_ORG_ID },
  { username: 'dr.achol', password: 'Dr.Achol@JTH2026', name: 'Dr. Achol Mayen Deng', role: 'doctor', hospitalId: 'hosp-001', hospitalName: 'Juba Teaching Hospital', orgId: PUBLIC_ORG_ID },
  { username: 'co.deng', password: 'CO.Deng@WTH2026', name: 'CO Deng Mabior Kuol', role: 'clinical_officer', hospitalId: 'hosp-002', hospitalName: 'Wau State Hospital', orgId: PUBLIC_ORG_ID },
  { username: 'nurse.stella', password: 'Nurse.Stella@MTH2026', name: 'Nurse Stella Keji Lemi', role: 'nurse', hospitalId: 'hosp-003', hospitalName: 'Malakal Teaching Hospital', orgId: PUBLIC_ORG_ID },
  { username: 'lab.gatluak', password: 'Lab.Gat@BSH2026', name: 'Lab Tech Gatluak Puok', role: 'lab_tech', hospitalId: 'hosp-004', hospitalName: 'Bentiu State Hospital', orgId: PUBLIC_ORG_ID },
  { username: 'pharma.rose', password: 'Pharma.Rose@JTH2026', name: 'Pharmacist Rose Gbudue', role: 'pharmacist', hospitalId: 'hosp-001', hospitalName: 'Juba Teaching Hospital', orgId: PUBLIC_ORG_ID },
  { username: 'desk.amira', password: 'Desk.Amira@JTH2026', name: 'Amira Juma Hassan', role: 'front_desk', hospitalId: 'hosp-001', hospitalName: 'Juba Teaching Hospital', orgId: PUBLIC_ORG_ID },
  { username: 'bhw.akol', password: 'BHW.Akol@KJ2026', name: 'Akol Deng Mading', role: 'boma_health_worker', hospitalId: 'phcu-001', hospitalName: 'Kajo-keji Boma PHCU', orgId: PUBLIC_ORG_ID },
  { username: 'sup.mary', password: 'Sup.Mary@KJ2026', name: 'Mary Lado Kenyi', role: 'payam_supervisor', hospitalId: 'phcc-001', hospitalName: 'Kajo-keji PHCC', orgId: PUBLIC_ORG_ID },
  { username: 'data.ayen', password: 'Data.Ayen@JTH2026', name: 'Ayen Dut Malual', role: 'data_entry_clerk', hospitalId: 'hosp-001', hospitalName: 'Juba Teaching Hospital', orgId: PUBLIC_ORG_ID },
  { username: 'supt.lado', password: 'Supt.Lado@JTH2026', name: 'Dr. Lado Tombe Kenyi', role: 'medical_superintendent', hospitalId: 'hosp-001', hospitalName: 'Juba Teaching Hospital', orgId: PUBLIC_ORG_ID },
  { username: 'hrio.dut', password: 'HRIO.Dut@JTH2026', name: 'Dut Machar Kuol', role: 'hrio', hospitalId: 'hosp-001', hospitalName: 'Juba Teaching Hospital', orgId: PUBLIC_ORG_ID },
  { username: 'chv.ajak', password: 'CHV.Ajak@KJ2026', name: 'Ajak Deng Mawien', role: 'community_health_volunteer', hospitalId: 'phcu-001', hospitalName: 'Kajo-keji Boma PHCU', orgId: PUBLIC_ORG_ID },
  { username: 'nutr.nyabol', password: 'Nutr.Nyabol@JTH2026', name: 'Nyabol Koang Jal', role: 'nutritionist', hospitalId: 'hosp-001', hospitalName: 'Juba Teaching Hospital', orgId: PUBLIC_ORG_ID },
  { username: 'rad.taban', password: 'Rad.Taban@JTH2026', name: 'Taban Ladu Soro', role: 'radiologist', hospitalId: 'hosp-001', hospitalName: 'Juba Teaching Hospital', orgId: PUBLIC_ORG_ID },
  { username: 'org.admin', password: 'OrgAdmin@Mercy2026', name: 'Mercy Org Administrator', role: 'org_admin', hospitalId: undefined, hospitalName: undefined, orgId: PRIVATE_ORG_ID },
  { username: 'dr.mercy', password: 'Dr.Mercy@2026!', name: 'Dr. Grace Lado', role: 'doctor', hospitalId: 'hosp-001', hospitalName: 'Juba Teaching Hospital', orgId: PRIVATE_ORG_ID },
];

// Lazily-computed hash cache
const hashCache: Record<string, string> = {};

async function getHash(username: string, password: string): Promise<string> {
  if (!hashCache[username]) {
    hashCache[username] = await bcrypt.hash(password, 12);
  }
  return hashCache[username];
}

/**
 * Look up a user by username and verify the password — server-safe.
 */
export async function authenticateUser(
  username: string,
  password: string
): Promise<ServerUser | null> {
  const entry = SEED_USERS.find(u => u.username === username);
  if (!entry) {
    // Constant-time: still run a hash to prevent timing attacks
    await bcrypt.hash(password, 12);
    return null;
  }

  const hash = await getHash(entry.username, entry.password);
  const valid = await bcrypt.compare(password, hash);
  if (!valid) return null;

  return {
    _id: `user-${entry.username}`,
    username: entry.username,
    passwordHash: hash,
    name: entry.name,
    role: entry.role,
    hospitalId: entry.hospitalId,
    hospitalName: entry.hospitalName,
    orgId: entry.orgId,
    isActive: true,
  };
}
