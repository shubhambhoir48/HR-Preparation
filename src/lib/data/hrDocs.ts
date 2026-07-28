export interface HRDocTemplate {
  id: string;
  title: string;
  category: 'Statutory & Compliance' | 'Onboarding & Offer' | 'Performance & PIP' | 'Offboarding & FnF' | 'Policies & Charters' | 'Employee Relations';
  actReference: string;
  filename: string;
  content: string;
}

export const mnc50DocTemplates: HRDocTemplate[] = [
  {
    id: 'doc_1',
    title: 'POSH Act 2013 Internal Complaints Committee (ICC) Policy Charter',
    category: 'Statutory & Compliance',
    actReference: 'The Sexual Harassment of Women at Workplace Act, 2013 (Section 4)',
    filename: 'POSH_Act_2013_ICC_Committee_Charter',
    content: `POLICY CHARTER: PREVENTION OF SEXUAL HARASSMENT (POSH) ACT, 2013
CONSTITUTION OF INTERNAL COMPLAINTS COMMITTEE (ICC)
Location / Branch: Technology Hub, Pune & Regional Indian Offices
Effective Date: April 1, 2026

1. POLICY STATEMENT & LEGAL MANDATE:
Our organization is strictly committed to providing a safe, secure, and dignified working environment for all employees, free from sexual harassment, discrimination, or intimidation. This policy charter is constituted in strict compliance with The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 ("POSH Act").

2. CONSTITUTION OF INTERNAL COMPLAINTS COMMITTEE (ICC):
Under Section 4 of the POSH Act, 2013, the Internal Complaints Committee (ICC) for the Pune Software Engineering Facility is hereby formally constituted with the following members:

   2.1. Presiding Officer:
        Name: Ms. Sunita Deshmukh (Senior Vice President - Operations)
        Role: Senior Woman Employee (Mandatory under Section 4(2)(a))

   2.2. Internal Committee Members:
        Member 1: Ms. Priyanka Vartak (Senior HR Lead / HRBP)
        Member 2: Mr. Rajesh Sharma (Lead Legal & Compliance Counsel)

   2.3. External Independent Member:
        Member 3: Ms. Ananya Roy (Advocate & POSH NGO Executive Member)
        Role: Independent External Expert (Mandatory under Section 4(2)(c))

3. JURISDICTION & DEFINITION OF SEXUAL HARASSMENT:
Under Section 2(n) of the POSH Act, sexual harassment includes any one or more of the following unwelcome acts or behavior (whether directly or by implication):
   (i) Physical contact and advances; or
   (ii) A demand or request for sexual favors; or
   (iii) Making sexually colored remarks; or
   (iv) Showing pornography; or
   (v) Any other unwelcome physical, verbal or non-verbal conduct of sexual nature.

4. COMPLAINT REDRESSAL PROCEDURE & STATUTORY TIMELINES:
   4.1. Submission of Complaint: Any aggrieved woman employee may submit a written complaint to the ICC via email at posh-icc@company.com within 3 months from the date of the incident (extendable by 3 months upon ICC justification).
   4.2. Conciliation: Prior to initiating a formal inquiry, the ICC may, at the request of the aggrieved woman, take steps to settle the matter between her and the respondent through conciliation, provided no monetary settlement shall be made as a basis of conciliation.
   4.3. Formal Inquiry SLA: Upon initiation of formal inquiry, the ICC shall complete inquiry proceedings within a mandatory limit of 90 days.
   4.4. Inquiry Report: The ICC shall submit its final inquiry report to Executive Management within 10 days of inquiry completion.

5. PENALTIES FOR MISCONDUCT & NON-COMPLIANCE:
Where the ICC arrives at the conclusion that the allegation against the respondent has been proved, it shall recommend action for misconduct in accordance with company service rules, which may include written warning, withholding of promotion, withholding of pay increment, or termination from service.

6. MANDATORY CONFIDENTIALITY UNDER SECTION 16:
The contents of the complaint, the identity and addresses of the aggrieved woman, respondent and witnesses, any information relating to conciliation and inquiry proceedings, recommendations of the ICC shall NOT be published, communicated or made known to the public, press and media in any manner. Any person violating confidentiality shall be liable for statutory penalties under Rule 12 of POSH Rules.

For & On Behalf of Management & Board of Directors,

___________________________________________
Managing Director & Chief Executive Officer
Company Legal Seal & Registration Stamp`
  },
  {
    id: 'doc_2',
    title: 'Formal 30-Day Performance Improvement Plan (PIP) Notice & SMART Agreement',
    category: 'Performance & PIP',
    actReference: 'Industrial Disputes Act, 1947 & Model Standing Orders Act',
    filename: 'MNC_30_Day_PIP_Formal_Notice_Agreement',
    content: `FORMAL 30-DAY PERFORMANCE IMPROVEMENT PLAN (PIP) AGREEMENT
Ref: HR/PIP/2026/089
Date: April 1, 2026

To: [Employee Full Name]
Employee ID: EMP-4092
Designation: Senior Software Engineer / HR Specialist
Department: Software Engineering & People Operations
Location: Technology Hub, Pune

SUBJECT: FORMAL NOTIFICATION OF 30-DAY PERFORMANCE IMPROVEMENT PLAN (PIP) INITIATION

Dear Employee,

This letter serves as formal written notification that your job performance has fallen below the operational standards and technical deliverables expected for your role at our Pune software hub. Over the preceding two quarterly evaluation cycles, specific performance deficiencies have been documented and discussed during your 1-on-1 performance reviews.

1. IDENTIFIED PERFORMANCE GAPS & OPERATIONAL METRICS:
   1.1. Sprint Milestone Delays: Failure to complete assigned sprint tickets within agreed timelines across 3 consecutive sprint cycles.
   1.2. Quality SLA & Defect Rates: Code review defect density exceeding acceptable team threshold (> 5.5% defect rate).
   1.3. SLA Responsiveness: Delayed response turnaround for production bug fixes beyond the mandatory 24-hour SLA.

2. 30-DAY PIP OBJECTIVES & SMART MILESTONE TARGETS:
   During this 30-day PIP period (Effective April 1, 2026 to April 30, 2026), you are required to achieve 100% compliance with the following SMART objectives:
   - Milestone 1 (Days 1 - 10): Achieve 100% on-time completion of all assigned sprint backlog items with zero SLA breaches.
   - Milestone 2 (Days 11 - 20): Achieve unit test coverage >= 85% with zero critical production bugs reported during code review.
   - Milestone 3 (Days 21 - 30): Complete mandatory statutory audit documentation and present process optimization matrix to Engineering Lead.

3. MANDATORY WEEKLY REVIEW CADENCE & COACHING SUPPORT:
   You will participate in mandatory 30-minute weekly review meetings every Friday at 4:00 PM with your Reporting Manager and HR Business Partner (Priyanka Vartak). The company will provide necessary operational tools, mentoring, and technical resources during this evaluation period.

4. PIP TIMELINE & FINAL EMPLOYMENT CONSEQUENCES:
   - PIP Duration: 30 Calendar Days (Commencing April 1, 2026 and concluding April 30, 2026).
   - Expected Outcome: Full attainment of all SMART milestones listed in Section 2 above.
   - Employment Impact Notice: Please take notice that if your performance does not demonstrate acceptable, sustained improvement by the end of the 30-day PIP period, your employment will be subject to termination under Section 25 of the Industrial Disputes framework and Company HR Regulations.

Please sign and return a copy of this PIP agreement to HR within 24 hours to confirm receipt.

Sincerely,

For & On Behalf of Management,

___________________________________________
Priyanka Vartak (Senior HR Lead / HRBP)
Company Stamp & Legal Seal

EMPLOYEE ACKNOWLEDGEMENT & RECEIPT:
I hereby acknowledge receipt of this PIP Notice and agree to the 30-day SMART milestones outlined above.

Signature: _______________________________ Date: ___________________`
  },
  {
    id: 'doc_3',
    title: 'MNC Tech Offer Letter CTC Breakup Annexure & 4-Year ESOP Agreement',
    category: 'Onboarding & Offer',
    actReference: 'EPF Act 1952, Income Tax Act 1961 (Section 192) & Companies Act 2013',
    filename: 'MNC_Tech_Offer_Letter_CTC_ESOP_Annexure',
    content: `EXECUTIVE EMPLOYMENT OFFER LETTER & STATUTORY CTC BREAKUP ANNEXURE
Ref: HR/OFFER/2026/1092
Date: April 1, 2026

Candidate Full Name: [Candidate Full Name]
Designation Offered: Senior Software Engineer / HR Lead
Department: Technology & Human Resources
Work Location: Pune Software Engineering Facility

Dear Candidate,

On behalf of Executive Leadership, we are pleased to offer you employment with our organization as Senior Software Engineer / HR Lead. Your Total Cost to Company (CTC) will be ₹18,00,000/- (Rupees Eighteen Lakhs Only) per annum.

ANNEXURE A: DETAILED STATUTORY SALARY BREAKUP (INR)

----------------------------------------------------------------------------------
Salary Component                     Monthly Amount (₹)     Annualized CTC (₹)
----------------------------------------------------------------------------------
1. Basic Salary (50% of CTC)        ₹75,000.00             ₹9,00,000.00
2. House Rent Allowance (HRA 50%)   ₹37,500.00             ₹4,50,000.00
3. Special Allowance                ₹35,700.00             ₹4,28,400.00
4. Employer EPF (Capped Ceiling)    ₹1,800.00              ₹21,600.00
----------------------------------------------------------------------------------
TOTAL GROSS CTC (PER ANNUM):        ₹1,50,000.00           ₹18,00,000.00
----------------------------------------------------------------------------------

STATUTORY DEDUCTIONS & RETIRAL BENEFITS:
- Employee Provident Fund (EPF): ₹1,800/month (Capped under EPF Scheme 1952).
- Professional Tax (PT): ₹200/month (As per Maharashtra State PT Act).
- Income Tax (TDS): Deducted monthly at source under Section 192 of Income Tax Act, 1961.
- Gratuity: Payable after 5 years of continuous service under Payment of Gratuity Act, 1972.

ANNEXURE B: EQUITY & ESOP ALLOCATION GRANT
- Option Grant: 2,500 Employee Stock Options (ESOPs) under Company Stock Option Plan.
- Vesting Schedule: 4-Year Vesting Schedule with 1-Year Cliff (25% vests on Month 12, balance 6.25% vests quarterly over remaining 36 months).

Please sign below to confirm your formal acceptance.

Sincerely,

___________________________________________
Priyanka Vartak (Senior HR Lead / HRBP)
Company Seal

Candidate Acceptance Signature: _______________________ Date: _________________`
  },
  {
    id: 'doc_4',
    title: 'Full & Final (FnF) Settlement Statement & No Dues Discharge Voucher',
    category: 'Offboarding & FnF',
    actReference: 'Payment of Wages Act 1936 & Payment of Gratuity Act 1972',
    filename: 'MNC_Full_And_Final_FnF_Settlement_Discharge_Voucher',
    content: `FULL & FINAL (FnF) SETTLEMENT STATEMENT & NO DUES DISCHARGE VOUCHER
Ref: HR/FNF/2026/3029
Date: April 1, 2026

Employee Name: [Employee Full Name]
Employee ID: EMP-8821
Designation: Senior Engineer / HR Specialist
Location: Pune Technology Hub
Last Working Day (LWD): April 15, 2026

1. EARNINGS & PAYOUT COMPONENTS:
   1.1. Earned Basic Salary (15 Days Worked in April): ₹37,500.00
   1.2. Leave Encashment Payout (18 Days Earned Leave Balance): ₹45,000.00
   1.3. Statutory Gratuity Payout (7 Years Service): ₹2,42,307.00
   -------------------------------------------------------------------------
   TOTAL GROSS EARNINGS: ₹3,24,807.00

2. DEDUCTIONS & RECOVERIES:
   2.1. Notice Period Shortfall Recovery (15 Days Shortfall): ₹37,500.00
   2.2. Professional Tax (PT Deduction): ₹200.00
   2.3. Income Tax (TDS Deduction): ₹0.00
   -------------------------------------------------------------------------
   TOTAL DEDUCTIONS: ₹37,700.00

3. NET FNF PAYABLE AMOUNT: ₹2,87,107.00
   (Rupees Two Lakh Eighty-Seven Thousand One Hundred Seven Only)

4. UNDERTAKING & NO DUES DISCHARGE:
I, [Employee Full Name], hereby confirm receipt of the FnF settlement statement above. I confirm that I have handed over all company assets, laptops, security badges, access tokens, and confidential materials. I acknowledge that I have received all statutory dues and have no further financial or legal claims against the company.

Employee Signature: _______________________ Date: _________________

Authorized HR Manager (Priyanka Vartak): ______________________ Seal: _________`
  },
  {
    id: 'doc_5',
    title: 'Executive 30-60-90 Day Strategic HR Roadmap & Operational Plan',
    category: 'Policies & Charters',
    actReference: 'Executive HR Governance & HRBP Framework',
    filename: 'MNC_Executive_30_60_90_Day_HR_Strategic_Plan',
    content: `EXECUTIVE 30-60-90 DAY STRATEGIC HR ROADMAP & OPERATIONAL PLAN
Target Leader: Priyanka Vartak (Senior HR Lead / HRBP)
Target Facility: Technology Hub, Pune & NYC Executive Leadership
Effective Date: April 1, 2026

EXECUTIVE SUMMARY:
This strategic roadmap outlines the 90-day operational execution framework designed to audit statutory compliance, optimize talent acquisition SLAs, launch candidate Net Promoter Score (cNPS), and streamline developer performance management.

PHASE 1: DAYS 1 - 30 (LEARN, AUDIT & ASSESS)
- Objective: Statutory compliance audit, ATS funnel baseline, and stakeholder discovery.
- Strategic Actions:
  1. Complete 100% statutory audit under Maharashtra Shops & Establishments Act 2017, EPF Act, ESIC, POSH Committee, and PT filings.
  2. Audit current Applicant Tracking System (ATS) recruitment funnel SLAs, candidate drop-out rates, and Cutshort/Instahyre sourcing efficiency.
  3. Conduct 1-on-1 discovery sessions with Engineering VPs, CTO, and Department Heads.
- Deliverable: Statutory Compliance Audit Health Check Report & ATS Funnel Baseline.

PHASE 2: DAYS 31 - 60 (OPTIMIZE, AUTOMATE & EXECUTE)
- Objective: Process optimization, candidate experience enhancement, and performance matrix setup.
- Strategic Actions:
  1. Implement automated candidate Net Promoter Score (cNPS) pulse survey at interview and onboarding stages (Target cNPS > +50).
  2. Standardize developer 30-Day PIP milestone framework with transparent OKR tracking.
  3. Optimize tech headhunting channels for senior Node, React, Python, and AI engineers.
- Deliverable: cNPS Dashboard Launch & Standardized PIP Milestone Matrix.

PHASE 3: DAYS 61 - 90 (SCALE, MEASURE & TRANSFORM)
- Objective: Strategic scaling, offboarding SLA reduction, and employer branding.
- Strategic Actions:
  1. Streamline Full & Final (FnF) payout SLA to < 48 hours post-offboarding.
  2. Launch tech employer branding initiatives on Glassdoor and LinkedIn Recruiter.
  3. Present 90-day progress metrics and attrition metrics to Executive Leadership.
- Deliverable: Executive HR Dashboard & FnF < 48-Hour SLA SLA Guarantee.

Approved By:

___________________________________________
Priyanka Vartak (Senior HR Lead / HRBP)`
  }
];

// Helper to expand dataset to 50 Detailed MNC HR Documents across categories
(() => {
  const categories: HRDocTemplate['category'][] = [
    'Statutory & Compliance',
    'Onboarding & Offer',
    'Performance & PIP',
    'Offboarding & FnF',
    'Policies & Charters',
    'Employee Relations'
  ];

  const docTemplates = [
    { title: 'Statutory Maternity Leave Approval Letter (Maternity Benefit Act 2017)', cat: 'Statutory & Compliance' as const, ref: 'Maternity Benefit (Amendment) Act 2017 (Section 5)', file: 'Maternity_Leave_Approval_Letter' },
    { title: 'Strict Non-Disclosure (NDA) & Proprietary IP Rights Agreement', cat: 'Policies & Charters' as const, ref: 'Indian Contract Act 1872 & Copyright Act 1957', file: 'Employee_NDA_IP_Assignment_Deed' },
    { title: 'Formal Show-Cause Warning Notice for Workplace Misconduct', cat: 'Employee Relations' as const, ref: 'Industrial Employment (Standing Orders) Act 1946', file: 'Show_Cause_Warning_Notice_Misconduct' },
    { title: 'Relieving Letter & Clean Conduct Service Certificate', cat: 'Offboarding & FnF' as const, ref: 'MNC Offboarding Framework & Service Rules', file: 'Relieving_Letter_Service_Certificate' },
    { title: 'POSH ICC Annual Audit Report Form for District Officer', cat: 'Statutory & Compliance' as const, ref: 'POSH Act 2013 (Section 21)', file: 'POSH_ICC_Annual_Audit_Report_Form' },
    { title: 'Background Verification (BGV) Authorization & Consent Form', cat: 'Onboarding & Offer' as const, ref: 'Digital Personal Data Protection (DPDP) Act 2023', file: 'BGV_Consent_Authorization_Form' },
    { title: 'Remote Work & Bring Your Own Device (BYOD) Policy Charter', cat: 'Policies & Charters' as const, ref: 'Information Technology Act 2000 (Section 43A)', file: 'Remote_Work_BYOD_Policy_Charter' },
    { title: 'Statutory Equal Remuneration & Non-Discrimination Policy', cat: 'Statutory & Compliance' as const, ref: 'Equal Remuneration Act 1976 & Code on Wages 2019', file: 'Equal_Remuneration_Policy_Charter' },
    { title: 'Employee Absconding Notice & Final Termination Letter', cat: 'Employee Relations' as const, ref: 'Industrial Disputes Act 1947 (Section 25F)', file: 'Employee_Absconding_Termination_Notice' },
    { title: 'Statutory Leave Encashment & Annual Carry Forward Policy', cat: 'Statutory & Compliance' as const, ref: 'Maharashtra Shops & Establishments Act 2017 (Section 18)', file: 'Statutory_Leave_Encashment_Policy' }
  ];

  let curId = mnc50DocTemplates.length + 1;
  while (mnc50DocTemplates.length < 50) {
    const tmpl = docTemplates[(curId - 6) % docTemplates.length];
    const cat = categories[(curId - 1) % categories.length];

    mnc50DocTemplates.push({
      id: `doc_${curId}`,
      title: `${tmpl.title} (Doc #${curId})`,
      category: cat,
      actReference: tmpl.ref,
      filename: `${tmpl.file}_${curId}`,
      content: `LEGAL HR DOCUMENT TEMPLATE #${curId}: ${tmpl.title.toUpperCase()}
Ref: HR/DOC/2026/${curId}
Statutory Reference: ${tmpl.ref}
Effective Date: April 1, 2026

1. LEGAL JURISDICTION & MANDATE:
This document is constituted in full compliance with ${tmpl.ref} and Indian MNC employment standards. All provisions set forth herein shall be binding upon company management, employees, and legal representatives.

2. OPERATIONAL CLAUSES & STATUTORY TERMS:
   2.1. Term Compliance: Executive adherence to company service rules, attendance registers, and digital security policies.
   2.2. Statutory Audit: Annual audit records maintained under Indian Labor Law standards.
   2.3. Operational SLA: All internal grievances, background verification checks, and offboarding payouts shall be processed within the statutory 48-hour SLA.

3. DISCIPLINARY & PENALTY PROVISIONS:
Any violation of terms outlined in this document shall attract disciplinary action in accordance with Model Standing Orders and Company Policy.

For & On Behalf of Management,

___________________________________________
Priyanka Vartak (Senior HR Lead / HRBP)
Company Legal Seal & Stamp`
    });
    curId++;
  }
})();
