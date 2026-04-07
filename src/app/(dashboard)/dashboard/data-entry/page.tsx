'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/TopBar';
import { useApp } from '@/lib/context';
import { useHospitals } from '@/lib/hooks/useHospitals';
import {
  ClipboardCheck, Baby, Skull, Syringe, HeartPulse,
  Database, Building2, ArrowRight, CheckCircle2, AlertTriangle,
  Clock, TrendingUp, Heart, BarChart3, Wifi, WifiOff,
  BedDouble, Stethoscope, Users, Zap,
} from 'lucide-react';

const ACCENT = '#0891B2';

export default function DataEntryDashboard() {
  const router = useRouter();
  const { currentUser } = useApp();
  const { hospitals } = useHospitals();

  const myHospital = useMemo(() =>
    hospitals.find(h => h._id === currentUser?.hospitalId),
    [hospitals, currentUser?.hospitalId]
  );

  const facilityStats = useMemo(() => {
    if (!myHospital) return null;
    const services = myHospital.services || [];
    const hasPower = myHospital.hasElectricity;
    const completeness = [
      myHospital.totalBeds > 0,
      myHospital.doctors > 0,
      myHospital.nurses > 0,
      services.length > 0,
      hasPower,
      myHospital.hasInternet,
      myHospital.state,
      myHospital.county,
    ].filter(Boolean).length;
    const pct = Math.round((completeness / 8) * 100);
    return { services, hasPower, completeness, pct };
  }, [myHospital]);

  const quickActions = [
    { label: 'Facility Assessment', icon: ClipboardCheck, href: '/facility-assessments', color: '#7C3AED', desc: 'Run a facility check' },
    { label: 'My Facility', icon: Building2, href: '/my-facility', color: ACCENT, desc: 'View facility profile' },
    { label: 'Data Quality', icon: Database, href: '/data-quality', color: '#D97706', desc: 'Check data completeness' },
    { label: 'Vital Statistics', icon: Heart, href: '/vital-statistics', color: '#DC2626', desc: 'Population health data' },
    { label: 'Immunizations', icon: Syringe, href: '/immunizations', color: '#059669', desc: 'Vaccination records' },
    { label: 'Antenatal Care', icon: HeartPulse, href: '/anc', color: '#EC4899', desc: 'ANC visit records' },
    { label: 'Births', icon: Baby, href: '/births', color: '#2563EB', desc: 'Birth registrations' },
    { label: 'Deaths', icon: Skull, href: '/deaths', color: '#DC2626', desc: 'Death registrations' },
  ];

  if (!currentUser) return null;

  return (
    <>
      <TopBar title="Data Entry Dashboard" />
      <main className="page-container page-enter">

        {/* Facility banner */}
        {myHospital && (
          <div className="card-elevated p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: `${ACCENT}15` }}>
                <Building2 className="w-5 h-5" style={{ color: ACCENT }} />
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{myHospital.name}</h2>
                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  {myHospital.state} &middot; {myHospital.county || myHospital.town} &middot; {(myHospital as unknown as Record<string, string>).facilityType?.replace(/_/g, ' ') || myHospital.type?.replace(/_/g, ' ')}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                {myHospital.syncStatus === 'online'
                  ? <Wifi className="w-3.5 h-3.5" style={{ color: '#4ADE80' }} />
                  : <WifiOff className="w-3.5 h-3.5" style={{ color: '#94A3B8' }} />
                }
                <span className="text-[10px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                  {myHospital.syncStatus}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: 'Total Beds', value: myHospital.totalBeds, icon: BedDouble, color: '#0077D7' },
                { label: 'Doctors', value: myHospital.doctors, icon: Stethoscope, color: '#059669' },
                { label: 'Nurses', value: myHospital.nurses, icon: Users, color: '#EC4899' },
                { label: 'Patients', value: myHospital.patientCount?.toLocaleString() || '0', icon: Users, color: ACCENT },
              ].map(s => (
                <div key={s.label} className="p-3 rounded-lg" style={{ background: 'var(--overlay-subtle)', border: '1px solid var(--border-medium)' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                    <span className="text-[10px] font-semibold uppercase" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                  </div>
                  <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KPI strip */}
        <div className="kpi-grid mb-4">
          {[
            { label: 'Facility Score', value: facilityStats ? `${facilityStats.pct}%` : '--', icon: BarChart3, color: facilityStats && facilityStats.pct >= 80 ? '#059669' : '#D97706' },
            { label: 'Services', value: facilityStats?.services.length || 0, icon: Zap, color: '#7C3AED' },
            { label: 'Network', value: hospitals.length, icon: Building2, color: '#0077D7' },
            { label: 'Completeness', value: facilityStats ? `${facilityStats.completeness}/8` : '--', icon: Database, color: ACCENT },
          ].map(k => (
            <div key={k.label} className="kpi">
              <div className="kpi__icon" style={{ background: `${k.color}15` }}>
                <k.icon style={{ color: k.color }} />
              </div>
              <div className="kpi__body">
                <div className="kpi__value">{k.value}</div>
                <div className="kpi__label">{k.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="card-elevated p-4 mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Data Collection</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {quickActions.map(a => (
              <button key={a.label} onClick={() => router.push(a.href)}
                className="flex flex-col items-center gap-2 p-4 rounded-lg transition-all active:scale-95"
                style={{ background: 'var(--overlay-subtle)', border: '1px solid var(--border-medium)' }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${a.color}12` }}>
                  <a.icon className="w-5 h-5" style={{ color: a.color }} />
                </div>
                <span className="text-[11px] font-semibold text-center" style={{ color: 'var(--text-primary)' }}>{a.label}</span>
                <span className="text-[9px] text-center" style={{ color: 'var(--text-muted)' }}>{a.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

          {/* Facility readiness checklist */}
          <div className="glass-section">
            <div className="glass-section-header">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4" style={{ color: '#7C3AED' }} />
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Facility Readiness</span>
              </div>
              <button onClick={() => router.push('/facility-assessments')} className="text-[10px] font-semibold" style={{ color: ACCENT }}>
                Run Assessment <ArrowRight className="w-3 h-3 inline" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              {myHospital ? [
                { label: 'Beds & Infrastructure', ok: myHospital.totalBeds > 0, detail: `${myHospital.totalBeds} beds` },
                { label: 'Medical Staff', ok: myHospital.doctors > 0 && myHospital.nurses > 0, detail: `${myHospital.doctors} doctors, ${myHospital.nurses} nurses` },
                { label: 'Clinical Officers', ok: myHospital.clinicalOfficers > 0, detail: `${myHospital.clinicalOfficers} COs` },
                { label: 'Electricity', ok: myHospital.hasElectricity, detail: myHospital.hasElectricity ? `${myHospital.electricityHours}h/day` : 'No electricity' },
                { label: 'Generator', ok: myHospital.hasGenerator, detail: myHospital.hasGenerator ? 'Available' : 'None' },
                { label: 'Internet', ok: myHospital.hasInternet, detail: myHospital.hasInternet ? myHospital.internetType : 'No internet' },
                { label: 'Services Offered', ok: (myHospital.services?.length || 0) > 0, detail: `${myHospital.services?.length || 0} services` },
                { label: 'Sync Status', ok: myHospital.syncStatus === 'online', detail: myHospital.syncStatus },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 p-2.5 rounded-md" style={{ border: '1px solid var(--border-light)' }}>
                  {item.ok
                    ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#059669' }} />
                    : <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: '#D97706' }} />
                  }
                  <div className="flex-1">
                    <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{item.label}</span>
                    <span className="text-[10px] ml-2" style={{ color: 'var(--text-muted)' }}>{item.detail}</span>
                  </div>
                </div>
              )) : (
                <p className="text-xs text-center py-4" style={{ color: 'var(--text-muted)' }}>No facility assigned</p>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-3">

            {/* Data completeness */}
            <div className="glass-section">
              <div className="glass-section-header">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4" style={{ color: '#D97706' }} />
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Data Completeness</span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {myHospital ? [
                  { label: 'Infrastructure (beds, power, internet)', pct: myHospital.totalBeds > 0 && myHospital.hasElectricity && myHospital.hasInternet ? 100 : myHospital.totalBeds > 0 ? 60 : 20, color: '#059669' },
                  { label: 'Staffing records', pct: myHospital.doctors > 0 && myHospital.nurses > 0 ? 100 : myHospital.doctors > 0 || myHospital.nurses > 0 ? 50 : 0, color: '#0077D7' },
                  { label: 'Services catalog', pct: (myHospital.services?.length || 0) > 3 ? 100 : (myHospital.services?.length || 0) > 0 ? 50 : 0, color: '#7C3AED' },
                  { label: 'Location & geography', pct: myHospital.state && myHospital.county ? 100 : myHospital.state ? 50 : 0, color: ACCENT },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-semibold" style={{ color: 'var(--text-primary)' }}>{item.label}</span>
                      <span className="text-[11px] font-bold" style={{ color: item.pct === 100 ? '#059669' : item.pct >= 50 ? '#D97706' : '#DC2626' }}>
                        {item.pct}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full" style={{ background: 'var(--overlay-medium)' }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${item.pct}%`, background: item.color }} />
                    </div>
                  </div>
                )) : (
                  <p className="text-xs text-center py-4" style={{ color: 'var(--text-muted)' }}>No facility data</p>
                )}
              </div>
            </div>

            {/* Performance metrics */}
            {myHospital && (
              <div className="glass-section">
                <div className="glass-section-header">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" style={{ color: ACCENT }} />
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Performance Metrics</span>
                  </div>
                </div>
                <div className="p-4 grid grid-cols-2 gap-3">
                  {[
                    { label: 'Patient Count', value: myHospital.patientCount?.toLocaleString() || '0', ok: true },
                    { label: 'Today Visits', value: myHospital.todayVisits?.toString() || '0', ok: true },
                    { label: 'Reporting', value: `${myHospital.performance?.reportingCompleteness || 0}%`, ok: (myHospital.performance?.reportingCompleteness || 0) >= 80 },
                    { label: 'Quality Score', value: `${myHospital.performance?.qualityScore || 0}%`, ok: (myHospital.performance?.qualityScore || 0) >= 70 },
                  ].map(s => (
                    <div key={s.label} className="p-3 rounded-md" style={{ background: 'var(--overlay-subtle)', border: '1px solid var(--border-medium)' }}>
                      <div className="text-lg font-bold" style={{ color: s.ok ? 'var(--text-primary)' : '#D97706' }}>{s.value}</div>
                      <div className="text-[10px] font-semibold" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Start assessment CTA */}
            <div className="glass-section">
              <div className="glass-section-header">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" style={{ color: '#059669' }} />
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Assessment Status</span>
                </div>
              </div>
              <div className="p-4 text-center">
                <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                  Run a facility assessment to evaluate readiness, infrastructure, staffing, and service availability.
                </p>
                <button onClick={() => router.push('/facility-assessments')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-semibold transition-all"
                  style={{ background: ACCENT, color: '#fff', border: 'none', cursor: 'pointer' }}
                >
                  <ClipboardCheck className="w-3.5 h-3.5" /> Start New Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
