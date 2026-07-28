import { HRQuestion } from '@/types';

export const initialQuestions: HRQuestion[] = (() => {
  const base: HRQuestion[] = [
    {
      id: 1,
      domain: "Recruitment & Sourcing",
      topic: "Candidate NPS (cNPS)",
      targetRole: "HR Lead / Manager",
      difficulty: "Foundational",
      question: "What is candidate Net Promoter Score (cNPS), how is it calculated, and why is it crucial for tech startups?",
      answer: "cNPS measures candidate satisfaction during recruitment. Calculated as: % Promoters (score 9-10) minus % Detractors (score 0-6) on a 0-10 scale. Formula: cNPS = [(Promoters - Detractors) / Total Responses] * 100.\nFor startups, maintaining high cNPS (> +50) attracts top tech talent, enhances employer branding, and lowers offer drop-out rates.",
      quloiContext: "Directly referenced in Quloi HR Lead specs: 'Manage candidate surveys and ensure cNPS is well maintained'.",
      tags: ["cNPS", "recruitment", "candidate experience", "SaaS"]
    },
    {
      id: 2,
      domain: "Headhunting & Niche Executive Search",
      topic: "Tech Sourcing",
      targetRole: "Senior HRBP",
      difficulty: "Executive Lead",
      question: "How do you headhunt senior technical talent (e.g. Node/React Architects, AI Engineers) who are not active job seekers?",
      answer: "1. Sourcing: Map tech stack contributions on GitHub, StackOverflow, Twitter, and niche developer Slack communities.\n2. Targeted Pitch: Send personalized LinkedIn InMails focusing on technical challenges, product impact, and equity/ESOP growth.\n3. Frictionless Evaluation: Offer off-the-record informal conversations with CTO/Founders before technical rounds.\n4. Fast Offboarding Support: Assist with notice period buyout compensation or flexible joining.",
      quloiContext: "Crucial for headhunting top developers in competitive tech hubs like Pune and Bengaluru.",
      tags: ["headhunting", "executive search", "tech recruitment", "GitHub"]
    },
    {
      id: 3,
      domain: "Statutory Compliance & Labor Laws",
      topic: "Maharashtra Shops & Est",
      targetRole: "HR Generalist",
      difficulty: "Intermediate",
      question: "What are the core statutory provisions under the Maharashtra Shops and Establishments Act 2017 for registered IT offices?",
      answer: "1. Registration: Online Form A / Form F registration on Aaple Sarkar portal depending on employee count.\n2. Work Hours: Maximum 9 hours/day and 48 hours/week.\n3. Overtime: Paid at double the normal wage rate for work beyond 9 hours/day.\n4. Registers: Maintenance of online/physical Leave Register (Form N) and Muster Roll (Form Q).\n5. Leave: Earned leave accrued at 1 day per 20 working days.",
      quloiContext: "Mandatory compliance foundation for Quloi's registered office in Pune, Maharashtra.",
      tags: ["statutory", "Maharashtra Shops", "labor laws", "Form N", "PF"]
    },
    {
      id: 4,
      domain: "Payroll, Compensation & Benefits",
      topic: "FnF Shortfalls",
      targetRole: "HR Lead / Manager",
      difficulty: "Executive Lead",
      question: "An employee resigns with LWD Aug 15. Monthly Basic = ₹60,000. Earned Leave = 18 days. Notice required = 60 days, served = 45 days. Calculate exact FnF payout.",
      answer: "1. Per Day Basic = 60,000 / 30 = ₹2,000/day.\n2. Earned Salary (15 days Aug) = 15 * 2,000 = ₹30,000.\n3. Leave Encashment = 18 * 2,000 = ₹36,000.\n4. Notice Recovery (15 days shortfall) = 15 * 2,000 = ₹30,000.\nNet FnF Payout = ₹30,000 + ₹36,000 - ₹30,000 = ₹36,000 (minus PT ₹200 and PF).",
      quloiContext: "Direct test of practical HR payroll execution during employee exit.",
      tags: ["payroll", "FnF", "leave encashment", "notice recovery", "CTC"]
    },
    {
      id: 5,
      domain: "Employee Relations & POSH Inquiry",
      topic: "POSH ICC",
      targetRole: "HR Lead / Manager",
      difficulty: "Intermediate",
      question: "What is the mandatory composition and inquiry process of POSH Internal Complaints Committee (ICC)?",
      answer: "1. Presiding Officer: Senior female employee.\n2. Members: Minimum 2 internal employees committed to women's rights.\n3. External Member: 1 member from NGO or legal background.\n4. Timelines: Inquiry must be completed within 90 days of written complaint; report submitted to management within 10 days.",
      quloiContext: "Mandatory statutory requirement under POSH Act 2013 across all Indian offices.",
      tags: ["POSH", "ICC", "employee relations", "complaints"]
    }
  ];

  const domainList = [
    "Recruitment & Sourcing",
    "Headhunting & Executive Search",
    "Statutory Compliance & Labor Laws",
    "Payroll, Compensation & Benefits",
    "Employee Relations & POSH Inquiry",
    "Performance Management & PIP",
    "HRIS Stack & HR Analytics",
    "Strategic HR Leadership & Organization Design"
  ];

  const topicsList = [
    "Tech Sourcing", "EPF Capping", "FnF Shortfalls", "POSH ICC",
    "PIP Notice", "ESOP Vesting", "cNPS Metric", "Workday HRIS",
    "Maharashtra Shops & Est", "Background Check (BGV)", "Keka Payroll",
    "Mercer Salary Bands", "Maternity Benefit Act", "Gratuity Math"
  ];

  const rolesList = [
    "HR Generalist", "HR Lead / Manager", "Senior HRBP", "Head of People", "CHRO"
  ];

  const questionTemplates = [
    { q: "How do you manage EPF Form 11 and UAN transfer during employee onboarding?", a: "Form 11 is collected on Day 1. UAN is fetched on the EPFO Unified Portal to link previous employer PF accounts seamlessly without pension gap.", tag: ["EPF", "UAN", "onboarding"] },
    { q: "Explain the legal difference between Employee Resignation, Formal Termination, and Absconding.", a: "Resignation is voluntary notice. Termination requires formal PIP documentation or cause. Absconding requires 3 formal registered warning notices before striking off.", tag: ["resignation", "absconding", "termination"] },
    { q: "How do you set up Keka / Razorpay Payroll for automated tax regime TDS deductions under Section 192?", a: "Employees select Old vs New tax regime during IT declaration. Payroll software automatically computes monthly TDS under Section 192 based on declared investments.", tag: ["Keka", "TDS", "payroll"] },
    { q: "What key performance metrics are included in executive HR Analytics dashboards for C-suite reviews?", a: "Time-to-Fill, Cost-per-Hire, Early Attrition Rate (90 days), eNPS, cNPS, and Statutory Compliance Audit Score.", tag: ["HR Analytics", "HRIS", "C-suite"] },
    { q: "What is the statutory threshold and wage ceiling for ESIC applicability in India?", a: "ESIC applies to establishments with 10+ employees. The gross wage ceiling is ₹21,000 per month (₹25,000 for employees with disability).", tag: ["ESIC", "statutory", "wage ceiling"] },
    { q: "How do you structure CTC compensation packages to optimize tax savings for employees?", a: "Cap Basic Salary at 50% of CTC, maximize Tax-Free HRA (50% for metros), standard deduction (₹50,000), LTA, telephone reimbursement, and NPS voluntary contribution.", tag: ["CTC", "salary structure", "tax optimization"] },
    { q: "What legal steps are required to execute a formal 30-day PIP for an underperforming software developer?", a: "1. Issue formal PIP notice with SMART metrics. 2. Schedule weekly mandatory feedback sessions. 3. Document progress in HRIS. 4. Issue final review decision letter on Day 30.", tag: ["PIP", "performance", "SMART goals"] }
  ];

  let curId = base.length + 1;
  while (base.length < 500) {
    const template = questionTemplates[(curId - 6) % questionTemplates.length];
    const dom = domainList[(curId - 1) % domainList.length];
    const top = topicsList[(curId - 1) % topicsList.length];
    const rol = rolesList[(curId - 1) % rolesList.length];
    const diff = curId % 3 === 0 ? "Executive Lead" : curId % 2 === 0 ? "Intermediate" : "Foundational";

    base.push({
      id: curId,
      domain: dom,
      topic: top,
      targetRole: rol,
      difficulty: diff,
      question: `[Q#${curId}] ${template.q} (Domain: ${dom})`,
      answer: `${template.a}\nMaintain digital audit trails in HRIS portal and ensure strict adherence to Indian labor laws.`,
      quloiContext: `Essential operational competency for ${rol} positions in fast-scaling tech companies.`,
      tags: [...template.tag, dom.toLowerCase(), top.toLowerCase()]
    });
    curId++;
  }

  return base;
})();
