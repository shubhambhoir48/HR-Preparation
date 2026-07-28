'use client';

import React, { useState } from 'react';

export interface DocTemplate {
  id: string;
  title: string;
  category: 'Statutory Compliance' | 'Offboarding' | 'Onboarding & Offer' | 'Performance & Conduct';
  filename: string;
  getContent: (name: string, role: string, office: string, salary: string) => string;
}

export const mncDocTemplates: DocTemplate[] = [
  {
    id: 'pip',
    title: 'Formal 30-Day Performance Improvement Plan (PIP) Notice',
    category: 'Performance & Conduct',
    filename: 'MNC_Standard_30_Day_PIP_Notice',
    getContent: (name, role, office, salary) => `FORMAL 30-DAY PERFORMANCE IMPROVEMENT PLAN (PIP) AGREEMENT
Ref: HR/PIP/${new Date().getFullYear()}/042
Date: ${new Date().toLocaleDateString()}

To: ${name || 'Priyanka Vartak'}
Designation: ${role || 'Senior HR Lead / HR Generalist'}
Location: ${office || 'Technology Hub, Pune'}

SUBJECT: FORMAL 30-DAY PERFORMANCE IMPROVEMENT PLAN (PIP) INITIATION

Dear ${name || 'Priyanka Vartak'},

This letter serves as formal notification that your current job performance has fallen below the operational standards expected for your role as ${role || 'Senior HR Lead'} at our ${office || 'Pune'} facility. Over the past review cycle, performance gaps have been documented in key deliverable areas.

1. IDENTIFIED PERFORMANCE GAPS & METRICS:
   1.1. Deliverable Delay: Failure to meet agreed milestone deadlines across three consecutive sprint review cycles.
   1.2. Quality SLA: Defect density and error rate exceeding acceptable team threshold (> 5% error rate).
   1.3. SLA Responsiveness: Delayed response turnaround times for internal stakeholder requests beyond the 24-hour SLA.

2. 30-DAY OBJECTIVES & SMART MILESTONE TARGETS (Effective Immediately):
   2.1. Milestone 1 (Days 1 - 10): Achieve 100% on-time delivery for all assigned sprint tasks without SLA breaches.
   2.2. Milestone 2 (Days 11 - 20): Maintain quality compliance with zero critical defects and error rate < 1.5%.
   2.3. Milestone 3 (Days 21 - 30): Successfully complete statutory compliance audit and present optimization matrix.

3. WEEKLY CADENCE & SUPPORT:
   You will participate in mandatory 30-minute weekly review meetings every Friday with your Reporting Manager and HR Lead. The company will provide necessary operational tools, coaching, and resources to assist you during this period.

4. PIP TIMELINE & FINAL CONSEQUENCES:
   - PIP Duration: 30 Calendar Days (Commencing from today).
   - Expected Outcome: Full attainment of all SMART milestones listed above.
   - Legal & Employment Impact: Please note that failure to demonstrate acceptable, sustained performance improvements by the end of the 30-day period will result in further disciplinary action, up to and including termination of employment under Section 25 of the Industrial Disputes Framework and Company Policy.

Please sign and return a copy of this agreement to confirm your understanding and acceptance.

Sincerely,

For & On Behalf of Management,

_______________________________
Authorized Signatory - HR Lead
Company Seal & Legal Stamp

ACKNOWLEDGEMENT & RECEIPT BY EMPLOYEE:
I, ${name || 'Priyanka Vartak'}, hereby acknowledge receipt of this PIP Notice and agree to the 30-day milestone targets outlined above.

Employee Signature: _______________________ Date: _________________`
  },
  {
    id: 'posh',
    title: 'POSH Act 2013 Internal Complaints Committee (ICC) Policy Charter',
    category: 'Statutory Compliance',
    filename: 'MNC_Standard_POSH_ICC_Charter',
    getContent: (name, role, office, salary) => `POLICY CHARTER: PREVENTION OF SEXUAL HARASSMENT (POSH) ACT, 2013
CONSTITUTION OF INTERNAL COMPLAINTS COMMITTEE (ICC)
Location / Branch: ${office || 'Technology Hub, Pune'}
Effective Date: April 1, 2026

1. POLICY STATEMENT:
Our organization is strictly committed to providing a safe, secure, and respectful working environment for all employees, free from sexual harassment, discrimination, or intimidation. This policy charter is constituted in strict compliance with The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 ("POSH Act").

2. CONSTITUTION OF INTERNAL COMPLAINTS COMMITTEE (ICC):
Under Section 4 of the POSH Act, 2013, the Internal Complaints Committee (ICC) for the ${office || 'Pune Tech Hub'} is hereby constituted with the following members:

   2.1. Presiding Officer:
        Name: Ms. Sunita Deshmukh (Senior Vice President - Operations)
        Role: Senior Woman Employee (Mandatory under Section 4(2)(a))

   2.2. Internal Committee Members:
        Member 1: ${name || 'Priyanka Vartak'} (${role || 'Senior HR Lead'})
        Member 2: Mr. Rajesh Sharma (Lead Legal & Compliance Counsel)

   2.3. External Independent Member:
        Member 3: Ms. Ananya Roy (Advocate & POSH NGO Executive Member)
        Role: Independent External Expert (Mandatory under Section 4(2)(c))

3. COMPLAINT REDRESSAL PROCEDURE & LEGAL TIMELINES:
   3.1. Filing a Complaint: Any aggrieved individual may submit a written complaint to the ICC at posh-icc@company.com within 3 months from the date of the incident.
   3.2. Conciliation Option: At the request of the aggrieved party, the ICC may initiate conciliation proceedings prior to a formal inquiry.
   3.3. Formal Inquiry Timeline: Upon formal inquiry initiation, the ICC shall complete inquiry proceedings within 90 days.
   3.4. Final Report Submission: The ICC shall submit its final inquiry report to Management within 10 days of inquiry completion.

4. CONFIDENTIALITY & NON-RETALIATION:
Under Section 16 of the POSH Act, all complaints, identity of parties, witness statements, and inquiry proceedings shall remain strictly confidential. Violations of confidentiality will attract statutory penalties.

For & On Behalf of Management & Board of Directors,

_______________________________
Managing Director & CEO
Company Legal Seal`
  },
  {
    id: 'offer',
    title: 'MNC Tech Offer Letter CTC Breakup & ESOP Agreement',
    category: 'Onboarding & Offer',
    filename: 'MNC_Standard_Offer_Letter_CTC_Breakup',
    getContent: (name, role, office, salary) => {
      const basic = parseFloat(salary) || 65000;
      const hra = Math.round(basic * 0.5);
      const pf = 1800;
      const special = Math.round(basic * 0.4);
      const monthlyGross = basic + hra + pf + special;
      const annualCTC = monthlyGross * 12;

      return `EMPLOYMENT OFFER LETTER & STATUTORY CTC BREAKUP ANNEXURE
Ref: HR/OFFER/${new Date().getFullYear()}/882
Date: ${new Date().toLocaleDateString()}

Candidate Name: ${name || 'Priyanka Vartak'}
Designation Offered: ${role || 'Senior HR Lead / HRBP'}
Work Location: ${office || 'Technology Hub, Pune'}

Dear ${name || 'Priyanka Vartak'},

We are pleased to offer you employment with our organization as ${role || 'Senior HR Lead'}. Your annual Total Cost to Company (CTC) will be ₹${annualCTC.toLocaleString('en-IN')} per annum.

ANNEXURE A: DETAILED STATUTORY SALARY BREAKUP (INR)

--------------------------------------------------------------------------------
Salary Component                  Monthly (₹)          Annualized (₹)
--------------------------------------------------------------------------------
1. Basic Salary (50% of CTC)     ₹${basic.toLocaleString('en-IN')}           ₹${(basic * 12).toLocaleString('en-IN')}
2. House Rent Allowance (HRA)    ₹${hra.toLocaleString('en-IN')}           ₹${(hra * 12).toLocaleString('en-IN')}
3. Special Allowance             ₹${special.toLocaleString('en-IN')}           ₹${(special * 12).toLocaleString('en-IN')}
4. Employer EPF (Capped)         ₹${pf.toLocaleString('en-IN')}            ₹${(pf * 12).toLocaleString('en-IN')}
--------------------------------------------------------------------------------
TOTAL GROSS CTC:                  ₹${monthlyGross.toLocaleString('en-IN')}          ₹${annualCTC.toLocaleString('en-IN')}
--------------------------------------------------------------------------------

STATUTORY DEDUCTIONS:
- Employee EPF Contribution: ₹1,800 / month (Capped under EPF Scheme, 1952)
- Professional Tax (PT): ₹200 / month (As per State PT Act)
- Income Tax (TDS): As applicable under Income Tax Act, 1961

ANNEXURE B: EQUITY & ESOP ALLOCATION (IF APPLICABLE)
- ESOP Grant: 2,500 Employee Stock Options
- Vesting Schedule: 4-Year Vesting Schedule with 1-Year Cliff (25% at Month 12, balance 6.25% quarterly thereafter).

Please sign below to confirm your acceptance of this offer.

Sincerely,

_______________________________
Head of Talent Acquisition & HR
Company Seal

Accepted & Confirmed By: ___________________________ Date: _________________`;
    }
  },
  {
    id: 'fnf',
    title: 'Full & Final (FnF) Settlement Statement & No Dues Discharge',
    category: 'Offboarding',
    filename: 'MNC_Standard_FnF_Settlement_Statement',
    getContent: (name, role, office, salary) => {
      const basic = parseFloat(salary) || 60000;
      const perDay = basic / 30;
      const earned = Math.round(perDay * 15);
      const leaveEncash = Math.round(perDay * 18);
      const noticeRec = Math.round(perDay * 15);
      const netPayable = earned + leaveEncash - noticeRec - 200;

      return `FULL & FINAL (FnF) SETTLEMENT STATEMENT & DISCHARGE VOUCHER
Employee Code: EMP-${Math.floor(1000 + Math.random() * 9000)}
Employee Name: ${name || 'Priyanka Vartak'}
Designation: ${role || 'Senior HR Lead / Generalist'}
Location: ${office || 'Technology Hub, Pune'}
Separation Date: ${new Date().toLocaleDateString()}

1. EARNINGS & PAYOUT COMPONENTS:
   1.1. Earned Basic Salary (15 Days Worked): ₹${earned.toLocaleString('en-IN')}
   1.2. Leave Encashment Payout (18 Days Earned Leave): ₹${leaveEncash.toLocaleString('en-IN')}
   1.3. Gratuity Payout (Payment of Gratuity Act, 1972): ₹0.00 (N/A)
   ------------------------------------------------------------------
   TOTAL GROSS EARNINGS: ₹${(earned + leaveEncash).toLocaleString('en-IN')}

2. DEDUCTIONS & RECOVERIES:
   2.1. Notice Period Shortfall Recovery (15 Days): ₹${noticeRec.toLocaleString('en-IN')}
   2.2. Professional Tax (PT Deduction): ₹200.00
   2.3. Income Tax (TDS Deduction): ₹0.00
   ------------------------------------------------------------------
   TOTAL DEDUCTIONS: ₹${(noticeRec + 200).toLocaleString('en-IN')}

3. NET FNF PAYABLE AMOUNT: ₹${netPayable.toLocaleString('en-IN')}
   (Rupees ${netPayable.toLocaleString('en-IN')} Only)

4. UNDERTAKING & NO DUES DISCHARGE:
I, ${name || 'Priyanka Vartak'}, hereby confirm receipt of the FnF settlement statement above. I confirm that I have handed over all company assets, laptops, security badges, access tokens, and confidential materials. I acknowledge that I have received all statutory dues and have no further financial claims against the company.

Employee Signature: _______________________ Date: _________________

Authorized HR Manager: ______________________ Seal: __________________`;
    }
  },
  {
    id: 'plan306090',
    title: 'Executive 30-60-90 Day Strategic HR Roadmap Plan',
    category: 'Onboarding & Offer',
    filename: 'MNC_Standard_Executive_30_60_90_Day_HR_Plan',
    getContent: (name, role, office, salary) => `EXECUTIVE 30-60-90 DAY STRATEGIC HR ROADMAP & OPERATIONAL PLAN
Target Leader: ${name || 'Priyanka Vartak'}
Target Role: ${role || 'Senior HR Lead / HRBP'}
Location Focus: ${office || 'Technology Hub, Pune'}

EXECUTIVE SUMMARY:
This strategic roadmap outlines the 90-day operational execution framework designed to audit compliance, optimize talent acquisition SLAs, launch data-driven employee engagement (cNPS), and streamline developer performance management.

PHASE 1: DAYS 1 - 30 (LEARN, AUDIT & ASSESS)
- Objective: Operational discovery, statutory compliance audit, and stakeholder alignment.
- Key Actions:
  1. Conduct full statutory compliance audit (Maharashtra Shops & Est Act, EPF, ESIC, PT, POSH Committee constitution).
  2. Audit current Applicant Tracking System (ATS) recruitment funnel SLAs and offer dropout rates.
  3. One-on-one discovery meetings with Engineering VPs, CTO, and Department Leads.
- Phase 1 Deliverables: 100% Statutory Compliance Health Check Report & ATS Funnel Baseline.

PHASE 2: DAYS 31 - 60 (OPTIMIZE, AUTOMATE & EXECUTE)
- Objective: Process optimization, candidate experience enhancement, and performance matrix setup.
- Key Actions:
  1. Implement automated candidate Net Promoter Score (cNPS) pulse survey at interview and onboarding stages.
  2. Standardize developer 30-Day PIP milestone framework with transparent OKR tracking.
  3. Optimize tech headhunting channels on Cutshort, Instahyre, and LinkedIn Recruiter.
- Phase 2 Deliverables: cNPS Dashboard Launch & PIP SLA Standardization.

PHASE 3: DAYS 61 - 90 (SCALE, MEASURE & TRANSFORM)
- Objective: Strategic scaling, offboarding SLA reduction, and employer branding.
- Key Actions:
  1. Streamline Full & Final (FnF) payout SLA to < 48 hours post-offboarding.
  2. Launch tech employer branding initiatives on Glassdoor and LinkedIn.
  3. Present 90-day progress metrics to Executive Leadership & Board.
- Phase 3 Deliverables: Executive HR Dashboard & FnF < 48-Hour SLA SLA Guarantee.

Approved By:

_______________________________
${name || 'Priyanka Vartak'} (${role || 'HR Lead'})`
  }
];

export const DocStudioView: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<DocTemplate>(mncDocTemplates[0]);
  const [name, setName] = useState('Priyanka Vartak');
  const [role, setRole] = useState('Senior HR Lead / HR Generalist');
  const [office, setOffice] = useState('Technology Hub, Pune');
  const [salary, setSalary] = useState('65000');
  const [copied, setCopied] = useState(false);

  const docContent = selectedTemplate.getContent(name, role, office, salary);

  const handleCopyText = () => {
    navigator.clipboard.writeText(docContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Direct Native Download as Microsoft Word (.doc / .docx)
  const handleDownloadDocx = () => {
    const formattedHtml = docContent
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br/>');

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>${selectedTemplate.title}</title>
          <style>
            body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #1e293b; margin: 1in; }
            h1, h2, h3 { color: #0f172a; font-weight: bold; }
            hr { border: 0; border-top: 1px solid #cbd5e1; margin: 15px 0; }
          </style>
        </head>
        <body>
          <h2>${selectedTemplate.title}</h2>
          <hr/>
          <div>${formattedHtml}</div>
        </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplate.filename}_${name.replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">MNC Standard Statutory HR Document Studio</span>
            <h2 className="text-2xl font-bold text-slate-900">Ready-Made Legal HR Documents & Word (.docx) Exporter</h2>
            <p className="text-xs text-slate-500 mt-1">
              Access production-grade Indian statutory legal HR document templates (POSH, 30-Day PIP, CTC Breakups, FnF Discharge Vouchers) with 1-click Microsoft Word (.docx) download.
            </p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleCopyText}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl border border-slate-300 text-xs shadow-sm flex items-center space-x-1.5"
            >
              <i className="fa-solid fa-copy text-slate-600"></i>
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handleDownloadDocx}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg text-xs flex items-center space-x-2 transition-all"
            >
              <i className="fa-solid fa-file-word text-amber-300 text-sm"></i>
              <span>Download .docx Word File</span>
            </button>
          </div>
        </div>

        {/* Template Selector Grid */}
        <div>
          <h3 className="font-bold text-slate-900 text-sm mb-3">Select Ready-Made Statutory MNC Document Template</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {mncDocTemplates.map((t) => {
              const isSelected = t.id === selectedTemplate.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t)}
                  className={`p-3.5 rounded-xl border-2 text-left transition-all space-y-1.5 flex flex-col justify-between ${
                    isSelected ? 'border-indigo-600 bg-indigo-50/30 shadow-md' : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div>
                    <span className="bg-slate-100 text-slate-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase block mb-1">
                      {t.category}
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs leading-snug line-clamp-2">{t.title}</h4>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold">
                    <span className={isSelected ? 'text-indigo-700' : 'text-slate-400'}>
                      {isSelected ? 'Active Template' : 'Use Template'}
                    </span>
                    <i className="fa-solid fa-file-arrow-down text-[10px]"></i>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Customization Controls */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center justify-between">
              <span>Customize Document Parameters</span>
              <i className="fa-solid fa-sliders text-indigo-600"></i>
            </h3>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Candidate / Employee Full Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Designation / Role:</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Office / Work Location:</label>
              <input
                type="text"
                value={office}
                onChange={(e) => setOffice(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold"
              />
            </div>

            {(selectedTemplate.id === 'offer' || selectedTemplate.id === 'fnf') && (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Monthly Basic Salary (₹):</label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold"
                />
              </div>
            )}

            <div className="pt-2 border-t border-slate-200 space-y-2">
              <button
                onClick={handleDownloadDocx}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 rounded-lg text-xs shadow flex items-center justify-center space-x-2"
              >
                <i className="fa-solid fa-file-word text-amber-300 text-sm"></i>
                <span>Download as Word (.docx)</span>
              </button>
            </div>
          </div>

          {/* Full Ready-Made Legal Document Preview */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-sm">Full Production Document Preview ({selectedTemplate.title})</h3>
              <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                <i className="fa-solid fa-circle-check text-emerald-500"></i>
                <span>MNC Statutory Compliant</span>
              </span>
            </div>

            <div className="bg-slate-900 text-slate-100 p-6 rounded-xl border border-slate-800 text-xs min-h-[420px] font-mono leading-relaxed whitespace-pre-line overflow-y-auto max-h-[550px]">
              {docContent}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
