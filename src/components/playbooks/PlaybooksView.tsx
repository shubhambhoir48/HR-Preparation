'use client';

import React, { useState } from 'react';
import { SOPPlaybook } from '@/types';

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

  const filtered = sops.filter((p) => {
    const matchCat = catFilter === 'ALL' || p.cat === catFilter;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.startupWay.toLowerCase().includes(search.toLowerCase()) ||
      p.enterpriseWay.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              End-to-End Operational SOPs
            </span>
            <h2 className="text-2xl font-bold text-slate-900">50+ Detailed HR Process Playbooks</h2>
            <p className="text-xs text-slate-500 mt-1">
              Exact step-by-step SOPs, platforms used, templates, and execution blueprints for Startups vs Top IT Enterprise MNCs.
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
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-slate-50 p-8 rounded-xl text-center text-xs text-slate-500">
              No SOP playbooks found matching search.
            </div>
          ) : (
            filtered.map((p) => {
              const isRead = sopsRead.includes(p.id);
              return (
                <div key={p.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                  <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        {p.cat}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">{p.title}</h3>
                    </div>
                    <button
                      onClick={() => onToggleSOPRead(p.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 ${
                        isRead
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <i className="fa-solid fa-circle-check mr-1"></i>
                      {isRead ? 'Read & Mastered' : 'Mark Learned'}
                    </button>
                  </div>

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

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <strong className="text-slate-800 block font-bold">Step-by-Step SOP Execution Checklist:</strong>
                    <ul className="list-none space-y-1 text-slate-600 font-sans">
                      {p.steps.map((s, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <i className="fa-solid fa-check text-emerald-500 mt-0.5"></i>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center space-x-2 text-[11px] text-slate-500">
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
