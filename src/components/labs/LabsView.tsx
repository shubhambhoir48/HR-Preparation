'use client';

import React, { useState } from 'react';
import { HRLab } from '@/types';

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
  const [openSolutions, setOpenSolutions] = useState<Record<number, boolean>>({});

  const filtered = labs.filter((l) => catFilter === 'ALL' || l.category === catFilter);

  const toggleSolution = (id: number) => {
    setOpenSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Hands-on Deliverables</span>
            <h2 className="text-2xl font-bold text-slate-900">25 Practical HR Deliverable Labs</h2>
            <p className="text-xs text-slate-500 mt-1">
              Solve real-world workplace scenarios: payroll FnF calculations, PIP notices, statutory filings, and compensation banding benchmarks.
            </p>
          </div>

          <div>
            <select
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-purple-500"
            >
              <option value="ALL">All Deliverable Categories (25 Labs)</option>
              <option value="Payroll & Statutory">Payroll & Statutory</option>
              <option value="Policy & Drafts">Policy & Drafts</option>
              <option value="Strategy & Engagement">Strategy & Engagement</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((lab) => {
            const isDone = labCompleted.includes(lab.id);
            const showSol = !!openSolutions[lab.id];

            return (
              <div key={lab.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {lab.category}
                    </span>
                    <button
                      onClick={() => onToggleLabCompleted(lab.id)}
                      className={`px-2.5 py-1 rounded text-xs font-bold ${
                        isDone ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <i className="fa-solid fa-circle-check mr-1"></i>
                      {isDone ? 'Completed' : 'Mark Done'}
                    </button>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm">{lab.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 bg-slate-50 p-2.5 rounded-lg border">
                    <strong className="text-slate-800 block text-[11px]">Scenario:</strong>
                    {lab.scenario}
                  </p>

                  <div className="mt-2 text-xs text-slate-700">
                    <strong className="text-slate-800 block text-[11px]">Your Task:</strong>
                    {lab.task}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => toggleSolution(lab.id)}
                    className="text-xs text-purple-600 font-bold hover:underline"
                  >
                    <i className="fa-solid fa-eye mr-1"></i>
                    {showSol ? 'Hide Benchmark Solution' : 'View Benchmark Solution'}
                  </button>

                  {showSol && (
                    <div className="mt-2 p-3 bg-purple-50 rounded-lg border border-purple-200 text-xs text-purple-950 whitespace-pre-line font-mono">
                      {lab.solution}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
