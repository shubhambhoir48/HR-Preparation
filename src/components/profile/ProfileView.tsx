'use client';

import React, { useState } from 'react';
import { TargetCompany, UserProfile, UserProgress, CustomTrainingModule } from '@/types';
import { callGeminiAI } from '@/lib/gemini';

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
  const [resumeFileName, setResumeFileName] = useState(userProfile.resumeFileName || '');
  const [trainingModule, setTrainingModule] = useState<CustomTrainingModule | undefined>(
    userProfile.customTrainingModule
  );
  const [isParsing, setIsParsing] = useState(false);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setResumeFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setResumeText(text);
        onOpenModal('Resume Uploaded!', `File "${file.name}" uploaded successfully. Click "Parse Resume & Generate AI Training Module" to analyze.`);
      }
    };

    reader.readAsText(file);
  };

  const handleParseAndGenerateTraining = async () => {
    if (!resumeText.trim()) {
      onOpenModal('Validation Error', 'Please upload a resume file or paste plain resume text before generating your training module.');
      return;
    }

    setIsParsing(true);

    const prompt = `Act as an executive HR coach and talent development lead. Analyze this candidate resume and generate a personalized training & learning module:\n\nCandidate Resume Text:\n"${resumeText}"\n\nTarget Company (${company.name}) JD:\n"${company.jd}"\n\nTask: Generate a customized training module in JSON format:\n{\n  "title": "Personalized HR Lead Acceleration Module",\n  "summary": "2-sentence custom learning roadmap summary tailored to candidate skill gaps.",\n  "strengths": ["Strength 1", "Strength 2", "Strength 3"],\n  "gaps": ["Gap 1", "Gap 2"],\n  "recommendedSOPs": ["Tech Headhunting & Sourcing", "Maharashtra Shops & Est Statutory Compliance", "30-Day PIP Execution"],\n  "recommendedTopics": ["Candidate NPS (cNPS) Optimization", "Full & Final Settlement Shortfall Payout"],\n  "priorityAction": "High priority 30-day training focus area for candidate."\n}`;

    const text = await callGeminiAI(prompt);
    setIsParsing(false);

    if (text) {
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed: CustomTrainingModule = JSON.parse(jsonMatch[0]);
          setTrainingModule(parsed);

          const updated: UserProfile = {
            name,
            level,
            linkedIn,
            resumeText,
            resumeFileName,
            customTrainingModule: parsed,
          };

          onSaveProfile(updated);
          onOpenModal('Custom Training Module Generated!', 'Gemini AI parsed your resume and built a personalized HR training roadmap based on your candidate skill gaps!');
          return;
        }
      } catch (e) {
        console.warn('JSON parse error:', e);
      }

      // Fallback object if raw text returned
      const fallback: CustomTrainingModule = {
        title: 'Custom HR Lead Operational Training Module',
        summary: text,
        strengths: matched.length > 0 ? matched : ['Full-Cycle Recruitment', 'Employee Relations'],
        gaps: missing.length > 0 ? missing : ['Statutory Audits', 'FnF Shortfalls'],
        recommendedSOPs: ['Tech Sourcing SOP', 'Statutory Compliance SOP', 'PIP Drafting SOP'],
        recommendedTopics: ['cNPS Optimization', 'Payroll Calculations'],
        priorityAction: 'Focus on Statutory Compliance and FnF Notice Recovery calculations.',
      };

      setTrainingModule(fallback);
      onSaveProfile({
        name,
        level,
        linkedIn,
        resumeText,
        resumeFileName,
        customTrainingModule: fallback,
      });
    }
  };

  const handleSave = () => {
    const updated: UserProfile = {
      name,
      level,
      linkedIn,
      resumeText,
      resumeFileName,
      customTrainingModule: trainingModule,
    };
    onSaveProfile(updated);
    onOpenModal('Profile Saved & Synced!', 'Your candidate profile and resume text have been updated and synced to Netlify Blobs.');
  };

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Candidate Settings & AI Training Engine</span>
            <h2 className="text-2xl font-bold text-slate-900">User Profile & Resume Parser Studio</h2>
            <p className="text-xs text-slate-500 mt-1">
              Upload your resume to parse candidate data, analyze JD match gaps, and dynamically generate your personal training module.
            </p>
          </div>
          <button
            disabled={isParsing}
            onClick={handleParseAndGenerateTraining}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow flex items-center space-x-2 disabled:opacity-50"
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            <span>{isParsing ? 'Parsing Resume with Gemini AI...' : 'Parse Resume & Build Training Module'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Candidate Form & Upload */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center justify-between">
              <span>Candidate Profile Information</span>
              <i className="fa-solid fa-user-gear text-rose-500"></i>
            </h3>

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

            {/* Resume Upload File Box */}
            <div className="bg-white p-3.5 rounded-xl border-2 border-dashed border-slate-300 space-y-2">
              <label className="block font-semibold text-slate-800">
                <i className="fa-solid fa-file-arrow-up text-purple-600 mr-1.5"></i>
                Upload Resume File (.txt, .doc, .pdf):
              </label>
              <input
                type="file"
                accept=".txt,.doc,.docx,.pdf"
                onChange={handleFileUpload}
                className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
              />
              {resumeFileName && (
                <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 pt-1">
                  <i className="fa-solid fa-circle-check text-emerald-500"></i>
                  <span>Uploaded: {resumeFileName}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Resume Content Text:</label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={5}
                placeholder="Resume text will populate automatically on file upload, or paste text manually here..."
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              ></textarea>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-lg text-xs shadow flex items-center justify-center space-x-2"
              >
                <i className="fa-solid fa-floppy-disk"></i>
                <span>Save Candidate Profile</span>
              </button>
            </div>
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

            {/* Generated AI Training Module Card */}
            {trainingModule && (
              <div className="bg-gradient-to-tr from-purple-900 to-indigo-900 text-white p-5 rounded-xl border border-purple-800 shadow-lg space-y-3">
                <div className="flex justify-between items-center border-b border-purple-700/60 pb-2">
                  <div className="flex items-center space-x-2">
                    <i className="fa-solid fa-sparkles text-amber-400"></i>
                    <h3 className="font-bold text-sm text-amber-300">{trainingModule.title}</h3>
                  </div>
                  <span className="bg-purple-500/30 text-purple-200 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-400/30">
                    Gemini AI Generated
                  </span>
                </div>

                <p className="text-xs text-purple-100 leading-relaxed italic">{trainingModule.summary}</p>

                <div className="space-y-2 text-xs pt-1">
                  <div className="bg-white/10 p-2.5 rounded-lg border border-white/10 space-y-1">
                    <strong className="text-amber-300 block text-[11px] uppercase tracking-wider">
                      Recommended SOP Playbooks to Study:
                    </strong>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {trainingModule.recommendedSOPs?.map((sop, i) => (
                        <span key={i} className="bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-400/30">
                          {sop}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/10 p-2.5 rounded-lg border border-white/10 space-y-1">
                    <strong className="text-amber-300 block text-[11px] uppercase tracking-wider">
                      Recommended Practice Topics:
                    </strong>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {trainingModule.recommendedTopics?.map((top, i) => (
                        <span key={i} className="bg-blue-500/20 text-blue-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-blue-400/30">
                          {top}
                        </span>
                      ))}
                    </div>
                  </div>

                  {trainingModule.priorityAction && (
                    <div className="bg-amber-500/20 p-2.5 rounded-lg border border-amber-400/30 text-amber-200 text-[11px]">
                      <strong className="text-amber-300 block font-bold">30-Day Priority Training Action:</strong>
                      <span>{trainingModule.priorityAction}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

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
