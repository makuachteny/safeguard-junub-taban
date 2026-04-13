"use client";

import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import {
  Reveal,
  FAQItem,
  DemoForm,
  TestimonialSwoosh,
  PricingBannerIcon,
} from "@/components/marketing/MarketingShared";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════════
   TABAN — Pricing / Get Pricing Page
   Similar to Tebra's "get pricing" page
   ═══════════════════════════════════════════════════════════════════ */

export default function PricingPage() {
  return (
    <div className="mk-page">
      <MarketingNav />

      {/* ── HERO SECTION ────────────────────────────────────────────── */}
      <section className="mk-hero">
        <div className="mk-container">
          <div className="mk-hero-grid">
            {/* Left: headline + subtext */}
            <div className="mk-hero-content">
              <Reveal>
                <h1 className="mk-h1">
                  Get tailored pricing for your practice
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mk-body-lg">
                  Our flexible plans are customized based on your practice size, specialty, and specific needs. No hidden fees, no surprises. Just transparent pricing that scales with you.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mk-body" style={{ color: "var(--mk-text-secondary)", marginTop: 32 }}>
                  Ready to see what Taban can do for your practice? Fill out the form to get a personalized pricing quote and schedule a free demo.
                </p>
              </Reveal>
            </div>

            {/* Right: DemoForm */}
            <Reveal delay={0.15}>
              <div style={{ position: "sticky", top: 100 }}>
                <DemoForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WHY PRACTICES CHOOSE TABAN ──────────────────────────────── */}
      <section className="mk-section mk-section-white">
        <div className="mk-container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <h2 className="mk-h2">Why practices choose Taban</h2>
              <p className="mk-body-lg" style={{ maxWidth: 600, margin: "24px auto 0", color: "var(--mk-text-secondary)" }}>
                Healthcare providers trust Taban to streamline operations and improve patient care while keeping costs manageable.
              </p>
            </div>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 32,
          }}>
            {[
              {
                icon: "💰",
                title: "Transparent Pricing",
                description: "No surprise fees. Know exactly what you're paying for, with costs that scale as your practice grows.",
              },
              {
                icon: "⚡",
                title: "Fast Implementation",
                description: "Get up and running in weeks, not months. Our onboarding team ensures a smooth transition from day one.",
              },
              {
                icon: "🤝",
                title: "Dedicated Support",
                description: "Your own support team understands your practice. Available 24/7 to help you succeed and grow.",
              },
              {
                icon: "🔒",
                title: "Security & Compliance",
                description: "HIPAA-compliant, ISO 27001 certified, and DHIS2 integrated. Your data is always protected.",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <div style={{
                  background: "#fff",
                  border: "1px solid #e8e4dc",
                  borderRadius: 16,
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}>
                  <div style={{ fontSize: 40 }}>{item.icon}</div>
                  <h3 className="mk-h3" style={{ fontSize: "1.25rem", margin: 0 }}>
                    {item.title}
                  </h3>
                  <p className="mk-body" style={{ color: "var(--mk-text-secondary)", margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ──────────────────────────────────────────– */}
      <section className="mk-section mk-section-cream">
        <div className="mk-container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <h2 className="mk-h2">What's included in Taban</h2>
              <p className="mk-body-lg" style={{ maxWidth: 600, margin: "24px auto 0", color: "var(--mk-text-secondary)" }}>
                A complete healthcare management platform built to handle everything your practice needs.
              </p>
            </div>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 32,
          }}>
            {[
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M2 12h20M6 6h1v1H6M17 6h1v1h-1M6 17h1v1H6M17 17h1v1h-1" />
                  </svg>
                ),
                title: "Clinical EHR",
                items: ["Flexible charting", "SOAP notes & templates", "Patient records", "Appointment scheduling"],
              },
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M3 9h18M3 15h18M9 2v20M15 2v20" />
                    <rect x="3" y="2" width="18" height="20" rx="2" ry="2" />
                  </svg>
                ),
                title: "Billing & Payments",
                items: ["Claims submission", "Superbills", "Insurance verification", "Revenue tracking"],
              },
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 7h16M4 12h16M4 17h16M8 2v20M16 2v20" />
                  </svg>
                ),
                title: "Lab & Imaging",
                items: ["eLab orders", "Results management", "Imaging integration", "Data analysis"],
              },
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                ),
                title: "Pharmacy",
                items: ["eRx prescribing", "Drug interaction checking", "Formulary lookup", "Patient adherence tracking"],
              },
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 7l-7 5 7 5V7z" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                ),
                title: "Telehealth",
                items: ["Video visits", "Virtual waiting rooms", "Secure messaging", "Remote consultations"],
              },
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                ),
                title: "Analytics",
                items: ["DHIS2 reports", "Performance dashboards", "Patient insights", "Practice metrics"],
              },
            ].map((module, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <div style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: 32,
                  border: "1px solid #e8e4dc",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    background: "var(--mk-cream-200)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--mk-teal-700)",
                  }}>
                    {module.icon}
                  </div>
                  <h3 className="mk-h3" style={{ fontSize: "1.25rem", margin: 0 }}>
                    {module.title}
                  </h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                    {module.items.map((item, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.9375rem", color: "var(--mk-text-secondary)" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--mk-teal-700)", flexShrink: 0 }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL SECTION ──────────────────────────────────────– */}
      <section className="mk-section mk-section-teal mk-testimonial">
        <div className="mk-container">
          <Reveal>
            <div className="mk-testimonial-inner">
              <div className="mk-testimonial-swoosh">
                <TestimonialSwoosh />
              </div>
              <div className="mk-testimonial-quote">
                <span className="mk-quote-mark">&ldquo;</span>
                <blockquote>
                  Taban transformed how we manage patient care. We've reduced administrative time by 40% and can finally focus on what matters most — our patients.
                </blockquote>
                <cite>
                  <strong>Dr. Amina Hassan</strong>
                  <span>Primary Care Physician, Khartoum Medical Center</span>
                </cite>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PRICING FAQ ──────────────────────────────────────────────– */}
      <section className="mk-faq-section">
        <div className="mk-container">
          <Reveal>
            <h2 className="mk-h2 mk-faq-title">Frequently asked questions about pricing</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mk-faq-list">
              <FAQItem
                question="What factors determine my pricing?"
                answer="Your pricing is based on several factors: practice size (number of providers and patients), modules you need (EHR, billing, telehealth, etc.), level of integration with existing systems, and the support tier you choose. We'll discuss all of these during your consultation to ensure you get a quote that fits your practice perfectly."
              />
              <FAQItem
                question="Can I add more users or features later?"
                answer="Absolutely. Your Taban plan is designed to grow with your practice. You can add users, upgrade to additional modules, or adjust your support level at any time. We'll work with you to ensure seamless scaling as your needs change."
              />
              <FAQItem
                question="Is there a setup or implementation fee?"
                answer="Implementation fees vary depending on your practice complexity and the integrations you need. During your demo, our team will provide a complete breakdown of all costs, including setup, training, and ongoing support. There are no hidden fees."
              />
              <FAQItem
                question="What's included in support?"
                answer="All Taban plans include 24/7 technical support, regular updates, security patches, and access to our knowledge base. Premium support tiers offer faster response times, dedicated account managers, and custom training for your team."
              />
              <FAQItem
                question="Do you offer discounts for nonprofits or government facilities?"
                answer="We're committed to improving healthcare in South Sudan. We work with nonprofits, government health centers, and research institutions on custom pricing. Please mention your organization type during your consultation."
              />
              <FAQItem
                question="What payment terms do you offer?"
                answer="We offer flexible billing options: monthly, quarterly, or annual payments. Annual prepayment includes a 10% discount. We also work with practices on custom billing arrangements based on your cash flow needs."
              />
              <FAQItem
                question="Is there a minimum contract length?"
                answer="Most plans require a 12-month initial commitment, but we understand that healthcare providers need flexibility. Talk to our sales team about shorter initial terms or flexible arrangements if needed."
              />
              <FAQItem
                question="What happens if I need to cancel?"
                answer="We want you to succeed with Taban. If you're unhappy within the first 90 days, we'll work to resolve your concerns. For contracts beyond that, standard cancellation terms apply, and we'll help migrate your data if needed."
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA SECTION ──────────────────────────────────────────────– */}
      <section className="mk-section mk-section-white">
        <div className="mk-container">
          <Reveal>
            <div className="mk-pricing-banner">
              <div>
                <PricingBannerIcon />
              </div>
              <div>
                <h3 className="mk-h3" style={{ margin: "0 0 8px", fontSize: "1.5rem" }}>
                  Ready to transform your practice?
                </h3>
                <p className="mk-body" style={{ margin: 0, color: "var(--mk-text-secondary)" }}>
                  Get your personalized quote today and schedule a free demo of Taban.
                </p>
              </div>
              <Link href="#demo" className="mk-btn mk-btn-coral mk-btn-lg">
                Get Your Quote
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────– */}
      <MarketingFooter />
    </div>
  );
}
