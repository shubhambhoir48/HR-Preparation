'use client';

import React, { useState } from 'react';
import { callGeminiAI } from '@/lib/gemini';

export interface HRAnalyticsModule {
  id: string;
  moduleName: string;
  category: 'Attrition Analytics' | 'Recruitment SLA' | 'Compensation & Equity' | 'cNPS & eNPS' | 'Statutory Payroll';
  icon: string;
  description: string;
  formulaBlueprint: string;
  sampleDataset: {
    headers: string[];
    rows: (string | number)[][];
  };
  practiceTask: string;
  defaultUserInput: string;
}

export const hrAnalyticsModules: HRAnalyticsModule[] = [
  {
    id: 'mod_attrition',
    moduleName: 'Module 1: Employee Attrition & Exit Risk Analytics',
    category: 'Attrition Analytics',
    icon: 'fa-user-minus',
    description: 'Calculate annualized turnover rate, early 90-day attrition, and flight risk predictors across software engineering teams.',
    formulaBlueprint: 'Annual Attrition Rate (%) = (Total Exits during Period / Average Headcount) * 100\nEarly Attrition (< 90 Days %) = (Exits < 90 Days / Total New Hires) * 100',
    sampleDataset: {
      headers: ['Emp ID', 'Department', 'Tenure (Yrs)', 'Performance', 'Salary (₹)', 'Exit Status'],
      rows: [
        ['EMP-101', 'Frontend (React)', 1.2, 'Exceeds', 1400000, 'Active'],
        ['EMP-102', 'Backend (Node)', 0.4, 'Meets', 1600000, 'Exited (< 90 Days)'],
        ['EMP-103', 'DevOps / Cloud', 2.5, 'Exceeds', 2200000, 'Active'],
        ['EMP-104', 'Full-Stack Eng', 0.8, 'Needs Imp', 1500000, 'Exited'],
        ['EMP-105', 'AI / ML Engineer', 3.1, 'Outstanding', 2800000, 'Active'],
        ['EMP-106', 'Backend (Python)', 1.5, 'Meets', 1800000, 'Exited'],
        ['EMP-107', 'UI/UX Design', 2.0, 'Exceeds', 1300000, 'Active']
      ]
    },
    practiceTask: 'Calculate the total attrition rate (%) for this 7-employee engineering cohort, and specify the early attrition (< 90 days) percentage.',
    defaultUserInput: 'Total Employees = 7, Total Exits = 3\nAttrition Rate = (3 / 7) * 100 = 42.85%\nEarly Exits (< 90 Days) = 1\nEarly Attrition Rate = (1 / 3) * 100 = 33.33%'
  },
  {
    id: 'mod_recruitment',
    moduleName: 'Module 2: Recruitment SLA & Sourcing Funnel Analytics',
    category: 'Recruitment SLA',
    icon: 'fa-filter-circle-dollar',
    description: 'Analyze Time-to-Fill (Days), Sourcing Channel Yield (Cutshort vs Instahyre), and Cost-Per-Hire (CPH).',
    formulaBlueprint: 'Average Time-to-Fill = Sum of Days to Fill / Total Requisitions\nOffer Acceptance Rate (%) = (Offers Accepted / Total Offers Issued) * 100\nCost-Per-Hire (₹) = (Agency Fees + Sourcing Subscriptions + Referral Bonuses) / Hires',
    sampleDataset: {
      headers: ['Req ID', 'Target Role', 'Sourcing Channel', 'Days Open', 'Offer Status', 'Cost (₹)'],
      rows: [
        ['REQ-01', 'Senior React Engineer', 'Cutshort', 22, 'Accepted', 45000],
        ['REQ-02', 'Node.js Architect', 'LinkedIn Recruiter', 48, 'Rejected', 90000],
        ['REQ-03', 'DevOps Specialist', 'Instahyre', 18, 'Accepted', 35000],
        ['REQ-04', 'Python Backend Lead', 'Employee Referral', 14, 'Accepted', 25000],
        ['REQ-05', 'AI Data Scientist', 'Cutshort', 32, 'Accepted', 45000]
      ]
    },
    practiceTask: 'Compute average Time-to-Fill (Days) across accepted requisitions and compare Cutshort vs Instahyre sourcing efficiency.',
    defaultUserInput: 'Accepted Requisitions = REQ-01 (22d), REQ-03 (18d), REQ-04 (14d), REQ-05 (32d)\nSum of Days = 22 + 18 + 14 + 32 = 86 days\nAvg Time-to-Fill = 86 / 4 = 21.5 Days\nCutshort Accepted = 2, Instahyre = 1. Cutshort shows highest yield.'
  },
  {
    id: 'mod_compa',
    moduleName: 'Module 3: Compensation Equity & Compa-Ratio Analytics',
    category: 'Compensation & Equity',
    icon: 'fa-scale-balanced',
    description: 'Audit salary Compa-Ratio (%), pay equity across gender/tenure, and salary band penetration.',
    formulaBlueprint: 'Individual Compa-Ratio (%) = (Employee Current Salary / Salary Band Midpoint) * 100\nTarget Range: 80% to 120% of Band Midpoint.',
    sampleDataset: {
      headers: ['Emp Name', 'Designation', 'Current Salary (₹)', 'Band Midpoint (₹)', 'Compa-Ratio (%)'],
      rows: [
        ['Priyanka Vartak', 'Senior HR Lead', 1800000, 1800000, '100%'],
        ['Rajesh Sharma', 'Lead Tech Architect', 2600000, 3000000, '86.6%'],
        ['Ananya Roy', 'Senior Developer', 1400000, 1800000, '77.7% (Underpaid)'],
        ['Vikram Malhotra', 'DevOps Engineer', 2200000, 2000000, '110.0%'],
        ['Sunita Deshmukh', 'Engineering Manager', 3400000, 3200000, '106.2%']
      ]
    },
    practiceTask: 'Audit the compa-ratio for Ananya Roy (Current ₹14L, Midpoint ₹18L). Recommend salary correction percentage to reach 90% Compa-Ratio.',
    defaultUserInput: 'Ananya Current Compa-Ratio = 14,000 / 18,000 = 77.7%\nTarget 90% Salary = 90% of ₹18,00,000 = ₹16,20,000\nRecommended Incremental Adjustment = ₹16,20,000 - ₹14,00,000 = ₹2,20,000 (+15.7% Increase)'
  },
  {
    id: 'mod_cnps',
    moduleName: 'Module 4: Candidate & Employee Experience Analytics (cNPS)',
    category: 'cNPS & eNPS',
    icon: 'fa-star-half-stroke',
    description: 'Compute candidate Net Promoter Score (cNPS) and employee satisfaction pulse ratings.',
    formulaBlueprint: 'cNPS = % Promoters (Score 9-10) - % Detractors (Score 0-6)\nScore Scale: -100 to +100. Target Threshold: > +50',
    sampleDataset: {
      headers: ['Response ID', 'Candidate Role', 'cNPS Score (0-10)', 'Category', 'Feedback Highlight'],
      rows: [
        ['RESP-01', 'React Developer', 10, 'Promoter', 'Smooth technical interview & transparent offer'],
        ['RESP-02', 'Node.js Engineer', 9, 'Promoter', 'Fast feedback from HR Lead'],
        ['RESP-03', 'DevOps Architect', 4, 'Detractor', 'Delayed interview start time by 45 mins'],
        ['RESP-04', 'Python Developer', 8, 'Passive', 'Good technical round'],
        ['RESP-05', 'AI Engineer', 10, 'Promoter', 'Excellent leadership vision presentation']
      ]
    },
    practiceTask: 'Calculate total cNPS score for this candidate cohort and classify Promoters, Passives, and Detractors.',
    defaultUserInput: 'Total Responses = 5\nPromoters (9-10) = 3 (60%)\nPassives (7-8) = 1 (20%)\nDetractors (0-6) = 1 (20%)\ncNPS = 60% - 20% = +40 cNPS Score'
  },
  {
    id: 'mod_statutory',
    moduleName: 'Module 5: Statutory & Payroll Compliance Analytics',
    category: 'Statutory Payroll',
    icon: 'fa-file-invoice-dollar',
    description: 'Audit statutory EPF capping variances, Professional Tax deductions, and Leave Encashment liabilities.',
    formulaBlueprint: 'Statutory EPF Ceiling = 12% of ₹15,000 Basic = ₹1,800/month\nDaily Basic Salary = Monthly Basic / 30\nLeave Encashment Liability = Leave Balance Days * Daily Basic',
    sampleDataset: {
      headers: ['Emp Name', 'Monthly Basic (₹)', 'EPF Contribution (₹)', 'Leave Days', 'Encashment Liability (₹)'],
      rows: [
        ['Priyanka Vartak', 75000, 1800, 18, 45000],
        ['Rajesh Sharma', 90000, 1800, 14, 42000],
        ['Ananya Roy', 50000, 1800, 10, 16667],
        ['Vikram Malhotra', 65000, 1800, 22, 47667]
      ]
    },
    practiceTask: 'Calculate total leave encashment financial liability across all 4 employees in this payroll cohort.',
    defaultUserInput: 'Priyanka = ₹45,000\nRajesh = ₹42,000\nAnanya = ₹16,667\nVikram = ₹47,667\nTotal Leave Encashment Liability = ₹1,51,334'
  }
];

export const HRAnalyticsView: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<HRAnalyticsModule>(hrAnalyticsModules[0]);
  
  // Editable Spreadsheet Dataset State
  const [gridData, setGridData] = useState<(string | number)[][]>(hrAnalyticsModules[0].sampleDataset.rows);
  const [userInput, setUserInput] = useState(hrAnalyticsModules[0].defaultUserInput);
  
  const [aiFeedback, setAiFeedback] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);

  const handleSelectModule = (mod: HRAnalyticsModule) => {
    setSelectedModule(mod);
    setGridData(mod.sampleDataset.rows);
    setUserInput(mod.defaultUserInput);
    setAiFeedback('');
  };

  const handleCellChange = (rIdx: number, cIdx: number, val: string) => {
    const updated = [...gridData.map((row) => [...row])];
    const num = parseFloat(val);
    updated[rIdx][cIdx] = isNaN(num) ? val : num;
    setGridData(updated);
  };

  const handleAuditAnalytics = async () => {
    if (!userInput.trim()) return;

    setIsAuditing(true);

    const prompt = `Act as an executive HR Analytics Consultant. Audit candidate Priyanka Vartak's practical analytics submission for "${selectedModule.moduleName}":\n\nModule Category: ${selectedModule.category}\nFormula Blueprint:\n"${selectedModule.formulaBlueprint}"\n\nPractical Task:\n"${selectedModule.practiceTask}"\n\nCandidate Analysis Submission:\n"${userInput}"\n\nProvide Feedback:\n1. Analytics & Math Accuracy Score (1-10)\n2. Correct Formulas & Insights\n3. Missing Financial or Statutory Nuances\n4. Recommended C-Suite Executive Presentation Pitch.`;

    const result = await callGeminiAI(prompt);
    setIsAuditing(false);

    setAiFeedback(result || 'Analytics audit completed.');
  };

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        {/* Header Banner */}
        <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">HR Analytics Masterclass & Excel Simulator</span>
            <h2 className="text-2xl font-bold text-slate-900">HR Analytics & Live Excel Spreadsheet Studio</h2>
            <p className="text-xs text-slate-500 mt-1">
              Master attrition forecasting, recruitment SLAs, Compa-Ratio pay equity, cNPS scoring, and statutory payroll analytics on live interactive Excel datasets with Gemini AI auditing.
            </p>
          </div>
        </div>

        {/* Module Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {hrAnalyticsModules.map((mod) => {
            const isSelected = mod.id === selectedModule.id;
            return (
              <button
                key={mod.id}
                onClick={() => handleSelectModule(mod)}
                className={`p-3.5 rounded-xl border-2 text-left transition-all space-y-2 flex flex-col justify-between ${
                  isSelected ? 'border-emerald-600 bg-emerald-50/30 shadow-md' : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase">
                      {mod.category}
                    </span>
                    <i className={`fa-solid ${mod.icon} ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`}></i>
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs leading-snug">{mod.moduleName}</h3>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold">
                  <span className={isSelected ? 'text-emerald-700' : 'text-slate-400'}>
                    {isSelected ? 'Active Module' : 'Open Module'}
                  </span>
                  <i className="fa-solid fa-chevron-right text-[9px]"></i>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Module Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          {/* Left Panel (7/12 Width): Live Editable Excel Spreadsheet Grid */}
          <div className="lg:col-span-7 bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="text-[10px] font-extrabold text-emerald-700 uppercase">{selectedModule.category}</span>
                <h3 className="font-bold text-slate-900 text-base">{selectedModule.moduleName}</h3>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-emerald-200">
                <i className="fa-solid fa-table mr-1"></i>Interactive Spreadsheet
              </span>
            </div>

            <p className="text-slate-700 text-xs leading-relaxed">{selectedModule.description}</p>

            {/* Formula Blueprint Card */}
            <div className="bg-emerald-950 text-emerald-100 p-3.5 rounded-xl border border-emerald-800 font-mono text-[11px] space-y-1">
              <strong className="text-amber-300 block font-bold">Formula Blueprint & Standard:</strong>
              <div className="whitespace-pre-line leading-relaxed">{selectedModule.formulaBlueprint}</div>
            </div>

            {/* Live Interactive Excel Grid Table */}
            <div className="space-y-2">
              <strong className="text-slate-900 block font-bold text-xs">
                Live Spreadsheet Dataset (Click any cell to edit numbers & test formulas):
              </strong>

              <div className="overflow-x-auto border border-slate-300 rounded-xl bg-white shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-200 text-slate-800 font-bold border-b border-slate-300 text-[11px]">
                      {selectedModule.sampleDataset.headers.map((h, i) => (
                        <th key={i} className="p-2 border-r border-slate-300 font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {gridData.map((row, rIdx) => (
                      <tr key={rIdx} className="border-b border-slate-200 hover:bg-slate-50 font-mono text-[11px]">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-1.5 border-r border-slate-200">
                            <input
                              type="text"
                              value={cell}
                              onChange={(e) => handleCellChange(rIdx, cIdx, e.target.value)}
                              className="w-full bg-transparent px-1 py-0.5 border border-transparent focus:border-emerald-500 focus:bg-white rounded text-[11px]"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Panel (5/12 Width): Practice Task & Gemini AI Analytics Auditor */}
          <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                <i className="fa-solid fa-chart-line text-emerald-600"></i>
                <span>Analytics Practice Workspace</span>
              </h3>
              <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded">
                Gemini AI Audited
              </span>
            </div>

            <div className="bg-purple-50 p-3.5 rounded-xl border border-purple-200 text-purple-950 font-medium">
              <strong className="text-purple-900 block font-bold mb-1">Assigned HR Analytics Task:</strong>
              <span>{selectedModule.practiceTask}</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Your Calculated Answer, Formula Steps & C-Suite Insight Pitch:
              </label>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                rows={6}
                placeholder="Enter your math formulas, calculated ratios, and executive HR insight pitch..."
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
              ></textarea>
            </div>

            <button
              disabled={isAuditing}
              onClick={handleAuditAnalytics}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <span>{isAuditing ? 'Auditing Analytics...' : 'Audit Analytics with Gemini AI'}</span>
            </button>

            {/* AI Feedback Output */}
            {aiFeedback && (
              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto">
                <div className="text-amber-400 font-bold border-b border-slate-800 pb-1 flex items-center justify-between">
                  <span>Gemini AI Analytics Consultant Audit Report</span>
                  <i className="fa-solid fa-circle-check text-emerald-400"></i>
                </div>
                <div>{aiFeedback}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
