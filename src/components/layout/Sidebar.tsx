'use client';

import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  activeCompanyName: string;
  fitScore: number;
  companyCount: number;
  userName: string;
  userRole: string;
  isCloudSynced: boolean;
  onSignOut?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpenMobile,
  setIsOpenMobile,
  activeCompanyName,
  fitScore,
  userName,
  userRole,
  isCloudSynced,
  onSignOut,
}) => {
  const navItems = [
    {
      group: 'Overview',
      items: [
        { id: 'dashboard', label: 'Executive Dashboard', icon: 'fa-chart-pie', color: 'text-blue-400' },
        { id: 'company-manager', label: 'Company Target Hub', icon: 'fa-building', color: 'text-indigo-400' },
        { id: 'sandbox', label: 'Workplace Sandbox', icon: 'fa-sitemap', color: 'text-purple-400' },
      ],
    },
    {
      group: 'Process & Knowledge',
      items: [
        { id: 'playbook', label: 'Process Playbooks', icon: 'fa-book-bookmark', color: 'text-emerald-400' },
        { id: 'questions', label: 'Question Repository', icon: 'fa-list-check', color: 'text-cyan-400' },
        { id: 'youtube-library', label: 'YouTube Learning Library', icon: 'fa-play', color: 'text-red-400' },
        { id: 'star-builder', label: 'STAR Storybuilder', icon: 'fa-star', color: 'text-amber-400' },
      ],
    },
    {
      group: 'Operations & Software',
      items: [
        { id: 'ai-hr', label: 'AI for HR & Automation', icon: 'fa-brain', color: 'text-purple-400' },
        { id: 'hr-analytics', label: 'HR Analytics Studio', icon: 'fa-chart-line', color: 'text-emerald-400' },
        { id: 'hr-tools', label: 'HR Tools & Software', icon: 'fa-laptop-code', color: 'text-cyan-400' },
        { id: 'assignments', label: 'Operational Work Labs', icon: 'fa-briefcase', color: 'text-purple-400' },
        { id: 'generator', label: 'Document Studio', icon: 'fa-wand-magic-sparkles', color: 'text-indigo-400' },
        { id: 'tools', label: 'HR Calculators', icon: 'fa-calculator', color: 'text-emerald-400' },
        { id: 'quiz', label: 'Mock Interview Simulator', icon: 'fa-robot', color: 'text-amber-400' },
      ],
    },
    {
      group: 'Executive Growth',
      items: [
        { id: 'exec-comm', label: 'Executive Communication', icon: 'fa-comments', color: 'text-amber-400' },
        { id: 'career-planner', label: 'Career Roadmap', icon: 'fa-route', color: 'text-emerald-400' },
        { id: 'profile', label: 'Profile & Resume Fit', icon: 'fa-user-gear', color: 'text-rose-400' },
      ],
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm md:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 h-screen z-40 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between transform ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out shrink-0 border-r border-slate-800 shadow-xl md:shadow-none overflow-hidden`}
      >
        {/* Top Fixed Header & Target Widget */}
        <div className="shrink-0">
          {/* Logo & Branding */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-lg flex items-center justify-center h-9 w-9 rounded-xl shadow-lg tracking-wider">
                HR
              </div>
              <div>
                <h1 className="text-sm font-bold text-white leading-tight">HR Lead Mastery</h1>
                <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                  <span>Netlify Blobs</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isCloudSynced ? 'bg-emerald-400' : 'bg-amber-400'} inline-block`}></span>
                  <span className={`${isCloudSynced ? 'text-emerald-400' : 'text-amber-400'} font-bold`}>
                    {isCloudSynced ? 'Synced' : 'Local Storage'}
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpenMobile(false)}
              className="md:hidden text-slate-400 hover:text-white p-1"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          {/* Active Company Widget */}
          <div className="p-3 mx-3 my-3 bg-slate-800/80 border border-slate-700/60 rounded-xl space-y-1.5 shadow-sm">
            <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-bold text-slate-400">
              <span>Active Target</span>
              <i className="fa-solid fa-bullseye text-blue-400"></i>
            </div>
            <div className="font-bold text-xs text-white truncate">{activeCompanyName}</div>
            <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1 border-t border-slate-700/40">
              <span>JD Match Fit:</span>
              <span className="font-extrabold text-emerald-400">{fitScore}%</span>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Items List */}
        <nav className="flex-1 overflow-y-auto min-h-0 px-3 py-2 space-y-4 text-xs font-medium custom-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((group) => (
            <div key={group.group} className="space-y-1">
              <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                {group.group}
              </div>
              {group.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsOpenMobile(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all text-left group ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <i className={`fa-solid ${item.icon} w-4 text-center ${isActive ? 'text-white' : item.color} group-hover:text-white`}></i>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Locked Bottom Profile Card */}
        <div className="p-3 border-t border-slate-800 bg-slate-900 shrink-0 z-20">
          <div className="bg-slate-800/90 border border-slate-700/70 p-2.5 rounded-xl flex items-center justify-between text-xs shadow-lg">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
                {userName.split(' ').map((n) => n[0]).join('') || 'PV'}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-white truncate text-xs">{userName}</div>
                <div className="text-[10px] text-slate-400 truncate font-medium">{userRole}</div>
              </div>
            </div>
            <div className="flex items-center space-x-1 shrink-0">
              <button
                onClick={() => setActiveTab('profile')}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-700/60 transition-colors"
                title="Profile Settings"
              >
                <i className="fa-solid fa-gear"></i>
              </button>
              {onSignOut && (
                <button
                  onClick={onSignOut}
                  className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-700/60 transition-colors"
                  title="Sign Out"
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
