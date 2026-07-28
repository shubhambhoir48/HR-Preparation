'use client';

import React from 'react';
import { TargetCompany, UserProgress, HRQuestion, SOPPlaybook } from '@/types';

interface DashboardViewProps {
  company: TargetCompany;
  userProgress: UserProgress;
  questions: HRQuestion[];
  sops: SOPPlaybook[];
  resumeText: string;
  onOpenCheatSheet: () => void;
  onNavigateTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  company,
  userProgress,
  questions,
  sops,
  resumeText,
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

  const curatedQuestions = questions.filter(
    (q) => keywords.some((k) => (q.tags || []).includes(k) || q.question.toLowerCase().includes(k.toLowerCase()))
  ).slice(0, 4);

  const finalCuratedQuestions = curatedQuestions.length > 0 ? curatedQuestions : questions.slice(0, 4);

  // Dynamic Software Tools Extraction
  const extractedTools = Array.from(
    new Set(
      sops
        .flatMap((s) => s.tools)
        .filter((t) => keywords.some((k) => t.toLowerCase().includes(k.toLowerCase()) || company.jd.toLowerCase().includes(t.toLowerCase())))
    )
  ).slice(0, 5);

  const toolsList = extractedTools.length > 0 ? extractedTools : ["Cutshort", "Keka Payroll", "Workday HRIS", "SpringVerify BGV", "Instahyre"];

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
            <span className="text-slate-500 text-xs font-semibold block uppercase tracking-wider">JD Keywords Matched</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {keywords.length} <span className="text-xs text-slate-400 font-normal">Core Keywords</span>
            </div>
            <span className="text-[11px] text-blue-600 font-medium">{keywords.slice(0, 3).join(', ')}</span>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl font-bold">
            <i className="fa-solid fa-key"></i>
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

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs leading-relaxed text-slate-700 font-medium space-y-2">
            <p>
              &ldquo;I am a results-driven HR Lead with hands-on expertise in scaling software organizations. For <strong>{company.name}</strong>&apos;s requirement for <strong>{company.role}</strong>, I bring proven execution capability across full-cycle tech recruitment, candidate Net Promoter Score (cNPS &gt; +50) optimization, statutory compliance under Maharashtra Shops & Establishments Act 2017, EPF, ESIC, POSH committee setup, monthly payroll processing, leave encashment, FnF settlement payouts, and 30-day PIP implementation.&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs pt-1">
            <button
              onClick={() => onNavigateTab('questions')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg shadow text-xs flex items-center space-x-1.5"
            >
              <i className="fa-solid fa-list-check"></i>
              <span>Start 500+ Question Practice</span>
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
      </div>

      {/* Target Curated Questions Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
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
                <h3 className="font-bold text-slate-900 text-xs">{q.question}</h3>
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
    </section>
  );
};
