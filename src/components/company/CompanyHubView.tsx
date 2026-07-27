'use client';

import React, { useState } from 'react';
import { TargetCompany } from '@/types';
import { callGeminiAI } from '@/lib/gemini';

interface CompanyHubViewProps {
  targetCompanies: TargetCompany[];
  activeCompanyId: string;
  onSetActiveCompany: (id: string) => void;
  onAddCompany: (company: TargetCompany) => void;
  onDeleteCompany: (id: string) => void;
  onUpdateCompany: (company: TargetCompany) => void;
  onOpenModal: (title: string, body: string) => void;
}

export const CompanyHubView: React.FC<CompanyHubViewProps> = ({
  targetCompanies,
  activeCompanyId,
  onSetActiveCompany,
  onAddCompany,
  onDeleteCompany,
  onUpdateCompany,
  onOpenModal,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [web, setWeb] = useState('');
  const [loc, setLoc] = useState('');
  const [social, setSocial] = useState('');
  const [type, setType] = useState<'Startup' | 'SaaS' | 'Enterprise'>('SaaS');
  const [jd, setJd] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Outcome Feedback Modal State
  const [activeFeedbackComp, setActiveFeedbackComp] = useState<TargetCompany | null>(null);
  const [outcome, setOutcome] = useState<'Shortlisted' | 'Rejected' | 'Interview Pending' | 'Offer Received'>('Interview Pending');
  const [askedQuestions, setAskedQuestions] = useState('');
  const [failureAnalysis, setFailureAnalysis] = useState('');
  const [isAnalyzingFeedback, setIsAnalyzingFeedback] = useState(false);

  const handleSaveCompany = async () => {
    if (!name || !role || !jd) {
      onOpenModal('Validation Error', 'Please fill in the Company Name, Target Job Title, and Job Description (JD).');
      return;
    }

    setIsAnalyzing(true);

    const prompt = `Analyze this Job Description for ${name} hiring for ${role}:\n\n${jd}\n\nTasks:\n1. List 5 core tech/HR keywords separated by commas.\n2. Write a 2-sentence elevator pitch script tailored for this candidate interviewing here.`;
    const aiResponse = await callGeminiAI(prompt);

    setIsAnalyzing(false);

    const newComp: TargetCompany = {
      id: 'comp_' + Date.now(),
      name,
      role,
      web: web || 'https://example.com',
      loc: loc || 'Remote / India',
      social: social || '',
      type,
      jd,
      aiNotes: aiResponse || 'Analyzed by Gemini AI Engine.',
      interviewOutcome: 'Interview Pending',
    };

    onAddCompany(newComp);

    // Reset Form
    setName('');
    setRole('');
    setWeb('');
    setLoc('');
    setSocial('');
    setJd('');
    setShowAddForm(false);

    onOpenModal(
      'Target Company Activated with Gemini AI!',
      `Target company "${name}" has been created. Gemini AI analyzed the JD and curated questions, playbooks, and pitch scripts.`
    );
  };

  const handleOpenFeedbackModal = (c: TargetCompany) => {
    setActiveFeedbackComp(c);
    setOutcome(c.interviewOutcome || 'Interview Pending');
    setAskedQuestions(c.askedQuestions || '');
    setFailureAnalysis(c.failureAnalysis || '');
  };

  const handleSaveOutcomeAndAnalyze = async () => {
    if (!activeFeedbackComp) return;

    setIsAnalyzingFeedback(true);

    const prompt = `Analyze this interview experience feedback for candidate Priyanka interviewing at ${activeFeedbackComp.name} (${activeFeedbackComp.role}):\n\nOutcome: ${outcome}\nQuestions Asked by Interviewer:\n"${askedQuestions}"\nWhere Candidate Struggled/Failed:\n"${failureAnalysis}"\n\nTask: Provide an adaptive learning path improvement plan in JSON format:\n{\n  "adaptiveSummary": "2-sentence summary analyzing why candidate struggled and how to adapt learning path.",\n  "recommendedFocus": ["Focus Topic 1", "Focus Topic 2", "Focus Topic 3"],\n  "actionPlan": "Clear 30-day action step for Priyanka to master these gaps."\n}`;

    const text = await callGeminiAI(prompt);
    setIsAnalyzingFeedback(false);

    let remediationPlan = activeFeedbackComp.remediationPlan;

    if (text) {
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          remediationPlan = JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        console.warn('JSON parse fallback:', e);
      }
    }

    const updated: TargetCompany = {
      ...activeFeedbackComp,
      interviewOutcome: outcome,
      askedQuestions,
      failureAnalysis,
      remediationPlan: remediationPlan || {
        adaptiveSummary: text || 'Adaptive feedback recorded.',
        recommendedFocus: ['Notice Period Recovery Shortfall Math', 'POSH ICC Annual Report Filing'],
        actionPlan: 'Review relevant SOP playbooks and re-attempt Mock Interview simulator.',
      },
    };

    onUpdateCompany(updated);
    setActiveFeedbackComp(null);
    onOpenModal('Interview Outcome & Failure Analysis Recorded!', `Feedback saved for ${updated.name}. System adapted Priyanka's learning path based on interview insights!`);
  };

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Multi-Company Prep Hub</span>
            <h2 className="text-2xl font-bold text-slate-900">Manage Target Companies & JDs</h2>
            <p className="text-xs text-slate-500 mt-1">
              Add details for target companies, record interview outcomes, log questions asked & failure analysis, and dynamically adapt Priyanka&apos;s learning path using Gemini AI.
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center space-x-2"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Add New Target Company</span>
          </button>
        </div>

        {/* Add Company Form */}
        {showAddForm && (
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-300 space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center space-x-2">
              <i className="fa-solid fa-building-circle-check text-blue-600"></i>
              <span>New Target Company Profile & AI JD Parser</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company Name *:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Stripe, Razorpay, TCS, Mindtickle"
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Job Title *:</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. HR Lead, Talent Acquisition Manager, HRBP"
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company Website URL:</label>
                <input
                  type="text"
                  value={web}
                  onChange={(e) => setWeb(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Office Location / Work Model:</label>
                <input
                  type="text"
                  value={loc}
                  onChange={(e) => setLoc(e.target.value)}
                  placeholder="e.g. Pune / Bengaluru / Remote"
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">LinkedIn / Social Link:</label>
                <input
                  type="text"
                  value={social}
                  onChange={(e) => setSocial(e.target.value)}
                  placeholder="https://linkedin.com/company/example"
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company Type:</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg font-medium"
                >
                  <option value="Startup">Early / Growth Startup (Fast, agile, lean tools)</option>
                  <option value="SaaS">B2B SaaS Startup / Product Company</option>
                  <option value="Enterprise">Top IT Enterprise / MNC (Large scale, structured ATS)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Paste Job Description (JD) Text *:</label>
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                rows={5}
                placeholder="Paste full job description including requirements, key skills (e.g. cNPS, PF, ESIC, POSH, Workday, Cutshort)..."
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg font-sans text-xs"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                disabled={isAnalyzing}
                onClick={handleSaveCompany}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg shadow flex items-center space-x-2 disabled:opacity-50"
              >
                <i className="fa-solid fa-sparkles"></i>
                <span>{isAnalyzing ? 'Analyzing with Gemini AI...' : 'Analyze with Gemini AI & Save'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Companies Cards Grid */}
        <div>
          <h3 className="font-bold text-slate-900 text-sm mb-3">Your Saved Target Companies ({targetCompanies.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {targetCompanies.map((c) => {
              const isActive = c.id === activeCompanyId;
              const outcomeColor =
                c.interviewOutcome === 'Shortlisted'
                  ? 'bg-emerald-100 text-emerald-800'
                  : c.interviewOutcome === 'Offer Received'
                  ? 'bg-purple-100 text-purple-800'
                  : c.interviewOutcome === 'Rejected'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-amber-100 text-amber-800';

              return (
                <div
                  key={c.id}
                  className={`bg-white p-5 rounded-xl border-2 ${
                    isActive ? 'border-blue-600 bg-blue-50/20 shadow-md' : 'border-slate-200'
                  } space-y-3 relative flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center space-x-1.5">
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                          {c.type}
                        </span>
                        {c.interviewOutcome && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${outcomeColor}`}>
                            {c.interviewOutcome}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-1">
                        {isActive && (
                          <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            ACTIVE
                          </span>
                        )}
                        <button
                          onClick={() => onDeleteCompany(c.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 text-xs transition-colors"
                          title="Delete Target Company"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base">{c.name}</h3>
                    <p className="text-xs text-blue-700 font-semibold">{c.role}</p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      <i className="fa-solid fa-location-dot text-rose-500 mr-1"></i>
                      {c.loc}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px] text-slate-600 line-clamp-3">
                    {c.jd}
                  </div>

                  {/* Adaptive Remediation Plan Display if recorded */}
                  {c.remediationPlan && (
                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200 text-xs space-y-1">
                      <strong className="text-purple-900 font-bold block text-[11px]">
                        <i className="fa-solid fa-robot mr-1 text-purple-600"></i>Adaptive Learning Path:
                      </strong>
                      <p className="text-purple-950 text-[11px] leading-tight">{c.remediationPlan.adaptiveSummary}</p>
                    </div>
                  )}

                  <div className="pt-2 flex flex-col space-y-2 text-xs border-t border-slate-100">
                    <div className="flex justify-between items-center">
                      <a href={c.web} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-bold text-[11px]">
                        <i className="fa-solid fa-globe mr-1"></i>Website
                      </a>
                      {!isActive ? (
                        <button
                          onClick={() => onSetActiveCompany(c.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                        >
                          Set Active
                        </button>
                      ) : (
                        <span className="text-emerald-700 font-bold text-xs">
                          <i className="fa-solid fa-check mr-1"></i>Selected Target
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleOpenFeedbackModal(c)}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-1.5 rounded-lg text-[11px] border border-slate-300 flex items-center justify-center space-x-1"
                    >
                      <i className="fa-solid fa-clipboard-check text-purple-600"></i>
                      <span>Record Outcome & Failure Analysis</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Outcome & Failure Feedback Modal */}
      {activeFeedbackComp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                Interview Outcome & Feedback: {activeFeedbackComp.name}
              </h3>
              <button onClick={() => setActiveFeedbackComp(null)} className="text-slate-400 hover:text-slate-600">
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Interview Outcome Status:</label>
              <select
                value={outcome}
                onChange={(e) => setOutcome(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-medium text-xs"
              >
                <option value="Interview Pending">Interview Pending</option>
                <option value="Shortlisted">Shortlisted for Next Round</option>
                <option value="Offer Received">Offer Received 🎉</option>
                <option value="Rejected">Not Shortlisted / Rejected</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Questions Asked by Interviewer:</label>
              <textarea
                value={askedQuestions}
                onChange={(e) => setAskedQuestions(e.target.value)}
                rows={3}
                placeholder="List questions asked (e.g. How do you handle EPF Form 11, cNPS tracking, or notice recovery shortfall?)..."
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              ></textarea>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Failure Analysis / Where Did You Struggle?:</label>
              <textarea
                value={failureAnalysis}
                onChange={(e) => setFailureAnalysis(e.target.value)}
                rows={3}
                placeholder="Where did you struggle? (e.g. Felt nervous on FnF notice recovery formula and POSH ICC annual report filing steps)..."
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t">
              <button
                onClick={() => setActiveFeedbackComp(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                disabled={isAnalyzingFeedback}
                onClick={handleSaveOutcomeAndAnalyze}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-5 py-2 rounded-lg shadow flex items-center space-x-2 disabled:opacity-50"
              >
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                <span>{isAnalyzingFeedback ? 'Adapting Learning Path...' : 'Analyze & Adapt Learning Path'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
