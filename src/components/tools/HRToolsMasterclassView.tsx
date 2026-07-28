'use client';

import React, { useState } from 'react';
import { callGeminiAI } from '@/lib/gemini';

export interface HRToolModule {
  id: string;
  name: string;
  category: 'Recruitment' | 'Payroll & Compliance' | 'Enterprise HRIS' | 'Background Check';
  icon: string;
  description: string;
  overview: string;
  steps: string[];
  sampleTask: string;
  placeholderInput: string;
}

export const hrToolsData: HRToolModule[] = [
  {
    id: 'cutshort',
    name: 'Cutshort & Instahyre',
    category: 'Recruitment',
    icon: 'fa-bullseye',
    description: 'AI-driven tech sourcing, candidate pipeline management, and SLA tracking.',
    overview: 'Cutshort and Instahyre are India’s leading tech recruitment platforms used by fast-growing SaaS startups to source top-tier Node, React, Python, and AI engineers with response rates > 40%.',
    steps: [
      'Define target tech stack and candidate experience range (3-6 Yrs).',
      'Construct precise Boolean search filter (e.g., (Node.js OR React.js) AND AWS AND Pune).',
      'Filter candidates by notice period (< 30 days active job seekers).',
      'Send personalized 3-sentence recruiter message emphasizing technical impact and compensation.',
      'Track SLA response time (Aim for < 24-hour candidate reply).'
    ],
    sampleTask: 'Construct a Cutshort boolean search string for a Senior Full-Stack Node/React Engineer in Pune with notice period < 30 days.',
    placeholderInput: '(Node.js OR React.js) AND PostgreSQL AND (Location: Pune OR Remote) AND Notice: 30 days'
  },
  {
    id: 'keka',
    name: 'Keka & Razorpay Payroll',
    category: 'Payroll & Compliance',
    icon: 'fa-file-invoice-dollar',
    description: 'Automated Indian payroll processing, PF ceiling calculations, and FnF shortfalls.',
    overview: 'Keka and Razorpay Payroll automate monthly salary disbursements, EPF ceiling capping (₹15,000 basic ceiling), Professional Tax (PT) rules, and mid-month offboarding FnF calculations.',
    steps: [
      'Set Basic Salary component to 50% of Total CTC.',
      'Configure EPF capping at ₹1,800/month (12% of ₹15,000 ceiling).',
      'Calculate Professional Tax deduction (₹200/month in Maharashtra).',
      'Process leave encashment shortfall for notice period mid-month exits.',
      'Generate Bank Disbursement File (NACH / Batch Salary Transfer).'
    ],
    sampleTask: 'Simulate a Keka salary CTC breakup for ₹12 LPA including Basic, HRA, Employer PF, and estimated monthly in-hand.',
    placeholderInput: 'Basic: ₹50,000/mo, HRA: ₹25,000/mo, Employer PF: ₹1,800/mo, Special Allowance: ₹23,200/mo'
  },
  {
    id: 'workday',
    name: 'Workday & Enterprise HRIS',
    category: 'Enterprise HRIS',
    icon: 'fa-sitemap',
    description: 'Enterprise organization charting, POSH inquiry logging, and approval workflows.',
    overview: 'Workday is the gold standard enterprise HRIS used by Fortune 500 MNCs to manage employee lifecycles, global compensation bands, POSH ICC complaints, and cross-functional org charts.',
    steps: [
      'Navigate to Workday Business Process (BP) Configuration.',
      'Set up multi-level approval chain: Manager -> HRBP -> VP HR.',
      'Log POSH Internal Complaints Committee (ICC) formal inquiry record.',
      'Set up 30-Day PIP evaluation milestone tasks for underperforming staff.',
      'Export headcount attrition & diversity reports for leadership reviews.'
    ],
    sampleTask: 'Draft a Workday multi-level approval chain workflow for an emergency 30-Day PIP notice issuance.',
    placeholderInput: 'Step 1: HRBP initiates PIP -> Step 2: Department Head approves -> Step 3: Candidate signs acknowledgement in Workday Portal'
  },
  {
    id: 'springverify',
    name: 'SpringVerify & BGV Operations',
    category: 'Background Check',
    icon: 'fa-user-shield',
    description: 'Background verification (BGV), employment history checks, and red flag audits.',
    overview: 'SpringVerify automates employee background verification including UAN PF employment history, court record checks, education degree verification, and address verification.',
    steps: [
      'Initiate BGV link to new hire via SpringVerify dashboard.',
      'Verify EPFO UAN service history to detect dual employment or fake experience certificates.',
      'Conduct education degree verification with university registrar.',
      'Check criminal court records across district courts.',
      'Classify BGV Report: Green (Clear), Amber (Minor discrepancy), Red (Fake document - Immediate Termination).'
    ],
    sampleTask: 'Formulate a BGV audit checklist for verifying candidate PF service history via UAN portal.',
    placeholderInput: '1. Check UAN Service History 2. Cross-verify joining/leaving dates with Relieving Letter 3. Flag overlapping PF contributions'
  }
];

export const HRToolsMasterclassView: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<HRToolModule>(hrToolsData[0]);
  const [userInput, setUserInput] = useState(hrToolsData[0].placeholderInput);
  const [aiFeedback, setAiFeedback] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleSelectTool = (t: HRToolModule) => {
    setSelectedTool(t);
    setUserInput(t.placeholderInput);
    setAiFeedback('');
  };

  const handleEvaluatePractice = async () => {
    if (!userInput.trim()) return;

    setIsEvaluating(true);

    const prompt = `Act as a Senior HR Operations Lead. Evaluate this candidate's hands-on practical submission for the HR tool "${selectedTool.name}":\n\nPractical Task:\n"${selectedTool.sampleTask}"\n\nCandidate Submission:\n"${userInput}"\n\nProvide Feedback:\n1. Operational Accuracy Score (1-10)\n2. What was done correctly\n3. Missing operational steps or legal/technical nuances\n4. Improved A-grade solution example.`;

    const result = await callGeminiAI(prompt);
    setIsEvaluating(false);

    setAiFeedback(result || 'Practical task evaluated successfully.');
  };

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div>
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider">HR Software Stack Masterclass</span>
            <h2 className="text-2xl font-bold text-slate-900">HR Platforms & Hands-On Practice Studio</h2>
            <p className="text-xs text-slate-500 mt-1">
              Master essential HR tools used across tech startups and enterprises (Cutshort, Keka, Workday, SpringVerify) with real-world practical exercises evaluated by Gemini AI.
            </p>
          </div>
        </div>

        {/* Tool Cards Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hrToolsData.map((t) => {
            const isSelected = t.id === selectedTool.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelectTool(t)}
                className={`p-4 rounded-xl border-2 text-left transition-all space-y-2 flex flex-col justify-between ${
                  isSelected ? 'border-cyan-600 bg-cyan-50/20 shadow-md' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="bg-slate-100 text-slate-700 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                      {t.category}
                    </span>
                    <i className={`fa-solid ${t.icon} ${isSelected ? 'text-cyan-600' : 'text-slate-400'}`}></i>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{t.name}</h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{t.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span className={isSelected ? 'text-cyan-700' : 'text-slate-400'}>
                    {isSelected ? 'Active Tool' : 'Practice Tool'}
                  </span>
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Tool Detailed Guide & Simulator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Step-by-Step Operational Workflow Guide */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center space-x-2 border-b pb-3">
              <i className={`fa-solid ${selectedTool.icon} text-cyan-600 text-lg`}></i>
              <div>
                <h3 className="font-bold text-slate-900 text-base">{selectedTool.name} Operational Workflow</h3>
                <span className="text-[10px] text-slate-500 font-semibold uppercase">{selectedTool.category} Masterclass</span>
              </div>
            </div>

            <p className="text-slate-700 leading-relaxed font-normal">{selectedTool.overview}</p>

            <div className="space-y-2">
              <strong className="text-slate-900 block font-bold text-xs">Step-by-Step Execution Steps:</strong>
              <div className="space-y-2">
                {selectedTool.steps.map((step, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 flex items-start space-x-2.5">
                    <span className="bg-cyan-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-slate-800 text-[11px] font-medium leading-tight">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Hands-On Practice Simulator */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                <i className="fa-solid fa-laptop-code text-purple-600"></i>
                <span>Hands-On Operational Simulator</span>
              </h3>
              <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded">
                Gemini AI Evaluated
              </span>
            </div>

            <div className="bg-purple-50/60 p-3.5 rounded-lg border border-purple-200 text-purple-950 font-medium">
              <strong className="text-purple-900 block font-bold mb-1">Practical Practice Task:</strong>
              <span>{selectedTool.sampleTask}</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Your Execution Input / Answer:</label>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                rows={5}
                placeholder="Enter your practical input, boolean string, or calculation steps here..."
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
              ></textarea>
            </div>

            <button
              disabled={isEvaluating}
              onClick={handleEvaluatePractice}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 rounded-xl shadow flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <span>{isEvaluating ? 'Evaluating with Gemini AI...' : 'Submit & Evaluate Practical Task'}</span>
            </button>

            {/* AI Feedback Output Display */}
            {aiFeedback && (
              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto">
                <div className="text-amber-400 font-bold border-b border-slate-800 pb-1 flex items-center justify-between">
                  <span>Gemini AI Evaluation Report</span>
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
