"use client";

import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import {
  Reveal,
  FAQItem,
  DemoForm,
  CheckItem,
  TestimonialSwoosh,
  PricingBannerIcon,
} from "@/components/marketing/MarketingShared";
import Link from "next/link";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════════
   TABAN — Main Marketing Landing Page
   Layout: Tebra-style with hero + demo form, feature splits,
   testimonial, FAQ, pricing CTA, footer
   ═══════════════════════════════════════════════════════════════════ */

export default function MarketingHome() {
  return (
    <>
      <MarketingNav />

      {/* ── HERO SECTION ────────────────────────────────────────── */}
      <section className="mk-hero">
        <div className="mk-container">
          <div className="mk-hero-grid">
            {/* Left: headline + checks + hero visual */}
            <div className="mk-hero-content">
              <Reveal>
                <h1 className="mk-h1">
                  The EHR software that gets out of your way.
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mk-body-lg">
                  Eliminate admin headaches so you can spend more time with
                  patients and less time clicking.
                </p>
              </Reveal>

              {/* Value props row */}
              <Reveal delay={0.15}>
                <div style={{
                  display: "flex",
                  gap: 32,
                  flexWrap: "wrap",
                  marginTop: 8,
                  marginBottom: 32,
                }}>
                  {[
                    "Built for small-to-medium-sized practices — Not hospitals",
                    "The support you need, when you need it",
                    "Begin your journey today",
                  ].map((text, i) => (
                    <div key={i} style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      flex: "1 1 180px",
                      gap: 8,
                    }}>
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: "var(--mk-cream-200)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        {i === 0 && <StethoscopeIcon />}
                        {i === 1 && <SupportIcon />}
                        {i === 2 && <NetworkIcon />}
                      </div>
                      <h4 className="mk-h4" style={{ fontSize: "0.875rem" }}>{text}</h4>
                      <p style={{ fontSize: "0.8125rem", color: "var(--mk-text-secondary)", margin: 0, lineHeight: 1.5 }}>
                        {i === 0 && "Our EHR adapts to your specialty, size, and team so you can focus on care, not workarounds."}
                        {i === 1 && "Whether you're onboarding your team, setting up templates, or need billing support, our experts are here."}
                        {i === 2 && "Intuitive, easy to use, and cloud-based — no technical knowledge required."}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Hero image area — doctor with tablet */}
              <Reveal delay={0.2}>
                <div style={{
                  position: "relative",
                  borderRadius: 12,
                  overflow: "hidden",
                  marginTop: 16,
                }}>
                  {/* Use the tablet-medical image from public assets */}
                  <Image
                    src="/assets/tablet-medical.jpg"
                    alt="Doctor using Taban EHR on tablet"
                    width={600}
                    height={400}
                    style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: 12 }}
                    priority
                  />
                  {/* Floating notification card overlay */}
                  <div style={{
                    position: "absolute",
                    bottom: 24,
                    right: 24,
                    background: "#fff",
                    borderRadius: 12,
                    padding: "12px 16px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: "var(--mk-text-primary)",
                  }}>
                    <span style={{ fontSize: 16 }}>&#128197;</span>
                    <span>Appointment has been rescheduled</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Demo request form */}
            <Reveal delay={0.15}>
              <div style={{ position: "sticky", top: 100 }}>
                <DemoForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── AWARDS BAR ──────────────────────────────────────────── */}
      <section className="mk-awards-bar">
        <div className="mk-container">
          <p className="mk-awards-text">
            Over 400 facilities trust Taban. We know what it takes for South Sudan&apos;s
            healthcare to not just survive, but thrive.
          </p>
          <div className="mk-awards-logos">
            {["WHO Certified", "MoH Approved", "DHIS2 Integrated", "HIPAA Ready", "ISO 27001", "OpenMRS"].map((label, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div className="mk-award-badge">
                  <span style={{ fontSize: 24, color: "#fff" }}>
                    {["&#127942;", "&#9989;", "&#128202;", "&#128274;", "&#128737;", "&#9883;"][i]}
                  </span>
                </div>
                <span style={{ fontSize: "0.6875rem", color: "var(--mk-text-on-dark-muted)", display: "block", marginTop: 6 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLEXIBLE CHARTING ───────────────────────────────────── */}
      <section className="mk-section mk-section-white">
        <div className="mk-container">
          <Reveal>
            <div className="mk-split">
              <div className="mk-split-content">
                <h2 className="mk-h2">Flexible charting</h2>
                <p>
                  Create over a dozen note types, templates, and text shortcuts,
                  all configurable to your specialty.
                </p>
                <Link href="/site/ehr" className="mk-btn mk-btn-outline">
                  Simplify Your Charting Now
                </Link>
              </div>
              <div className="mk-split-image">
                {/* Screenshot: SOAP note interface */}
                <Image
                  src="/assets/dashboard-screenshot.png"
                  alt="Taban flexible charting interface with SOAP notes"
                  width={580}
                  height={380}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── INSTANT eLABS ──────────────────────────────────────── */}
      <section className="mk-section mk-section-white">
        <div className="mk-container">
          <Reveal>
            <div className="mk-split mk-split-reverse">
              <div className="mk-split-content">
                <h2 className="mk-h2">Instant eLabs</h2>
                <p>
                  Securely manage lab, radiology, and imaging orders and
                  analyze results — your route to increased practice efficiency.
                </p>
                <Link href="/site/ehr" className="mk-btn mk-btn-outline">
                  Go Paperless with eLabs
                </Link>
              </div>
              <div className="mk-split-image">
                <Image
                  src="/assets/health-data.jpg"
                  alt="Lab orders and results management in Taban"
                  width={580}
                  height={380}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SEND eRx IN SECONDS ────────────────────────────────── */}
      <section className="mk-section mk-section-white">
        <div className="mk-container">
          <Reveal>
            <div className="mk-split">
              <div className="mk-split-content">
                <h2 className="mk-h2">Send eRx in seconds</h2>
                <p>
                  Send e-prescriptions in seconds, make fewer costly medication
                  mistakes, and eliminate manual process frustrations with an
                  expansive database of medications and durable medical equipment.
                </p>
                <Link href="/site/ehr" className="mk-btn mk-btn-outline">
                  Send Prescriptions Faster
                </Link>
              </div>
              <div className="mk-split-image">
                {/* Prescription interface screenshot */}
                <div style={{
                  background: "var(--mk-cream-100)",
                  borderRadius: 12,
                  padding: 24,
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}>
                  {/* Prescribe medication modal */}
                  <div style={{
                    background: "#fff",
                    borderRadius: 12,
                    padding: 20,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                    flex: 1,
                    fontSize: "0.8125rem",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontWeight: 600 }}>
                      <span>Prescribe medication</span>
                      <span style={{ cursor: "pointer" }}>&times;</span>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <label style={{ fontSize: "0.6875rem", color: "#6b8a94", display: "block", marginBottom: 4 }}>Drug</label>
                      <div style={{ padding: "8px 12px", border: "1px solid #d4d0c8", borderRadius: 6, fontSize: "0.8125rem" }}>
                        Amoxicillin 250 mg capsule
                      </div>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <label style={{ fontSize: "0.6875rem", color: "#6b8a94", display: "block", marginBottom: 4 }}>Patient instructions</label>
                      <div style={{ padding: "8px 12px", background: "var(--mk-teal-900)", color: "#fff", borderRadius: 6, fontSize: "0.8125rem" }}>
                        1 cap(s) two times a day x10 days
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                      <button className="mk-btn mk-btn-outline mk-btn-sm" style={{ flex: 1, fontSize: "0.75rem" }}>Cancel</button>
                      <button className="mk-btn mk-btn-teal mk-btn-sm" style={{ flex: 1, fontSize: "0.75rem" }}>Create</button>
                    </div>
                  </div>
                  {/* Phone preview */}
                  <div style={{
                    width: 160,
                    background: "#fff",
                    borderRadius: 16,
                    padding: "12px 8px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                    fontSize: "0.625rem",
                    lineHeight: 1.6,
                  }}>
                    <div style={{ textAlign: "center", fontWeight: 700, marginBottom: 8, fontSize: "0.6875rem" }}>Prescription</div>
                    <div style={{ borderTop: "1px solid #eee", paddingTop: 8 }}>
                      <div><strong>Drug</strong>: Amoxicillin</div>
                      <div><strong>Strength</strong>: 250 mg capsule</div>
                      <div><strong>Quantity</strong>: 20</div>
                      <div><strong>Dispensations</strong>: 250 mg capsule</div>
                      <div><strong>Substitution</strong>: Allowed</div>
                      <div><strong>Pharmacy</strong>: JTH Pharmacy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WORK FROM ANYWHERE ─────────────────────────────────── */}
      <section className="mk-section mk-section-white">
        <div className="mk-container">
          <Reveal>
            <div className="mk-split mk-split-reverse">
              <div className="mk-split-content">
                <h2 className="mk-h2">Work from anywhere</h2>
                <p>
                  Use the Taban mobile app on your smartphone or tablet to manage
                  your practice and stay connected to its most critical needs on
                  the go.
                </p>
                <Link href="/site/ehr" className="mk-btn mk-btn-outline">
                  Work From Anywhere
                </Link>
              </div>
              <div className="mk-split-image">
                <Image
                  src="/assets/tablet-medical.jpg"
                  alt="Taban mobile EHR on tablet and phone"
                  width={580}
                  height={380}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TELEHEALTH ─────────────────────────────────────────── */}
      <section className="mk-section mk-section-white">
        <div className="mk-container">
          <Reveal>
            <div className="mk-split">
              <div className="mk-split-content">
                <h2 className="mk-h2">Easy, efficient virtual care</h2>
                <p>
                  Create high-quality video visits, group appointments, dedicated
                  provider URLs, virtual waiting rooms, and custom patient
                  communications with HIPAA-certified telehealth.
                </p>
                <Link href="/site/ehr" className="mk-btn mk-btn-outline">
                  Telehealth Made Easy
                </Link>
              </div>
              <div className="mk-split-image">
                <Image
                  src="/assets/african-nurse.jpg"
                  alt="Virtual care with Taban telehealth"
                  width={580}
                  height={380}
                  style={{ width: "100%", height: "auto" }}
                />
                {/* Appointment request overlay */}
                <div style={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  background: "#fff",
                  borderRadius: 8,
                  padding: "10px 14px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  fontSize: "0.75rem",
                }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>Appointment request</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#d4d0c8" }} />
                    <span>In office</span>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--mk-teal-700)" }} />
                    <span>Telehealth</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DOCTORS DESIGNED OUR EHR CTA ───────────────────────── */}
      <section className="mk-section" style={{ background: "var(--mk-sage-100)", padding: "80px 0" }}>
        <div className="mk-container">
          <Reveal>
            <div className="mk-split">
              <div className="mk-split-content">
                <h2 className="mk-h2" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                  Doctors designed our EHR. Ready to find out why small practices love it?
                </h2>
                <Link href="/site/ehr" className="mk-btn mk-btn-coral mk-btn-lg" style={{ marginTop: 8 }}>
                  Request demo
                </Link>
              </div>
              <div className="mk-split-image" style={{ position: "relative" }}>
                <Image
                  src="/assets/mother-child.jpg"
                  alt="Healthcare professionals collaborating"
                  width={580}
                  height={420}
                  style={{ width: "100%", height: "auto", borderRadius: 12 }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ALL-IN-ONE SOLUTION ─────────────────────────────────── */}
      <section className="mk-section mk-section-white" style={{ paddingBottom: 40 }}>
        <div className="mk-container" style={{ textAlign: "center" }}>
          <Reveal>
            <p className="mk-label" style={{ marginBottom: 16 }}>ALL-IN-ONE SOLUTION</p>
            <h2 className="mk-h2" style={{ maxWidth: 700, margin: "0 auto 16px" }}>
              Excited about a better EHR? There&apos;s even more to discover.
            </h2>
            <p className="mk-body-lg" style={{ maxWidth: 600, margin: "0 auto 24px" }}>
              Streamline your healthcare operations and unlock your potential
              with Taban&apos;s Complete Operating System.
            </p>
            <Link href="/site/ehr" className="mk-btn mk-btn-coral mk-btn-lg">
              Get demo
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURE RING (5 pillars) ───────────────────────────── */}
      <section className="mk-section mk-section-white" style={{ paddingTop: 0 }}>
        <div className="mk-container">
          <Reveal>
            <div className="mk-connected-ring">
              <div className="mk-feature-ring">
                {[
                  { icon: <PracticeGrowthIcon />, title: "Practice Growth", desc: "Grow your presence, attract more patients, and optimize for a digital world" },
                  { icon: <PatientExpIcon />, title: "Patient Experience", desc: "Combine exceptional care with exceptional patient experience" },
                  { icon: <CareDeliveryIcon />, title: "Care Delivery", desc: "Increase time with patients, reduce documentation time, and maximize outcomes" },
                  { icon: <BillingIcon />, title: "Billing & Payments", desc: "Collect faster and at higher rates" },
                  { icon: <DataInsightsIcon />, title: "Data & Insights", desc: "Uncover opportunities for growth and transformation" },
                ].map((item, i) => (
                  <div key={i} className="mk-feature-ring-item">
                    <div className="mk-feature-ring-icon">{item.icon}</div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIAL SECTION ─────────────────────────────────── */}
      <section className="mk-section mk-section-teal mk-testimonial">
        <div className="mk-container">
          <Reveal>
            <div className="mk-testimonial-inner">
              {/* Swoosh decoration */}
              <div className="mk-testimonial-swoosh">
                <TestimonialSwoosh />
              </div>

              {/* Quote */}
              <div className="mk-testimonial-quote">
                <div className="mk-quote-mark">&ldquo;</div>
                <blockquote>
                  &ldquo;Taban has been a 180-degree turn from our previous system.
                  It is so easy to use! We learned the majority of functions in
                  1-2 days working with the product.&rdquo;
                </blockquote>
                <cite>
                  <strong>Dr. Akol M.</strong>
                  <span>Provider at Juba Teaching Hospital</span>
                </cite>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ SECTION ─────────────────────────────────────────── */}
      <section className="mk-faq-section">
        <div className="mk-container">
          <Reveal>
            <h2 className="mk-h2 mk-faq-title">Frequently asked questions</h2>
          </Reveal>

          <div className="mk-faq-list">
            <FAQItem
              question="Why should I choose Taban's EHR over another EHR?"
              answer="Taban's EHR is built specifically for South Sudan's healthcare context and was designed by healthcare providers, so it has the key features you need and is surprisingly easy to use. Write a note, prescribe a medication, view electronic medical records, and create a superbill in just minutes. Plus, we offer full customer service and training support free of charge."
            />
            <FAQItem
              question="How does the integration between Clinical and Billing work?"
              answer="Taban seamlessly connects your clinical documentation with billing. When you complete a patient visit, diagnoses and procedures automatically flow into the billing module. This reduces manual entry and ensures accurate claims submission."
            />
            <FAQItem
              question="Will my local pharmacy be listed in the EHR?"
              answer="Yes. Taban integrates with local pharmacy networks across South Sudan. You can send electronic prescriptions directly to your patient's preferred pharmacy, improving medication adherence and patient convenience."
            />
            <FAQItem
              question="Are there specific system requirements to use Taban's EHR?"
              answer="Taban works on any modern web browser — Chrome, Firefox, Safari, or Edge. No special hardware is required. It's optimized for low-bandwidth environments and works offline, syncing automatically when connectivity is restored."
            />
            <FAQItem
              question="Is Taban's EHR certified for meaningful use?"
              answer="Yes. Taban meets WHO digital health standards and is certified by the South Sudan Ministry of Health. We maintain compliance with international healthcare data standards including HL7 FHIR and DHIS2 integration."
            />
          </div>

          <div className="mk-show-more">
            <button className="mk-btn mk-btn-outline mk-btn-sm">
              Show more
            </button>
          </div>
        </div>
      </section>

      {/* ── SECOND HERO / CTA (repeat of top for bottom of page) ── */}
      <section className="mk-hero" style={{ paddingBottom: 80 }}>
        <div className="mk-container">
          <div className="mk-hero-grid">
            <div className="mk-hero-content" style={{ paddingBottom: 0 }}>
              <Reveal>
                <h1 className="mk-h1">
                  More than 400 practices in South Sudan are growing with Taban.
                  It&apos;s your turn.
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mk-body-lg" style={{ marginBottom: 20 }}>
                  Schedule your customized demo and:
                </p>
                <ul className="mk-check-list">
                  <CheckItem>Get a free data-driven practice assessment</CheckItem>
                  <CheckItem>Identify growth opportunities</CheckItem>
                  <CheckItem>No strings attached</CheckItem>
                </ul>
              </Reveal>

              {/* Hero image with chart overlay */}
              <Reveal delay={0.2}>
                <div style={{ position: "relative", marginTop: 24 }}>
                  <Image
                    src="/assets/african-nurse.jpg"
                    alt="Healthcare professional using Taban"
                    width={500}
                    height={340}
                    style={{ width: "100%", height: "auto", borderRadius: 12 }}
                  />
                  {/* Floating chart overlay */}
                  <div style={{
                    position: "absolute",
                    bottom: 32,
                    left: -16,
                    background: "#fff",
                    borderRadius: 8,
                    padding: "8px 12px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  }}>
                    <div style={{ fontSize: "0.6875rem", color: "#6b8a94", marginBottom: 4 }}>Average by Day of Week</div>
                    <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 40 }}>
                      {[20, 35, 28, 45, 38, 50, 30].map((h, i) => (
                        <div key={i} style={{
                          width: 12,
                          height: h * 0.8,
                          borderRadius: 2,
                          background: i < 4 ? "var(--mk-teal-900)" : "var(--mk-teal-600)",
                        }} />
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Demo form again */}
            <Reveal delay={0.15}>
              <div style={{ position: "sticky", top: 100 }}>
                <DemoForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TAILORED PRICING BANNER ─────────────────────────────── */}
      <section className="mk-section mk-section-white" style={{ padding: "40px 0" }}>
        <div className="mk-container">
          <Reveal>
            <div className="mk-pricing-banner">
              <PricingBannerIcon />
              <div>
                <h3 className="mk-h3" style={{ color: "var(--mk-teal-700)", margin: "0 0 8px" }}>
                  Get tailored pricing
                </h3>
                <p style={{ margin: 0, color: "var(--mk-text-secondary)", fontSize: "0.9375rem" }}>
                  Answer a few simple questions about your practice and we&apos;ll
                  connect you with one of our experts.
                </p>
              </div>
              <Link href="/site/pricing" className="mk-btn mk-btn-outline">
                Request pricing
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <MarketingFooter />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Inline SVG Icons
   ═══════════════════════════════════════════════════════════════════ */

function StethoscopeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--mk-teal-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 0012 0V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3" />
      <path d="M8 15v1a6 6 0 006 6 6 6 0 006-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--mk-teal-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 012 13V7a2 2 0 012-2h2" />
      <path d="M22 13V7a2 2 0 00-2-2H10a2 2 0 00-2 2v6a2 2 0 002 2h7.9" />
      <path d="M14 9.5a.5.5 0 11-1 0 .5.5 0 011 0zM18 9.5a.5.5 0 11-1 0 .5.5 0 011 0z" />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--mk-teal-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3" />
      <circle cx="5" cy="19" r="3" />
      <circle cx="19" cy="19" r="3" />
      <path d="M12 8v4M7.5 17.2L10 14M16.5 17.2L14 14" />
      <circle cx="12" cy="14" r="2" />
    </svg>
  );
}

function PracticeGrowthIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function PatientExpIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CareDeliveryIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 0012 0V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3" />
      <path d="M8 15v1a6 6 0 006 6 6 6 0 006-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  );
}

function BillingIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

function DataInsightsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.21 15.89A10 10 0 118 2.83" />
      <path d="M22 12A10 10 0 0012 2v10z" />
    </svg>
  );
}
