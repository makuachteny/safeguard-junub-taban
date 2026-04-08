import type { TranslationMap } from '../index';

const ar: TranslationMap = {
  // ── App ──
  'app.name': 'تبان',
  'app.tagline': 'السجلات الصحية الرقمية',

  // ── Navigation ──
  'nav.dashboard': 'لوحة المتابعة',
  'nav.patients': 'المرضى',
  'nav.consultation': 'الاستشارة',
  'nav.appointments': 'المواعيد',
  'nav.referrals': 'الإحالات',
  'nav.lab': 'نتائج المختبر',
  'nav.pharmacy': 'الصيدلية',
  'nav.immunizations': 'التطعيمات',
  'nav.anc': 'رعاية ما قبل الولادة',
  'nav.births': 'تسجيل المواليد',
  'nav.deaths': 'تسجيل الوفيات',
  'nav.surveillance': 'مراقبة الأمراض',
  'nav.hospitals': 'المستشفيات',
  'nav.reports': 'التقارير',
  'nav.messages': 'الرسائل',
  'nav.settings': 'الإعدادات',
  'nav.telehealth': 'الطب عن بعد',
  'nav.government': 'الحكومة',

  // ── Common actions ──
  'action.save': 'حفظ',
  'action.cancel': 'إلغاء',
  'action.delete': 'حذف',
  'action.edit': 'تعديل',
  'action.search': 'بحث',
  'action.filter': 'تصفية',
  'action.export': 'تصدير',
  'action.print': 'طباعة',
  'action.back': 'رجوع',
  'action.next': 'التالي',
  'action.submit': 'إرسال',
  'action.close': 'إغلاق',
  'action.confirm': 'تأكيد',
  'action.addNote': 'إضافة ملاحظة',
  'action.newConsultation': 'استشارة جديدة',
  'action.sendMessage': 'إرسال رسالة',
  'action.refer': 'إحالة',

  // ── Status ──
  'status.online': 'متصل',
  'status.offline': 'غير متصل',
  'status.syncing': 'جاري المزامنة',
  'status.loading': 'جاري التحميل...',
  'status.noData': 'لا توجد بيانات متاحة',

  // ── Patient ──
  'patient.name': 'اسم المريض',
  'patient.hospitalNumber': 'رقم المستشفى',
  'patient.age': 'العمر',
  'patient.gender': 'الجنس',
  'patient.male': 'ذكر',
  'patient.female': 'أنثى',
  'patient.phone': 'الهاتف',
  'patient.bloodType': 'فصيلة الدم',
  'patient.location': 'الموقع',
  'patient.tribe': 'القبيلة',
  'patient.language': 'اللغة',
  'patient.registered': 'مسجل',
  'patient.facility': 'المنشأة',
  'patient.nextOfKin': 'أقرب الأقارب',
  'patient.nokPhone': 'هاتف القريب',
  'patient.allergies': 'الحساسية',
  'patient.chronicConditions': 'الأمراض المزمنة',
  'patient.medications': 'الأدوية الحالية',
  'patient.demographics': 'البيانات الديموغرافية',
  'patient.noneKnown': 'لا يوجد معروف',
  'patient.notFound': 'المريض غير موجود.',

  // ── Vitals ──
  'vitals.title': 'آخر العلامات الحيوية',
  'vitals.temperature': 'الحرارة',
  'vitals.bloodPressure': 'ضغط الدم',
  'vitals.pulse': 'النبض',
  'vitals.respRate': 'معدل التنفس',
  'vitals.spo2': 'SpO₂',
  'vitals.weight': 'الوزن',
  'vitals.height': 'الطول',
  'vitals.bmi': 'مؤشر كتلة الجسم',

  // ── Encounters ──
  'encounters.recent': 'الزيارات الأخيرة',
  'encounters.history': 'السجل الطبي الكامل',
  'encounters.outpatient': 'عيادة خارجية',
  'encounters.inpatient': 'مريض داخلي',
  'encounters.emergency': 'طوارئ',

  // ── Tabs ──
  'tab.overview': 'نظرة عامة',
  'tab.medicalHistory': 'السجل الطبي',
  'tab.vitals': 'العلامات الحيوية',
  'tab.labResults': 'نتائج المختبر',
  'tab.prescriptions': 'الوصفات',
  'tab.referrals': 'الإحالات',

  // ── Auth / Session ──
  'auth.login': 'تسجيل الدخول',
  'auth.logout': 'تسجيل الخروج',
  'auth.sessionLocked': 'الجلسة مقفلة',
  'auth.enterPin': 'أدخل الرمز لفتح القفل',
  'auth.switchUser': 'تبديل المستخدم',
  'auth.autoLock': 'تم القفل تلقائياً بعد عدم النشاط',

  // ── Dates / Time ──
  'time.years': 'سنوات',
  'time.months': 'أشهر',
  'time.days': 'أيام',
  'time.today': 'اليوم',
  'time.yesterday': 'أمس',
};

export default ar;
