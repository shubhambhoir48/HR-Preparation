import { TargetCompany, UserProfile } from '@/types';

export const initialTargetCompanies: TargetCompany[] = [
  {
    id: 'comp_quloi',
    name: "Quloi Technologies",
    role: "HR Lead / Senior HR Generalist",
    web: "https://quloi.com",
    loc: "Pune Tech Hub & NYC HQ",
    social: "https://linkedin.com/company/quloi",
    type: "SaaS",
    jd: "Looking for a data-driven HR Lead for Quloi's Pune software engineering hub. Key responsibilities: Full-cycle tech recruitment (Node, React, Python, Logistics AI), maintaining candidate NPS (cNPS > +50), statutory compliance under Maharashtra Shops & Est 2017, EPF, ESIC, PT, POSH committee setup, monthly payroll processing, notice period recovery, leave encashment, FnF settlement within 48 hours, 30-day PIP implementation for developers, and alignment with NYC executive leadership."
  },
  {
    id: 'comp_techcorp',
    name: "TechCorp Global Services",
    role: "HR Manager - Business Partner (HRBP)",
    web: "https://techcorp-global.com",
    loc: "Bengaluru / Pune / Hyderabad",
    social: "https://linkedin.com/company/techcorp",
    type: "Enterprise",
    jd: "Seeking an experienced HRBP to manage employee lifecycle for 500+ software engineers in enterprise IT. Core requirements: Headhunting niche architects, campus recruitment drives, Workday HRIS management, Mercer compensation benchmarking, annual performance management cycles (KRAs/OKRs), POSH formal inquiry compliance, background check (BGV) via SpringVerify, employee retention, and enterprise offboarding SLAs."
  },
  {
    id: 'comp_swiftscale',
    name: "SwiftScale Fintech",
    role: "Head of People & Operations",
    web: "https://swiftscale-fintech.io",
    loc: "Mumbai / Bengaluru / Remote",
    social: "https://linkedin.com/company/swiftscale",
    type: "Startup",
    jd: "High-growth Series-B fintech startup looking for Head of People. Responsible for zero-to-one HR setup: Sourcing on Cutshort/Instahyre/LinkedIn Recruiter, employer branding on Glassdoor/LinkedIn, Keka / Razorpay Payroll setup, drafting startup offer letters with ESOP annexures, culture building, employee engagement, rapid onboarding, and lean statutory compliance."
  }
];

export const initialUserProfile: UserProfile = {
  name: "Priyanka Vartak",
  level: "Senior HR Lead / HRBP (6+ Yrs Exp)",
  linkedIn: "https://linkedin.com/in/priyanka-vartak-hr",
  resumeText: "Senior HR Lead & HRBP with 6+ years experience in tech software companies and startups in Pune. Proven expertise in full-cycle tech recruitment (Node, React, Python, AI), Cutshort, Instahyre, candidate NPS (cNPS > +50), statutory compliance under Maharashtra Shops & Est 2017, EPF, ESIC, PT, POSH committee setup, monthly payroll processing, notice period recovery, leave encashment, FnF settlement within 48 hours, and 30-day PIP implementation."
};
