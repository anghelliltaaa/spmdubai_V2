export type Locale = 'en' | 'ar';

export interface Translations {
  // Navigation
  nav_legacy: string;
  nav_commitment: string;
  nav_caseStudies: string;
  nav_calculator: string;
  nav_contact: string;
  nav_consult: string;
  nav_philippine_hub: string;

  // Hero
  hero_location: string;
  hero_heading1: string;
  hero_heading2: string;
  hero_sub: string;
  hero_cta_cases: string;
  hero_cta_consult: string;
  hero_scroll: string;

  // Stats
  stat_recovered: string;
  stat_rate: string;
  stat_violations: string;
  stat_gulf: string;

  // Timeline
  timeline_eyebrow: string;
  timeline_title: string;
  timeline_sub: string;
  // Timeline items
  tl_2004_title: string; tl_2004_desc: string;
  tl_2007_title: string; tl_2007_desc: string;
  tl_2010_title: string; tl_2010_desc: string;
  tl_2013_title: string; tl_2013_desc: string;
  tl_2016_title: string; tl_2016_desc: string;
  tl_2018_title: string; tl_2018_desc: string;
  tl_2021_title: string; tl_2021_desc: string;
  tl_2023_title: string; tl_2023_desc: string;
  tl_2024_title: string; tl_2024_desc: string;
  tl_2025_title: string; tl_2025_desc: string;
  tl_2026_title: string; tl_2026_desc: string;

  // Case Studies
  cs_eyebrow: string;
  cs_title: string;
  cs_sub: string;
  cs_challenge: string;
  cs_results: string;
  cs_request_brief: string;

  // Dubai Proof Point
  proof_eyebrow: string;
  proof_title: string;
  proof_sub: string;
  proof_val_recovered: string;
  proof_lbl_recovered: string;
  proof_det_recovered: string;
  proof_val_rate: string;
  proof_lbl_rate: string;
  proof_det_rate: string;
  proof_val_countries: string;
  proof_lbl_countries: string;
  proof_det_countries: string;
  proof_val_violations: string;
  proof_lbl_violations: string;
  proof_det_violations: string;
  proof_val_professionals: string;
  proof_lbl_professionals: string;
  proof_det_professionals: string;
  proof_val_years: string;
  proof_lbl_years: string;
  proof_det_years: string;

  // Philippine Advantage
  adv_eyebrow: string;
  adv_title: string;
  adv_sub: string;
  adv_p1_sub: string;
  adv_p1_title: string;
  adv_p1_desc: string;
  adv_p1_pt1: string;
  adv_p1_pt2: string;
  adv_p1_pt3: string;
  adv_p2_sub: string;
  adv_p2_title: string;
  adv_p2_desc: string;
  adv_p2_pt1: string;
  adv_p2_pt2: string;
  adv_p2_pt3: string;
  adv_p3_sub: string;
  adv_p3_title: string;
  adv_p3_desc: string;
  adv_p3_pt1: string;
  adv_p3_pt2: string;
  adv_p3_pt3: string;

  // Aspin Tower
  aspin_eyebrow: string;
  aspin_title: string;
  aspin_sub: string;
  aspin_floor_val: string;
  aspin_floor_lbl: string;
  aspin_district_val: string;
  aspin_district_lbl: string;
  aspin_height_val: string;
  aspin_height_lbl: string;
  aspin_year_val: string;
  aspin_year_lbl: string;
  aspin_why_label: string;
  aspin_p1: string;
  aspin_p2: string;
  aspin_address: string;

  // Recovery Calculator
  calc_eyebrow: string;
  calc_title: string;
  calc_sub: string;
  calc_portfolio_lbl: string;
  calc_dpd_lbl: string;
  calc_sector_lbl: string;
  calc_calculate: string;
  calc_empty: string;
  calc_disclaimer: string;
  calc_projection_lbl: string;
  calc_recovery_of: string;
  calc_recovery_rate: string;
  calc_timeline: string;
  calc_roi: string;
  calc_portfolio_bar: string;
  calc_full_assessment: string;

  // FinalCTA / Contact
  cta_title: string;
  cta_sub: string;
  cta_button: string;
  contact_eyebrow: string;
  contact_title: string;
  contact_sub: string;
  contact_name: string;
  contact_company: string;
  contact_email: string;
  contact_phone: string;
  contact_portfolio: string;
  contact_message: string;
  contact_message_placeholder: string;
  contact_submit: string;
  contact_submitting: string;
  contact_success_title: string;
  contact_success_sub: string;
  contact_privacy: string;
  contact_portfolio_placeholder: string;
  contact_portfolio_opt1: string;
  contact_portfolio_opt2: string;
  contact_portfolio_opt3: string;
  contact_portfolio_opt4: string;
  contact_portfolio_opt5: string;

  // Footer / CTA
  footer_tagline: string;
  footer_rights: string;

  // Visit the Office
  office_eyebrow: string;
  office_title: string;
  office_sub: string;

  // Meet the Team
  team_eyebrow: string;
  team_title: string;
  team_sub: string;
  team_ian_title: string;
  team_ian_exp: string;
  team_ian_bio: string;
  team_anita_title: string;
  team_anita_exp: string;
  team_anita_bio: string;
  team_mubarak_title: string;
  team_mubarak_exp: string;
  team_mubarak_bio: string;
  team_ivy_title: string;
  team_ivy_exp: string;
  team_ivy_bio: string;
}

export const en: Translations = {
  nav_legacy:      'Our Legacy',
  nav_commitment:  'Commitment',
  nav_caseStudies: 'Case Studies',
  nav_calculator:  'Calculator',
  nav_contact:     'Contact',
  nav_consult:     'Consult Us',
  nav_philippine_hub: 'Philippine Hub',

  hero_location:  'Dubai, UAE',
  hero_heading1:  'Twenty Years of Trust.',
  hero_heading2:  'Now in Dubai.',
  hero_sub:       'SPM Dubai delivers compliant, client-first receivables management that restores cash flow while protecting your brand — across the Gulf and beyond.',
  hero_cta_cases:   'View Case Studies',
  hero_cta_consult: 'Get a Consultation',
  hero_scroll:    'Scroll',

  stat_recovered: 'Recovered',
  stat_rate:      'Recovery Rate',
  stat_violations:'Violations',
  stat_gulf:      'Years Gulf',

  timeline_eyebrow: '20 Years of Excellence',
  timeline_title:   'From Philippines to United Arab Emirates',
  timeline_sub:     'A two-decade journey building the most trusted debt recovery operation in Southeast Asia — and now the UAE.',

  tl_2004_title: 'Founded in the Philippines',
  tl_2004_desc:  'S.P. Madrid established in Makati CBD with 12 professionals and a mission to redefine ethical collections in the Philippines.',
  tl_2007_title: 'First Bank Partnership',
  tl_2007_desc:  'Signed landmark agreement with a top-3 Philippine universal bank — managing PHP 2B+ receivables portfolio.',
  tl_2010_title: 'ISO 9001 Certification',
  tl_2010_desc:  'Achieved ISO 9001:2008 certification; first dedicated collections agency in the Philippines to do so.',
  tl_2013_title: '1,000 Professionals',
  tl_2013_desc:  'Workforce crosses 1,000 trained debt resolution specialists; operations span 17 provinces.',
  tl_2016_title: 'Technology Division Launch',
  tl_2016_desc:  'SPM Tech launched: AI-assisted debtor scoring and real-time portfolio dashboards deployed across all clients.',
  tl_2018_title: 'Regional Expansion',
  tl_2018_desc:  'First international engagement: cross-border enforcement partnerships established in Singapore and Hong Kong.',
  tl_2021_title: 'ISO 27001 Data Security',
  tl_2021_desc:  'Achieved ISO 27001 certification. Full data encryption and zero-breach record maintained to date.',
  tl_2023_title: 'DIFC License Granted',
  tl_2023_desc:  'Dubai International Financial Centre license approved. SPM Dubai office opens at Aspin Commercial Tower.',
  tl_2024_title: 'AED 2.1B+ Recovered',
  tl_2024_desc:  'Dubai portfolio exceeds AED 2.1B in total recoveries; 14-country cross-border enforcement network operational.',
  tl_2025_title: 'AI Recovery Platform',
  tl_2025_desc:  'SPM Insight AI platform launched — predictive debtor analysis reduces average collection time by 31% across UAE accounts.',
  tl_2026_title: 'GCC Regional HQ',
  tl_2026_desc:  'SPM Dubai designated as the regional headquarters for all GCC and North Africa operations. Bahrain and Saudi offices opened.',

  cs_eyebrow:      'Proven Results',
  cs_title:        'Client Success Stories',
  cs_sub:          'Real outcomes for real businesses — each recovery handled with integrity, compliance, and measurable impact.',
  cs_challenge:    'Challenge',
  cs_results:      'Results',
  cs_request_brief: 'Request a Case Study Brief',

  proof_eyebrow:          'By the Numbers',
  proof_title:            'Dubai Proof Point',
  proof_sub:              'Every metric is externally audited. Every figure is a promise kept.',
  proof_val_recovered:    'AED 2.1B+',
  proof_lbl_recovered:    'Total Recovered',
  proof_det_recovered:    'Dubai portfolio, since 2023',
  proof_val_rate:         '94%',
  proof_lbl_rate:         'Recovery Rate',
  proof_det_rate:         'Cross-sector average',
  proof_val_countries:    '14+',
  proof_lbl_countries:    'Countries Served',
  proof_det_countries:    'Simultaneous enforcement',
  proof_val_violations:   '0',
  proof_lbl_violations:   'Regulatory Violations',
  proof_det_violations:   'DIFC · CBUAE · TDRA',
  proof_val_professionals:'2,500+',
  proof_lbl_professionals:'Professionals',
  proof_det_professionals:'Manila + Dubai combined',
  proof_val_years:        '18+',
  proof_lbl_years:        'Years of Experience',
  proof_det_years:        'Founded 2004, Manila',

  adv_eyebrow: 'The Philippine Advantage',
  adv_title:   'Why Our Roots Make Us Stronger',
  adv_sub:     'Twenty years of excellence in Manila built the operational foundation that makes SPM Dubai the most capable recovery partner in the Gulf.',
  adv_p1_sub:   'Regional Expertise',
  adv_p1_title: 'The Human Engine',
  adv_p1_desc:  'Filipino legal professionals educated in both civil-law and common-law systems, fluent in Arabic, English, Tagalog and Spanish — uniquely equipped for Gulf cross-border disputes.',
  adv_p1_pt1:   '320+ bilingual attorneys across MENA and Asia',
  adv_p1_pt2:   'Average 9 years Gulf-region experience',
  adv_p1_pt3:   'Licensed in 6 jurisdictions simultaneously',
  adv_p2_sub:   'Operational Depth',
  adv_p2_title: 'The Back-Office Advantage',
  adv_p2_desc:  'Two decades of building enterprise-grade recovery infrastructure in Manila enables us to run operations at a scale and cost that no GCC-only firm can replicate.',
  adv_p2_pt1:   'ISO 9001 certified Manila operations hub',
  adv_p2_pt2:   '24 / 7 case tracking via client portal',
  adv_p2_pt3:   'AED cost savings passed to clients',
  adv_p3_sub:   'Cultural Bridge',
  adv_p3_title: 'East–West Fluency',
  adv_p3_desc:  "The Philippines has been the Gulf's workforce backbone for 40 years. That cultural proximity accelerates negotiations, prevents misunderstandings, and builds debtor trust faster.",
  adv_p3_pt1:   'Culturally aligned with GCC debtor profiles',
  adv_p3_pt2:   'Sharia-informed negotiation frameworks',
  adv_p3_pt3:   'Proven mediation success rate: 74%',

  aspin_eyebrow:      'Our Dubai Home',
  aspin_title:        'Aspin Commercial Tower',
  aspin_sub:          'Strategically located in the Dubai International Financial Centre — MENA\'s premier regulated financial hub.',
  aspin_floor_val:    '57F',
  aspin_floor_lbl:    'Floors',
  aspin_district_val: 'DIFC',
  aspin_district_lbl: 'District',
  aspin_height_val:   '249m',
  aspin_height_lbl:   'Height',
  aspin_year_val:     '2009',
  aspin_year_lbl:     'Completed',
  aspin_why_label:    'Why DIFC?',
  aspin_p1:           'The Dubai International Financial Centre operates under an independent common-law framework, regulated by the DFSA. Our DIFC location gives clients direct access to enforceable legal recourse across MENA, Asia, and Europe — critical for complex cross-border debt recovery.',
  aspin_p2:           'From the 30th floor of Aspin Tower, SPM Dubai oversees recovery operations spanning 14 countries — with court filings handled simultaneously across the UAE, Manila, and London.',
  aspin_address:      '104, Aspin Commercial Tower, Sheikh Zayed Road, Dubai',

  calc_eyebrow:          'Recovery Calculator',
  calc_title:            'Estimate Your Recovery',
  calc_sub:              'Get an indicative recovery projection in under 30 seconds. For a full portfolio assessment, speak to our team.',
  calc_portfolio_lbl:    'Portfolio Size (AED)',
  calc_dpd_lbl:          'Days Past Due (DPD)',
  calc_sector_lbl:       'Sector',
  calc_calculate:        'Calculate Recovery',
  calc_empty:            'Enter your portfolio details and click Calculate Recovery to see your indicative results.',
  calc_disclaimer:       '* Estimates are indicative only. Based on SPM Dubai historical recovery rates by sector and DPD bucket.',
  calc_projection_lbl:   'Indicative Projection',
  calc_recovery_of:      'estimated gross recovery',
  calc_recovery_rate:    'Recovery Rate',
  calc_timeline:         'Est. Timeline',
  calc_roi:              'Projected ROI',
  calc_portfolio_bar:    'Portfolio',
  calc_full_assessment:  'Get Full Portfolio Assessment',

  cta_title:  'Ready to recover what is yours?',
  cta_sub:    'Talk to our Dubai-based team today. No obligation.',
  cta_button: 'Start a Conversation',
  contact_eyebrow:              'Get in Touch',
  contact_title:                'Start Your Recovery Today',
  contact_sub:                  'Speak with a DIFC-licensed specialist. No obligation — just clarity on what\'s recoverable and how quickly.',
  contact_name:                 'Full Name *',
  contact_company:              'Company *',
  contact_email:                'Email *',
  contact_phone:                'Phone',
  contact_portfolio:            'Estimated Portfolio Size (AED) *',
  contact_message:              'Message (Optional)',
  contact_message_placeholder:  'Briefly describe your recovery challenge…',
  contact_submit:               'Request Consultation',
  contact_submitting:           'Sending…',
  contact_success_title:        'Message Received',
  contact_success_sub:          'Our Dubai team will respond within one business day. Thank you for reaching out.',
  contact_privacy:              'By submitting, you agree to our Privacy Policy. We will never share your information.',
  contact_portfolio_placeholder:'Select range…',
  contact_portfolio_opt1:       'Under AED 5M',
  contact_portfolio_opt2:       'AED 5M – 25M',
  contact_portfolio_opt3:       'AED 25M – 100M',
  contact_portfolio_opt4:       'AED 100M – 500M',
  contact_portfolio_opt5:       'AED 500M+',

  footer_tagline: 'Debt Recovery. Redefined.',
  footer_rights:  'All rights reserved.',

  office_eyebrow: 'Experience Our Space',
  office_title:   'Visit Us in Dubai',
  office_sub:     'Our DIFC office at Aspin Commercial Tower is where strategy meets execution. Come see where Gulf-wide recovery operations are managed.',

  team_eyebrow: 'The People Behind the Results',
  team_title:   'Meet the Team',
  team_sub:     'Our dedicated team consists of experts across legal, strategy and operations — each committed to driving results and protecting your interests.',
  team_ian_title:    'CEO, S.P. Madrid',
  team_ian_exp:      '15+ Years Experience',
  team_ian_bio:      "Visionary leader driving S.P. Madrid's recovery excellence across the GCC with over 15 years of strategic and operational expertise.",
  team_anita_title:  'Business Unit Director',
  team_anita_exp:    '16+ Years Experience',
  team_anita_bio:    'Leads business development and client partnerships with deep expertise in financial recovery and stakeholder relations.',
  team_mubarak_title:'Executive Director',
  team_mubarak_exp:  '20+ Years Experience',
  team_mubarak_bio:  'Oversees executive operations and strategic initiatives, ensuring seamless delivery across all recovery mandates.',
  team_ivy_title:    'Operations Manager',
  team_ivy_exp:      '15+ Years Experience',
  team_ivy_bio:      'Manages day-to-day operations and process optimization, ensuring efficiency and quality across all projects.',
};

export const ar: Translations = {
  nav_legacy:      'إرثنا',
  nav_commitment:  'التزامنا',
  nav_caseStudies: 'دراسات الحالة',
  nav_calculator:  'الحاسبة',
  nav_contact:     'تواصل',
  nav_consult:     'استشِرنا',
  nav_philippine_hub: 'المركز الفلبيني',

  hero_location:  'دبي، الإمارات',
  hero_heading1:  'عشرون عامًا من الثقة.',
  hero_heading2:  'الآن في دبي.',
  hero_sub:       'تقدّم SPM دبي إدارة المستحقات بالامتثال الكامل وأولوية العميل — لاسترداد التدفق النقدي وحماية علامتك التجارية في جميع أنحاء الخليج.',
  hero_cta_cases:   'اطّلع على دراسات الحالة',
  hero_cta_consult: 'احصل على استشارة',
  hero_scroll:    'انتقل',

  stat_recovered: 'تمّ استرداده',
  stat_rate:      'معدّل الاسترداد',
  stat_violations:'مخالفات',
  stat_gulf:      'سنوات في الخليج',

  timeline_eyebrow: '٢٠ عامًا من التميّز',
  timeline_title:   'من الفلبين إلى الإمارات العربية المتحدة',
  timeline_sub:     'رحلة عقدَين في بناء أكثر عمليات استرداد الديون ثقةً في جنوب شرق آسيا — والآن في الإمارات.',

  tl_2004_title: 'التأسيس في الفلبين',
  tl_2004_desc:  'تأسست S.P. Madrid في حي ماكاتي التجاري بـ 12 متخصصًا، بمهمة إعادة تعريف التحصيل الأخلاقي في الفلبين.',
  tl_2007_title: 'أول شراكة مصرفية',
  tl_2007_desc:  'توقيع اتفاقية تاريخية مع أحد أكبر ثلاثة بنوك شاملة في الفلبين — لإدارة محفظة مستحقات تتجاوز 2 مليار بيزو.',
  tl_2010_title: 'شهادة ISO 9001',
  tl_2010_desc:  'حصلت على شهادة ISO 9001:2008؛ أول وكالة تحصيل متخصصة في الفلبين تحقق ذلك.',
  tl_2013_title: '1,000 متخصص',
  tl_2013_desc:  'تجاوز عدد الكوادر 1,000 متخصص مدرَّب في حل الديون؛ تمتد العمليات عبر 17 مقاطعة.',
  tl_2016_title: 'إطلاق قسم التكنولوجيا',
  tl_2016_desc:  'إطلاق SPM Tech: نشر تقييم المدينين بالذكاء الاصطناعي ولوحات متابعة المحافظ الفورية لجميع العملاء.',
  tl_2018_title: 'التوسع الإقليمي',
  tl_2018_desc:  'أول انخراط دولي: إنشاء شراكات تنفيذ عابرة للحدود في سنغافورة وهونغ كونغ.',
  tl_2021_title: 'أمن البيانات ISO 27001',
  tl_2021_desc:  'الحصول على شهادة ISO 27001. تشفير كامل للبيانات وسجل خالٍ من الاختراقات حتى اليوم.',
  tl_2023_title: 'منح ترخيص DIFC',
  tl_2023_desc:  'الموافقة على ترخيص مركز دبي المالي العالمي. افتتاح مكتب SPM دبي في برج أسبين التجاري.',
  tl_2024_title: 'أكثر من 2.1 مليار درهم مستردّة',
  tl_2024_desc:  'تجاوزت محفظة دبي 2.1 مليار درهم في إجمالي الاستردادات؛ شبكة التنفيذ العابرة للحدود في 14 دولة تعمل بكامل طاقتها.',
  tl_2025_title: 'منصة الاسترداد بالذكاء الاصطناعي',
  tl_2025_desc:  'إطلاق منصة SPM Insight AI — يُقلّص التحليل التنبؤي للمدينين متوسط وقت التحصيل بنسبة 31% عبر حسابات الإمارات.',
  tl_2026_title: 'المقر الإقليمي لدول مجلس التعاون',
  tl_2026_desc:  'تعيين SPM دبي مقرًا إقليميًا لجميع عمليات دول مجلس التعاون الخليجي وشمال أفريقيا. افتتاح مكاتب البحرين والمملكة العربية السعودية.',

  cs_eyebrow:      'نتائج مُثبتة',
  cs_title:        'قصص نجاح العملاء',
  cs_sub:          'نتائج حقيقية لأعمال حقيقية — كل استرداد يُدار بنزاهة وامتثال وأثرٍ قابل للقياس.',
  cs_challenge:    'التحدي',
  cs_results:      'النتائج',
  cs_request_brief:'اطلب ملخص دراسة الحالة',

  proof_eyebrow:          'بالأرقام',
  proof_title:            'دليل نجاحنا في دبي',
  proof_sub:              'كل مقياس مُدقَّق خارجيًا. كل رقم وعدٌ وُفي به.',
  proof_val_recovered:    '+2.1B درهم',
  proof_lbl_recovered:    'إجمالي المستردّ',
  proof_det_recovered:    'محفظة دبي، منذ 2023',
  proof_val_rate:         '94%',
  proof_lbl_rate:         'معدّل الاسترداد',
  proof_det_rate:         'متوسط قطاعي شامل',
  proof_val_countries:    '+14',
  proof_lbl_countries:    'دولة مخدومة',
  proof_det_countries:    'تنفيذ متزامن',
  proof_val_violations:   '0',
  proof_lbl_violations:   'مخالفات تنظيمية',
  proof_det_violations:   'DIFC · CBUAE · TDRA',
  proof_val_professionals:'+2,500',
  proof_lbl_professionals:'متخصص',
  proof_det_professionals:'مانيلا ودبي مجتمعتين',
  proof_val_years:        '+18',
  proof_lbl_years:        'سنوات خبرة',
  proof_det_years:        'تأسست 2004، مانيلا',

  adv_eyebrow: 'الميزة الفلبينية',
  adv_title:   'لماذا تجعلنا جذورنا أقوى',
  adv_sub:     'عشرون عامًا من التميّز في مانيلا أرست الأساس التشغيلي الذي يجعل SPM دبي الشريك الأكثر كفاءةً في الاسترداد بمنطقة الخليج.',
  adv_p1_sub:   'خبرة إقليمية',
  adv_p1_title: 'المحرك البشري',
  adv_p1_desc:  'متخصصون قانونيون فلبينيون مؤهَّلون في أنظمة القانون المدني والقانون العام، يتحدثون العربية والإنجليزية والتاغالوغية والإسبانية — مجهَّزون تجهيزًا فريدًا للنزاعات العابرة للحدود في الخليج.',
  adv_p1_pt1:   '+320 محامٍ ثنائي اللغة عبر منطقة الشرق الأوسط وآسيا',
  adv_p1_pt2:   'متوسط 9 سنوات خبرة في منطقة الخليج',
  adv_p1_pt3:   'مرخَّصون في 6 اختصاصات قضائية في آن واحد',
  adv_p2_sub:   'عمق تشغيلي',
  adv_p2_title: 'ميزة العمل الخلفي',
  adv_p2_desc:  'عقدان من بناء البنية التحتية للاسترداد على مستوى المؤسسات في مانيلا يُمكّناننا من تشغيل عمليات بحجم وتكلفة لا يمكن لأي شركة مقتصرة على دول مجلس التعاون الخليجي تكرارها.',
  adv_p2_pt1:   'مركز عمليات مانيلا المعتمد وفق ISO 9001',
  adv_p2_pt2:   'تتبع القضايا على مدار الساعة عبر بوابة العميل',
  adv_p2_pt3:   'توفير بالدرهم يُحوَّل للعملاء',
  adv_p3_sub:   'جسر ثقافي',
  adv_p3_title: 'الطلاقة بين الشرق والغرب',
  adv_p3_desc:  'كانت الفلبين العمود الفقري للقوى العاملة في الخليج منذ 40 عامًا. هذا القرب الثقافي يُسرّع التفاوضات ويمنع سوء الفهم ويبني ثقة المدين بوتيرة أسرع.',
  adv_p3_pt1:   'متوافقون ثقافيًا مع ملفات المدينين في دول مجلس التعاون',
  adv_p3_pt2:   'أطر تفاوض مستنيرة بأحكام الشريعة الإسلامية',
  adv_p3_pt3:   'معدل نجاح الوساطة المُثبت: 74%',

  aspin_eyebrow:      'مقرّنا في دبي',
  aspin_title:        'برج أسبين التجاري',
  aspin_sub:          'يقع استراتيجيًا في مركز دبي المالي العالمي — المركز المالي المنظَّم الأول في منطقة الشرق الأوسط وشمال أفريقيا.',
  aspin_floor_val:    '57 طابق',
  aspin_floor_lbl:    'الطوابق',
  aspin_district_val: 'DIFC',
  aspin_district_lbl: 'الحي',
  aspin_height_val:   '249 م',
  aspin_height_lbl:   'الارتفاع',
  aspin_year_val:     '2009',
  aspin_year_lbl:     'سنة الافتتاح',
  aspin_why_label:    'لماذا DIFC؟',
  aspin_p1:           'يعمل مركز دبي المالي العالمي وفق إطار قانون عام مستقل تنظّمه هيئة خدمات دبي المالية. يمنح موقعنا في DIFC للعملاء وصولًا مباشرًا إلى سبل الانتصاف القانوني القابلة للتنفيذ عبر منطقة الشرق الأوسط وآسيا وأوروبا — وهو أمر بالغ الأهمية لاسترداد الديون العابر للحدود.',
  aspin_p2:           'من الطابق الثلاثين في برج أسبين، تشرف SPM دبي على عمليات استرداد تمتد عبر 14 دولة — مع تقديم المستندات القضائية في وقت واحد في الإمارات ومانيلا ولندن.',
  aspin_address:      '104، برج أسبين التجاري، شارع الشيخ زايد، دبي',

  calc_eyebrow:          'حاسبة الاسترداد',
  calc_title:            'احسب استردادك المتوقع',
  calc_sub:              'احصل على توقع استرداد استرشادي في أقل من 30 ثانية. للحصول على تقييم شامل للمحفظة، تحدّث مع فريقنا.',
  calc_portfolio_lbl:    'حجم المحفظة (بالدرهم)',
  calc_dpd_lbl:          'أيام التأخر في السداد',
  calc_sector_lbl:       'القطاع',
  calc_calculate:        'احسب الاسترداد',
  calc_empty:            'أدخل تفاصيل محفظتك واضغط على "احسب الاسترداد" لعرض النتائج الاسترشادية.',
  calc_disclaimer:       '* التقديرات استرشادية فقط. تستند إلى معدلات الاسترداد التاريخية لـ SPM دبي حسب القطاع وفئة التأخر.',
  calc_projection_lbl:   'توقع استرشادي',
  calc_recovery_of:      'إجمالي الاسترداد المتوقع',
  calc_recovery_rate:    'معدّل الاسترداد',
  calc_timeline:         'الجدول الزمني',
  calc_roi:              'العائد على الاستثمار',
  calc_portfolio_bar:    'المحفظة',
  calc_full_assessment:  'احصل على تقييم كامل للمحفظة',

  cta_title:  'هل أنت مستعد لاسترداد حقوقك؟',
  cta_sub:    'تحدّث مع فريقنا في دبي اليوم. بدون التزام.',
  cta_button: 'ابدأ محادثة',
  contact_eyebrow:              'تواصل معنا',
  contact_title:                'ابدأ استردادك اليوم',
  contact_sub:                  'تحدّث مع متخصص مرخَّص في DIFC. بلا التزام — فقط وضوح حول ما يمكن استرداده ومدى السرعة.',
  contact_name:                 'الاسم الكامل *',
  contact_company:              'الشركة *',
  contact_email:                'البريد الإلكتروني *',
  contact_phone:                'الهاتف',
  contact_portfolio:            'الحجم التقريبي للمحفظة (بالدرهم) *',
  contact_message:              'رسالة (اختياري)',
  contact_message_placeholder:  'صف باختصار تحديك في الاسترداد…',
  contact_submit:               'طلب استشارة',
  contact_submitting:           'جارٍ الإرسال…',
  contact_success_title:        'تمّ استلام رسالتك',
  contact_success_sub:          'سيردّ فريقنا في دبي خلال يوم عمل واحد. شكرًا لتواصلك معنا.',
  contact_privacy:              'بالإرسال، توافق على سياسة الخصوصية. لن نشارك معلوماتك أبدًا.',
  contact_portfolio_placeholder:'اختر نطاقًا…',
  contact_portfolio_opt1:       'أقل من 5 مليون درهم',
  contact_portfolio_opt2:       '5–25 مليون درهم',
  contact_portfolio_opt3:       '25–100 مليون درهم',
  contact_portfolio_opt4:       '100–500 مليون درهم',
  contact_portfolio_opt5:       '+500 مليون درهم',

  footer_tagline: 'استرداد الديون. بأسلوب مختلف.',
  footer_rights:  'جميع الحقوق محفوظة.',

  office_eyebrow: 'اكتشف مساحتنا',
  office_title:   'زُرنا في دبي',
  office_sub:     'مكتبنا في مركز دبي المالي العالمي بمبنى أسبين التجاري هو حيث تلتقي الاستراتيجية بالتنفيذ. تعرّف على المكان الذي تُدار منه عمليات الاسترداد في منطقة الخليج.',

  team_eyebrow: 'الأشخاص وراء النتائج',
  team_title:   'تعرّف على الفريق',
  team_sub:     'فريقنا المتخصص يضم خبراء في القانون والاستراتيجية والعمليات — كل منهم ملتزم بتحقيق النتائج وحماية مصالحك.',
  team_ian_title:    'الرئيس التنفيذي، S.P. Madrid',
  team_ian_exp:      'خبرة تزيد عن 15 عامًا',
  team_ian_bio:      'قائد رؤيوي يقود تميّز S.P. Madrid في الاسترداد عبر دول مجلس التعاون الخليجي بأكثر من 15 عامًا من الخبرة الاستراتيجية والتشغيلية.',
  team_anita_title:  'مديرة وحدة الأعمال',
  team_anita_exp:    'خبرة تزيد عن 16 عامًا',
  team_anita_bio:    'تقود تطوير الأعمال وشراكات العملاء بخبرة عميقة في الاسترداد المالي وإدارة علاقات أصحاب المصلحة.',
  team_mubarak_title:'المدير التنفيذي',
  team_mubarak_exp:  'خبرة تزيد عن 20 عامًا',
  team_mubarak_bio:  'يشرف على العمليات التنفيذية والمبادرات الاستراتيجية، مما يضمن التسليم السلس عبر جميع تفويضات الاسترداد.',
  team_ivy_title:    'مديرة العمليات',
  team_ivy_exp:      'خبرة تزيد عن 15 عامًا',
  team_ivy_bio:      'تدير العمليات اليومية وتحسين العمليات، مما يضمن الكفاءة والجودة في جميع المشاريع.',
};

export const locales: Record<Locale, Translations> = { en, ar };
