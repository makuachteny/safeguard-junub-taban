"use client";

import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════════
   Taban Marketing — Footer
   Two-column: brand/partners left, contact right
   Bottom bar: copyright + legal links
   ═══════════════════════════════════════════════════════════════════ */

export default function MarketingFooter() {
  return (
    <footer className="mk-footer">
      <div className="mk-container">
        {/* Main footer content */}
        <div className="mk-footer-inner">
          {/* Brand column */}
          <div className="mk-footer-brand">
            <Link href="/site" className="mk-nav-logo" style={{ textDecoration: "none" }}>
              <TabanLogoSmall />
              <span className="mk-nav-logo-text">taban</span>
            </Link>

            <p className="mk-footer-built-on">
              TABAN, BUILT FOR THE HEALTH OF
            </p>

            <div className="mk-footer-partners">
              <span style={{ fontWeight: 600 }}>South Sudan</span>
              <span style={{ color: "#d4d0c8" }}>+</span>
              <span style={{ fontWeight: 600 }}>Ministry of Health</span>
            </div>
          </div>

          {/* Contact column */}
          <div className="mk-footer-contact">
            <h4>Contact Us</h4>
            <address>
              Juba Teaching Hospital<br />
              Ministry of Health Complex<br />
              Juba, South Sudan
            </address>

            {/* Social links */}
            <div className="mk-footer-socials">
              <a href="#" className="mk-footer-social-link" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="#" className="mk-footer-social-link" aria-label="X / Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="mk-footer-social-link" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#" className="mk-footer-social-link" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mk-footer-bottom">
          <span>Copyright &copy; {new Date().getFullYear()} Taban Health Technologies</span>
          <div className="mk-footer-links">
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function TabanLogoSmall() {
  return (
    <svg width="28" height="28" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" stroke="#003a43" strokeWidth="2" fill="none" />
      <path d="M32 12v40M22 22h20M22 32h20M26 42h12" stroke="#003a43" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="10" r="3" fill="#003a43" />
      <circle cx="32" cy="54" r="2" fill="#003a43" />
      <circle cx="16" cy="32" r="2" fill="#e8876d" />
      <circle cx="48" cy="32" r="2" fill="#e8876d" />
    </svg>
  );
}
