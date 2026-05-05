// ===================================================
// UNIVERSITY MATCHER - MATCHER.JS
// ===================================================


// ===== AUTO FILL APS FROM CALCULATOR =====
document.addEventListener('DOMContentLoaded', function() {
  const savedAPS = sessionStorage.getItem('userAPS');
  if (savedAPS && savedAPS > 0) {
    document.getElementById('filter-aps').value = savedAPS;
    document.querySelector('.filter-hint').textContent =
      `✅ Auto-filled from your calculator (APS: ${savedAPS})`;
  }
});


// ===== CORRECT APPLY URLS =====
const applyURLs = {
  UCT:            "https://uct.ac.za/",
  Wits:           "https://self-service.wits.ac.za/psc/csprodonl/UW_SELF_SERVICE/SA/c/VC_OA_LOGIN_MENU.VC_OA_LOGIN_FL.GBL?&",
  UP:             "https://www.up.ac.za/online-application",
  UJ:             "https://www.uj.ac.za/apply",
  SU:             "https://student.sun.ac.za/",
  UKZN:           "https://applications.ukzn.ac.za",
  UFS:            "https://apply.ufs.ac.za",
  NWU:            "https://applynow.nwu.ac.za/OnlineApplication",
  UWC:            "https://www.uwc.ac.za/apply",
  Rhodes:         "https://ross.ru.ac.za/",
  UNISA:          "https://www.unisa.ac.za/apply",
  NMU:            "https://www.mandela.ac.za/apply",
  UFH:            "https://www.ufh.ac.za/apply",
  WSU:            "https://www.wsu.ac.za/en/study-with-us/undergraduate-programmes/new-students/student-online-service-portal",
  UL:             "https://www.ul.ac.za/",
  UNIVEN:         "https://www.univen.ac.za/apply",
  UMP:            "https://www.ump.ac.za/apply",
  SPU:            "https://www.spu.ac.za/apply",
  SMU:            "https://www.smu.ac.za/apply",
  UniZulu:        "https://www.unizulu.ac.za/apply",
  TUT:            "https://www.tut.ac.za/study-at-tut/",
  CPUT:           "https://www.cput.ac.za/study-at-cput",
  DUT:            "https://onlineapps.dut.ac.za/psc/psoapprd/EMPLOYEE/SA/c/VC_OA_LOGIN_MENU.VC_OA_LOGIN_FL.GBL?&",
  VUT:            "https://www.vut.ac.za/apply",
  CUT:            "https://enroll.cut.ac.za/auth/",
  MUT:            "https://www.mut.ac.za/apply",
  "Varsity College": "https://www.varsitycollege.co.za/apply",
  "IIE Rosebank":    "https://www.rosebankcollege.co.za/apply",
  Stadio:            "https://www.stadio.ac.za/apply",
  Damelin:           "https://damelin.co.za/",
};


// ===== DEGREES DATABASE =====
const degrees = [

  // ══════════════════════════════
  // HEALTH SCIENCES
  // ══════════════════════════════
  { university:"UCT",   degree:"MBChB Medicine",         field:"health", minAPS:42, duration:"6 years", province:"western-cape",   type:"public", nsfas:"yes" },
  { university:"Wits",  degree:"MBBCh Medicine",         field:"health", minAPS:42, duration:"6 years", province:"gauteng",        type:"public", nsfas:"yes" },
  { university:"UP",    degree:"MBChB Medicine",         field:"health", minAPS:34, duration:"6 years", province:"gauteng",        type:"public", nsfas:"yes" },
  { university:"UKZN",  degree:"MBChB Medicine",         field:"health", minAPS:36, duration:"6 years", province:"kwazulu-natal",  type:"public", nsfas:"yes" },
  { university:"SMU",   degree:"MBChB Medicine",         field:"health", minAPS:30, duration:"6 years", province:"gauteng",        type:"public", nsfas:"yes" },
  { university:"UFS",   degree:"MBChB Medicine",         field:"health", minAPS:34, duration:"6 years", province:"free-state",     type:"public", nsfas:"yes" },
  { university:"UJ",    degree:"BSc Nursing",            field:"health", minAPS:28, duration:"4 years", province:"gauteng",        type:"public", nsfas:"yes" },
  { university:"UP",    degree:"BSc Nursing",            field:"health", minAPS:28, duration:"4 years", province:"gauteng",        type:"public", nsfas:"yes" },
  { university:"UKZN",  degree:"BSc Nursing",            field:"health", minAPS:26, duration:"4 years", province:"kwazulu-natal",  type:"public", nsfas:"yes" },
  { university:"UWC",   degree:"BSc Nursing",            field:"health", minAPS:25, duration:"4 years", province:"western-cape",   type:"public", nsfas:"yes" },
  { university:"Wits",  degree:"BSc Physiotherapy",      field:"health", minAPS:35, duration:"4 years", province:"gauteng",        type:"public", nsfas:"yes" },
  { university:"SU",    degree:"BPharm Pharmacy",        field:"health", minAPS:36, duration:"4 years", province:"western-cape",   type:"public", nsfas:"yes" },
  { university:"Rhodes",degree:"BSc Pharmacy",           field:"health", minAPS:30, duration:"4 years", province:"eastern-cape",   type:"public", nsfas:"yes" },
  { university:"NWU",   degree:"BSc Pharmacy",           field:"health", minAPS:30, duration:"4 years", province:"north-west",     type:"public", nsfas:"yes" },
  { university:"UFS",   degree:"BSc Dietetics",          field:"health", minAPS:30, duration:"4 years", province:"free-state",     type:"public", nsfas:"yes" },
  { university:"MUT",   degree:"ND Medical Imaging",     field:"health", minAPS:24, duration:"3 years", province:"kwazulu-natal",  type:"public", nsfas:"yes" },
  { university:"DUT",   degree:"ND Biomedical Technology",field:"health",minAPS:24, duration:"3 years", province:"kwazulu-natal",  type:"public", nsfas:"yes" },
  { university:"TUT",   degree:"BTech Radiography",      field:"health", minAPS:25, duration:"4 years", province:"gauteng",        type:"public", nsfas:"yes" },
  { university:"CPUT",  degree:"ND Environmental Health",field:"health", minAPS:24, duration:"3 years", province:"western-cape",   type:"public", nsfas:"yes" },

  // ══════════════════════════════
  // ENGINEERING & TECHNOLOGY
  // ══════════════════════════════
  { university:"UCT",   degree:"BSc Electrical Engineering",   field:"engineering", minAPS:37, duration:"4 years", province:"western-cape",  type:"public", nsfas:"yes" },
  { university:"UCT",   degree:"BSc Civil Engineering",        field:"engineering", minAPS:36, duration:"4 years", province:"western-cape",  type:"public", nsfas:"yes" },
  { university:"Wits",  degree:"BSc Civil Engineering",        field:"engineering", minAPS:35, duration:"4 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"Wits",  degree:"BSc Mechanical Engineering",   field:"engineering", minAPS:35, duration:"4 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"UP",    degree:"BEng Mechanical Engineering",  field:"engineering", minAPS:32, duration:"4 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"UP",    degree:"BEng Electrical Engineering",  field:"engineering", minAPS:32, duration:"4 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"UJ",    degree:"BEng Chemical Engineering",    field:"engineering", minAPS:30, duration:"4 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"UJ",    degree:"BEng Industrial Engineering",  field:"engineering", minAPS:28, duration:"4 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"UKZN",  degree:"BScEng Computer Engineering",  field:"engineering", minAPS:30, duration:"4 years", province:"kwazulu-natal", type:"public", nsfas:"yes" },
  { university:"SU",    degree:"BEng Civil Engineering",       field:"engineering", minAPS:34, duration:"4 years", province:"western-cape",  type:"public", nsfas:"yes" },
  { university:"NWU",   degree:"BEng Electrical Engineering",  field:"engineering", minAPS:30, duration:"4 years", province:"north-west",    type:"public", nsfas:"yes" },
  { university:"UFS",   degree:"BEng Mechanical Engineering",  field:"engineering", minAPS:30, duration:"4 years", province:"free-state",    type:"public", nsfas:"yes" },
  { university:"NMU",   degree:"BEng Mechatronic Engineering", field:"engineering", minAPS:28, duration:"4 years", province:"eastern-cape",  type:"public", nsfas:"yes" },
  { university:"TUT",   degree:"BTech Civil Engineering",      field:"engineering", minAPS:24, duration:"4 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"TUT",   degree:"BTech Electrical Engineering", field:"engineering", minAPS:24, duration:"4 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"CPUT",  degree:"BTech Mechanical Engineering", field:"engineering", minAPS:24, duration:"4 years", province:"western-cape",  type:"public", nsfas:"yes" },
  { university:"DUT",   degree:"BTech Chemical Engineering",   field:"engineering", minAPS:22, duration:"4 years", province:"kwazulu-natal", type:"public", nsfas:"yes" },
  { university:"VUT",   degree:"BTech Electrical Engineering", field:"engineering", minAPS:20, duration:"4 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"CUT",   degree:"BTech Civil Engineering",      field:"engineering", minAPS:20, duration:"4 years", province:"free-state",    type:"public", nsfas:"yes" },

  // ══════════════════════════════
  // COMMERCE & BUSINESS
  // ══════════════════════════════
  { university:"UCT",            degree:"BCom Accounting",          field:"commerce", minAPS:36, duration:"3 years", province:"western-cape",  type:"public",  nsfas:"yes" },
  { university:"UCT",            degree:"BBusSc Finance",           field:"commerce", minAPS:38, duration:"4 years", province:"western-cape",  type:"public",  nsfas:"yes" },
  { university:"Wits",           degree:"BCom Finance",             field:"commerce", minAPS:32, duration:"3 years", province:"gauteng",       type:"public",  nsfas:"yes" },
  { university:"Wits",           degree:"BCom Accounting",          field:"commerce", minAPS:34, duration:"3 years", province:"gauteng",       type:"public",  nsfas:"yes" },
  { university:"UP",             degree:"BCom Economics",           field:"commerce", minAPS:30, duration:"3 years", province:"gauteng",       type:"public",  nsfas:"yes" },
  { university:"UP",             degree:"BCom Accounting",          field:"commerce", minAPS:32, duration:"3 years", province:"gauteng",       type:"public",  nsfas:"yes" },
  { university:"UJ",             degree:"BCom Marketing",           field:"commerce", minAPS:28, duration:"3 years", province:"gauteng",       type:"public",  nsfas:"yes" },
  { university:"UJ",             degree:"BCom Accounting",          field:"commerce", minAPS:28, duration:"3 years", province:"gauteng",       type:"public",  nsfas:"yes" },
  { university:"SU",             degree:"BCom Accounting",          field:"commerce", minAPS:34, duration:"3 years", province:"western-cape",  type:"public",  nsfas:"yes" },
  { university:"NWU",            degree:"BCom Accounting",          field:"commerce", minAPS:28, duration:"3 years", province:"north-west",    type:"public",  nsfas:"yes" },
  { university:"UFS",            degree:"BCom Economics",           field:"commerce", minAPS:26, duration:"3 years", province:"free-state",    type:"public",  nsfas:"yes" },
  { university:"UKZN",           degree:"BCom Business Management", field:"commerce", minAPS:26, duration:"3 years", province:"kwazulu-natal", type:"public",  nsfas:"yes" },
  { university:"UWC",            degree:"BCom Accounting",          field:"commerce", minAPS:26, duration:"3 years", province:"western-cape",  type:"public",  nsfas:"yes" },
  { university:"Rhodes",         degree:"BCom Finance",             field:"commerce", minAPS:28, duration:"3 years", province:"eastern-cape",  type:"public",  nsfas:"yes" },
  { university:"UNISA",          degree:"BCom Accounting",          field:"commerce", minAPS:23, duration:"3 years", province:"gauteng",       type:"public",  nsfas:"yes" },
  { university:"TUT",            degree:"ND Financial Management",  field:"commerce", minAPS:20, duration:"3 years", province:"gauteng",       type:"public",  nsfas:"yes" },
  { university:"Varsity College",degree:"BCom Business Management", field:"commerce", minAPS:24, duration:"3 years", province:"gauteng",       type:"private", nsfas:"no"  },
  { university:"IIE Rosebank",   degree:"BCom Entrepreneurship",    field:"commerce", minAPS:22, duration:"3 years", province:"gauteng",       type:"private", nsfas:"no"  },
  { university:"Stadio",         degree:"BCom Marketing",           field:"commerce", minAPS:20, duration:"3 years", province:"gauteng",       type:"private", nsfas:"no"  },
  { university:"Damelin",        degree:"Higher Certificate Business",field:"commerce",minAPS:15,duration:"1 year",  province:"gauteng",       type:"private", nsfas:"no"  },

  // ══════════════════════════════
  // LAW
  // ══════════════════════════════
  { university:"UCT",    degree:"LLB Law",               field:"law", minAPS:36, duration:"4 years", province:"western-cape",  type:"public", nsfas:"yes" },
  { university:"Wits",   degree:"LLB Law",               field:"law", minAPS:34, duration:"4 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"UP",     degree:"LLB Law",               field:"law", minAPS:30, duration:"4 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"UJ",     degree:"LLB Law",               field:"law", minAPS:28, duration:"4 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"SU",     degree:"LLB Law",               field:"law", minAPS:34, duration:"4 years", province:"western-cape",  type:"public", nsfas:"yes" },
  { university:"UKZN",   degree:"LLB Law",               field:"law", minAPS:28, duration:"4 years", province:"kwazulu-natal", type:"public", nsfas:"yes" },
  { university:"UFS",    degree:"LLB Law",               field:"law", minAPS:26, duration:"4 years", province:"free-state",    type:"public", nsfas:"yes" },
  { university:"NWU",    degree:"LLB Law",               field:"law", minAPS:26, duration:"4 years", province:"north-west",    type:"public", nsfas:"yes" },
  { university:"UWC",    degree:"LLB Law",               field:"law", minAPS:26, duration:"4 years", province:"western-cape",  type:"public", nsfas:"yes" },
  { university:"Rhodes", degree:"LLB Law",               field:"law", minAPS:28, duration:"4 years", province:"eastern-cape",  type:"public", nsfas:"yes" },
  { university:"NMU",    degree:"LLB Law",               field:"law", minAPS:26, duration:"4 years", province:"eastern-cape",  type:"public", nsfas:"yes" },
  { university:"UL",     degree:"LLB Law",               field:"law", minAPS:24, duration:"4 years", province:"limpopo",       type:"public", nsfas:"yes" },
  { university:"UFH",    degree:"LLB Law",               field:"law", minAPS:24, duration:"4 years", province:"eastern-cape",  type:"public", nsfas:"yes" },
  { university:"UNISA",  degree:"LLB Law",               field:"law", minAPS:23, duration:"4 years", province:"gauteng",       type:"public", nsfas:"yes" },

  // ══════════════════════════════
  // EDUCATION & TEACHING
  // ══════════════════════════════
  { university:"UP",    degree:"BEd Foundation Phase",   field:"education", minAPS:28, duration:"4 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"UJ",    degree:"BEd Intermediate Phase", field:"education", minAPS:26, duration:"4 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"UKZN",  degree:"BEd Senior Phase",       field:"education", minAPS:26, duration:"4 years", province:"kwazulu-natal", type:"public", nsfas:"yes" },
  { university:"SU",    degree:"BEd Foundation Phase",   field:"education", minAPS:30, duration:"4 years", province:"western-cape",  type:"public", nsfas:"yes" },
  { university:"NWU",   degree:"BEd Foundation Phase",   field:"education", minAPS:24, duration:"4 years", province:"north-west",    type:"public", nsfas:"yes" },
  { university:"UFS",   degree:"BEd Foundation Phase",   field:"education", minAPS:24, duration:"4 years", province:"free-state",    type:"public", nsfas:"yes" },
  { university:"UWC",   degree:"BEd Senior Phase",       field:"education", minAPS:24, duration:"4 years", province:"western-cape",  type:"public", nsfas:"yes" },
  { university:"UL",    degree:"BEd Foundation Phase",   field:"education", minAPS:20, duration:"4 years", province:"limpopo",       type:"public", nsfas:"yes" },
  { university:"UFH",   degree:"BEd Foundation Phase",   field:"education", minAPS:20, duration:"4 years", province:"eastern-cape",  type:"public", nsfas:"yes" },
  { university:"WSU",   degree:"BEd Foundation Phase",   field:"education", minAPS:20, duration:"4 years", province:"eastern-cape",  type:"public", nsfas:"yes" },
  { university:"UNISA", degree:"BEd Foundation Phase",   field:"education", minAPS:23, duration:"4 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"UniZulu",degree:"BEd Senior Phase",      field:"education", minAPS:20, duration:"4 years", province:"kwazulu-natal", type:"public", nsfas:"yes" },

  // ══════════════════════════════
  // INFORMATION TECHNOLOGY
  // ══════════════════════════════
  { university:"UP",             degree:"BSc Computer Science",        field:"it", minAPS:30, duration:"3 years", province:"gauteng",       type:"public",  nsfas:"yes" },
  { university:"Wits",           degree:"BSc Information Systems",     field:"it", minAPS:28, duration:"3 years", province:"gauteng",       type:"public",  nsfas:"yes" },
  { university:"UCT",            degree:"BSc Computer Science",        field:"it", minAPS:36, duration:"3 years", province:"western-cape",  type:"public",  nsfas:"yes" },
  { university:"SU",             degree:"BSc Computer Science",        field:"it", minAPS:32, duration:"3 years", province:"western-cape",  type:"public",  nsfas:"yes" },
  { university:"UJ",             degree:"BSc Information Technology",  field:"it", minAPS:28, duration:"3 years", province:"gauteng",       type:"public",  nsfas:"yes" },
  { university:"NWU",            degree:"BSc Computer Science",        field:"it", minAPS:26, duration:"3 years", province:"north-west",    type:"public",  nsfas:"yes" },
  { university:"UFS",            degree:"BSc Computer Science",        field:"it", minAPS:26, duration:"3 years", province:"free-state",    type:"public",  nsfas:"yes" },
  { university:"UKZN",           degree:"BSc Computer Science",        field:"it", minAPS:26, duration:"3 years", province:"kwazulu-natal", type:"public",  nsfas:"yes" },
  { university:"Rhodes",         degree:"BSc Computer Science",        field:"it", minAPS:26, duration:"3 years", province:"eastern-cape",  type:"public",  nsfas:"yes" },
  { university:"UNISA",          degree:"BSc Computing",               field:"it", minAPS:23, duration:"3 years", province:"gauteng",       type:"public",  nsfas:"yes" },
  { university:"TUT",            degree:"BTech Information Technology",field:"it", minAPS:22, duration:"3 years", province:"gauteng",       type:"public",  nsfas:"yes" },
  { university:"CPUT",           degree:"BTech Information Technology",field:"it", minAPS:22, duration:"3 years", province:"western-cape",  type:"public",  nsfas:"yes" },
  { university:"DUT",            degree:"ND Information Technology",   field:"it", minAPS:20, duration:"3 years", province:"kwazulu-natal", type:"public",  nsfas:"yes" },
  { university:"VUT",            degree:"ND Information Technology",   field:"it", minAPS:18, duration:"3 years", province:"gauteng",       type:"public",  nsfas:"yes" },
  { university:"IIE Rosebank",   degree:"BSc Information Technology",  field:"it", minAPS:22, duration:"3 years", province:"gauteng",       type:"private", nsfas:"no"  },
  { university:"Varsity College",degree:"BSc Information Technology",  field:"it", minAPS:22, duration:"3 years", province:"gauteng",       type:"private", nsfas:"no"  },

  // ══════════════════════════════
  // NATURAL SCIENCES
  // ══════════════════════════════
  { university:"UCT",    degree:"BSc Mathematics & Statistics", field:"science", minAPS:36, duration:"3 years", province:"western-cape",  type:"public", nsfas:"yes" },
  { university:"UP",     degree:"BSc Biochemistry",             field:"science", minAPS:30, duration:"3 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"UKZN",   degree:"BSc Environmental Science",    field:"science", minAPS:28, duration:"3 years", province:"kwazulu-natal", type:"public", nsfas:"yes" },
  { university:"Wits",   degree:"BSc Physics",                  field:"science", minAPS:30, duration:"3 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"SU",     degree:"BSc Chemistry",                field:"science", minAPS:30, duration:"3 years", province:"western-cape",  type:"public", nsfas:"yes" },
  { university:"Rhodes", degree:"BSc Marine Biology",           field:"science", minAPS:28, duration:"3 years", province:"eastern-cape",  type:"public", nsfas:"yes" },
  { university:"NWU",    degree:"BSc Geology",                  field:"science", minAPS:26, duration:"3 years", province:"north-west",    type:"public", nsfas:"yes" },
  { university:"UFS",    degree:"BSc Microbiology",             field:"science", minAPS:26, duration:"3 years", province:"free-state",    type:"public", nsfas:"yes" },
  { university:"UL",     degree:"BSc Biological Sciences",      field:"science", minAPS:22, duration:"3 years", province:"limpopo",       type:"public", nsfas:"yes" },
  { university:"UNIVEN", degree:"BSc Biochemistry",             field:"science", minAPS:20, duration:"3 years", province:"limpopo",       type:"public", nsfas:"yes" },
  { university:"UNISA",  degree:"BSc Mathematics",              field:"science", minAPS:23, duration:"3 years", province:"gauteng",       type:"public", nsfas:"yes" },

  // ══════════════════════════════
  // HUMANITIES & SOCIAL SCIENCES
  // ══════════════════════════════
  { university:"UCT",    degree:"BA Social Work",           field:"humanities", minAPS:30, duration:"4 years", province:"western-cape",  type:"public", nsfas:"yes" },
  { university:"Wits",   degree:"BA Psychology",            field:"humanities", minAPS:28, duration:"3 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"UP",     degree:"BA Political Science",     field:"humanities", minAPS:26, duration:"3 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"UJ",     degree:"BA Social Work",           field:"humanities", minAPS:26, duration:"4 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"UKZN",   degree:"BA Psychology",            field:"humanities", minAPS:24, duration:"3 years", province:"kwazulu-natal", type:"public", nsfas:"yes" },
  { university:"UFS",    degree:"BA Communication",         field:"humanities", minAPS:24, duration:"3 years", province:"free-state",    type:"public", nsfas:"yes" },
  { university:"UWC",    degree:"BA Social Work",           field:"humanities", minAPS:22, duration:"4 years", province:"western-cape",  type:"public", nsfas:"yes" },
  { university:"NMU",    degree:"BA Media & Communication", field:"humanities", minAPS:22, duration:"3 years", province:"eastern-cape",  type:"public", nsfas:"yes" },
  { university:"Rhodes", degree:"BA Journalism",            field:"humanities", minAPS:28, duration:"3 years", province:"eastern-cape",  type:"public", nsfas:"yes" },
  { university:"UNISA",  degree:"BA Psychology",            field:"humanities", minAPS:23, duration:"3 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"WSU",    degree:"BA Social Work",           field:"humanities", minAPS:20, duration:"4 years", province:"eastern-cape",  type:"public", nsfas:"yes" },
  { university:"UFH",    degree:"BA Social Work",           field:"humanities", minAPS:20, duration:"4 years", province:"eastern-cape",  type:"public", nsfas:"yes" },
  { university:"UL",     degree:"BA Psychology",            field:"humanities", minAPS:20, duration:"3 years", province:"limpopo",       type:"public", nsfas:"yes" },

  // ══════════════════════════════
  // AGRICULTURE
  // ══════════════════════════════
  { university:"UP",     degree:"BSc Agriculture",          field:"agriculture", minAPS:28, duration:"4 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"SU",     degree:"BSc Agriculture",          field:"agriculture", minAPS:28, duration:"4 years", province:"western-cape",  type:"public", nsfas:"yes" },
  { university:"UFS",    degree:"BSc Agriculture",          field:"agriculture", minAPS:24, duration:"4 years", province:"free-state",    type:"public", nsfas:"yes" },
  { university:"NWU",    degree:"BSc Agriculture",          field:"agriculture", minAPS:22, duration:"4 years", province:"north-west",    type:"public", nsfas:"yes" },
  { university:"UKZN",   degree:"BSc Agriculture",          field:"agriculture", minAPS:24, duration:"4 years", province:"kwazulu-natal", type:"public", nsfas:"yes" },
  { university:"UFH",    degree:"BSc Agriculture",          field:"agriculture", minAPS:20, duration:"4 years", province:"eastern-cape",  type:"public", nsfas:"yes" },
  { university:"UL",     degree:"BSc Agriculture",          field:"agriculture", minAPS:20, duration:"4 years", province:"limpopo",       type:"public", nsfas:"yes" },
  { university:"WSU",    degree:"ND Agriculture",           field:"agriculture", minAPS:18, duration:"3 years", province:"eastern-cape",  type:"public", nsfas:"yes" },

  // ══════════════════════════════
  // ARTS & DESIGN
  // ══════════════════════════════
  { university:"UCT",    degree:"BA Fine Art",              field:"arts", minAPS:30, duration:"3 years", province:"western-cape",  type:"public", nsfas:"yes" },
  { university:"Wits",   degree:"BA Fine Arts",             field:"arts", minAPS:28, duration:"3 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"CPUT",   degree:"BTech Graphic Design",     field:"arts", minAPS:22, duration:"4 years", province:"western-cape",  type:"public", nsfas:"yes" },
  { university:"TUT",    degree:"BTech Visual Communication",field:"arts",minAPS:22, duration:"4 years", province:"gauteng",       type:"public", nsfas:"yes" },
  { university:"DUT",    degree:"BTech Graphic Design",     field:"arts", minAPS:20, duration:"4 years", province:"kwazulu-natal", type:"public", nsfas:"yes" },
  { university:"IIE Rosebank",degree:"BA Creative Brand Communication",field:"arts",minAPS:22,duration:"3 years",province:"gauteng",type:"private",nsfas:"no" },
  { university:"Stadio", degree:"BA Photography",           field:"arts", minAPS:18, duration:"3 years", province:"gauteng",       type:"private",nsfas:"no"  },

];


// ===== FIND DEGREES =====
function findDegrees() {
  const aps      = parseInt(document.getElementById('filter-aps').value);
  const province = document.getElementById('filter-province').value;
  const field    = document.getElementById('filter-field').value;
  const nsfas    = document.getElementById('filter-nsfas').value;
  const type     = document.getElementById('filter-type').value;

  if (isNaN(aps) || aps < 0) {
    alert('Please enter your APS score first.');
    return;
  }

  // Load saved subjects from calculator
  let userSubjects = [];
  try {
    userSubjects = JSON.parse(sessionStorage.getItem('userSubjects')) || [];
  } catch(e) {
    userSubjects = [];
  }

  // Check what the student has
  const hasMathsPure    = userSubjects.some(s => s.subject === 'mathematics');
  const hasMathsLit     = userSubjects.some(s => s.subject === 'maths-literacy');
  const hasTechMaths    = userSubjects.some(s => s.subject === 'technical-mathematics');
  const hasPhysics      = userSubjects.some(s => s.subject === 'physical-sciences');
  const hasLifeSciences = userSubjects.some(s => s.subject === 'life-sciences');
  const hasNoSubjects   = userSubjects.length === 0;

  // Filter degrees by APS and filters
  let results = degrees.filter(function(d) {
    return (
      aps >= d.minAPS &&
      (province === 'all' || d.province === province) &&
      (field    === 'all' || d.field    === field)    &&
      (nsfas    === 'all' || d.nsfas    === nsfas)    &&
      (type     === 'all' || d.type     === type)
    );
  });

  results.sort((a, b) => b.minAPS - a.minAPS);

  // Show results section
  document.getElementById('results-section').style.display = 'block';
  document.getElementById('results-section').scrollIntoView({
    behavior: 'smooth', block: 'start'
  });

  document.getElementById('results-title').textContent    = `Results for APS ${aps}`;
  document.getElementById('results-subtitle').textContent = `Showing degrees you qualify for based on your filters`;
  document.getElementById('results-count').textContent    = `${results.length} degree${results.length !== 1 ? 's' : ''} found`;

  // ── Build subject warnings ──
  buildSubjectWarnings(hasMathsLit, hasTechMaths, hasMathsPure, hasPhysics, hasNoSubjects);

  if (results.length === 0) {
    document.getElementById('results-table').style.display = 'none';
    document.getElementById('no-results').style.display    = 'block';
  } else {
    document.getElementById('results-table').style.display = 'table';
    document.getElementById('no-results').style.display    = 'none';
    renderResults(results, aps, hasMathsPure, hasTechMaths, hasPhysics, hasLifeSciences, hasNoSubjects);
  }
}


// ===== RENDER TABLE =====
function renderResults(results, userAPS, hasMathsPure, hasTechMaths, hasPhysics, hasLifeSciences, hasNoSubjects) {
  const tbody = document.getElementById('results-body');
  tbody.innerHTML = '';

  // Degrees that need pure maths
  const needsMaths = ['health', 'engineering', 'science', 'it'];

  // Degrees that need physical sciences
  const needsPhysics = ['engineering'];

  results.forEach(function(d) {
    const row = document.createElement('tr');
    const gap = userAPS - d.minAPS;

    // Check subject warnings for this specific degree
    let subjectWarning = '';

    if (!hasNoSubjects) {
      // Maths warning
      if (needsMaths.includes(d.field) && !hasMathsPure && !hasTechMaths) {
        subjectWarning += `
          <div class="degree-warning">
            ⚠️ Requires Pure Mathematics or Technical Mathematics
          </div>`;
      }

      // Physics warning for engineering
      if (needsPhysics.includes(d.field) && !hasPhysics) {
        subjectWarning += `
          <div class="degree-warning">
            ⚠️ Requires Physical Sciences
          </div>`;
      }

      // Medicine specific warning
      if (d.degree.includes('MBChB') || d.degree.includes('MBBCh')) {
        if (!hasMathsPure) {
          subjectWarning += `
            <div class="degree-warning">
              ⚠️ Medicine requires Pure Mathematics (not Maths Lit)
            </div>`;
        }
        if (!hasPhysics && !hasLifeSciences) {
          subjectWarning += `
            <div class="degree-warning">
              ⚠️ Medicine requires Physical Sciences or Life Sciences
            </div>`;
        }
      }
    }

    const uniBadge = d.type === 'private'
      ? `<span class="private-badge">Private</span>`
      : `<span class="public-badge">Public</span>`;

    const nsfasBadge = d.nsfas === 'yes'
      ? `<span class="nsfas-yes">✅ Yes</span>`
      : `<span class="nsfas-no">❌ No</span>`;

    const gapBadge = gap >= 5
      ? `<span class="gap-strong">${d.minAPS} ✅</span>`
      : `<span class="gap-close">${d.minAPS} ⚠️</span>`;

    const applyURL = applyURLs[d.university] || '#';

    // Add red border to row if there's a subject warning
    if (subjectWarning) {
      row.style.borderLeft = '4px solid #ef4444';
      row.style.background = '#fff9f9';
    }

    row.innerHTML = `
      <td><strong>${d.university}</strong><br/>${uniBadge}</td>
      <td>${d.degree}${subjectWarning}</td>
      <td>${formatField(d.field)}</td>
      <td>${gapBadge}</td>
      <td>${d.duration}</td>
      <td>${nsfasBadge}</td>
      <td>
        <a href="${applyURL}" target="_blank" class="apply-btn">Apply →</a>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// ===== FORMAT FIELD =====
function formatField(field) {
  const fields = {
    health:      '🏥 Health Sciences',
    engineering: '⚙️ Engineering',
    commerce:    '💼 Commerce',
    law:         '⚖️ Law',
    education:   '📚 Education',
    humanities:  '🌍 Humanities',
    science:     '🔬 Science',
    arts:        '🎨 Arts',
    agriculture: '🌱 Agriculture',
    it:          '💻 IT'
  };
  return fields[field] || field;
}

// ===== BUILD SUBJECT WARNING BANNER =====
function buildSubjectWarnings(hasMathsLit, hasTechMaths, hasMathsPure, hasPhysics, hasNoSubjects) {
  // Remove existing warning if any
  const existing = document.getElementById('subject-warning-banner');
  if (existing) existing.remove();

  // Don't show if no subjects saved
  if (hasNoSubjects) return;

  let warnings = [];

  if (hasMathsLit) {
    warnings.push(`
      <div class="warning-item">
        <strong>📐 You selected Mathematical Literacy</strong><br/>
        Maths Literacy does NOT qualify you for Medicine, Engineering, 
        BSc degrees, Pharmacy, or most IT degrees. 
        These degrees require Pure Mathematics.
        They are marked with ⚠️ in your results below.
      </div>
    `);
  }

  if (!hasPhysics) {
    warnings.push(`
      <div class="warning-item">
        <strong>🔬 No Physical Sciences detected</strong><br/>
        Engineering and some Health Science degrees require 
        Physical Sciences as a subject. 
        Rows marked ⚠️ below may not accept your application 
        without this subject.
      </div>
    `);
  }

  if (warnings.length === 0) return;

  // Build the banner
  const banner = document.createElement('div');
  banner.id = 'subject-warning-banner';
  banner.className = 'subject-warning-banner';
  banner.innerHTML = `
    <div class="warning-banner-header">
      🚨 Important Subject Requirements — Please Read Before Applying
    </div>
    ${warnings.join('')}
    <div class="warning-banner-footer">
      Your APS score qualifies you for these degrees, but subject requirements 
      are checked separately by each university. Always confirm on the 
      official university website before applying.
    </div>
  `;

  // Insert before the results table
  const resultsSection = document.getElementById('results-section');
  const tableWrap = resultsSection.querySelector('.results-table-wrap');
  resultsSection.insertBefore(banner, tableWrap);
}
// ===================================================
// NSFAS ELIGIBILITY CHECKER
// ===================================================

// Store selected options
const nsfasAnswers = {
  citizen: null,
  sassa: null,
  disability: null
};


// ===== HANDLE OPTION BUTTON CLICKS =====
function selectNsfasOption(button) {
  const question = button.dataset.question;
  const value = button.dataset.value;

  // Remove active from siblings
  const siblings = document.querySelectorAll(
    `[data-question="${question}"]`
  );
  siblings.forEach(btn => btn.classList.remove('nsfas-opt-active'));

  // Set active
  button.classList.add('nsfas-opt-active');
  nsfasAnswers[question] = value;
}


// ===== CHECK NSFAS ELIGIBILITY =====
function checkNSFAS() {
  const income    = document.getElementById('nsfas-income').value;
  const citizen   = nsfasAnswers.citizen;
  const sassa     = nsfasAnswers.sassa;
  const disability = nsfasAnswers.disability;

  // Validate
  if (!citizen || !income || !sassa || !disability) {
    alert('Please answer all questions before checking.');
    return;
  }

  let result = '';
  let icon = '';
  let title = '';
  let message = '';
  let steps = [];

  // ── NOT ELIGIBLE ──
  if (citizen === 'no') {
    result  = 'not-eligible';
    icon    = '❌';
    title   = 'Not Eligible for NSFAS';
    message = 'NSFAS funding is only available to South African citizens and permanent residents.';
    steps   = [
      'Look into international student bursaries',
      'Check if your country of origin has bilateral agreements with SA',
      'Contact your chosen university\'s financial aid office for alternatives'
    ];

  } else if (income === 'over-600k') {
    result  = 'not-eligible';
    icon    = '❌';
    title   = 'Not Eligible for NSFAS';
    message = 'Your household income exceeds the NSFAS threshold of R600,000 per year.';
    steps   = [
      'Look into merit bursaries from your chosen university',
      'Check corporate bursaries in your field of study',
      'Consider a student loan through Fundi or NSFAS private loans',
      'Visit our bursaries page for alternatives'
    ];

  // ── LIKELY ELIGIBLE ──
  } else if (
    income === 'under-120k' ||
    sassa  === 'yes' ||
    disability === 'yes'
  ) {
    result  = 'likely';
    icon    = '✅';
    title   = 'Very Likely Eligible for NSFAS!';
    message = 'Based on your answers you are very likely to qualify for NSFAS funding. NSFAS covers tuition, accommodation, meals and a living allowance.';
    steps   = [
      'Apply as early as possible — NSFAS opens around August/September each year',
      'Make sure you are accepted at a public university first',
      'Apply at nsfas.org.za — you will need your ID, matric results and proof of income',
      'You can apply while still in Grade 12 using your Grade 11 results'
    ];

    if (sassa === 'yes') {
      message += ' SASSA grant recipients are given priority by NSFAS.';
    }
    if (disability === 'yes') {
      message += ' Students with disabilities may qualify for additional allowances.';
    }

  // ── POSSIBLY ELIGIBLE ──
  } else if (income === '120k-250k' || income === '250k-350k') {
    result  = 'possible';
    icon    = '⚠️';
    title   = 'Possibly Eligible for NSFAS';
    message = 'Your household income falls within the NSFAS threshold. You may qualify for full or partial funding depending on your specific circumstances.';
    steps   = [
      'Apply for NSFAS anyway — a means test will determine your exact funding',
      'Apply early as applications are competitive',
      'Also apply for university-specific bursaries as a backup',
      'Gather proof of all household income before applying'
    ];

  // ── UNLIKELY ──
  } else if (income === '350k-600k') {
    result  = 'unlikely';
    icon    = '⚠️';
    title   = 'Unlikely to Qualify for NSFAS';
    message = 'Your household income is above the typical NSFAS threshold. You are unlikely to qualify for full NSFAS funding but may qualify for partial assistance.';
    steps   = [
      'Apply for merit bursaries at your chosen university',
      'Check the Funza Lushaka bursary if you want to study teaching',
      'Look into corporate bursaries — many companies fund students in their field',
      'Consider a Fundi or NSFAS student loan',
      'Visit our bursaries page for a full list of options'
    ];
  }

  // ── SHOW RESULT ──
  showNSFASResult(result, icon, title, message, steps);
}


// ===== SHOW NSFAS RESULT =====
function showNSFASResult(result, icon, title, message, steps) {
  const resultBox = document.getElementById('nsfas-result');
  const box       = document.getElementById('nsfas-result-box');
  const iconEl    = document.getElementById('nsfas-result-icon');
  const titleEl   = document.getElementById('nsfas-result-title');
  const messageEl = document.getElementById('nsfas-result-message');
  const stepsEl   = document.getElementById('nsfas-result-steps');

  resultBox.style.display = 'block';

  // Set color based on result
  box.className = 'nsfas-result-box nsfas-' + result;

  iconEl.textContent    = icon;
  titleEl.textContent   = title;
  messageEl.textContent = message;

  // Build steps list
  stepsEl.innerHTML = '';
  steps.forEach(function(step) {
    const li = document.createElement('li');
    li.textContent = step;
    stepsEl.appendChild(li);
  });

  // Scroll to result
  resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}


// ===== EMAIL SUBSCRIBE =====
function subscribeEmail() {
  const email = document.getElementById('email-input').value;

  if (!email || !email.includes('@')) {
    alert('Please enter a valid email address.');
    return;
  }

  // For now just show a thank you message
  // Later we connect this to MailerLite or ConvertKit
  const form = document.querySelector('.email-capture-form');
  form.innerHTML = `
    <div style="
      background: #f0fff4;
      border: 2px solid #86efac;
      border-radius: 10px;
      padding: 1rem;
      color: #16a34a;
      font-weight: 700;
      font-size: 0.9rem;
    ">
      ✅ You're on the list! We'll notify you when bursaries open.
    </div>
  `;
}