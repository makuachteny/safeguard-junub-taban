import type { TranslationMap } from '../index';

const en: TranslationMap = {
  // ── App ──
  'app.name': 'Taban',
  'app.tagline': 'Digital Health Records',

  // ── Navigation ──
  'nav.dashboard': 'Dashboard',
  'nav.patients': 'Patients',
  'nav.consultation': 'Consultation',
  'nav.appointments': 'Appointments',
  'nav.referrals': 'Referrals',
  'nav.lab': 'Lab Results',
  'nav.pharmacy': 'Pharmacy',
  'nav.immunizations': 'Immunizations',
  'nav.anc': 'Antenatal Care',
  'nav.births': 'Birth Registration',
  'nav.deaths': 'Death Registration',
  'nav.surveillance': 'Disease Surveillance',
  'nav.hospitals': 'Hospitals',
  'nav.reports': 'Reports',
  'nav.messages': 'Messages',
  'nav.settings': 'Settings',
  'nav.telehealth': 'Telehealth',
  'nav.government': 'Government',

  // ── Common actions ──
  'action.save': 'Save',
  'action.cancel': 'Cancel',
  'action.delete': 'Delete',
  'action.edit': 'Edit',
  'action.search': 'Search',
  'action.filter': 'Filter',
  'action.export': 'Export',
  'action.print': 'Print',
  'action.back': 'Back',
  'action.next': 'Next',
  'action.submit': 'Submit',
  'action.close': 'Close',
  'action.confirm': 'Confirm',
  'action.addNote': 'Add Note',
  'action.newConsultation': 'New Consultation',
  'action.sendMessage': 'Send Message',
  'action.refer': 'Refer',

  // ── Status ──
  'status.online': 'Online',
  'status.offline': 'Offline',
  'status.syncing': 'Syncing',
  'status.loading': 'Loading...',
  'status.noData': 'No data available',

  // ── Patient ──
  'patient.name': 'Patient Name',
  'patient.hospitalNumber': 'Hospital Number',
  'patient.age': 'Age',
  'patient.gender': 'Gender',
  'patient.male': 'Male',
  'patient.female': 'Female',
  'patient.phone': 'Phone',
  'patient.bloodType': 'Blood Type',
  'patient.location': 'Location',
  'patient.tribe': 'Tribe',
  'patient.language': 'Language',
  'patient.registered': 'Registered',
  'patient.facility': 'Facility',
  'patient.nextOfKin': 'Next of Kin',
  'patient.nokPhone': 'NOK Phone',
  'patient.allergies': 'Allergies',
  'patient.chronicConditions': 'Chronic Conditions',
  'patient.medications': 'Current Medications',
  'patient.demographics': 'Demographics',
  'patient.noneKnown': 'None known',
  'patient.notFound': 'Patient not found.',

  // ── Vitals ──
  'vitals.title': 'Latest Vital Signs',
  'vitals.temperature': 'Temperature',
  'vitals.bloodPressure': 'Blood Pressure',
  'vitals.pulse': 'Pulse',
  'vitals.respRate': 'Resp. Rate',
  'vitals.spo2': 'SpO₂',
  'vitals.weight': 'Weight',
  'vitals.height': 'Height',
  'vitals.bmi': 'BMI',

  // ── Encounters ──
  'encounters.recent': 'Recent Encounters',
  'encounters.history': 'Complete Medical History Timeline',
  'encounters.outpatient': 'Outpatient',
  'encounters.inpatient': 'Inpatient',
  'encounters.emergency': 'Emergency',

  // ── Tabs ──
  'tab.overview': 'Overview',
  'tab.medicalHistory': 'Medical History',
  'tab.vitals': 'Vitals',
  'tab.labResults': 'Lab Results',
  'tab.prescriptions': 'Prescriptions',
  'tab.referrals': 'Referrals',

  // ── Referrals ──
  'referral.title': 'Referral History',
  'referral.reason': 'Reason',
  'referral.notes': 'Clinical Notes',
  'referral.none': 'No referral history for this patient.',
  'referral.sent': 'Sent',
  'referral.received': 'Received',
  'referral.seen': 'Being Seen',
  'referral.completed': 'Completed',
  'referral.cancelled': 'Cancelled',

  // ── Lab ──
  'lab.title': 'Lab Results',
  'lab.testName': 'Test',
  'lab.result': 'Result',
  'lab.unit': 'Unit',
  'lab.reference': 'Reference',
  'lab.status': 'Status',
  'lab.normal': 'Normal',
  'lab.abnormal': 'Abnormal',
  'lab.critical': 'CRITICAL',

  // ── Auth / Session ──
  'auth.login': 'Log In',
  'auth.logout': 'Log Out',
  'auth.sessionLocked': 'Session Locked',
  'auth.enterPin': 'Enter PIN to unlock',
  'auth.switchUser': 'Switch User',
  'auth.autoLock': 'Auto-locked after inactivity',

  // ── Dates / Time ──
  'time.years': 'years',
  'time.months': 'months',
  'time.days': 'days',
  'time.today': 'Today',
  'time.yesterday': 'Yesterday',
};

export default en;
