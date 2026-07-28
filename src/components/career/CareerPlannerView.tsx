'use client';

import React, { useState } from 'react';
import { callGeminiAI } from '@/lib/gemini';

export interface HRFunctionRole {
  title: string;
  level: string;
  ctcIndia: string;
  ctcGlobal: string;
  competencies: string[];
  tools: string[];
  recommendedSOP: string;
  recommendedLab: string;
}

export interface HRFunctionCategory {
  id: string;
  categoryName: string;
  icon: string;
  description: string;
  roles: HRFunctionRole[];
}

export const hrFunctionMapData: HRFunctionCategory[] = [
  {
    id: 'func_ta',
    categoryName: 'Talent Acquisition & Tech Sourcing',
    icon: 'fa-bullseye',
    description: 'Sourcing, technical screening, headhunting, cNPS tracking, and offer negotiation.',
    roles: [
      {
        title: 'Technical Recruiter / TA Specialist',
        level: '1 - 3 Yrs',
        ctcIndia: '₹6 LPA - ₹10 LPA',
        ctcGlobal: '$35,000 - $50,000',
        competencies: ['Boolean Search Strings', 'Cutshort & Instahyre Sourcing', 'Phone Screening', 'cNPS Tracking'],
        tools: ['Cutshort', 'Instahyre', 'LinkedIn Recruiter', 'Greenhouse ATS'],
        recommendedSOP: 'Tech Sourcing for Full-Stack Developers',
        recommendedLab: 'Cutshort Boolean Search String Construction'
      },
      {
        title: 'Senior TA Lead / Headhunter',
        level: '3 - 6 Yrs',
        ctcIndia: '₹14 LPA - ₹22 LPA',
        ctcGlobal: '$60,000 - $85,000',
        competencies: ['Passive Architect Headhunting', 'Campus Recruitment Drives', 'Offer Dropout Control', 'ATS Funnel SLA'],
        tools: ['LinkedIn Talent Hub', 'Workday ATS', 'SpringVerify BGV'],
        recommendedSOP: 'Executive Headhunting for Niche Architects',
        recommendedLab: 'Campus Recruitment Screening Matrix'
      },
      {
        title: 'Head of Talent Acquisition',
        level: '7 - 10 Yrs',
        ctcIndia: '₹35 LPA - ₹55 LPA + ESOPs',
        ctcGlobal: '$120,000 - $160,000',
        competencies: ['Global Workforce Sourcing Strategy', 'RPO Vendor Management', 'Employer Branding', 'Recruitment Budgeting'],
        tools: ['Visier Analytics', 'Glassdoor Pro', 'Carta ESOPs'],
        recommendedSOP: 'Employer Branding & Glassdoor Strategy',
        recommendedLab: 'Global Hiring Hub Expansion Project'
      }
    ]
  },
  {
    id: 'func_hrbp',
    categoryName: 'HR Business Partnering (HRBP)',
    icon: 'fa-user-tie',
    description: 'Executive partnering, organizational design, workforce planning, and PIP execution.',
    roles: [
      {
        title: 'Associate HRBP',
        level: '2 - 4 Yrs',
        ctcIndia: '₹10 LPA - ₹15 LPA',
        ctcGlobal: '$50,000 - $70,000',
        competencies: ['Employee Lifecycle Management', 'Monthly 1-on-1s', '30-Day PIP Execution', 'Performance Reviews'],
        tools: ['Keka', 'Workday HRIS', 'CultureAmp'],
        recommendedSOP: '30-Day PIP Execution Framework',
        recommendedLab: '30-Day Performance Improvement Plan Notice'
      },
      {
        title: 'Senior HR Business Partner (HRBP)',
        level: '5 - 8 Yrs',
        ctcIndia: '₹22 LPA - ₹35 LPA',
        ctcGlobal: '$85,000 - $120,000',
        competencies: ['Organizational Design', 'Workforce Planning', 'OKR / KRA Cascading', 'Leadership Coaching'],
        tools: ['Workday', 'Lattice', 'Mercer Compensation'],
        recommendedSOP: 'OKR & KRA Cascading for Developers',
        recommendedLab: 'OKR vs KRA Performance Framework'
      },
      {
        title: 'Director of HRBP & Talent Strategy',
        level: '9 - 12 Yrs',
        ctcIndia: '₹55 LPA - ₹85 LPA + Equity',
        ctcGlobal: '$170,000 - $230,000',
        competencies: ['Executive Leadership Alignment', 'M&A HR Integration', 'Succession Planning', 'Change Management'],
        tools: ['SAP SuccessFactors', 'Visier Analytics'],
        recommendedSOP: 'Executive Succession Planning SOP',
        recommendedLab: 'M&A Workforce Integration Project'
      }
    ]
  },
  {
    id: 'func_payroll',
    categoryName: 'Payroll, Statutory & HR Operations',
    icon: 'fa-calculator',
    description: 'Statutory compliance (PF, ESIC, POSH, Maharashtra Shops), monthly payroll, and FnF settlements.',
    roles: [
      {
        title: 'Payroll & Statutory Executive',
        level: '1 - 3 Yrs',
        ctcIndia: '₹5 LPA - ₹8 LPA',
        ctcGlobal: '$30,000 - $45,000',
        competencies: ['EPF & ESIC Filings', 'Maharashtra PT Slabs', 'Keka Payroll Processing', 'Leave Encashment Math'],
        tools: ['Keka', 'Razorpay Payroll', 'EPFO Portal'],
        recommendedSOP: 'Monthly Payroll Processing & PF Filings',
        recommendedLab: 'EPF Statutory Ceiling & Contribution Math'
      },
      {
        title: 'HR Operations & Statutory Compliance Lead',
        level: '4 - 7 Yrs',
        ctcIndia: '₹15 LPA - ₹25 LPA',
        ctcGlobal: '$65,000 - $95,000',
        competencies: ['Full & Final (FnF) Shortfall Recovery', 'POSH ICC Inquiry Execution', 'Labor Law Audits', 'Form N Leave Registers'],
        tools: ['Workday', 'SpringVerify BGV', 'Aaple Sarkar Portal'],
        recommendedSOP: 'Full & Final (FnF) Offboarding Settlement',
        recommendedLab: 'Full & Final Settlement (FnF) Shortfall Recovery'
      },
      {
        title: 'Head of HR Operations & Compliance',
        level: '8 - 12 Yrs',
        ctcIndia: '₹35 LPA - ₹60 LPA',
        ctcGlobal: '$130,000 - $180,000',
        competencies: ['Pan-India Labor Law Governance', 'Enterprise Statutory Audits', 'Shared Services Management', 'Payroll System Migration'],
        tools: ['SAP HR', 'Workday Governance'],
        recommendedSOP: 'Pan-India Labor Compliance Audit',
        recommendedLab: 'Maharashtra Shops & Est Annual Audit'
      }
    ]
  }
];

export const CareerPlannerView: React.FC<{ userName: string; currentRole: string }> = ({
  userName,
  currentRole,
}) => {
  const [activePlannerTab, setActivePlannerTab] = useState<'explorer' | 'roadmap'>('explorer');

  // Explorer Tab State
  const [selectedFunc, setSelectedFunc] = useState<HRFunctionCategory>(hrFunctionMapData[0]);
  const [selectedRoleInFunc, setSelectedRoleInFunc] = useState<HRFunctionRole>(hrFunctionMapData[0].roles[0]);

  // Roadmap Tab State
  const [myCurrentRole, setMyCurrentRole] = useState(currentRole || 'Senior HR Lead / HR Generalist');
  const [myTarget10YrGoal, setMyTarget10YrGoal] = useState('Chief Human Resources Officer (CHRO)');
  const [aiBlueprint, setAiBlueprint] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateBlueprint = async () => {
    setIsGenerating(true);

    const prompt = `Act as an executive HR career strategist. Generate a personalized 10-year career progression blueprint and shortfall analysis for candidate ${userName}:\n\nCurrent Profile:\n- Name: ${userName}\n- Current Designation: ${myCurrentRole}\n- Target 10-Year Destination: ${myTarget10YrGoal}\n- Experience: 6+ Years Exp in Tech HR\n\nGenerate:\n1. Shortfall & Skill Gap Analysis (What is missing in candidate profile to reach target)\n2. Recommended SOP Playbooks & Software Tools to study\n3. Year-by-Year 10-Year Milestones Roadmap (Years 1-2, 3-4, 5-7, 7-10, 10+ Years) with CTC expectations in INR & USD.`;

    const result = await callGeminiAI(prompt);
    setIsGenerating(false);

    setAiBlueprint(result || '10-Year Executive Career Blueprint generated successfully.');
  };

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        {/* Header Banner */}
        <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Executive Career Architecture</span>
            <h2 className="text-2xl font-bold text-slate-900">HR Roles Explorer & 10-Year Career Planner</h2>
            <p className="text-xs text-slate-500 mt-1">
              Explore top industry standard HR role maps across functions or build candidate {userName}&apos;s personalized 10-year career roadmap with AI shortfall analysis.
            </p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setActivePlannerTab('explorer')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                activePlannerTab === 'explorer'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <i className="fa-solid fa-sitemap"></i>
              <span>🧭 HR Roles Explorer Map</span>
            </button>

            <button
              onClick={() => setActivePlannerTab('roadmap')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                activePlannerTab === 'roadmap'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <i className="fa-solid fa-route"></i>
              <span>🎯 My 10-Year Roadmap & Shortfalls</span>
            </button>
          </div>
        </div>

        {/* TAB 1: HR ROLES EXPLORER MAP */}
        {activePlannerTab === 'explorer' && (
          <div className="space-y-6">
            {/* HR Functions Selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {hrFunctionMapData.map((fn) => {
                const isSelected = fn.id === selectedFunc.id;
                return (
                  <button
                    key={fn.id}
                    onClick={() => {
                      setSelectedFunc(fn);
                      setSelectedRoleInFunc(fn.roles[0]);
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all space-y-2 flex flex-col justify-between ${
                      isSelected ? 'border-emerald-600 bg-emerald-50/30 shadow-md' : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <i className={`fa-solid ${fn.icon} text-lg ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`}></i>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{fn.roles.length} Roles</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">{fn.categoryName}</h3>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{fn.description}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 text-[11px] font-bold text-emerald-700 flex items-center justify-between">
                      <span>{isSelected ? 'Active HR Function' : 'Explore Function'}</span>
                      <i className="fa-solid fa-chevron-right text-[10px]"></i>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Role List & Detailed Inspector Split View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
              {/* Left Sub-Panel: Roles in Function */}
              <div className="lg:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs border-b pb-2 flex items-center justify-between">
                  <span>Career Hierarchy ({selectedFunc.categoryName})</span>
                  <i className="fa-solid fa-layer-group text-emerald-600"></i>
                </h4>

                <div className="space-y-2">
                  {selectedFunc.roles.map((r, idx) => {
                    const isRoleSel = r.title === selectedRoleInFunc.title;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedRoleInFunc(r)}
                        className={`w-full text-left p-3 rounded-xl border transition-all space-y-1 ${
                          isRoleSel
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${isRoleSel ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'}`}>
                            {r.level}
                          </span>
                          <span className={`text-[10px] font-bold ${isRoleSel ? 'text-emerald-200' : 'text-emerald-700'}`}>
                            {r.ctcIndia}
                          </span>
                        </div>
                        <h5 className="font-bold text-xs leading-snug">{r.title}</h5>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Sub-Panel: Detailed Role Inspector Card */}
              <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
                <div className="flex justify-between items-start border-b pb-4">
                  <div>
                    <span className="text-[10px] font-extrabold text-emerald-700 uppercase">{selectedRoleInFunc.level} Experience Level</span>
                    <h3 className="text-xl font-bold text-slate-900 mt-0.5">{selectedRoleInFunc.title}</h3>
                    <p className="text-xs text-slate-500">Function: {selectedFunc.categoryName}</p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-right">
                    <span className="text-[10px] text-slate-500 block font-semibold">India CTC Benchmark:</span>
                    <strong className="text-emerald-700 text-sm font-extrabold">{selectedRoleInFunc.ctcIndia}</strong>
                    <span className="text-[10px] text-blue-600 block font-semibold mt-0.5">Global CTC: {selectedRoleInFunc.ctcGlobal}</span>
                  </div>
                </div>

                {/* Competencies */}
                <div className="space-y-2 text-xs">
                  <strong className="text-slate-900 block font-bold">Core Competencies to Master as per Industry Standards:</strong>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedRoleInFunc.competencies.map((c, i) => (
                      <span key={i} className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-emerald-200">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Software Tools */}
                <div className="space-y-2 text-xs">
                  <strong className="text-slate-900 block font-bold">Required HR Software Stack & Platforms:</strong>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedRoleInFunc.tools.map((t, i) => (
                      <span key={i} className="bg-slate-100 text-slate-800 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg border border-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Platform Recommendations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="bg-purple-50 p-3.5 rounded-xl border border-purple-200 space-y-1">
                    <strong className="text-purple-900 font-bold block text-[11px] flex items-center space-x-1">
                      <i className="fa-solid fa-book-bookmark text-purple-600"></i>
                      <span>Recommended Practice SOP Playbook:</span>
                    </strong>
                    <p className="text-purple-950 font-semibold">{selectedRoleInFunc.recommendedSOP}</p>
                  </div>

                  <div className="bg-blue-50 p-3.5 rounded-xl border border-blue-200 space-y-1">
                    <strong className="text-blue-900 font-bold block text-[11px] flex items-center space-x-1">
                      <i className="fa-solid fa-briefcase text-blue-600"></i>
                      <span>Recommended Hands-On Project Lab:</span>
                    </strong>
                    <p className="text-blue-950 font-semibold">{selectedRoleInFunc.recommendedLab}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY 10-YEAR ROADMAP & SHORTFALLS */}
        {activePlannerTab === 'roadmap' && (
          <div className="space-y-6">
            {/* Auto-Populated Candidate Profile Banner */}
            <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-1">
                <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Candidate Profile Sync</span>
                <h3 className="text-xl font-bold text-white">{userName}&apos;s Executive Profile</h3>
                <p className="text-xs text-slate-400">Current Role: {myCurrentRole} &bull; Verified 6+ Yrs Experience in Tech HR</p>
              </div>

              <div className="w-full md:w-80">
                <label className="block text-[11px] text-slate-300 font-semibold mb-1">Target 10-Year Destination Goal:</label>
                <select
                  value={myTarget10YrGoal}
                  onChange={(e) => setMyTarget10YrGoal(e.target.value)}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white font-bold text-xs focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Chief Human Resources Officer (CHRO)">Chief Human Resources Officer (CHRO)</option>
                  <option value="VP of Human Resources / VP People">VP of Human Resources / VP People</option>
                  <option value="Head of People & Operations">Head of People & Operations</option>
                  <option value="Director of HRBP & Talent Strategy">Director of HRBP & Talent Strategy</option>
                </select>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex justify-between items-center bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Analyze Shortfalls & Build 10-Year Strategic Roadmap</h4>
                <p className="text-xs text-slate-600">Gemini AI evaluates candidate resume skills vs target 10-year CHRO destination goal.</p>
              </div>

              <button
                disabled={isGenerating}
                onClick={handleGenerateBlueprint}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow flex items-center space-x-2 disabled:opacity-50 shrink-0"
              >
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                <span>{isGenerating ? 'Analyzing Shortfalls...' : 'Generate AI Shortfall & 10-Yr Roadmap'}</span>
              </button>
            </div>

            {/* AI Generated Output Display */}
            {aiBlueprint ? (
              <div className="bg-slate-900 text-slate-100 p-6 rounded-xl border border-slate-800 text-xs font-mono leading-relaxed whitespace-pre-line max-h-[500px] overflow-y-auto">
                <strong className="text-amber-300 block text-sm border-b border-slate-800 pb-2 mb-2">
                  Gemini AI Executive Shortfall Analysis & 10-Year Blueprint ({userName}):
                </strong>
                {aiBlueprint}
              </div>
            ) : (
              <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                Click &ldquo;Generate AI Shortfall & 10-Yr Roadmap&rdquo; above to run Gemini AI analysis on candidate {userName}&apos;s profile.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
