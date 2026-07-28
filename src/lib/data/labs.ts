import { HRLab } from '@/types';

export const initialLabs: HRLab[] = (() => {
  const base: HRLab[] = [
    {
      id: 1,
      category: "Payroll & Statutory",
      difficulty: "Intermediate",
      estimatedTime: "25 Mins",
      toolsRequired: ["Keka Payroll", "Excel Math", "EPF Portal"],
      projectOutcome: "Accurate FnF Payout & Statutory Audit Clearance",
      title: "Full & Final Settlement (FnF) Calculation with Shortfall Recovery",
      scenario: "An employee with Basic Salary ₹50,000/month resigns on Aug 12. Notice required: 60 days. Notice served: 40 days (shortfall 20 days). Earned Leave balance: 14 days.",
      task: "Calculate Earned Salary, Leave Encashment, Notice Recovery, and Net Payable FnF.",
      solution: "1. Daily Basic = ₹50,000 / 30 = ₹1,666.67\n2. Earned Salary (12 Days) = 12 * ₹1,666.67 = ₹20,000\n3. Leave Encashment (14 Days) = 14 * ₹1,666.67 = ₹23,333.33\n4. Notice Recovery (20 Days) = 20 * ₹1,666.67 = ₹33,333.33\nGross FnF = ₹20,000 + ₹23,333.33 - ₹33,333.33 = ₹10,000 Net Payable (before PT ₹200 deduction)."
    },
    {
      id: 2,
      category: "Policy & Drafts",
      difficulty: "Foundational",
      estimatedTime: "20 Mins",
      toolsRequired: ["Word (.docx)", "Workday PIP Portal"],
      projectOutcome: "Bulletproof Legal Notice & SMART Milestones",
      title: "30-Day Performance Improvement Plan (PIP) Formal Notice",
      scenario: "A Senior Developer working on UI components has missed 3 consecutive sprint deadlines.",
      task: "Draft a formal PIP notice with SMART goals, weekly evaluation milestones, and consequence clause.",
      solution: "PIP TEMPLATE:\nTo: [Employee Name]\nSubject: 30-Day Performance Improvement Plan (PIP)\nDuration: Aug 1 to Aug 30\nMilestone 1: Zero missed sprint tasks for UI modules.\nMilestone 2: 100% code unit test coverage approved by Tech Lead.\nReviews: Mandatory weekly check-in every Friday at 4 PM.\nConsequence: Failure to meet targets will lead to termination under company HR Policy."
    },
    {
      id: 3,
      category: "Payroll & Statutory",
      difficulty: "Intermediate",
      estimatedTime: "20 Mins",
      toolsRequired: ["EPFO Portal", "Payroll Matrix"],
      projectOutcome: "Statutory EPF Compliance Capping Audit",
      title: "EPF Statutory Ceiling & Employer Contribution Calculation",
      scenario: "An employee has a Gross Monthly CTC of ₹80,000 with Basic Salary ₹40,000/month.",
      task: "Calculate EPF contribution under statutory ceiling vs full basic contribution.",
      solution: "1. Under Statutory Ceiling (₹15,000 basic cap): Employer EPF = 12% of ₹15,000 = ₹1,800/month.\n2. Under Full Basic (₹40,000 basic): Employer EPF = 12% of ₹40,000 = ₹4,800/month.\n3. EPS Portion (8.33% capped at ₹1,250): EPS = ₹1,250, EPF balance = ₹550."
    },
    {
      id: 4,
      category: "Recruitment & Tech Sourcing",
      difficulty: "Foundational",
      estimatedTime: "15 Mins",
      toolsRequired: ["Cutshort", "Instahyre", "LinkedIn Recruiter"],
      projectOutcome: "Precision Boolean Search Filter String",
      title: "Cutshort Boolean Search String Construction for React/Node Stack",
      scenario: "Targeting a Senior Full-Stack Engineer in Pune with notice period < 30 days.",
      task: "Construct a Boolean search filter string for Cutshort / Instahyre.",
      solution: "BOOLEAN SEARCH STRING:\n(Node.js OR Nodejs OR Express) AND (React.js OR Reactjs) AND (PostgreSQL OR MongoDB) AND (Location: Pune OR Remote) AND (Notice: <= 30 Days) NOT (Agency OR Consultant)"
    },
    {
      id: 5,
      category: "Employee Relations & Offboarding",
      difficulty: "Executive Lead",
      estimatedTime: "40 Mins",
      toolsRequired: ["POSH Act 2013", "Legal Counsel"],
      projectOutcome: "Statutory 90-Day Inquiry Report & ICC Quorum",
      title: "POSH Internal Complaints Committee (ICC) 90-Day Inquiry Cadence",
      scenario: "A female developer files a written complaint alleging verbal harassment by her Project Lead.",
      task: "Formulate the 90-day inquiry timeline and mandatory committee composition.",
      solution: "1. Committee Quorum: Presiding Officer (Senior Woman), 2 Internal Members, 1 External NGO Member.\n2. Day 1-7: Notice to Respondent.\n3. Day 8-18: Respondent Reply.\n4. Day 19-80: Witness Interviews & Evidence.\n5. Day 81-90: Final Inquiry Report to Management."
    }
  ];

  const categories = [
    "Payroll & Statutory",
    "Policy & Drafts",
    "Strategy & Engagement",
    "Recruitment & Tech Sourcing",
    "Performance & PIP",
    "Employee Relations & Offboarding"
  ];

  const projectTemplates = [
    { title: "Statutory Gratuity Payout Calculation (Payment of Gratuity Act 1972)", cat: "Payroll & Statutory", diff: "Intermediate" as const, time: "20 Mins", tools: ["Excel", "Payroll HRIS"], outcome: "Gratuity Voucher", task: "Calculate gratuity for an employee with 7 years service and ₹60,000 last basic salary.", sol: "Gratuity = (15 * Last Basic * Tenure) / 26 = (15 * 60,000 * 7) / 26 = ₹2,42,307." },
    { title: "Maternity Benefit Act 2017 Compliance & Creche Provisioning", cat: "Policy & Drafts", diff: "Foundational" as const, time: "15 Mins", tools: ["Word (.docx)"], outcome: "Paid Leave Approval Letter", task: "Draft 26-week paid maternity leave approval letter and creche access agreement.", sol: "Grant 26 weeks paid leave under Maternity Benefit (Amendment) Act 2017 with full CTC continuity." },
    { title: "Campus Recruitment Drive SLA & Technical Screening Matrix", cat: "Recruitment & Tech Sourcing", diff: "Intermediate" as const, time: "30 Mins", tools: ["Greenhouse ATS"], outcome: "Screening Scorecard", task: "Design a 4-stage campus screening matrix for 300 engineering graduates.", sol: "Stage 1: Online Aptitude & Coding Test (Cutoff 75%). Stage 2: Tech Round 1. Stage 3: System Design. Stage 4: HR Round." },
    { title: "Employee Offboarding Asset Clearance & Laptop Recovery Checklist", cat: "Employee Relations & Offboarding", diff: "Foundational" as const, time: "15 Mins", tools: ["SpringVerify BGV", "IT Admin"], outcome: "Asset Recovery Clearance", task: "Formulate IT asset clearance workflow for remote developers.", sol: "1. IT remote lock on Day 30 at 6 PM. 2. Prepaid courier pickup scheduled for laptop & accessories within 48 hrs." },
    { title: "Workplace Warning Letter for Sexual Misconduct / Verbal Insolence", cat: "Policy & Drafts", diff: "Executive Lead" as const, time: "35 Mins", tools: ["Legal Counsel"], outcome: "Formal Show-Cause Notice", task: "Draft formal show-cause notice for Code of Conduct violation.", sol: "Issue formal show-cause notice citing Standing Orders violation with mandatory 48-hour response window." },
    { title: "Maharashtra Professional Tax (PT) Monthly & Annual Slab Audit", cat: "Payroll & Statutory", diff: "Intermediate" as const, time: "25 Mins", tools: ["Keka Payroll"], outcome: "PT Statutory Audit Clearance", task: "Audit monthly PT deductions for 200 employees in Pune office.", sol: "PT Slabs: Salary > ₹10,000: ₹200/mo for 11 months, ₹300 for Feb (Total ₹2,500/year)." },
    { title: "Background Verification (BGV) UAN Discrepancy Audit", cat: "Employee Relations & Offboarding", diff: "Executive Lead" as const, time: "30 Mins", tools: ["SpringVerify", "EPFO Portal"], outcome: "BGV Red Flag Resolution", task: "Audit dual employment PF contributions on UAN portal.", sol: "1. Issue Formal BGV Clarification Notice. 2. Request Form 16 and UAN Service History. 3. Red flag if unapproved dual employment confirmed." }
  ];

  let curId = base.length + 1;
  while (base.length < 100) {
    const tmpl = projectTemplates[(curId - 6) % projectTemplates.length];
    const cat = categories[(curId - 1) % categories.length];

    base.push({
      id: curId,
      category: cat,
      difficulty: tmpl.diff,
      estimatedTime: tmpl.time,
      toolsRequired: tmpl.tools,
      projectOutcome: tmpl.outcome,
      title: `Project #${curId}: ${tmpl.title}`,
      scenario: `Real-world HR operational project scenario executed in tech startup / enterprise MNC setting.`,
      task: tmpl.task,
      solution: `BENCHMARK PROJECT EXECUTION:\n${tmpl.sol}\n\nProject Execution Audit:\n1. Verify compliance guidelines under Indian labor laws.\n2. Complete approval workflow within SLA.\n3. Archive final output artifact in HRIS.`
    });
    curId++;
  }

  return base;
})();
