'use client';

import React from 'react';
import { TargetCompany, UserProgress, HRQuestion, SOPPlaybook } from '@/types';

interface DashboardViewProps {
  company: TargetCompany;
  userProgress: UserProgress;
  questions: HRQuestion[];
  sops: SOPPlaybook[];
  resumeText: string;
  storiesCount: number;
  onOpenCheatSheet: () => void;
  onNavigateTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  company,
  userProgress,
  questions,
  sops,
  resumeText,
  storiesCount,
  onOpenCheatSheet,
  onNavigateTab,
}) => {
  const extractJDKeywords = (jd: string) => {
    const keywords = [
      "cNPS", "headhunting", "PF", "ESIC", "Maharashtra Shops", "POSH", "FnF",
      "PIP", "Workday", "Keka", "Cutshort", "Instahyre", "BGV", "React", "Node",
      "Logistics AI", "Mercer", "OKRs", "campus"
    ];
    return keywords.filter((kw) => jd.toLowerCase().includes(kw.toLowerCase()));
  };

  const keywords = extractJDKeywords(company.jd);
  const resumeLower = (resumeText || '').toLowerCase();
  const matchedCount = keywords.filter((kw) => resumeLower.includes(kw.toLowerCase())).length;
  const fitScore = Math.min(98, Math.max(65, Math.round((matchedCount / (keywords.length || 1)) * 100)));

  // Dynamic Questions filtering
  const curatedQuestions = questions.filter(
    (q) => keywords.some((k) => (q.tags || []).includes(k) || q.question.toLowerCase().includes(k.toLowerCase()))
  ).slice(0, 4);

  const finalCuratedQuestions = curatedQuestions.length > 0 ? curatedQuestions : questions.slice(0, 4);

  // Dynamic Software Tools Extraction based on active target company
  const extractedTools = Array.from(
    new Set(
      sops
        .flatMap((s) => s.tools)
        .filter((t) => keywords.some((k) => t.toLowerCase().includes(k.toLowerCase()) || company.jd.toLowerCase().includes(t.toLowerCase())))
    )
  ).slice(0, 5);

  const toolsList = extractedTools.length > 0 ? extractedTools : ["Cutshort", "Keka Payroll", "Workday HRIS", "SpringVerify BGV", "Instahyre"];

  // Dynamic 30-Second Elevator Pitch Generator
  const generateDynamicPitch = () => {
    const defaultPitch = `I am a results-driven HR Lead with hands-on expertise in scaling software organizations. For ${company.name}'s requirement for ${company.role}, I bring proven execution capability across full-cycle tech recruitment, candidate Net Promoter Score (cNPS > +50) optimization, statutory compliance under Maharashtra Shops & Establishments Act, EPF, ESIC, POSH committee setup, monthly payroll processing, leave encashment, FnF settlement payouts, and 30-day PIP implementation.`;

    if (company.type === 'SaaS' || company.name.toLowerCase().includes('quloi')) {
      return `I am a data-driven HR Lead specializing in scaling high-performance SaaS engineering hubs. For ${company.name}'s requirement for ${company.role} in ${company.loc || 'Pune'}, I bring proven expertise in tech recruitment (Node, React, Python, Logistics AI), maintaining cNPS > +50, statutory compliance under Maharashtra Shops & Establishments Act 2017, and fast-turnaround 48-hour FnF settlements alongside executive leadership alignment.`;
    }

    if (company.type === 'Startup' || company.type === 'Unicorn') {
      return `I am an agile HR operations leader built for high-growth tech startups and unicorns. For ${company.name}'s requirement for ${company.role}, I bring proven experience in zero-to-one HR setups, rapid developer headhunting via Cutshort and Instahyre, employee branding on Glassdoor, setting up automated payroll in Keka/Razorpay, and structuring equity/ESOP option grants.`;
    }

    if (company.type === 'Enterprise' || company.name.toLowerCase().includes('tcs') || company.name.toLowerCase().includes('infosys')) {
      return `I am a process-oriented HR Business Partner with experience managing large-scale employee lifecycles. For ${company.name}'s requirement for ${company.role}, I bring hands-on expertise in pan-India compliance, Workday HRIS management, Mercer compensation benchmarking, annual appraisal cycles (KRAs/OKRs), BGV operations via SpringVerify, and statutory audits.`;
    }

    return defaultPitch;
  };

  // Dynamic HR Strategic KPIs & Statutory Briefing Card
  const getDynamicBriefing = () => {
    if (company.type === 'SaaS' || company.name.toLowerCase().includes('quloi')) {
      return {
        kpis: [
          { name: 'Target cNPS', val: '> +50 Score' },
          { name: 'Time-to-Fill (Tech)', val: '< 20 Days' },
          { name: 'FnF Settlement SLA', val: '< 48 Hours' }
        ],
        compliance: 'Requires strict Maharashtra Shops & Est Form N compliance for leaves, EPF basic ceiling cap adjustments at ₹1,800/mo, and local PT slab deductions.',
        tip: 'Focus on developer notice period recovery strategies and setting up the ICC Committee for POSH 2013 compliance.'
      };
    }

    if (company.type === 'Startup' || company.type === 'Unicorn') {
      return {
        kpis: [
          { name: 'Early Turnaround', val: '< 5% (90 days)' },
          { name: 'Sourcing Conversion', val: '> 15% (Invite->HI)' },
          { name: 'Offer Acceptance', val: '> 85%' }
        ],
        compliance: 'Requires setting up Razorpay/Keka automated statutory deductions, basic allowance breakups under Wage Code, and ESOP vesting schedules.',
        tip: 'Highlight employer branding campaigns on LinkedIn/Glassdoor to attract premium tech talent at lean startups.'
      };
    }

    // Default Enterprise
    return {
      kpis: [
        { name: 'Headcount Attrition', val: '< 12% Annual' },
        { name: 'Billing Transition', val: '< 14 Days' },
        { name: 'BGV SLA Clearance', val: '100% within 7 Days' }
      ],
      compliance: 'Requires pan-India statutory compliance tracking, Workday process flow gateways, and Mercer compensation percentile audits.',
      tip: 'Highlight bench optimization models, developer skill re-training strategies, and managing senior employee relations cases.'
    };
  };

  const brief = getDynamicBriefing();

  return (
    <section className="space-y-6">
      {/* Target Company Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 md:p-8 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="bg-blue-600/30 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                Active Target Company
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full font-semibold">
                JD Match Fit: {fitScore}%
              </span>
              <span className="bg-purple-500/20 text-purple-300 border border-purple-400/30 px-3 py-1 rounded-full font-semibold">
                {company.type}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">{company.name}</h1>
            <p className="text-sm md:text-base text-slate-300 font-medium">{company.role} &bull; {company.loc}</p>

            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <strong className="text-slate-300 block mb-0.5">Job Description Excerpt:</strong>
              {company.jd}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={onOpenCheatSheet}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-3 rounded-xl shadow-lg transition-all text-xs flex items-center justify-center space-x-2"
            >
              <i className="fa-solid fa-file-lines text-base"></i>
              <span>Open Executive Cheat Sheet</span>
            </button>

            <button
              onClick={() => onNavigateTab('company-manager')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-5 py-3 rounded-xl border border-slate-700 transition-all text-xs flex items-center justify-center space-x-2"
            >
              <i className="fa-solid fa-arrows-rotate text-sm"></i>
              <span>Switch Target Company</span>
            </button>
          </div>
        </div>
      </div>

      {/* Universal Progress Tracker */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <i className="fa-solid fa-chart-pie text-indigo-600"></i>
              Universal Mastery Tracker
            </h2>
            <p className="text-xs text-slate-500">Track your overall curriculum completion</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-indigo-600">
              {Math.round(
                ((userProgress.mastered.length +
                  userProgress.sopsRead.length +
                  userProgress.labCompleted.length +
                  (userProgress.analyticsCompleted?.length || 0) +
                  (userProgress.youtubeCompleted?.length || 0) +
                  (userProgress.toolsCompleted?.length || 0) +
                  (userProgress.commCompleted?.length || 0)) /
                  (120 + 24 + 15 + 100 + 50 + 30 + 12)) *
                  100
              )}%
            </span>
            <span className="text-xs text-slate-500 block font-bold uppercase tracking-widest">Platform Complete</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden flex">
          <div 
            className="bg-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${Math.round(((userProgress.mastered.length + userProgress.sopsRead.length + userProgress.labCompleted.length + (userProgress.analyticsCompleted?.length || 0) + (userProgress.youtubeCompleted?.length || 0) + (userProgress.toolsCompleted?.length || 0) + (userProgress.commCompleted?.length || 0)) / (120 + 24 + 15 + 100 + 50 + 30 + 12)) * 100)}%` }}
          ></div>
        </div>

        {/* Module Target Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase mb-1">
              <span>HR Analytics</span>
              <span>100 Modules</span>
            </div>
            <div className="text-sm font-bold text-slate-900">
              {(userProgress.analyticsCompleted?.length || 0)} / 100 <span className="text-[10px] font-normal text-slate-500 ml-1">Completed</span>
            </div>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase mb-1">
              <span>HR Tools</span>
              <span>30 Platforms</span>
            </div>
            <div className="text-sm font-bold text-slate-900">
              {(userProgress.toolsCompleted?.length || 0)} / 30 <span className="text-[10px] font-normal text-slate-500 ml-1">Mastered</span>
            </div>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase mb-1">
              <span>Executive Comm</span>
              <span>12 Pillars</span>
            </div>
            <div className="text-sm font-bold text-slate-900">
              {(userProgress.commCompleted?.length || 0)} / 12 <span className="text-[10px] font-normal text-slate-500 ml-1">Mastered</span>
            </div>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase mb-1">
              <span>YouTube Library</span>
              <span>50 Videos</span>
            </div>
            <div className="text-sm font-bold text-slate-900">
              {(userProgress.youtubeCompleted?.length || 0)} / 50 <span className="text-[10px] font-normal text-slate-500 ml-1">Watched</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-xs font-semibold block uppercase tracking-wider">Questions Mastered</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {userProgress.mastered.length} <span className="text-xs text-slate-400 font-normal">/ {questions.length}</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">
              {Math.round((userProgress.mastered.length / (questions.length || 1)) * 100)}% Mastered
            </span>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl font-bold">
            <i className="fa-solid fa-circle-check"></i>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-xs font-semibold block uppercase tracking-wider">SOPs Mastered</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {userProgress.sopsRead.length} <span className="text-xs text-slate-400 font-normal">/ {sops.length}</span>
            </div>
            <span className="text-[11px] text-purple-600 font-medium">
              {Math.round((userProgress.sopsRead.length / (sops.length || 1)) * 100)}% Read & Mastered
            </span>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl font-bold">
            <i className="fa-solid fa-book-bookmark"></i>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-xs font-semibold block uppercase tracking-wider">STAR Behavioral Stories</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {storiesCount} <span className="text-xs text-slate-400 font-normal">Stories Compiled</span>
            </div>
            <span className="text-[11px] text-blue-600 font-medium">SOP Roleplay ready</span>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl font-bold">
            <i className="fa-solid fa-star"></i>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-xs font-semibold block uppercase tracking-wider">Preparation Streak</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {userProgress.streakDays} <span className="text-xs text-slate-400 font-normal">Days Active</span>
            </div>
            <span className="text-[11px] text-amber-600 font-medium">🔥 Active Prep Habit</span>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl font-bold">
            <i className="fa-solid fa-fire"></i>
          </div>
        </div>
      </div>

      {/* Dynamic 30-Second Elevator Pitch & Software Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-microphone-lines text-blue-600 text-lg"></i>
              <h2 className="text-base font-bold text-slate-900">Customized 30-Second Elevator Pitch</h2>
            </div>
            <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200">
              For {company.name}
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs leading-relaxed text-slate-700 font-medium">
            <p className="whitespace-pre-line leading-relaxed">
              &ldquo;{generateDynamicPitch()}&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs pt-1">
            <button
              onClick={() => onNavigateTab('questions')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg shadow text-xs flex items-center space-x-1.5"
            >
              <i className="fa-solid fa-list-check"></i>
              <span>Start Question Practice</span>
            </button>
            <button
              onClick={() => onNavigateTab('quiz')}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2 rounded-lg shadow text-xs flex items-center space-x-1.5"
            >
              <i className="fa-solid fa-robot"></i>
              <span>Launch AI Mock Interview</span>
            </button>
          </div>
        </div>

        {/* Dynamic HR Strategic KPIs & Statutory Briefing */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b pb-3 flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-900">Operational Target KPIs</h2>
            <i className="fa-solid fa-chart-line text-indigo-600"></i>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {brief.kpis.map((kpi, i) => (
              <div key={i} className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-center">
                <span className="text-[10px] text-slate-500 block font-semibold leading-tight">{kpi.name}</span>
                <span className="text-xs font-extrabold text-slate-900 block mt-1">{kpi.val}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2.5 pt-2 border-t">
            <div className="text-xs">
              <span className="font-bold text-slate-800 block mb-0.5">Statutory Focus:</span>
              <p className="text-slate-600 leading-relaxed">{brief.compliance}</p>
            </div>
            <div className="text-xs bg-indigo-50 p-2.5 rounded-lg border border-indigo-100 text-indigo-950">
              <span className="font-bold text-indigo-900 block mb-0.5">Strategic HRBP Action Tip:</span>
              <p className="font-medium">{brief.tip}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Software Tools Stack & Curated Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Software Tools Stack */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b pb-3 flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-900">Core HR Software Tools</h2>
            <i className="fa-solid fa-laptop-code text-indigo-600"></i>
          </div>

          <p className="text-xs text-slate-500">
            Key software stack and platforms required for target company operations:
          </p>

          <div className="space-y-2">
            {toolsList.map((tool, i) => (
              <div key={i} className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <span className="font-semibold text-slate-800">{tool}</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  Required Stack
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Target Curated Questions Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Curated Interview Questions for {company.name}</h2>
              <p className="text-xs text-slate-500">Targeted high-probability questions matching company job requirements.</p>
            </div>
            <button
              onClick={() => onNavigateTab('questions')}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center space-x-1"
            >
              <span>View All {questions.length} Questions</span>
              <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {finalCuratedQuestions.map((q) => (
              <div key={q.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {q.domain}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">ID: #{q.id}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs line-clamp-2">{q.question}</h3>
                </div>

                <button
                  onClick={() => onNavigateTab('questions')}
                  className="text-[11px] font-bold text-blue-600 hover:underline pt-2 border-t border-slate-200 text-left"
                >
                  Practice Answer Model &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
