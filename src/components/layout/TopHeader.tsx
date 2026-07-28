'use client';

import React from 'react';
import { TargetCompany } from '@/types';

interface TopHeaderProps {
  activeTab: string;
  targetCompanies: TargetCompany[];
  activeCompanyId: string;
  setActiveCompanyId: (id: string) => void;
  onOpenCheatSheet: () => void;
  onToggleMobileSidebar: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  activeTab,
  targetCompanies,
  activeCompanyId,
  setActiveCompanyId,
  onOpenCheatSheet,
  onToggleMobileSidebar,
}) => {
  const titles: Record<string, string> = {
    'dashboard': 'Executive Dashboard',
    'company-manager': 'Company Target Hub',
    'playbook': 'Process Playbooks',
    'questions': 'Question Repository',
    'star-builder': 'STAR Storybuilder',
    'ai-hr': 'AI for HR & Automation',
    'hr-analytics': 'HR Analytics Studio',
    'hr-tools': 'HR Tools & Software',
    'assignments': 'Operational Work Labs',
    'generator': 'Document Studio',
    'tools': 'HR Calculators',
    'quiz': 'Mock Interview Simulator',
    'youtube-library': 'YouTube Learning Library',
    'exec-comm': 'Executive Communication',
    'career-planner': 'Career Roadmap',
    'profile': 'Profile & Resume Fit',
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm px-4 md:px-8 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden text-slate-600 hover:text-slate-900 p-2 rounded-lg border border-slate-200 focus:outline-none"
        >
          <i className="fa-solid fa-bars text-base"></i>
        </button>
        <div>
          <h2 className="text-sm md:text-base font-bold text-slate-900">
            {titles[activeTab] || 'HR Lead Mastery Platform'}
          </h2>
        </div>
      </div>

      {/* Top Right Actions */}
      <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
        {/* Gemini AI Engine Badge */}
        <div className="bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-1.5 rounded-lg font-bold text-[11px] flex items-center gap-1.5 hidden md:flex">
          <i className="fa-solid fa-sparkles text-purple-600 animate-pulse"></i>
          <span>Gemini AI Engine</span>
        </div>

        {/* Target Company Switcher Dropdown */}
        <div className="bg-slate-100 border border-slate-300 rounded-lg px-2 py-1 flex items-center space-x-1.5">
          <i className="fa-solid fa-building text-blue-600 text-xs"></i>
          <select
            value={activeCompanyId}
            onChange={(e) => setActiveCompanyId(e.target.value)}
            className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer pr-1 text-xs"
          >
            {targetCompanies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.role})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onOpenCheatSheet}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow-sm transition-colors flex items-center space-x-1.5"
        >
          <i className="fa-solid fa-file-pdf"></i>
          <span className="hidden sm:inline">Cheat Sheet</span>
        </button>
      </div>
    </header>
  );
};
