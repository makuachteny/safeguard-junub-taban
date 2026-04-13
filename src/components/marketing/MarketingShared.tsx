"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════════
   Taban Marketing — Shared Utility Components
   ═══════════════════════════════════════════════════════════════════ */

/* ── Scroll Reveal ─────────────────────────────────────────────── */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── FAQ Accordion Item ────────────────────────────────────────── */
export function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mk-faq-item">
      <button
        className="mk-faq-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
      <div className={`mk-faq-answer ${open ? "open" : ""}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

/* ── Demo Request Form ─────────────────────────────────────────── */
export function DemoForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mk-demo-card" style={{ textAlign: "center", padding: "48px 32px" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>&#10003;</div>
        <h3 style={{ fontFamily: "var(--mk-font-serif)", marginBottom: 8 }}>Thank you!</h3>
        <p style={{ color: "var(--mk-text-secondary)" }}>
          We&apos;ll contact you shortly with a personalized demo.
        </p>
      </div>
    );
  }

  return (
    <div className="mk-demo-card">
      <h3>Request a free demo</h3>
      <p>
        Please provide the following, and we&apos;ll contact you shortly with a personalized demo.
      </p>
      <form onSubmit={handleSubmit}>
        <input className="mk-form-input" type="text" placeholder="Full name*" required />
        <input className="mk-form-input" type="text" placeholder="Organization name*" required />
        <input className="mk-form-input" type="email" placeholder="Email*" required />
        <input className="mk-form-input" type="tel" placeholder="Phone*" required />
        <input className="mk-form-input" type="text" placeholder="Location / State*" required />
        <button type="submit" className="mk-btn mk-btn-coral mk-btn-lg mk-form-submit">
          Next &rarr;
        </button>
      </form>
    </div>
  );
}

/* ── Check Item ────────────────────────────────────────────────── */
export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li>
      <svg className="mk-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

/* ── Testimonial Swoosh SVG ────────────────────────────────────── */
export function TestimonialSwoosh() {
  return (
    <svg
      viewBox="0 0 500 350"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      {/* Decorative curved path similar to Tebra screenshots */}
      <path
        d="M50 300 C50 300 50 150 250 150 C450 150 450 50 450 50"
        stroke="#e8876d"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M450 50 L470 60"
        stroke="#e8876d"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M450 50 L460 30"
        stroke="#e8876d"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Section Decorative Icons ──────────────────────────────────── */
export function PricingBannerIcon() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {/* Stylized review/rating cards similar to Tebra */}
      <div style={{
        width: 80,
        height: 60,
        borderRadius: 8,
        border: "1px solid #d4ddd4",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        fontSize: 10,
        color: "#6b8a94",
      }}>
        <div style={{ display: "flex", gap: 2 }}>
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{ color: "#e8876d", fontSize: 10 }}>&#9733;</span>
          ))}
        </div>
        <span>5.0</span>
      </div>
      <div style={{
        width: 80,
        height: 60,
        borderRadius: 8,
        border: "1px solid #d4ddd4",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        fontSize: 10,
        color: "#6b8a94",
      }}>
        <div style={{
          width: 32,
          height: 4,
          borderRadius: 2,
          background: "#003a43",
        }} />
        <div style={{
          width: 48,
          height: 3,
          borderRadius: 2,
          background: "#d4ddd4",
        }} />
        <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{ color: "#e8876d", fontSize: 8 }}>&#9733;</span>
          ))}
        </div>
      </div>
    </div>
  );
}
