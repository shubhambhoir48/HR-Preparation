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
    const found = keywords.filter((kw) => jd.toLowerCase().includes(kw.toLowerCase()));
    return found.length > 0 ? found : ["Full-Cycle HR", "Statutory Compliance", "Recruitment", "Payroll", "ER"];
  };

  const keywords = extractJDKeywords(company.jd);
  const resumeLower = resumeText.toLowerCase();
  const matchedCount = keywords.filter((kw) => resumeLower.includes(kw.toLowerCase())).length;
  const fitScore = Math.min(98, Math.max(65, Math.round((matchedCount / keywords.length) * 100)));

  const curatedQuestions = questions.slice(0, 4);

  return (
    <section className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 rounded-2xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-blue-500/30 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <i className="fa-solid fa-bullseye text-amber-400"></i>
            <span>Active Target: <span>{company.name}</span></span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Ace Your HR Interview & Master Operations
          </h2>
          <p className="text-blue-100 text-xs md:text-sm mt-2 leading-relaxed">
            Personalized interview preparation powered by Gemini AI tailored specifically to {company.name}. Master 50+ granular HR processes across startups and MNCs, statutory compliance, payroll precision, and custom STAR interview pitch scripts.
          </p>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={onOpenCheatSheet}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-3 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 text-xs uppercase tracking-wide"
          >
            <i className="fa-solid fa-file-pdf"></i>
            <span>Company Prep Cheat Sheet</span>
          </button>
          <button
            onClick={() => onNavigateTab('playbook')}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-4 py-3 rounded-xl transition-all text-xs flex items-center justify-center space-x-2"
          >
            <i className="fa-solid fa-book-open text-amber-400"></i>
            <span>Explore 50+ SOPs</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Target Role Fit</span>
            <i className="fa-solid fa-bullseye text-blue-500"></i>
          </div>
          <div className="text-3xl font-extrabold text-blue-600">{fitScore}%</div>
          <p className="text-xs text-slate-500 mt-1">Matches {matchedCount}/{keywords.length} Skills in JD</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Mastered Qs</span>
            <i className="fa-solid fa-circle-check text-emerald-500"></i>
          </div>
          <div className="text-3xl font-extrabold text-emerald-600">
            {userProgress.mastered.length} / {questions.length}
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.round((userProgress.mastered.length / (questions.length || 1)) * 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Process SOPs Learned</span>
            <i className="fa-solid fa-book text-purple-500"></i>
          </div>
          <div className="text-3xl font-extrabold text-purple-600">
            {userProgress.sopsRead.length} / {sops.length}
          </div>
          <p className="text-xs text-slate-500 mt-1">Startup vs Enterprise Workflows</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Cloud Data Status</span>
            <i className="fa-solid fa-cloud text-amber-500"></i>
          </div>
          <div className="text-xl font-extrabold text-amber-600 flex items-center gap-2 pt-1">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            <span>Netlify Blobs</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Realtime Cloud Storage</p>
        </div>
      </div>

      {/* Active Target Company JD & Curated Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Target Company: {company.name}</h3>
              <p className="text-xs text-slate-500">Job Description & Curated Interview Focus Areas</p>
            </div>
            <button
              onClick={() => onNavigateTab('company-manager')}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg border border-slate-300"
            >
              Switch Company
            </button>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex flex-wrap gap-2 text-slate-600 mb-2">
              <span>
                <i className="fa-solid fa-globe text-blue-600 mr-1"></i>
                <a href={company.web} target="_blank" rel="noreferrer" className="hover:underline font-semibold text-blue-700">
                  {company.web.replace('https://', '')}
                </a>
              </span>
              <span>&bull;</span>
              <span>
                <i className="fa-solid fa-location-dot text-rose-500 mr-1"></i>
                <span>{company.loc}</span>
              </span>
              <span>&bull;</span>
              <span>
                <i className="fa-solid fa-user-tie text-indigo-600 mr-1"></i>
                <span>{company.role}</span>
              </span>
            </div>

            <strong className="text-slate-800 block">Extracted JD Keywords & Focus Domains:</strong>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {keywords.map((kw) => (
                <span key={kw} className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Curated Recommended Questions for this Company:
            </h4>
            <div className="space-y-2">
              {curatedQuestions.map((q) => (
                <div key={q.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
                  <span className="bg-blue-50 text-blue-800 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase mr-1">
                    {q.domain}
                  </span>
                  <strong className="text-slate-900">{q.question}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Custom Company Elevator Pitch */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-2 text-blue-700 font-bold mb-3 text-sm">
              <i className="fa-solid fa-lightbulb"></i>
              <span>Targeted Elevator Pitch Script</span>
            </div>
            <div className="bg-blue-50 p-3.5 rounded-xl border border-blue-200 text-xs text-slate-700 leading-relaxed italic">
              “I am a results-oriented HR Generalist with hands-on experience building scaling people frameworks. For {company.name}&apos;s requirement for {company.role}, I bring proven expertise in tech recruitment, cNPS optimization, statutory compliance (Maharashtra Shops & Est, PF, ESIC, POSH), full-cycle payroll/FnF, and structured 30-day PIP execution aligned with leadership expectations.”
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
              <strong className="text-slate-800 block font-semibold">Key Software Tools to Mention:</strong>
              <div className="flex flex-wrap gap-1 text-[11px]">
                {["LinkedIn Recruiter", "Keka", "Razorpay Payroll", "SpringVerify", "DocuSign", "Workday"].map((t) => (
                  <span key={t} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono border border-slate-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => onNavigateTab('quiz')}
              className="w-full text-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Start AI Mock Interview for this Company &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
