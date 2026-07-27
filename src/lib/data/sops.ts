import { SOPPlaybook } from '@/types';

export const initialSOPs: SOPPlaybook[] = (() => {
  const base: SOPPlaybook[] = [
    {
      id: 1, cat: "Recruitment & Sourcing", title: "Tech Sourcing for Full-Stack Developers (React / Node / AI)",
      startupWay: "Cutshort, Instahyre, Hirist, LinkedIn Recruiter direct messaging. Direct WhatsApp outreach to developers.",
      enterpriseWay: "Greenhouse / Workday ATS, RPO recruitment agencies, LinkedIn Talent Hub, internal employee referral drives.",
      tools: ["Cutshort", "Instahyre", "LinkedIn Recruiter", "Greenhouse", "Workday"],
      steps: [
        "1. Analyze JD & map required tech stack (e.g. React, Node.js, AWS, Postgres).",
        "2. Search on Cutshort & Instahyre filtering for notice period < 30 days.",
        "3. Send personalized InMail emphasizing tech stack & growth vision.",
        "4. Conduct 15-minute phone screening for salary expectation & notice period.",
        "5. Schedule 2-round technical evaluation + culture fit round within 48 hours."
      ]
    },
    {
      id: 2, cat: "Recruitment & Sourcing", title: "Candidate Net Promoter Score (cNPS) Monitoring Workflow",
      startupWay: "Google Forms / Typeform sent automatically 24 hrs post-interview. Slack alerts for negative feedback.",
      enterpriseWay: "Qualtrics / Workday Candidate Experience Survey integrated into ATS workflow.",
      tools: ["Typeform", "Qualtrics", "Slack", "Greenhouse"],
      steps: [
        "1. Send candidate survey link 24 hours post-interview (0-10 scale).",
        "2. Calculate cNPS = % Promoters (9-10) minus % Detractors (0-6).",
        "3. Immediately call any candidate scoring below 6 to gather feedback.",
        "4. Enforce 24-hr interviewer feedback SLA on hiring managers."
      ]
    },
    {
      id: 3, cat: "Recruitment & Sourcing", title: "Offer Acceptance & Pre-boarding Engagement System",
      startupWay: "Welcome mentor pairing, weekly founder/lead coffee chat, tech reading list, welcome swags.",
      enterpriseWay: "Automated Workday onboarding portal, digital document signing via DocuSign, IT asset provisioning portal.",
      tools: ["DocuSign", "Workday", "Slack", "Notion"],
      steps: [
        "1. Release formal offer letter with detailed CTC breakup annexure.",
        "2. Send weekly touchpoints (Day 3: Team introduction, Day 7: Product brief, Day 14: Swag box).",
        "3. Conduct pre-boarding cNPS pulse check on Day 10 post-offer.",
        "4. Re-verify last working day with current employer to prevent last-minute offer dropouts."
      ]
    }
  ];

  const categories = [
    "Recruitment & Sourcing", "Headhunting & Niche Executive Search",
    "Onboarding & Pre-boarding", "Statutory & Labor Law Compliance",
    "Payroll, CTC & FnF Offboarding", "Performance Management & PIP",
    "Employee Relations & POSH Inquiry", "HRIS Stack & HR Analytics"
  ];

  const templateScenarios = [
    { title: "Background Verification (BGV) & Criminal Checks", tools: ["SpringVerify", "AuthBridge", "Workday"], desc: "Verifying educational degrees, employment history, address verification, and court record checks." },
    { title: "Employee Exit Interview & Attrition Root Cause Analysis", tools: ["Typeform", "Excel", "Keka"], desc: "Conducting structured exit interviews and analyzing voluntary attrition trends." },
    { title: "Compensation Benchmarking & Banding Framework", tools: ["Mercer", "Aon Hewitt", "Keka"], desc: "Establishing competitive salary bands based on market benchmarking data." },
    { title: "Remote Employee IT Asset Tracking & Recovery", tools: ["MobiControl", "Razorpay Payroll", "Slack"], desc: "Managing laptop logistics, MDM software lock, and asset recovery during exit." },
    { title: "Gratuity Fund Calculation & Trust Management", tools: ["LIC Gratuity Trust", "Excel", "Keka"], desc: "Calculating 15 days basic salary per year of service for employees completing 5 years." },
    { title: "Maharashtra Shops & Establishment Online Form N Filing", tools: ["Aaple Sarkar", "Excel", "Keka"], desc: "Maintaining digital leave registers and annual statutory return filings under Shop Act." },
    { title: "EPF UAN Generation & Member Transfer Automation", tools: ["EPFO Portal", "Keka", "Workday"], desc: "Filing EPFO Form 11 and executing online UAN transfer requests." },
    { title: "ESIC Contribution Calculation & E-Challan Generation", tools: ["ESIC Portal", "Razorpay Payroll", "Excel"], desc: "Calculating 3.25% employer and 0.75% employee contribution for wages under ₹21,000." },
    { title: "POSH ICC Annual Report Statutory Filing", tools: ["District Officer Portal", "PDF", "Word"], desc: "Filing mandatory annual POSH inquiry summary to the District Officer." },
    { title: "30-Day PIP Goal Setting & Bi-Weekly Review Cadence", tools: ["Jira", "Notion", "Google Meet"], desc: "Structuring SMART goals and objective technical review benchmarks." }
  ];

  let curId = base.length + 1;
  while (base.length < 52) {
    const sc = templateScenarios[base.length % templateScenarios.length];
    const cat = categories[base.length % categories.length];

    base.push({
      id: curId,
      cat: cat,
      title: `SOP #${curId}: ${sc.title}`,
      startupWay: `Agile, lean software tools (${sc.tools[0]}, ${sc.tools[1]}), fast execution within 24-48 hours.`,
      enterpriseWay: `Enterprise multi-tier approval, structured compliance SLAs (${sc.tools[2] || 'Workday'}).`,
      tools: sc.tools,
      steps: [
        `1. Initiate ${sc.title} workflow as per company SOP guidelines.`,
        `2. Collect required documentation and verify accuracy.`,
        `3. Execute step using modern HR tools (${sc.tools.join(', ')}).`,
        `4. Record digital audit log in HRIS for statutory and leadership review.`
      ]
    });
    curId++;
  }

  return base;
})();
