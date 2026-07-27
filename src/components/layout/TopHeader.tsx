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
    'dashboard': 'Dashboard Overview',
    'company-manager': 'Multi-Company Target Hub',
    'playbook': '50+ Operational SOP Playbooks',
    'questions': '120+ HR Interview Question Bank',
    'star-builder': 'STAR Behavioral Storybuilder',
    'assignments': '25 Practical HR Deliverable Labs',
    'generator': 'AI Document & Policy Studio',
    'tools': 'Calculators & HR Analytics',
    'quiz': 'AI Mock Interview Simulator',
    'profile': 'User Profile & Skill Gap Engine',
  };

  const activeCompany = targetCompanies.find((c) => c.id === activeCompanyId) || targetCompanies[0];

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
          <div className="flex items-center space-x-2">
            <h2 className="text-sm md:text-base font-bold text-slate-900">
              {titles[activeTab] || 'HR Lead Mastery'}
            </h2>
            {activeCompany && (
              <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200 hidden sm:inline">
                Target: {activeCompany.name}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Top Actions */}
      <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
        {/* Gemini AI Badge */}
        <div className="bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1.5 hidden md:flex">
          <i className="fa-solid fa-sparkles text-purple-600 animate-pulse"></i>
          <span>Gemini AI Engine</span>
        </div>

        {/* Target Company Switcher Dropdown */}
        <div className="bg-slate-100 border border-slate-300 rounded-lg p-1 flex items-center space-x-1">
          <i className="fa-solid fa-building text-blue-600 pl-1.5 text-xs"></i>
          <select
            value={activeCompanyId}
            onChange={(e) => setActiveCompanyId(e.target.value)}
            className="bg-transparent text-slate-800 font-bold focus:outline-none cursor-pointer pr-1 text-xs"
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
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-2 rounded-lg text-xs shadow-sm transition-colors flex items-center space-x-1.5"
        >
          <i className="fa-solid fa-file-pdf"></i>
          <span className="hidden sm:inline">Cheat Sheet</span>
        </button>
      </div>
    </header>
  );
};
