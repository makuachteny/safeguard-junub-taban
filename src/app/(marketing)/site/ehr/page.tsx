"use client";

import Image from "next/image";
import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import {
  Reveal,
  FAQItem,
  DemoForm,
  CheckItem,
  TestimonialSwoosh,
} from "@/components/marketing/MarketingShared";

/* ═══════════════════════════════════════════════════════════════════
   Taban EHR Product Page
   Healthcare EHR product showcase matching Tebra design language
   ═══════════════════════════════════════════════════════════════════ */

export default function EHRPage() {
  return (
    <div className="mk-page">
      {/* Navigation */}
      <MarketingNav />

      {/* ── HERO SECTION ────────────────────────────────────────────── */}
      <section className="mk-hero">
        <div className="mk-container">
          <div className="mk-hero-grid">
            {/* Left: Headline + Description */}
            <div className="mk-hero-content">
              <h1 className="mk-h1">
                Integrate your EHR for easier charting, billing, and more
              </h1>
              <p>
                Streamline patient care with a comprehensive electronic health
                record system designed for healthcare providers across South
                Sudan and beyond. Reduce administrative burden, improve patient
                outcomes, and take control of your practice.
              </p>
              <div style={{ marginTop: 32 }}>
                <Link href="#demo" className="mk-btn mk-btn-teal mk-btn-lg">
                  Schedule a demo
                </Link>
              </div>
            </div>

            {/* Right: Demo Form */}
            <div className="mk-hero-visual">
              <Reveal delay={0.2}>
                <DemoForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── AWARDS / TRUST BAR ──────────────────────────────────────── */}
      <section className="mk-awards-bar">
        <div className="mk-container">
          <div className="mk-awards-text">
            Trusted by healthcare organizations across the region
          </div>
          <div className="mk-awards-logos">
            {/* Placeholder trust badge circles */}
            <div className="mk-award-badge">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.5"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="mk-award-badge">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.5"
              >
                <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
            </div>
            <div className="mk-award-badge">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.5"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <div className="mk-award-badge">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE 1: Flexible Charting ────────────────────────────── */}
      <section className="mk-section mk-section-white">
        <div className="mk-container">
          <Reveal>
            <div className="mk-split">
              <div className="mk-split-content">
                <h2 className="mk-h2">Flexible charting for every specialty</h2>
                <p>
                  Create customizable SOAP notes and clinical templates that
                  match your workflow. Build charts once and reuse across
                  encounters with intelligent autocomplete and clinical
                  decision support.
                </p>
                <ul className="mk-check-list">
                  <CheckItem>Customizable SOAP note templates</CheckItem>
                  <CheckItem>Clinical decision support alerts</CheckItem>
                  <CheckItem>Voice-to-text documentation</CheckItem>
                  <CheckItem>Smart autofill and shortcuts</CheckItem>
                </ul>
              </div>
              <div className="mk-split-image">
                <Image
                  src="/assets/dashboard-screenshot.png"
                  alt="EHR charting interface showing customizable templates"
                  width={600}
                  height={400}
                  priority
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURE 2: Instant eLabs ─────────────────────────────────── */}
      <section className="mk-section mk-section-cream">
        <div className="mk-container">
          <Reveal>
            <div className="mk-split mk-split-reverse">
              <div className="mk-split-content">
                <h2 className="mk-h2">Instant access to lab orders and results</h2>
                <p>
                  Order lab tests directly from your notes and receive results
                  in real-time. Integrated lab interface eliminates manual
                  entry and reduces errors while keeping test history at your
                  fingertips.
                </p>
                <ul className="mk-check-list">
                  <CheckItem>Order labs directly from charts</CheckItem>
                  <CheckItem>Real-time result delivery</CheckItem>
                  <CheckItem>Historical result tracking</CheckItem>
                  <CheckItem>Integrated lab partners</CheckItem>
                </ul>
              </div>
              <div className="mk-split-image">
                <Image
                  src="/assets/health-data.jpg"
                  alt="Lab results dashboard with integrated data"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURE 3: Send eRx in Seconds ──────────────────────────── */}
      <section className="mk-section mk-section-white">
        <div className="mk-container">
          <Reveal>
            <div className="mk-split">
              <div className="mk-split-content">
                <h2 className="mk-h2">Send eRx in seconds</h2>
                <p>
                  Prescribe medications electronically with integrated pharmacy
                  networks. Check drug interactions, manage patient allergies,
                  and keep medication history organized in one place. Support
                  for both branded and generic options.
                </p>
                <ul className="mk-check-list">
                  <CheckItem>Electronic prescription transmission</CheckItem>
                  <CheckItem>Drug interaction checking</CheckItem>
                  <CheckItem>Allergy and contraindication alerts</CheckItem>
                  <CheckItem>Refill management and renewals</CheckItem>
                </ul>
              </div>
              <div className="mk-split-image">
                <Image
                  src="/assets/tablet-medical.jpg"
                  alt="Prescription management on tablet interface"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURE 4: Get Paid Faster ──────────────────────────────── */}
      <section className="mk-section mk-section-cream">
        <div className="mk-container">
          <Reveal>
            <div className="mk-split mk-split-reverse">
              <div className="mk-split-content">
                <h2 className="mk-h2">Get paid faster with integrated billing</h2>
                <p>
                  Automated claim submission and billing reduces revenue leakage.
                  Real-time eligibility verification, claim tracking, and denial
                  management keep your practice financially healthy and
                  predictable.
                </p>
                <ul className="mk-check-list">
                  <CheckItem>Automated claim generation and submission</CheckItem>
                  <CheckItem>Real-time insurance eligibility checks</CheckItem>
                  <CheckItem>Denial management and appeals</CheckItem>
                  <CheckItem>Patient payment portal</CheckItem>
                </ul>
              </div>
              <div className="mk-split-image">
                <Image
                  src="/assets/african-nurse.jpg"
                  alt="Healthcare professional using billing dashboard"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURE 5: Work From Anywhere ───────────────────────────── */}
      <section className="mk-section mk-section-white">
        <div className="mk-container">
          <Reveal>
            <div className="mk-split">
              <div className="mk-split-content">
                <h2 className="mk-h2">Work from anywhere, anytime</h2>
                <p>
                  Access patient records from any device with internet
                  connection. Full-featured native apps for iOS and Android
                  ensure your team can see critical patient information whether
                  they're at the clinic or in the field.
                </p>
                <ul className="mk-check-list">
                  <CheckItem>Mobile and tablet-optimized interface</CheckItem>
                  <CheckItem>Native iOS and Android apps</CheckItem>
                  <CheckItem>Offline access and sync capabilities</CheckItem>
                  <CheckItem>Secure data encryption in transit</CheckItem>
                </ul>
              </div>
              <div className="mk-split-image">
                <Image
                  src="/assets/mother-child.jpg"
                  alt="Mobile health worker accessing patient data"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURE 6: Virtual Care ─────────────────────────────────── */}
      <section className="mk-section mk-section-cream">
        <div className="mk-container">
          <Reveal>
            <div className="mk-split mk-split-reverse">
              <div className="mk-split-content">
                <h2 className="mk-h2">Easy virtual care with video visits</h2>
                <p>
                  Expand access to care with integrated video conferencing.
                  Schedule telehealth appointments, conduct secure video visits,
                  and integrate notes directly into patient records. Bring
                  specialist expertise to remote areas.
                </p>
                <ul className="mk-check-list">
                  <CheckItem>HIPAA-compliant video conferencing</CheckItem>
                  <CheckItem>Integrated appointment scheduling</CheckItem>
                  <CheckItem>Screen sharing and digital forms</CheckItem>
                  <CheckItem>Visit recordings and transcripts</CheckItem>
                </ul>
              </div>
              <div className="mk-split-image">
                <Image
                  src="/assets/tablet-medical.jpg"
                  alt="Telehealth video consultation on tablet"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIAL SECTION ─────────────────────────────────────── */}
      <section className="mk-section mk-section-teal">
        <div className="mk-container">
          <Reveal>
            <div className="mk-testimonial-inner">
              <div className="mk-testimonial-swoosh">
                <TestimonialSwoosh />
              </div>

              <div className="mk-testimonial-quote">
                <div className="mk-quote-mark">&ldquo;</div>
                <blockquote>
                  Taban EHR has transformed how we deliver care. Our charting
                  time has been cut in half, and we catch more potential issues
                  before they become serious. It's like having a clinical
                  advisor at every patient encounter.
                </blockquote>
                <cite>
                  <strong>Dr. James Amato</strong>
                  <span>Head of Pediatrics, Juba Teaching Hospital</span>
                </cite>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ SECTION ─────────────────────────────────────────────── */}
      <section className="mk-faq-section">
        <div className="mk-container">
          <Reveal>
            <h2 className="mk-h2 mk-faq-title">Frequently asked questions</h2>

            <div className="mk-faq-list">
              <FAQItem
                question="Is Taban EHR HIPAA compliant?"
                answer="Yes, Taban EHR is fully HIPAA compliant with industry-leading security measures including 256-bit encryption, role-based access controls, and comprehensive audit logging. All data is encrypted both in transit and at rest."
              />
              <FAQItem
                question="Can I integrate with other healthcare systems?"
                answer="Absolutely. Taban EHR supports HL7, FHIR, and direct protocol integrations. Our API allows custom connections to existing lab systems, pharmacies, and billing providers. Our integration team can assist with implementation."
              />
              <FAQItem
                question="What kind of training and support do you provide?"
                answer="We offer comprehensive onboarding including staff training, workflow consultation, and data migration services. You'll have access to a dedicated support team, extensive documentation, and regular webinar training throughout your subscription."
              />
              <FAQItem
                question="How much does Taban EHR cost?"
                answer="Pricing is based on your practice size, specialty, and module selection. We offer flexible per-provider, per-patient, or flat-rate models. Schedule a demo to get a customized quote for your organization."
              />
              <FAQItem
                question="Can I access patient records on mobile devices?"
                answer="Yes. Taban EHR includes native iOS and Android apps with full charting capabilities, offline access, and push notifications. All mobile communications are encrypted and comply with security standards."
              />
              <FAQItem
                question="What happens to my data if I leave?"
                answer="Your data is always yours. We provide complete data export in standard formats (HL7, CCD) and assist with migration to another system at no additional cost. There are no lock-in contracts."
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PRICING CTA BANNER ──────────────────────────────────────── */}
      <section className="mk-section mk-section-white">
        <div className="mk-container">
          <Reveal>
            <div className="mk-pricing-banner">
              <div style={{ fontSize: "1.5rem" }}>💰</div>
              <div>
                <h3 className="mk-h3" style={{ margin: "0 0 4px" }}>
                  Tailored pricing for practices of any size
                </h3>
                <p style={{ margin: 0, color: "var(--mk-text-secondary)" }}>
                  From solo practitioners to health systems, we scale with your needs.
                </p>
              </div>
              <Link href="/site/pricing" className="mk-btn mk-btn-teal mk-btn-lg">
                View pricing →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <MarketingFooter />
    </div>
  );
}
