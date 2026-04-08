import type { TranslationMap } from '../index';

const sw: TranslationMap = {
  // ── App ──
  'app.name': 'Taban',
  'app.tagline': 'Rekodi za Afya za Kidijitali',

  // ── Navigation ──
  'nav.dashboard': 'Dashibodi',
  'nav.patients': 'Wagonjwa',
  'nav.consultation': 'Mashauriano',
  'nav.appointments': 'Miadi',
  'nav.referrals': 'Rufaa',
  'nav.lab': 'Matokeo ya Maabara',
  'nav.pharmacy': 'Duka la Dawa',
  'nav.immunizations': 'Chanjo',
  'nav.anc': 'Huduma ya Kabla ya Kujifungua',
  'nav.births': 'Usajili wa Kuzaliwa',
  'nav.deaths': 'Usajili wa Vifo',
  'nav.surveillance': 'Ufuatiliaji wa Magonjwa',
  'nav.hospitals': 'Hospitali',
  'nav.reports': 'Ripoti',
  'nav.messages': 'Ujumbe',
  'nav.settings': 'Mipangilio',
  'nav.telehealth': 'Afya kwa Simu',
  'nav.government': 'Serikali',

  // ── Common actions ──
  'action.save': 'Hifadhi',
  'action.cancel': 'Ghairi',
  'action.delete': 'Futa',
  'action.edit': 'Hariri',
  'action.search': 'Tafuta',
  'action.filter': 'Chuja',
  'action.export': 'Hamisha',
  'action.print': 'Chapisha',
  'action.back': 'Rudi',
  'action.next': 'Endelea',
  'action.submit': 'Wasilisha',
  'action.close': 'Funga',
  'action.confirm': 'Thibitisha',
  'action.addNote': 'Ongeza Maelezo',
  'action.newConsultation': 'Mashauriano Mapya',
  'action.sendMessage': 'Tuma Ujumbe',
  'action.refer': 'Rufaa',

  // ── Status ──
  'status.online': 'Mtandaoni',
  'status.offline': 'Nje ya Mtandao',
  'status.syncing': 'Inasawazisha',
  'status.loading': 'Inapakia...',
  'status.noData': 'Hakuna data inayopatikana',

  // ── Patient ──
  'patient.name': 'Jina la Mgonjwa',
  'patient.hospitalNumber': 'Nambari ya Hospitali',
  'patient.age': 'Umri',
  'patient.gender': 'Jinsia',
  'patient.male': 'Mwanaume',
  'patient.female': 'Mwanamke',
  'patient.phone': 'Simu',
  'patient.bloodType': 'Aina ya Damu',
  'patient.location': 'Mahali',
  'patient.tribe': 'Kabila',
  'patient.language': 'Lugha',
  'patient.registered': 'Amesajiliwa',
  'patient.facility': 'Kituo',
  'patient.nextOfKin': 'Ndugu wa Karibu',
  'patient.nokPhone': 'Simu ya Ndugu',
  'patient.allergies': 'Mzio',
  'patient.chronicConditions': 'Magonjwa Sugu',
  'patient.medications': 'Dawa za Sasa',
  'patient.demographics': 'Taarifa za Mgonjwa',
  'patient.noneKnown': 'Hakuna inayojulikana',
  'patient.notFound': 'Mgonjwa hajapatikana.',

  // ── Vitals ──
  'vitals.title': 'Ishara za Hivi Karibuni',
  'vitals.temperature': 'Joto',
  'vitals.bloodPressure': 'Shinikizo la Damu',
  'vitals.pulse': 'Mapigo',
  'vitals.respRate': 'Kiwango cha Kupumua',
  'vitals.spo2': 'SpO₂',
  'vitals.weight': 'Uzito',
  'vitals.height': 'Urefu',
  'vitals.bmi': 'BMI',

  // ── Encounters ──
  'encounters.recent': 'Ziara za Hivi Karibuni',
  'encounters.history': 'Historia Kamili ya Matibabu',
  'encounters.outpatient': 'Mgonjwa wa Nje',
  'encounters.inpatient': 'Mgonjwa wa Ndani',
  'encounters.emergency': 'Dharura',

  // ── Tabs ──
  'tab.overview': 'Muhtasari',
  'tab.medicalHistory': 'Historia ya Matibabu',
  'tab.vitals': 'Ishara Muhimu',
  'tab.labResults': 'Matokeo ya Maabara',
  'tab.prescriptions': 'Maagizo ya Dawa',
  'tab.referrals': 'Rufaa',

  // ── Auth / Session ──
  'auth.login': 'Ingia',
  'auth.logout': 'Toka',
  'auth.sessionLocked': 'Kikao Kimefungwa',
  'auth.enterPin': 'Weka PIN kufungua',
  'auth.switchUser': 'Badilisha Mtumiaji',
  'auth.autoLock': 'Imefungwa kiotomatiki baada ya kutokuwa hai',

  // ── Dates / Time ──
  'time.years': 'miaka',
  'time.months': 'miezi',
  'time.days': 'siku',
  'time.today': 'Leo',
  'time.yesterday': 'Jana',
};

export default sw;
