'use client';

import React, { useState } from 'react';
import { callGeminiAI } from '@/lib/gemini';

export interface CareerStage {
  id: string;
  stageName: string;
  yearRange: string;
  targetRole: string;
  ctcIndia: string;
  ctcGlobal: string;
  keyCompetencies: string[];
  requiredTechStack: string[];
  actionMilestones: string[];
}

export const careerPathData: CareerStage[] = [
  {
    id: 'stage_1',
    stageName: 'Stage 1: Operational Mastery',
    yearRange: 'Years 1 - 2',
    targetRole: 'HR Lead / Senior TA Lead',
    ctcIndia: '₹12 LPA - ₹18 LPA',
    ctcGlobal: '$45,000 - $65,000',
    keyCompetencies: ['Full-Cycle Tech Sourcing', 'cNPS Candidate Experience', 'Statutory Compliance (PF, ESIC, POSH)', '30-Day PIP Execution'],
    requiredTechStack: ['Cutshort', 'Instahyre', 'Keka Payroll', 'SpringVerify BGV'],
    actionMilestones: ['Maintain cNPS > +50 across requisitions', 'Audit 100% statutory compliance under Maharashtra Shops & Est', 'Execute notice recovery & FnF SLA < 48 hrs']
  },
  {
    id: 'stage_2',
    stageName: 'Stage 2: Strategic Business Partnering',
    yearRange: 'Years 3 - 4',
    targetRole: 'Senior HR Business Partner (HRBP)',
    ctcIndia: '₹20 LPA - ₹30 LPA',
    ctcGlobal: '$75,000 - $100,000',
    keyCompetencies: ['Organizational Design', 'Workforce Planning', 'OKR / KRA Performance Management', 'Executive Leadership Alignment'],
    requiredTechStack: ['Workday HRIS', 'Mercer Compensation Benchmarking', 'CultureAmp', 'Lattice'],
    actionMilestones: ['Partner directly with Engineering VPs & CTOs', 'Reduce annual developer turnover from 25% to < 12%', 'Implement OKR framework for 200+ engineers']
  },
  {
    id: 'stage_3',
    stageName: 'Stage 3: Head of People & Operations',
    yearRange: 'Years 5 - 7',
    targetRole: 'Head of People / Director of Talent',
    ctcIndia: '₹35 LPA - ₹55 LPA + ESOPs',
    ctcGlobal: '$120,000 - $160,000 + Equity',
    keyCompetencies: ['Zero-to-One HR Scaling', 'Startup Offer Letters & ESOP Pool Management', 'Global Remuneration', 'Employer Branding'],
    requiredTechStack: ['Carta (ESOP Management)', 'Rippling', 'Greenhouse ATS', 'Glassdoor Pro'],
    actionMilestones: ['Scale company headcount from 50 to 250+ employees', 'Design ESOP allocation & vesting schedule policy', 'Establish global remote hiring hubs in India & US']
  },
  {
    id: 'stage_4',
    stageName: 'Stage 4: Executive Leadership',
    yearRange: 'Years 7 - 10',
    targetRole: 'VP of Human Resources / VP People',
    ctcIndia: '₹60 LPA - ₹90 LPA + Equity',
    ctcGlobal: '$180,000 - $250,000 + Equity',
    keyCompetencies: ['Board Advisory & Human Capital Strategy', 'M&A HR Integration', 'Global Diversity & ESG', 'Enterprise Labor Relations'],
    requiredTechStack: ['SAP SuccessFactors', 'Visier People Analytics', 'Workday Executive Dashboard'],
    actionMilestones: ['Advise Board of Directors on executive succession', 'Lead HR merger integration for acquisition of 100+ team', 'Establish employer brand in top 10 tech companies']
  },
  {
    id: 'stage_5',
    stageName: 'Stage 5: C-Suite Mastery',
    yearRange: '10+ Years',
    targetRole: 'Chief Human Resources Officer (CHRO)',
    ctcIndia: '₹1.0 Cr - ₹1.8 Cr + Board Equity',
    ctcGlobal: '$300,000+ + Stock Options',
    keyCompetencies: ['Global Organizational Architecture', 'Executive Compensation Committee', 'Enterprise Crisis Leadership'],
    requiredTechStack: ['Enterprise Governance Platforms', 'Boardroom Executive Suite'],
    actionMilestones: ['Lead IPO readiness for HR & governance compliance', 'Direct global workforce of 5,000+ employees', 'Keynote speaker at Global HR Summits']
  }
];

export const CareerPlannerView: React.FC<{ userName: string; currentRole: string }> = ({
  userName,
  currentRole,
}) => {
  const [role, setRole] = useState(currentRole || 'Senior HR Generalist / Tech HR Lead');
  const [selectedStage, setSelectedStage] = useState<CareerStage>(careerPathData[0]);
  const [careerBlueprint, setCareerBlueprint] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateBlueprint = async () => {
    setIsGenerating(true);

    const prompt = `Act as an executive HR career strategist. Build a 10-year career progression blueprint for candidate ${userName}:\n\nCurrent Role: ${role}\nTarget Milestone Destination: ${selectedStage.targetRole} (${selectedStage.yearRange})\n\nGenerate a detailed year-by-year 10-year strategic career roadmap:\n- Years 1-2: Core skills to master & key accomplishments\n- Years 3-5: Transition steps to Senior HRBP / Head of People\n- Years 6-8: Scaling leadership, compensation targets, & executive responsibilities\n- Years 9-10: C-Suite / VP People positioning & Boardroom readiness.`;

    const result = await callGeminiAI(prompt);
    setIsGenerating(false);

    setCareerBlueprint(result || '10-Year Executive Career Blueprint generated successfully.');
  };

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">10-Year Executive Career Navigator</span>
            <h2 className="text-2xl font-bold text-slate-900">HR Career Progression & Future Role Planner</h2>
            <p className="text-xs text-slate-500 mt-1">
              Plan candidate Priyanka Vartak&apos;s 10-year growth trajectory from HR Lead to Head of People, VP of HR, and CHRO with Gemini AI roadmap generation.
            </p>
          </div>

          <button
            disabled={isGenerating}
            onClick={handleGenerateBlueprint}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow flex items-center space-x-2 disabled:opacity-50"
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            <span>{isGenerating ? 'Building 10-Yr Blueprint...' : 'Generate AI 10-Year Career Blueprint'}</span>
          </button>
        </div>

        {/* Current Role Input Banner */}
        <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">Starting Milestone</span>
            <h3 className="text-lg font-extrabold">{userName}&apos;s Starting Point</h3>
          </div>

          <div className="w-full md:w-96">
            <label className="block text-[11px] text-slate-300 font-semibold mb-1">Your Current Designation / Role:</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white font-bold text-xs focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* 10-Year Milestone Stages Horizontal Pathway */}
        <div>
          <h3 className="font-bold text-slate-900 text-sm mb-3">10-Year Career Milestones Pathway</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {careerPathData.map((stage, idx) => {
              const isSelected = stage.id === selectedStage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(stage)}
                  className={`p-4 rounded-xl border-2 text-left transition-all space-y-2 flex flex-col justify-between ${
                    isSelected ? 'border-emerald-600 bg-emerald-50/30 shadow-md' : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">
                        {stage.yearRange}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">Step {idx + 1}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs leading-snug">{stage.targetRole}</h4>
                    <p className="text-[10px] text-emerald-700 font-bold mt-1">{stage.ctcIndia}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                    <span className={isSelected ? 'text-emerald-700' : 'text-slate-400'}>
                      {isSelected ? 'Selected Role' : 'Explore Role'}
                    </span>
                    <i className="fa-solid fa-chevron-right text-[9px]"></i>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Role Deep-Dive Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Role Requirements & CTC Benchmarks */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="text-[10px] font-extrabold text-emerald-700 uppercase">{selectedStage.yearRange} Milestone</span>
                <h3 className="font-bold text-slate-900 text-base">{selectedStage.targetRole}</h3>
              </div>
              <i className="fa-solid fa-trophy text-amber-500 text-xl"></i>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded-lg border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-500 block font-semibold">India CTC Range:</span>
                <strong className="text-emerald-600 font-bold text-xs">{selectedStage.ctcIndia}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block font-semibold">Global / Remote CTC:</span>
                <strong className="text-blue-600 font-bold text-xs">{selectedStage.ctcGlobal}</strong>
              </div>
            </div>

            <div className="space-y-2">
              <strong className="text-slate-800 block font-bold">Core Competencies to Master:</strong>
              <div className="flex flex-wrap gap-1.5">
                {selectedStage.keyCompetencies.map((comp) => (
                  <span key={comp} className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <strong className="text-slate-800 block font-bold">Required Software Stack:</strong>
              <div className="flex flex-wrap gap-1">
                {selectedStage.requiredTechStack.map((tech) => (
                  <span key={tech} className="bg-slate-200 text-slate-800 text-[10px] font-mono font-semibold px-2 py-0.5 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Milestones & AI Blueprint */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center justify-between">
                <span>Key Milestones to Accomplish in this Role</span>
                <i className="fa-solid fa-flag-checkered text-emerald-600"></i>
              </h4>

              <div className="space-y-2">
                {selectedStage.actionMilestones.map((m, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-start space-x-2">
                    <i className="fa-solid fa-circle-check text-emerald-500 text-xs mt-0.5"></i>
                    <span className="text-slate-800 font-medium">{m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Generated 10-Year Blueprint Output */}
            {careerBlueprint && (
              <div className="bg-gradient-to-tr from-slate-900 via-emerald-950 to-slate-900 text-slate-100 p-5 rounded-xl border border-emerald-800/80 shadow-xl space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-emerald-800/60 pb-2">
                  <div className="flex items-center space-x-2">
                    <i className="fa-solid fa-sparkles text-amber-400"></i>
                    <h4 className="font-bold text-amber-300">Priyanka Vartak&apos;s 10-Year AI Career Blueprint</h4>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-400/30">
                    Gemini AI Generated
                  </span>
                </div>

                <div className="font-mono text-xs leading-relaxed whitespace-pre-line max-h-72 overflow-y-auto pt-1">
                  {careerBlueprint}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
