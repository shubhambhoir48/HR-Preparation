'use client';

import React, { useState } from 'react';
import { SOPPlaybook } from '@/types';
import { callGeminiAI } from '@/lib/gemini';

interface PlaybooksViewProps {
  sops: SOPPlaybook[];
  sopsRead: number[];
  onToggleSOPRead: (id: number) => void;
}

export const PlaybooksView: React.FC<PlaybooksViewProps> = ({
  sops,
  sopsRead,
  onToggleSOPRead,
}) => {
  const [catFilter, setCatFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  // Interactive Checklist State: Record<sopId, number[]> of checked step indexes
  const [checkedSteps, setCheckedSteps] = useState<Record<number, number[]>>({});

  // Simulation Sandbox State
  const [activeSimId, setActiveSimId] = useState<number | null>(null);
  const [simResponse, setSimResponse] = useState<Record<number, string>>({});
  const [simFeedback, setSimFeedback] = useState<Record<number, string>>({});
  const [isSimulating, setIsSimulating] = useState(false);

  // Quiz Challenge State
  const [activeQuizId, setActiveQuizId] = useState<number | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Record<number, string>>({});
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);

  const filtered = sops.filter((p) => {
    const matchCat = catFilter === 'ALL' || p.cat === catFilter;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.startupWay.toLowerCase().includes(search.toLowerCase()) ||
      p.enterpriseWay.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleToggleCheckStep = (sopId: number, stepIdx: number) => {
    const current = checkedSteps[sopId] || [];
    const updated = current.includes(stepIdx)
      ? current.filter((i) => i !== stepIdx)
      : [...current, stepIdx];

    setCheckedSteps((prev) => ({ ...prev, [sopId]: updated }));
  };

  const handleLaunchSimulation = async (sop: SOPPlaybook) => {
    if (activeSimId === sop.id) {
      setActiveSimId(null);
      return;
    }
    setActiveSimId(sop.id);
  };

  const handleRunSimFeedback = async (sop: SOPPlaybook) => {
    const userAns = simResponse[sop.id] || '';
    if (!userAns.trim()) return;

    setIsSimulating(true);

    const prompt = `Act as an executive HR VP / Board Director. Evaluate candidate Priyanka Vartak's operational response in this real-world SOP roleplay scenario:\n\nSOP Category: ${sop.cat}\nSOP Title: "${sop.title}"\nSOP Execution Checklist: ${sop.steps.join('; ')}\n\nCandidate Scenario Response:\n"${userAns}"\n\nProvide Evaluation Report:\n1. HR Leadership & Tactical Decision Score (1-10)\n2. Candidate/Employee Sentiment Impact\n3. Statutory & Organizational Compliance Risk Score\n4. Recommended A-Grade Executive Strategy.`;

    const result = await callGeminiAI(prompt);
    setIsSimulating(false);

    setSimFeedback((prev) => ({
      ...prev,
      [sop.id]: result || 'Scenario evaluation completed.',
    }));
  };

  const handleGenerateQuiz = async (sop: SOPPlaybook) => {
    if (activeQuizId === sop.id) {
      setActiveQuizId(null);
      return;
    }

    setActiveQuizId(sop.id);
    if (quizQuestions[sop.id]) return;

    setIsGeneratingQuiz(true);

    const prompt = `Act as a Senior HR Auditor. Generate a 3-question interactive rapid-fire quiz testing candidate knowledge for the SOP "${sop.title}" (${sop.cat}):\nSteps: ${sop.steps.join('; ')}\nTools: ${sop.tools.join(', ')}\n\nFormat: 3 clear multiple-choice questions with answer keys and statutory explanations.`;

    const result = await callGeminiAI(prompt);
    setIsGeneratingQuiz(false);

    setQuizQuestions((prev) => ({
      ...prev,
      [sop.id]: result || 'Quiz generated.',
    }));
  };

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              End-to-End Operational SOP Execution Engine
            </span>
            <h2 className="text-2xl font-bold text-slate-900">50+ Interactive HR Process Playbooks</h2>
            <p className="text-xs text-slate-500 mt-1">
              Step-by-step SOP execution checklists, interactive scenario roleplay sandbox, and Gemini AI rapid-fire quizzes for Startups vs Top IT Enterprise MNCs.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Process Categories (50+ SOPs)</option>
              <option value="Recruitment & Sourcing">1. Recruitment & Sourcing (10 SOPs)</option>
              <option value="Headhunting & Niche Executive Search">2. Headhunting & Executive Search (6 SOPs)</option>
              <option value="Onboarding & Pre-boarding">3. Onboarding & Pre-boarding (6 SOPs)</option>
              <option value="Statutory & Labor Law Compliance">4. Statutory & Labor Laws (7 SOPs)</option>
              <option value="Payroll, CTC & FnF Offboarding">5. Payroll & FnF Offboarding (6 SOPs)</option>
              <option value="Performance Management & PIP">6. Performance & PIP (6 SOPs)</option>
              <option value="Employee Relations & POSH Inquiry">7. ER & POSH Inquiry (5 SOPs)</option>
              <option value="HRIS Stack & HR Analytics">8. HRIS Stack & Analytics (5 SOPs)</option>
            </select>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-slate-400 text-xs"></i>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search process (e.g. Headhunting React developers, POSH Inquiry, Full & Final settlement, Background Check, EPF registration)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Playbook Cards */}
        <div className="space-y-5">
          {filtered.length === 0 ? (
            <div className="bg-slate-50 p-8 rounded-xl text-center text-xs text-slate-500">
              No SOP playbooks found matching search criteria.
            </div>
          ) : (
            filtered.map((p) => {
              const isRead = sopsRead.includes(p.id);
              const doneIndices = checkedSteps[p.id] || [];
              const progressPct = Math.round((doneIndices.length / (p.steps.length || 1)) * 100);

              const isSimActive = activeSimId === p.id;
              const isQuizActive = activeQuizId === p.id;

              return (
                <div key={p.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                  {/* SOP Header & Badge */}
                  <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                          {p.cat}
                        </span>
                        <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">
                          {progressPct === 100 ? '⭐ SOP Mastered' : `${progressPct}% Checklist Practiced`}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-1">{p.title}</h3>
                    </div>

                    <button
                      onClick={() => onToggleSOPRead(p.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors ${
                        isRead
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <i className="fa-solid fa-circle-check mr-1"></i>
                      {isRead ? 'Read & Mastered' : 'Mark Learned'}
                    </button>
                  </div>

                  {/* Startup vs Enterprise Execution Blueprint */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/60 space-y-1">
                      <strong className="text-amber-900 font-bold block flex items-center space-x-1">
                        <i className="fa-solid fa-rocket text-amber-600"></i>
                        <span>Agile Startup Execution Stack:</span>
                      </strong>
                      <p className="text-slate-700 leading-relaxed">{p.startupWay}</p>
                    </div>

                    <div className="bg-indigo-50/60 p-3.5 rounded-xl border border-indigo-200/60 space-y-1">
                      <strong className="text-indigo-900 font-bold block flex items-center space-x-1">
                        <i className="fa-solid fa-building-columns text-indigo-600"></i>
                        <span>Top IT Enterprise / MNC Stack:</span>
                      </strong>
                      <p className="text-slate-700 leading-relaxed">{p.enterpriseWay}</p>
                    </div>
                  </div>

                  {/* Interactive Step-by-Step SOP Execution Checklist */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
                    <div className="flex justify-between items-center">
                      <strong className="text-slate-900 font-bold">Interactive Step-by-Step SOP Execution Checklist:</strong>
                      <span className="text-[11px] text-emerald-700 font-bold">
                        {doneIndices.length} / {p.steps.length} Steps Completed
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div
                        className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      ></div>
                    </div>

                    <div className="space-y-2 pt-1">
                      {p.steps.map((s, idx) => {
                        const isChecked = doneIndices.includes(idx);
                        return (
                          <label
                            key={idx}
                            onClick={() => handleToggleCheckStep(p.id, idx)}
                            className={`flex items-start space-x-2.5 p-2 rounded-lg border cursor-pointer transition-all ${
                              isChecked
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="mt-0.5 accent-emerald-600 rounded"
                            />
                            <span className="text-xs leading-snug">{s}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Interactive Action Buttons: Simulator & Quiz */}
                  <div className="flex flex-wrap gap-2 pt-1 text-xs">
                    <button
                      onClick={() => handleLaunchSimulation(p)}
                      className={`px-3.5 py-2 rounded-lg font-bold flex items-center space-x-1.5 transition-all shadow-sm ${
                        isSimActive
                          ? 'bg-purple-700 text-white'
                          : 'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100'
                      }`}
                    >
                      <i className="fa-solid fa-gamepad"></i>
                      <span>{isSimActive ? 'Close Roleplay Simulator' : 'Launch Live SOP Roleplay Sandbox'}</span>
                    </button>

                    <button
                      onClick={() => handleGenerateQuiz(p)}
                      className={`px-3.5 py-2 rounded-lg font-bold flex items-center space-x-1.5 transition-all shadow-sm ${
                        isQuizActive
                          ? 'bg-cyan-700 text-white'
                          : 'bg-cyan-50 text-cyan-700 border border-cyan-200 hover:bg-cyan-100'
                      }`}
                    >
                      <i className="fa-solid fa-clipboard-question"></i>
                      <span>{isQuizActive ? 'Hide SOP Quiz' : 'Take Rapid SOP AI Quiz'}</span>
                    </button>
                  </div>

                  {/* 1. Live SOP Roleplay Sandbox */}
                  {isSimActive && (
                    <div className="bg-purple-950 text-purple-100 p-4 rounded-xl border border-purple-800 space-y-3 text-xs">
                      <div className="flex justify-between items-center border-b border-purple-800 pb-2">
                        <strong className="text-amber-300 font-bold flex items-center space-x-2">
                          <i className="fa-solid fa-robot"></i>
                          <span>Interactive SOP Roleplay Simulator: {p.title}</span>
                        </strong>
                        <span className="bg-purple-800 text-purple-200 text-[10px] font-bold px-2 py-0.5 rounded">
                          Gemini AI Powered
                        </span>
                      </div>

                      <p className="text-purple-200 leading-relaxed">
                        <strong className="text-amber-200">Scenario Simulation:</strong> You are the HR Lead handling a complex workplace scenario under this SOP. Type your real-time strategic decision below to test candidate sentiment and legal risk.
                      </p>

                      <textarea
                        value={simResponse[p.id] || ''}
                        onChange={(e) => setSimResponse((prev) => ({ ...prev, [p.id]: e.target.value }))}
                        rows={3}
                        placeholder="Type your strategic HR action or verbal response here..."
                        className="w-full p-2.5 bg-purple-900/80 border border-purple-700 rounded-lg text-xs text-white placeholder-purple-400 font-mono"
                      ></textarea>

                      <button
                        disabled={isSimulating || !(simResponse[p.id] || '').trim()}
                        onClick={() => handleRunSimFeedback(p)}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-2 rounded-lg text-xs shadow flex items-center justify-center space-x-2 disabled:opacity-50"
                      >
                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                        <span>{isSimulating ? 'Evaluating Decision...' : 'Evaluate HR Scenario Decision'}</span>
                      </button>

                      {simFeedback[p.id] && (
                        <div className="bg-slate-900 text-slate-100 p-3.5 rounded-lg border border-slate-800 text-xs font-mono whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto mt-2">
                          <strong className="text-emerald-400 block border-b border-slate-800 pb-1 mb-1">
                            Evaluation Report & Risk Analysis:
                          </strong>
                          {simFeedback[p.id]}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 2. Rapid SOP AI Quiz */}
                  {isQuizActive && (
                    <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 space-y-3 text-xs font-mono">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <strong className="text-cyan-400 font-bold flex items-center space-x-2">
                          <i className="fa-solid fa-circle-question"></i>
                          <span>Rapid SOP Knowledge Quiz: {p.title}</span>
                        </strong>
                      </div>

                      {isGeneratingQuiz ? (
                        <div className="text-slate-400 py-4 text-center animate-pulse">
                          Generating AI Quiz Questions...
                        </div>
                      ) : (
                        <div className="whitespace-pre-line leading-relaxed max-h-60 overflow-y-auto">
                          {quizQuestions[p.id]}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Platform Badges */}
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500 pt-1">
                    <strong>Platforms & Tools:</strong>
                    {p.tools.map((t, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 font-mono px-2 py-0.5 rounded border">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
