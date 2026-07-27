'use client';

import React, { useState } from 'react';
import { TargetCompany, UserProfile, UserProgress } from '@/types';

interface ProfileViewProps {
  userProfile: UserProfile;
  company: TargetCompany;
  userProgress: UserProgress;
  totalQuestions: number;
  totalSOPs: number;
  totalLabs: number;
  onSaveProfile: (profile: UserProfile) => void;
  onOpenModal: (title: string, body: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  company,
  userProgress,
  totalQuestions,
  totalSOPs,
  totalLabs,
  onSaveProfile,
  onOpenModal,
}) => {
  const [name, setName] = useState(userProfile.name);
  const [level, setLevel] = useState(userProfile.level);
  const [linkedIn, setLinkedIn] = useState(userProfile.linkedIn);
  const [resumeText, setResumeText] = useState(userProfile.resumeText);

  const extractJDKeywords = (jd: string) => {
    const keywords = [
      "cNPS", "headhunting", "PF", "ESIC", "Maharashtra Shops", "POSH", "FnF",
      "PIP", "Workday", "Keka", "Cutshort", "Instahyre", "BGV", "React", "Node",
      "Logistics AI", "Mercer", "OKRs", "campus"
    ];
    return keywords.filter((kw) => jd.toLowerCase().includes(kw.toLowerCase()));
  };

  const keywords = extractJDKeywords(company.jd);
  const resumeLower = resumeText.toLowerCase();

  const matched = keywords.filter((kw) => resumeLower.includes(kw.toLowerCase()));
  const missing = keywords.filter((kw) => !resumeLower.includes(kw.toLowerCase()));
  const fitScore = Math.min(98, Math.max(65, Math.round((matched.length / (keywords.length || 1)) * 100)));

  const handleSave = () => {
    const updated: UserProfile = {
      name,
      level,
      linkedIn,
      resumeText,
    };
    onSaveProfile(updated);
    onOpenModal('Profile Saved & Synced!', 'Your candidate profile and resume text have been updated and synced to Netlify Blobs.');
  };

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Candidate Settings & Analysis</span>
          <h2 className="text-2xl font-bold text-slate-900">User Profile & Skill Gap Engine</h2>
          <p className="text-xs text-slate-500 mt-1">
            Update your candidate profile and paste your resume text to compute match fit scores against your target company JD.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Candidate Information</h3>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Experience Level / Target Role:</label>
              <input
                type="text"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">LinkedIn Profile URL:</label>
              <input
                type="text"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Paste Resume Plain Text (For JD Match):</label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={6}
                placeholder="Paste your full resume text here to analyze keyword skill matches..."
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              ></textarea>
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-lg text-xs shadow flex items-center justify-center space-x-2"
            >
              <i className="fa-solid fa-floppy-disk"></i>
              <span>Save Candidate Profile</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Skill Gap Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Resume vs JD Skill Gap Analysis</h3>
                  <p className="text-xs text-slate-500">Target Company: {company.name}</p>
                </div>
                <div className="text-2xl font-extrabold text-emerald-600">{fitScore}%</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 space-y-1">
                  <strong className="text-emerald-800 block font-bold">
                    <i className="fa-solid fa-circle-check mr-1"></i>Verified Skills in Resume:
                  </strong>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {matched.map((m) => (
                      <span key={m} className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 space-y-1">
                  <strong className="text-amber-800 block font-bold">
                    <i className="fa-solid fa-triangle-exclamation mr-1"></i>Skill Gaps to Study (Missing in Resume):
                  </strong>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {missing.length === 0 ? (
                      <span className="text-slate-400">All key skills matched!</span>
                    ) : (
                      missing.map((m) => (
                        <span key={m} className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                          {m}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Curve Tracker */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Your Interview Preparation Learning Curve</h3>

              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Questions Mastered</span>
                  <strong className="text-xl font-bold text-emerald-600">
                    {userProgress.mastered.length} / {totalQuestions}
                  </strong>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Process SOPs Read</span>
                  <strong className="text-xl font-bold text-purple-600">
                    {userProgress.sopsRead.length} / {totalSOPs}
                  </strong>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Labs Completed</span>
                  <strong className="text-xl font-bold text-blue-600">
                    {userProgress.labCompleted.length} / {totalLabs}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
