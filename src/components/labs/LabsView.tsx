'use client';

import React, { useState } from 'react';
import { HRLab } from '@/types';
import { callGeminiAI } from '@/lib/gemini';

interface LabsViewProps {
  labs: HRLab[];
  labCompleted: number[];
  onToggleLabCompleted: (id: number) => void;
}

export const LabsView: React.FC<LabsViewProps> = ({
  labs,
  labCompleted,
  onToggleLabCompleted,
}) => {
  const [catFilter, setCatFilter] = useState('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const [openSolutions, setOpenSolutions] = useState<Record<number, boolean>>({});
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [aiFeedbacks, setAiFeedbacks] = useState<Record<number, string>>({});
  const [evaluatingLabId, setEvaluatingLabId] = useState<number | null>(null);

  const filtered = labs.filter((lab) => {
    const matchesCat = catFilter === 'ALL' || lab.category === catFilter;
    const matchesDiff = difficultyFilter === 'ALL' || lab.difficulty === difficultyFilter;
    
    let matchesStatus = true;
    const isDone = labCompleted.includes(lab.id);
    if (statusFilter === 'completed') matchesStatus = isDone;
    if (statusFilter === 'pending') matchesStatus = !isDone;

    const matchesSearch =
      lab.title.toLowerCase().includes(search.toLowerCase()) ||
      lab.scenario.toLowerCase().includes(search.toLowerCase()) ||
      lab.task.toLowerCase().includes(search.toLowerCase());

    return matchesCat && matchesDiff && matchesStatus && matchesSearch;
  });

  const toggleSolution = (id: number) => {
    setOpenSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleInputChange = (id: number, val: string) => {
    setUserInputs((prev) => ({ ...prev, [id]: val }));
  };

  const handleGradeSolution = async (lab: HRLab) => {
    const input = userInputs[lab.id] || '';
    if (!input.trim()) return;

    setEvaluatingLabId(lab.id);

    const prompt = `Act as a Senior HR Operations Lead. Evaluate candidate Priyanka Vartak's practical submission for HR Deliverable Project #${lab.id} (${lab.title}):\n\nScenario:\n"${lab.scenario}"\n\nProject Task:\n"${lab.task}"\n\nCandidate Submission:\n"${input}"\n\nBenchmark Solution Reference:\n"${lab.solution}"\n\nProvide Evaluation Report:\n1. Practical Execution Score (1-10)\n2. Correct Steps & Technical Nuances Identified\n3. Missing Statutory / Compliance Steps\n4. Recommended A-Grade Executive Strategy.`;

    const result = await callGeminiAI(prompt);
    setEvaluatingLabId(null);

    setAiFeedbacks((prev) => ({
      ...prev,
      [lab.id]: result || 'Evaluation completed successfully.',
    }));
  };

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">100 Practical HR Deliverable Work Projects</span>
            <h2 className="text-2xl font-bold text-slate-900">Hands-on HR Projects & Operational Work Labs</h2>
            <p className="text-xs text-slate-500 mt-1">
              Solve 100 real-world workplace HR projects: payroll FnF calculations, PIP notices, statutory filings, and compensation banding benchmarks with live Gemini AI grading.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-purple-200">
              {labCompleted.length} / {labs.length} Projects Completed ({Math.round((labCompleted.length / (labs.length || 1)) * 100)}%)
            </span>
          </div>
        </div>

        {/* Rich Multi-Attribute Filters & Search Bar */}
        <div className="space-y-3">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-slate-400 text-xs"></i>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects (e.g. FnF calculation, PIP notice, POSH inquiry, EPF capping, Gratuity, Cutshort)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* Category Filter */}
            <select
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-purple-500"
            >
              <option value="ALL">All Deliverable Categories (100 Projects)</option>
              <option value="Payroll & Statutory">Payroll & Statutory</option>
              <option value="Policy & Drafts">Policy & Drafts</option>
              <option value="Strategy & Engagement">Strategy & Engagement</option>
              <option value="Recruitment & Tech Sourcing">Recruitment & Tech Sourcing</option>
              <option value="Performance & PIP">Performance & PIP</option>
              <option value="Employee Relations & Offboarding">Employee Relations & Offboarding</option>
            </select>

            {/* Difficulty Filter */}
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-purple-500"
            >
              <option value="ALL">All Project Difficulties</option>
              <option value="Foundational">Foundational Projects</option>
              <option value="Intermediate">Intermediate Projects</option>
              <option value="Executive Lead">Executive Lead Projects</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-purple-500"
            >
              <option value="ALL">All Project Statuses</option>
              <option value="completed">Completed Projects</option>
              <option value="pending">Pending Projects</option>
            </select>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
            <span>Showing {filtered.length} of {labs.length} total projects</span>
            <button
              onClick={() => {
                setSearch('');
                setCatFilter('ALL');
                setDifficultyFilter('ALL');
                setStatusFilter('ALL');
              }}
              className="text-purple-600 font-bold hover:underline"
            >
              Reset Project Filters
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((lab) => {
            const isDone = labCompleted.includes(lab.id);
            const showSol = !!openSolutions[lab.id];
            const feedback = aiFeedbacks[lab.id];
            const isGrading = evaluatingLabId === lab.id;

            return (
              <div key={lab.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap justify-between items-start gap-2 border-b border-slate-100 pb-2">
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                      <span className="bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded uppercase">
                        {lab.category}
                      </span>
                      {lab.difficulty && (
                        <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                          {lab.difficulty}
                        </span>
                      )}
                      {lab.estimatedTime && (
                        <span className="bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded">
                          <i className="fa-regular fa-clock mr-1"></i>{lab.estimatedTime}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onToggleLabCompleted(lab.id)}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                        isDone ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <i className="fa-solid fa-circle-check mr-1"></i>
                      {isDone ? 'Completed' : 'Mark Done'}
                    </button>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm">{lab.title}</h3>

                  {lab.projectOutcome && (
                    <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200 font-semibold flex items-center gap-1.5">
                      <i className="fa-solid fa-trophy text-emerald-600"></i>
                      <span>Project Outcome: {lab.projectOutcome}</span>
                    </div>
                  )}

                  <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border">
                    <strong className="text-slate-800 block text-[11px]">Real-World Scenario:</strong>
                    {lab.scenario}
                  </div>

                  <div className="text-xs text-slate-700">
                    <strong className="text-purple-900 block text-[11px] font-bold">Your Deliverable Project Task:</strong>
                    {lab.task}
                  </div>

                  {/* Interactive Hands-On Solution Workspace */}
                  <div className="space-y-2 pt-1">
                    <label className="block text-[11px] font-semibold text-slate-700">
                      Attempt Your Practical Solution / Calculation:
                    </label>
                    <textarea
                      value={userInputs[lab.id] || ''}
                      onChange={(e) => handleInputChange(lab.id, e.target.value)}
                      rows={3}
                      placeholder="Type your project solution, step-by-step math, or policy draft here to test your skills..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                    ></textarea>
                    <button
                      disabled={isGrading || !(userInputs[lab.id] || '').trim()}
                      onClick={() => handleGradeSolution(lab)}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg text-xs shadow flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <i className="fa-solid fa-wand-magic-sparkles"></i>
                      <span>{isGrading ? 'Grading with Gemini AI...' : 'Submit & Grade Project with Gemini AI'}</span>
                    </button>
                  </div>

                  {/* AI Evaluation Report */}
                  {feedback && (
                    <div className="bg-slate-900 text-slate-100 p-3.5 rounded-xl border border-slate-800 text-xs font-mono leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto">
                      <strong className="text-amber-300 block text-[11px] border-b border-slate-800 pb-1 mb-1">
                        Gemini AI Evaluation Report:
                      </strong>
                      {feedback}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                  <button
                    onClick={() => toggleSolution(lab.id)}
                    className="text-xs text-purple-600 font-bold hover:underline flex items-center space-x-1"
                  >
                    <i className="fa-solid fa-eye text-xs"></i>
                    <span>{showSol ? 'Hide Benchmark Solution' : 'View Benchmark Solution'}</span>
                  </button>

                  <span className="text-[10px] text-slate-400 font-semibold">Project #{lab.id}</span>
                </div>

                {showSol && (
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-xs text-purple-950 whitespace-pre-line font-mono">
                    {lab.solution}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
