/**
 * Custom healthcare SVG icons — uniform 24x24, 1.5px stroke
 * Designed to be visually consistent across the landing page
 * Based on health/medical iconography standards
 */

const defaults = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function I({ size = 24, className, children }: { size?: number; className?: string; children: React.ReactNode }) {
  return (
    <svg {...defaults} width={size} height={size} className={className}>
      {children}
    </svg>
  );
}

// ── Patient Records / People ──
export function IconPatientRecords({ size, className }: { size?: number; className?: string }) {
  return (
    <I size={size} className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </I>
  );
}

// ── Offline / No WiFi ──
export function IconOffline({ size, className }: { size?: number; className?: string }) {
  return (
    <I size={size} className={className}>
      <path d="M12 20h.01" />
      <path d="M8.5 16.429a5 5 0 0 1 7 0" />
      <path d="M5 12.859a10 10 0 0 1 5.17-2.69" />
      <path d="M13.83 10.17A10 10 0 0 1 19 12.86" />
      <path d="M2 8.82a15 15 0 0 1 4.17-2.65" />
      <path d="M17.83 6.17A15 15 0 0 1 22 8.82" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </I>
  );
}

// ── AI / Brain ──
export function IconBrain({ size, className }: { size?: number; className?: string }) {
  return (
    <I size={size} className={className}>
      <path d="M12 2a6 6 0 0 0-6 6c0 1.66.68 3.16 1.76 4.24L12 16.49l4.24-4.25A6 6 0 0 0 12 2z" />
      <circle cx="12" cy="8" r="2" />
      <path d="M12 16.5V22" />
      <path d="M8 22h8" />
      <path d="M7 8h-.5A2.5 2.5 0 0 1 4 5.5v0A2.5 2.5 0 0 1 6.5 3H7" />
      <path d="M17 8h.5A2.5 2.5 0 0 0 20 5.5v0A2.5 2.5 0 0 0 17.5 3H17" />
    </I>
  );
}

// ── Surveillance / Heartbeat ──
export function IconSurveillance({ size, className }: { size?: number; className?: string }) {
  return (
    <I size={size} className={className}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </I>
  );
}

// ── Calendar / Appointments ──
export function IconAppointments({ size, className }: { size?: number; className?: string }) {
  return (
    <I size={size} className={className}>
      <rect x="3" y="4" width="18" height="18" rx="0" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <circle cx="12" cy="15" r="1" fill="currentColor" />
    </I>
  );
}

// ── Video / Telehealth ──
export function IconTelehealth({ size, className }: { size?: number; className?: string }) {
  return (
    <I size={size} className={className}>
      <rect x="2" y="5" width="14" height="14" rx="0" />
      <path d="M16 10l6-3v10l-6-3" />
    </I>
  );
}

// ── Birth & Death / CRVS ──
export function IconCRVS({ size, className }: { size?: number; className?: string }) {
  return (
    <I size={size} className={className}>
      <path d="M9 12h.01" />
      <path d="M15 12h.01" />
      <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
      <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5.5 5 1.5" />
      <path d="M19 3v3h-3" />
    </I>
  );
}

// ── DHIS2 / Upload-Export ──
export function IconExport({ size, className }: { size?: number; className?: string }) {
  return (
    <I size={size} className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </I>
  );
}

// ── Shield / Security ──
export function IconShield({ size, className }: { size?: number; className?: string }) {
  return (
    <I size={size} className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </I>
  );
}

// ── Clipboard / Assessment ──
export function IconAssessment({ size, className }: { size?: number; className?: string }) {
  return (
    <I size={size} className={className}>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M9 14l2 2 4-4" />
    </I>
  );
}

// ── Graduation / Training ──
export function IconTraining({ size, className }: { size?: number; className?: string }) {
  return (
    <I size={size} className={className}>
      <path d="M22 10l-10-6L2 10l10 6 10-6z" />
      <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
      <line x1="22" y1="10" x2="22" y2="16" />
    </I>
  );
}

// ── Zap / Deploy ──
export function IconDeploy({ size, className }: { size?: number; className?: string }) {
  return (
    <I size={size} className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </I>
  );
}

// ── Chart / Analytics ──
export function IconAnalytics({ size, className }: { size?: number; className?: string }) {
  return (
    <I size={size} className={className}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </I>
  );
}

// ── Building / Hospital ──
export function IconHospital({ size, className }: { size?: number; className?: string }) {
  return (
    <I size={size} className={className}>
      <rect x="4" y="2" width="16" height="20" rx="0" />
      <line x1="9" y1="6" x2="9" y2="6.01" />
      <line x1="15" y1="6" x2="15" y2="6.01" />
      <line x1="9" y1="10" x2="9" y2="10.01" />
      <line x1="15" y1="10" x2="15" y2="10.01" />
      <path d="M10 18h4v4h-4z" />
      <path d="M10 14h4" />
      <path d="M12 12v4" />
    </I>
  );
}

// ── Globe / Government ──
export function IconGlobe({ size, className }: { size?: number; className?: string }) {
  return (
    <I size={size} className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </I>
  );
}

// ── Heart / NGO ──
export function IconHeartCare({ size, className }: { size?: number; className?: string }) {
  return (
    <I size={size} className={className}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7z" />
      <path d="M12 5.5l1.5 3 3.5.5-2.5 2.5.5 3.5L12 13l-3 2 .5-3.5L7 9l3.5-.5z" />
    </I>
  );
}

// ── Lock / Privacy ──
export function IconPrivacy({ size, className }: { size?: number; className?: string }) {
  return (
    <I size={size} className={className}>
      <rect x="3" y="11" width="18" height="11" rx="0" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </I>
  );
}

// ── Database / Storage ──
export function IconStorage({ size, className }: { size?: number; className?: string }) {
  return (
    <I size={size} className={className}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </I>
  );
}

// ── Dollar / Cost ──
export function IconCost({ size, className }: { size?: number; className?: string }) {
  return (
    <I size={size} className={className}>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </I>
  );
}

// ── Server / Interop ──
export function IconInterop({ size, className }: { size?: number; className?: string }) {
  return (
    <I size={size} className={className}>
      <rect x="2" y="2" width="20" height="8" rx="0" />
      <rect x="2" y="14" width="20" height="8" rx="0" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </I>
  );
}
