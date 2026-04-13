"use client";

import { useState } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════════
   Taban Marketing — Navbar
   Matches Tebra-style: top accent bar, logo left, phone + CTAs right
   ═══════════════════════════════════════════════════════════════════ */

export default function MarketingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Thin top accent bar */}
      <div className="mk-top-bar" />

      {/* Main navbar */}
      <nav className="mk-navbar">
        <div className="mk-container mk-navbar-inner">
          {/* Logo */}
          <Link href="/site" className="mk-nav-logo">
            <TabanLogoIcon />
            <span className="mk-nav-logo-text">taban</span>
          </Link>

          {/* Desktop actions */}
          <div className="mk-nav-actions" style={{ display: mobileOpen ? "none" : undefined }}>
            {/* Phone */}
            <a href="tel:+211920000000" className="mk-nav-phone" style={{ marginRight: 8 }}>
              <PhoneIcon />
              <span className="hide-mobile">+211 920 000 000</span>
            </a>

            {/* CTA buttons */}
            <Link href="/site/pricing" className="mk-btn mk-btn-outline mk-btn-sm">
              Get pricing
            </Link>
            <Link href="/site/ehr" className="mk-btn mk-btn-coral mk-btn-sm">
              Get demo
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="mk-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              display: "none",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 8,
            }}
          >
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div style={{
            background: "#fff",
            borderTop: "1px solid #e8e4dc",
            padding: "16px var(--mk-container-padding)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}>
            <a href="tel:+211920000000" className="mk-nav-phone">
              <PhoneIcon />
              +211 920 000 000
            </a>
            <Link href="/site/pricing" className="mk-btn mk-btn-outline" onClick={() => setMobileOpen(false)}>
              Get pricing
            </Link>
            <Link href="/site/ehr" className="mk-btn mk-btn-coral" onClick={() => setMobileOpen(false)}>
              Get demo
            </Link>
          </div>
        )}
      </nav>

      <style jsx global>{`
        @media (max-width: 639px) {
          .mk-mobile-toggle { display: block !important; }
          .mk-nav-actions { display: none !important; }
          .hide-mobile { display: none; }
        }
      `}</style>
    </>
  );
}

/* ── Inline SVG Icons ──────────────────────────────────────────── */

function TabanLogoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Taban tree/cross healthcare icon */}
      <circle cx="32" cy="32" r="30" stroke="#003a43" strokeWidth="2" fill="none" />
      <path
        d="M32 12v40M22 22h20M22 32h20M26 42h12"
        stroke="#003a43"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="32" cy="10" r="3" fill="#003a43" />
      <circle cx="32" cy="54" r="2" fill="#003a43" />
      <circle cx="16" cy="32" r="2" fill="#e8876d" />
      <circle cx="48" cy="32" r="2" fill="#e8876d" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}
