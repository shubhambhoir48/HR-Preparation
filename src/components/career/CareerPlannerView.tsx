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

export interface Milestone {
  id: string;
  year: string;
  title: string;
  ctc: string;
  notes: string;
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
  
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: 'm1',
      year: '2026',
      title: 'Senior HR Lead / HR Generalist',
      ctc: '₹22 LPA',
      notes: 'Master core operations, handle 200+ employees, and establish performance culture.'
    }
  ]);
  
  // New Milestone Form State
  const [newYear, setNewYear] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCtc, setNewCtc] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState('');

  const handleAddMilestone = () => {
    if (!newYear || !newTitle) return;
    const newM: Milestone = {
      id: Date.now().toString(),
      year: newYear,
      title: newTitle,
      ctc: newCtc,
      notes: newNotes,
    };
    
    // Sort milestones by year
    const updated = [...milestones, newM].sort((a, b) => {
      return a.year.localeCompare(b.year);
    });
    setMilestones(updated);
    
    setNewYear('');
    setNewTitle('');
    setNewCtc('');
    setNewNotes('');
  };

  const handleDeleteMilestone = (id: string) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  const handleSuggestBlueprint = async () => {
    setIsGenerating(true);
    setAiAnalysis('');

    const prompt = `Act as an executive HR career strategist. For candidate ${userName}, who is currently "${myCurrentRole}" and has a 10-year goal of "${myTarget10YrGoal}", generate a 5-step milestone roadmap to bridge the gap.
    
Output exactly a JSON object in this format (no markdown backticks, no other text):
{
  "analysis": "Short 2-3 sentence analysis of their current gap.",
  "milestones": [
    {
      "year": "2027",
      "title": "Role Title",
      "ctc": "Expected CTC",
      "notes": "What to focus on..."
    }
  ]
}`;

    const result = await callGeminiAI(prompt);
    setIsGenerating(false);

    if (!result) {
      setAiAnalysis("Failed to get a response from AI. Please try again.");
      return;
    }

    try {
      // Strip markdown code blocks if present
      let cleanResult = result.trim();
      if (cleanResult.startsWith('```json')) {
        cleanResult = cleanResult.replace(/^```json/, '').replace(/```$/, '');
      } else if (cleanResult.startsWith('```')) {
        cleanResult = cleanResult.replace(/^```/, '').replace(/```$/, '');
      }

      const parsed = JSON.parse(cleanResult);
      if (parsed.milestones && Array.isArray(parsed.milestones)) {
        const generatedMilestones = parsed.milestones.map((m: any, idx: number) => ({
          id: `ai_${Date.now()}_${idx}`,
          year: String(m.year || ''),
          title: String(m.title || ''),
          ctc: String(m.ctc || ''),
          notes: String(m.notes || ''),
        }));
        
        // Merge AI suggestions with existing milestones, avoiding exact year duplicates, and sort
        const existingYears = new Set(milestones.map(m => m.year));
        const filteredAi = generatedMilestones.filter((m: Milestone) => !existingYears.has(m.year));
        
        const updated = [...milestones, ...filteredAi].sort((a, b) => a.year.localeCompare(b.year));
        setMilestones(updated);
      }
      
      if (parsed.analysis) {
        setAiAnalysis(parsed.analysis);
      }
    } catch (e) {
      console.error("Failed to parse AI response:", e);
      setAiAnalysis("Failed to parse the AI blueprint. Please try again. Raw response: " + result);
    }
  };

  return (
    <section className="h-[calc(100vh-120px)] flex flex-col space-y-4">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 shadow-xl shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <i className="fa-solid fa-map-location-dot text-8xl"></i>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1 block">Executive Career Architecture</span>
            <h2 className="text-2xl font-bold text-white">HR Roles Explorer & 10-Year Career Planner</h2>
            <p className="text-xs text-slate-400 mt-1.5 max-w-2xl">
              Explore industry standard HR roles, benchmark global CTCs, or manually build your personalized multi-year career roadmap with optional AI advisory.
            </p>
          </div>

          <div className="flex bg-slate-800 p-1.5 rounded-xl border border-slate-700">
            <button
              onClick={() => setActivePlannerTab('explorer')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                activePlannerTab === 'explorer'
                  ? 'bg-amber-500 text-slate-900 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <i className="fa-solid fa-sitemap"></i>
              <span>Roles Explorer</span>
            </button>

            <button
              onClick={() => setActivePlannerTab('roadmap')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                activePlannerTab === 'roadmap'
                  ? 'bg-amber-500 text-slate-900 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <i className="fa-solid fa-route"></i>
              <span>My Custom Roadmap</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {/* TAB 1: HR ROLES EXPLORER MAP */}
        {activePlannerTab === 'explorer' && (
          <div className="h-full flex flex-col space-y-4 animate-in fade-in zoom-in-95 duration-300">
            {/* HR Functions Selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
              {hrFunctionMapData.map((fn) => {
                const isSelected = fn.id === selectedFunc.id;
                return (
                  <button
                    key={fn.id}
                    onClick={() => {
                      setSelectedFunc(fn);
                      setSelectedRoleInFunc(fn.roles[0]);
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between group ${
                      isSelected 
                      ? 'border-amber-500 bg-amber-50/10 shadow-lg scale-[1.02]' 
                      : 'border-slate-200 hover:border-amber-300 bg-white hover:shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSelected ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500 group-hover:bg-amber-50 group-hover:text-amber-500'}`}>
                          <i className={`fa-solid ${fn.icon} text-lg`}></i>
                        </div>
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase bg-slate-100 px-2 py-1 rounded-md">{fn.roles.length} Roles</span>
                      </div>
                      <h3 className={`font-bold text-sm ${isSelected ? 'text-amber-700' : 'text-slate-900'}`}>{fn.categoryName}</h3>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{fn.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Role List & Detailed Inspector Split View */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden min-h-0">
              {/* Left Sub-Panel: Roles in Function */}
              <div className="lg:col-span-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-200 bg-white shrink-0">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                    <span>Career Hierarchy</span>
                    <i className="fa-solid fa-layer-group text-amber-500"></i>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedFunc.categoryName}</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  {selectedFunc.roles.map((r, idx) => {
                    const isRoleSel = r.title === selectedRoleInFunc.title;
                    return (
                      <button
                         key={idx}
                         onClick={() => setSelectedRoleInFunc(r)}
                         className={`w-full text-left p-4 rounded-xl border-2 transition-all space-y-2 relative ${
                           isRoleSel
                             ? 'bg-white border-amber-500 shadow-md transform scale-[1.01]'
                             : 'bg-white border-transparent hover:border-slate-300 shadow-sm'
                         }`}
                      >
                        {isRoleSel && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-amber-500 rounded-r-full"></div>}
                        <div className="flex justify-between items-center pl-2">
                           <span className={`text-[10px] font-black uppercase tracking-wider ${isRoleSel ? 'text-amber-600' : 'text-slate-500'}`}>
                             {r.level}
                           </span>
                           <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                             {r.ctcIndia}
                           </span>
                        </div>
                        <h5 className={`font-bold text-sm leading-snug pl-2 ${isRoleSel ? 'text-slate-900' : 'text-slate-700'}`}>{r.title}</h5>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Sub-Panel: Detailed Role Inspector Card */}
              <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
                
                <div className="p-6 border-b border-slate-100 shrink-0 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase block mb-1">
                      {selectedRoleInFunc.level} Experience Level
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900">{selectedRoleInFunc.title}</h3>
                  </div>

                  <div className="flex gap-2">
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-center min-w-[100px]">
                      <span className="text-[9px] text-slate-500 font-bold uppercase block mb-0.5">India CTC</span>
                      <strong className="text-slate-900 text-sm">{selectedRoleInFunc.ctcIndia}</strong>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-center min-w-[100px]">
                      <span className="text-[9px] text-slate-500 font-bold uppercase block mb-0.5">Global CTC</span>
                      <strong className="text-slate-900 text-sm">{selectedRoleInFunc.ctcGlobal}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 relative z-10 custom-scrollbar">
                  {/* Competencies */}
                  <div className="space-y-3">
                    <h4 className="text-slate-900 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2">
                      <i className="fa-solid fa-award text-amber-500"></i> Core Competencies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRoleInFunc.competencies.map((c, i) => (
                        <span key={i} className="bg-amber-50 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-lg border border-amber-200 shadow-sm">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Software Tools */}
                  <div className="space-y-3">
                    <h4 className="text-slate-900 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2">
                      <i className="fa-solid fa-laptop-code text-blue-500"></i> Required Software Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRoleInFunc.tools.map((t, i) => (
                        <span key={i} className="bg-slate-900 text-white text-xs font-mono font-semibold px-3 py-1.5 rounded-lg shadow-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Platform Recommendations */}
                  <div className="space-y-3">
                     <h4 className="text-slate-900 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2">
                      <i className="fa-solid fa-compass text-emerald-500"></i> Recommended Learning Path
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100/50 shadow-sm">
                        <strong className="text-indigo-900 font-bold text-xs flex items-center gap-2 mb-2">
                          <i className="fa-solid fa-book-bookmark text-indigo-500"></i>
                          SOP Playbook
                        </strong>
                        <p className="text-indigo-950/80 font-medium text-sm">{selectedRoleInFunc.recommendedSOP}</p>
                      </div>

                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100/50 shadow-sm">
                        <strong className="text-emerald-900 font-bold text-xs flex items-center gap-2 mb-2">
                          <i className="fa-solid fa-flask text-emerald-500"></i>
                          Hands-On Lab
                        </strong>
                        <p className="text-emerald-950/80 font-medium text-sm">{selectedRoleInFunc.recommendedLab}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY 10-YEAR ROADMAP & SHORTFALLS */}
        {activePlannerTab === 'roadmap' && (
          <div className="h-full flex flex-col space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Auto-Populated Candidate Profile Banner */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl font-bold">
                  {userName.charAt(0)}
                </div>
                <div>
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block mb-0.5">My Blueprint Setup</span>
                  <div className="flex items-center gap-3">
                    <select 
                      value={myCurrentRole}
                      onChange={(e) => setMyCurrentRole(e.target.value)}
                      className="text-sm font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-1.5 focus:ring-2 focus:ring-amber-500 outline-none"
                    >
                      <option value="Associate HR">Associate HR</option>
                      <option value="Senior HR Lead / HR Generalist">Senior HR Lead / HR Generalist</option>
                      <option value="HR Business Partner">HR Business Partner</option>
                      <option value="Head of Talent Acquisition">Head of Talent Acquisition</option>
                    </select>
                    <i className="fa-solid fa-arrow-right text-slate-300"></i>
                    <select
                      value={myTarget10YrGoal}
                      onChange={(e) => setMyTarget10YrGoal(e.target.value)}
                      className="text-sm font-bold text-slate-900 bg-amber-50 border border-amber-200 rounded-lg p-1.5 focus:ring-2 focus:ring-amber-500 outline-none"
                    >
                      <option value="Chief Human Resources Officer (CHRO)">Chief Human Resources Officer (CHRO)</option>
                      <option value="VP of Human Resources / VP People">VP of Human Resources / VP People</option>
                      <option value="Head of People & Operations">Head of People & Operations</option>
                      <option value="Director of HRBP & Talent Strategy">Director of HRBP & Talent Strategy</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                disabled={isGenerating}
                onClick={handleSuggestBlueprint}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg flex items-center space-x-2 disabled:opacity-50 transition-transform transform active:scale-95 whitespace-nowrap"
              >
                {isGenerating ? <i className="fa-solid fa-circle-notch fa-spin text-amber-400"></i> : <i className="fa-solid fa-wand-magic-sparkles text-amber-400"></i>}
                <span>{isGenerating ? 'AI Architecting...' : 'Auto-Suggest Roadmap with Gemini'}</span>
              </button>
            </div>

            {aiAnalysis && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 shrink-0 flex items-start gap-3 animate-in zoom-in-95 duration-300">
                <i className="fa-solid fa-robot text-indigo-500 text-lg mt-0.5"></i>
                <div>
                  <h4 className="text-xs font-bold text-indigo-900 mb-1">Gemini AI Shortfall Analysis</h4>
                  <p className="text-xs text-indigo-800/80 leading-relaxed">{aiAnalysis}</p>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto bg-slate-50 border border-slate-200 rounded-xl p-6 custom-scrollbar relative">
              <div className="absolute left-[39px] top-6 bottom-6 w-0.5 bg-slate-200"></div>
              
              <div className="space-y-6 relative z-10 max-w-4xl">
                {milestones.map((m) => (
                  <div key={m.id} className="flex gap-6 group">
                    <div className="w-16 shrink-0 text-right pt-2">
                      <span className="font-black text-slate-400 text-sm">{m.year}</span>
                    </div>
                    
                    <div className="relative pt-2">
                      <div className="absolute left-[-29px] top-3 w-4 h-4 rounded-full bg-white border-4 border-amber-400 shadow-sm z-10 group-hover:scale-125 group-hover:border-amber-500 transition-transform"></div>
                    </div>

                    <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 shadow-sm group-hover:border-amber-300 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-900 text-base">{m.title}</h4>
                        <div className="flex items-center gap-3">
                          <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-md border border-green-200">
                            {m.ctc}
                          </span>
                          <button onClick={() => handleDeleteMilestone(m.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                            <i className="fa-solid fa-trash-can text-sm"></i>
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{m.notes}</p>
                    </div>
                  </div>
                ))}

                {/* Add Milestone Form */}
                <div className="flex gap-6 pt-4 border-t border-slate-200/60 border-dashed mt-8">
                  <div className="w-16 shrink-0 text-right pt-4">
                    <i className="fa-solid fa-plus text-slate-300 text-xl"></i>
                  </div>
                  
                  <div className="relative pt-4">
                    <div className="absolute left-[-29px] top-5 w-4 h-4 rounded-full bg-slate-100 border-2 border-slate-300 border-dashed z-10"></div>
                  </div>

                  <div className="flex-1 bg-white border border-slate-200 border-dashed rounded-xl p-4">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Add Manual Milestone</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Year</label>
                        <input type="text" value={newYear} onChange={e => setNewYear(e.target.value)} placeholder="e.g. 2028" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"/>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Target Role / Title</label>
                        <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Global HR Director" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"/>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Target CTC</label>
                        <input type="text" value={newCtc} onChange={e => setNewCtc(e.target.value)} placeholder="e.g. ₹55 LPA / $150k" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"/>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Key Focus / Notes</label>
                        <textarea value={newNotes} onChange={e => setNewNotes(e.target.value)} placeholder="e.g. Master ESOP structuring and M&A integration." rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"></textarea>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button 
                        onClick={handleAddMilestone}
                        disabled={!newYear || !newTitle}
                        className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-900 font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition-colors"
                      >
                        <i className="fa-solid fa-plus mr-1.5"></i> Save Milestone
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
