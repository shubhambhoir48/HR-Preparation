'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TargetCompany, StarStory, UserProfile, UserProgress } from '@/types';
import { initialTargetCompanies, initialUserProfile } from '@/lib/data/companies';
import { initialSOPs } from '@/lib/data/sops';
import { initialQuestions } from '@/lib/data/questions';
import { initialLabs } from '@/lib/data/labs';

import { Sidebar } from '@/components/layout/Sidebar';
import { TopHeader } from '@/components/layout/TopHeader';
import { DashboardView } from '@/components/dashboard/DashboardView';
import { CompanyHubView } from '@/components/company/CompanyHubView';
import { PlaybooksView } from '@/components/playbooks/PlaybooksView';
import { QuestionsView } from '@/components/questions/QuestionsView';
import { StarBuilderView } from '@/components/star-builder/StarBuilderView';
import { LabsView } from '@/components/labs/LabsView';
import { DocStudioView } from '@/components/doc-studio/DocStudioView';
import { CalculatorsView } from '@/components/tools/CalculatorsView';
import { MockInterviewView } from '@/components/mock-interview/MockInterviewView';
import { ProfileView } from '@/components/profile/ProfileView';
import { NotificationModal } from '@/components/common/NotificationModal';
import { GeminiWidget } from '@/components/common/GeminiWidget';

export default function MainPage() {
  const router = useRouter();

  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Core Data State
  const [targetCompanies, setTargetCompanies] = useState<TargetCompany[]>(initialTargetCompanies);
  const [activeCompanyId, setActiveCompanyId] = useState<string>(initialTargetCompanies[0].id);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    mastered: [],
    review: [],
    sopsRead: [],
    labCompleted: [],
    streakDays: 3,
  });
  const [starStoriesData, setStarStoriesData] = useState<StarStory[]>([]);
  const [isCloudSynced, setIsCloudSynced] = useState(false);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');

  // Authentication check
  useEffect(() => {
    const auth = localStorage.getItem('hr_prep_auth');
    if (!auth) {
      router.push('/login');
    }
  }, [router]);

  // Load State from LocalStorage / Netlify Blobs
  useEffect(() => {
    async function loadData() {
      try {
        // Try fetching Netlify Blobs stored state
        const res = await fetch('/api/storage');
        const json = await res.json();

        if (json.success && json.data) {
          const d = json.data;
          if (d.targetCompanies) setTargetCompanies(d.targetCompanies);
          if (d.activeCompanyId) setActiveCompanyId(d.activeCompanyId);
          if (d.userProfile) setUserProfile(d.userProfile);
          if (d.userProgress) setUserProgress(d.userProgress);
          if (d.starStoriesData) setStarStoriesData(d.starStoriesData);
          setIsCloudSynced(true);
          return;
        }
      } catch (e) {
        console.warn('Storage API fetch error fallback to localStorage:', e);
      }

      // LocalStorage Fallback
      try {
        const stored = localStorage.getItem('hr_prep_mastery_v4');
        if (stored) {
          const p = JSON.parse(stored);
          if (p.targetCompanies) setTargetCompanies(p.targetCompanies);
          if (p.activeCompanyId) setActiveCompanyId(p.activeCompanyId);
          if (p.userProfile) setUserProfile(p.userProfile);
          if (p.userProgress) setUserProgress(p.userProgress);
          if (p.starStoriesData) setStarStoriesData(p.starStoriesData);
        }
      } catch (e) {
        console.log('LocalStorage read skipped');
      }
    }

    loadData();
  }, []);

  // Save State Handler (Local + Netlify Blobs)
  const saveState = async (
    companies = targetCompanies,
    activeId = activeCompanyId,
    profile = userProfile,
    progress = userProgress,
    stories = starStoriesData
  ) => {
    const payload = {
      targetCompanies: companies,
      activeCompanyId: activeId,
      userProfile: profile,
      userProgress: progress,
      starStoriesData: stories,
    };

    try {
      localStorage.setItem('hr_prep_mastery_v4', JSON.stringify(payload));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    try {
      const res = await fetch('/api/storage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.saved) setIsCloudSynced(true);
    } catch (e) {
      console.warn('Netlify Blobs sync error:', e);
    }
  };

  // Helper Actions
  const handleOpenModal = (title: string, body: string) => {
    setModalTitle(title);
    setModalBody(body);
    setModalOpen(true);
  };

  const activeCompany = targetCompanies.find((c) => c.id === activeCompanyId) || targetCompanies[0];

  const extractJDKeywords = (jd: string) => {
    const keywords = [
      "cNPS", "headhunting", "PF", "ESIC", "Maharashtra Shops", "POSH", "FnF",
      "PIP", "Workday", "Keka", "Cutshort", "Instahyre", "BGV", "React", "Node",
      "Logistics AI", "Mercer", "OKRs", "campus"
    ];
    return keywords.filter((kw) => jd.toLowerCase().includes(kw.toLowerCase()));
  };

  const keywords = extractJDKeywords(activeCompany.jd);
  const resumeLower = (userProfile.resumeText || '').toLowerCase();
  const matchedCount = keywords.filter((kw) => resumeLower.includes(kw.toLowerCase())).length;
  const fitScore = Math.min(98, Math.max(65, Math.round((matchedCount / (keywords.length || 1)) * 100)));

  const handleOpenCheatSheet = () => {
    const text = `1-PAGE INTERVIEW CHEAT SHEET & PREP BRIEF

TARGET COMPANY: ${activeCompany.name}
JOB TITLE: ${activeCompany.role}
LOCATION: ${activeCompany.loc}
WEBSITE: ${activeCompany.web}

30-SECOND ELEVATOR PITCH:
“I am a results-oriented HR Lead with hands-on experience in fast-paced software organizations. For ${activeCompany.name}'s requirement for ${activeCompany.role}, I bring proven expertise in tech recruitment, cNPS optimization, statutory compliance (Maharashtra Shops & Est, PF, ESIC, POSH), full-cycle payroll/FnF, and 30-day PIP execution.”

KEY JD COMPETENCY HIGHLIGHTS TO EMBED IN ANSWERS:
${keywords.map((k, i) => `${i + 1}. ${k}`).join('\n')}

RECOMMENDED FIRST 30-60-90 DAY PLAN:
- Days 1-30: Complete statutory & payroll compliance audit; review active requisitions and ATS response SLA.
- Days 31-60: Implement automated cNPS survey system & developer performance matrix.
- Days 61-90: Optimize FnF payout SLA to under 48 hours and launch engagement initiatives.`;

    handleOpenModal(`${activeCompany.name} - Executive Interview Cheat Sheet`, text);
  };

  const handleAddCompany = (comp: TargetCompany) => {
    const updated = [comp, ...targetCompanies];
    setTargetCompanies(updated);
    setActiveCompanyId(comp.id);
    saveState(updated, comp.id);
  };

  const handleDeleteCompany = (id: string) => {
    if (targetCompanies.length <= 1) {
      handleOpenModal('Action Not Allowed', 'You must keep at least one target company profile.');
      return;
    }
    const updated = targetCompanies.filter((c) => c.id !== id);
    let newActiveId = activeCompanyId;
    if (activeCompanyId === id) {
      newActiveId = updated[0].id;
    }
    setTargetCompanies(updated);
    setActiveCompanyId(newActiveId);
    saveState(updated, newActiveId);
    handleOpenModal('Company Deleted', 'Target company removed from your active apply list.');
  };

  const handleUpdateCompany = (company: TargetCompany) => {
    const updated = targetCompanies.map((c) => (c.id === company.id ? company : c));
    setTargetCompanies(updated);
    saveState(updated, activeCompanyId);
  };

  const handleToggleSOPRead = (id: number) => {
    const reads = userProgress.sopsRead.includes(id)
      ? userProgress.sopsRead.filter((x) => x !== id)
      : [...userProgress.sopsRead, id];

    const updatedProg = { ...userProgress, sopsRead: reads };
    setUserProgress(updatedProg);
    saveState(targetCompanies, activeCompanyId, userProfile, updatedProg);
  };

  const handleToggleQuestionStatus = (id: number, type: 'mastered' | 'review') => {
    let mastered = [...userProgress.mastered];
    let review = [...userProgress.review];

    if (type === 'mastered') {
      mastered = mastered.includes(id) ? mastered.filter((x) => x !== id) : [...mastered, id];
    } else {
      review = review.includes(id) ? review.filter((x) => x !== id) : [...review, id];
    }

    const updatedProg = { ...userProgress, mastered, review };
    setUserProgress(updatedProg);
    saveState(targetCompanies, activeCompanyId, userProfile, updatedProg);
  };

  const handleToggleLabCompleted = (id: number) => {
    const labsDone = userProgress.labCompleted.includes(id)
      ? userProgress.labCompleted.filter((x) => x !== id)
      : [...userProgress.labCompleted, id];

    const updatedProg = { ...userProgress, labCompleted: labsDone };
    setUserProgress(updatedProg);
    saveState(targetCompanies, activeCompanyId, userProfile, updatedProg);
  };

  const handleAddStarStory = (story: StarStory) => {
    const updated = [story, ...starStoriesData];
    setStarStoriesData(updated);
    saveState(targetCompanies, activeCompanyId, userProfile, userProgress, updated);
  };

  const handleSaveProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    saveState(targetCompanies, activeCompanyId, profile);
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
        activeCompanyName={activeCompany.name}
        fitScore={fitScore}
        companyCount={targetCompanies.length}
        userName={userProfile.name}
        userRole={userProfile.level}
        isCloudSynced={isCloudSynced}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <TopHeader
          activeTab={activeTab}
          targetCompanies={targetCompanies}
          activeCompanyId={activeCompanyId}
          setActiveCompanyId={(id) => {
            setActiveCompanyId(id);
            saveState(targetCompanies, id);
          }}
          onOpenCheatSheet={handleOpenCheatSheet}
          onToggleMobileSidebar={() => setIsOpenMobile(!isOpenMobile)}
        />

        {/* View Switcher */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {activeTab === 'dashboard' && (
            <DashboardView
              company={activeCompany}
              userProgress={userProgress}
              questions={initialQuestions}
              sops={initialSOPs}
              resumeText={userProfile.resumeText}
              onOpenCheatSheet={handleOpenCheatSheet}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'company-manager' && (
            <CompanyHubView
              targetCompanies={targetCompanies}
              activeCompanyId={activeCompanyId}
              onSetActiveCompany={(id) => {
                setActiveCompanyId(id);
                saveState(targetCompanies, id);
              }}
              onAddCompany={handleAddCompany}
              onDeleteCompany={handleDeleteCompany}
              onUpdateCompany={handleUpdateCompany}
              onOpenModal={handleOpenModal}
            />
          )}

          {activeTab === 'playbook' && (
            <PlaybooksView
              sops={initialSOPs}
              sopsRead={userProgress.sopsRead}
              onToggleSOPRead={handleToggleSOPRead}
            />
          )}

          {activeTab === 'questions' && (
            <QuestionsView
              questions={initialQuestions}
              company={activeCompany}
              userProgress={userProgress}
              onToggleStatus={handleToggleQuestionStatus}
            />
          )}

          {activeTab === 'star-builder' && (
            <StarBuilderView
              stories={starStoriesData}
              onAddStory={handleAddStarStory}
              onOpenModal={handleOpenModal}
            />
          )}

          {activeTab === 'assignments' && (
            <LabsView
              labs={initialLabs}
              labCompleted={userProgress.labCompleted}
              onToggleLabCompleted={handleToggleLabCompleted}
            />
          )}

          {activeTab === 'generator' && <DocStudioView />}

          {activeTab === 'tools' && <CalculatorsView />}

          {activeTab === 'quiz' && (
            <MockInterviewView company={activeCompany} questions={initialQuestions} />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              userProfile={userProfile}
              company={activeCompany}
              userProgress={userProgress}
              totalQuestions={initialQuestions.length}
              totalSOPs={initialSOPs.length}
              totalLabs={initialLabs.length}
              onSaveProfile={handleSaveProfile}
              onOpenModal={handleOpenModal}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 mt-auto">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>
              HR Lead Mastery & Multi-Company Accelerator Platform &bull; Netlify Blobs & Gemini AI Powered
            </span>
            <span className="text-slate-400">Targeting HR Excellence for Priyanka Vartak</span>
          </div>
        </footer>
      </div>

      {/* Global Bottom-Right Gemini AI Working Animation Widget */}
      <GeminiWidget />

      {/* Global Notification Modal */}
      <NotificationModal
        isOpen={modalOpen}
        title={modalTitle}
        body={modalBody}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
