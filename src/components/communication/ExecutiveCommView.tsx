'use client';

import React, { useState } from 'react';
import { callGeminiAI } from '@/lib/gemini';

export interface CommPillar {
  id: string;
  title: string;
  category: 'Vocal & Speech' | 'Business Writing' | 'C-Suite Presentations' | 'Executive Attire & Presence' | 'Conflict & Negotiation' | 'Active Reading';
  icon: string;
  description: string;
  coreRules: string[];
  sampleTask: string;
  defaultInput: string;
}

export const commPillarsData: CommPillar[] = [
  {
    id: 'pillar_vocal',
    title: 'Pillar 1: Executive Vocal Clarity, Pitch & Speech Modulation',
    category: 'Vocal & Speech',
    icon: 'fa-microphone-lines',
    description: 'Master authoritative vocal inflection, optimal speaking pace (140-160 WPM), and eliminate filler words ("um", "like", "basically").',
    coreRules: [
      'Pace: Speak at a measured 140 - 160 words per minute for maximum executive authority.',
      'Eliminate Filler Words: Replace "um", "ah", "basically", "you know" with purposeful 1-second pauses.',
      'Downward Inflection: End key statements with downward pitch inflection to convey certainty.',
      'Diaphragmatic Breathing: Breathe deeply to prevent high-pitched vocal strain during intense meetings.'
    ],
    sampleTask: 'Deliver a 60-second executive elevator pitch to the Board explaining why increasing developer cNPS is top HR priority.',
    defaultInput: 'Good morning Board Members. Today, candidate experience directly impacts engineering velocity. By maintaining a cNPS above +50 across our Pune software hub, we have reduced offer dropout rates from 32% to under 12%, saving ₹45 Lakhs in annual replacement agency fees.'
  },
  {
    id: 'pillar_writing',
    title: 'Pillar 2: Business Writing, Email Etiquette & HR Grammar Precision',
    category: 'Business Writing',
    icon: 'fa-pen-nib',
    description: 'Write crisp, persuasive, non-defensive executive emails, CEO Slack updates, and bulletproof policy notices with zero grammar flaws.',
    coreRules: [
      'BLUF Framework: Bottom Line Up Front — State the decision or request in the very first sentence.',
      'Active Voice: Use "Management approved the policy" instead of "The policy was approved by management".',
      'Non-Defensive Tone: Frame performance issues around objective data metrics rather than personal critique.',
      'Zero Grammar Tolerance: Audit subject-verb agreement, apostrophe usage, and formal business salutations.'
    ],
    sampleTask: 'Rewrite an informal, defensive email about a missed recruitment target into an executive C-suite update.',
    defaultInput: 'Dear Executive Leadership,\n\nI am providing an operational update regarding Q2 Engineering Hiring. While senior Node architect requisitions experienced a 10-day SLA extension due to niche market skill shortages, we have optimized our Cutshort pipeline and secured 4 accepted offers this week. We project 100% headcount fulfillment by April 15.'
  },
  {
    id: 'pillar_presentation',
    title: 'Pillar 3: C-Suite Presentation & Boardroom Storytelling',
    category: 'C-Suite Presentations',
    icon: 'fa-chart-pie',
    description: 'Structure high-impact slide narratives (Situation -> Complication -> Recommendation) and handle hostile executive Q&A.',
    coreRules: [
      'SCR Narrative Structure: Situation -> Complication -> Recommendation.',
      '10-20-30 Rule: 10 slides, 20 minutes presentation time, 30pt minimum font size.',
      'Data Storytelling: Highlight "Why the data matters" rather than reading raw numbers off the slide.',
      'Hostile Q&A Strategy: Acknowledge question -> Reframe -> Deliver data-backed answer.'
    ],
    sampleTask: 'Draft the opening slide pitch for presenting the 30-60-90 Day HR Strategic Plan to the VP of Engineering.',
    defaultInput: 'Situation: Our Pune hub is expanding from 50 to 200 developers. Complication: Statutory compliance and developer turnover threaten sprint velocity. Recommendation: We are executing a 3-phase strategic plan focused on statutory audits, cNPS optimization, and FnF payout SLAs < 48 hours.'
  },
  {
    id: 'pillar_attire',
    title: 'Pillar 4: Executive Presence, Professional Attire & Body Language',
    category: 'Executive Attire & Presence',
    icon: 'fa-user-tie',
    description: 'Master MNC professional dress codes, executive grooming, camera setup for video calls, and confident body language (gravitas).',
    coreRules: [
      'Executive Dress Code: Western Formal (Tailored blazers, crisp button-downs, dark trousers/skirt) or Business Smart Casual.',
      'Video Call Setup: Camera at eye level, soft front lighting, clean neutral background, 100% direct eye contact into lens.',
      'Posture & Gestures: Open chest, straight spine, box-hand gestures above waist level to demonstrate openness.',
      'Gravitas & Poise: Maintain steady posture during tough meetings; avoid fidgeting or touching face.'
    ],
    sampleTask: 'Formulate an executive checklist for personal posture, attire, and video call setup before chairing a POSH ICC inquiry.',
    defaultInput: '1. Attire: Tailored navy blue executive blazer with white formal blouse.\n2. Grooming: Neat hair, professional neutral makeup, minimalist accessories.\n3. Camera: Eye-level webcam position with front ring light.\n4. Demeanor: Neutral, empathetic, authoritative facial expression with steady eye contact.'
  },
  {
    id: 'pillar_conflict',
    title: 'Pillar 5: Conflict Resolution, Assertiveness & Negotiation Mastery',
    category: 'Conflict & Negotiation',
    icon: 'fa-handshake',
    description: 'De-escalate heated employee disputes, negotiate salary buyouts, and assert statutory compliance firmly without burning bridges.',
    coreRules: [
      'Crucial Conversations: Separate facts from stories; focus on shared organizational goals.',
      'De-escalation Technique: Validate emotion -> Probe with open questions -> Pivot to objective policy.',
      'Salary Negotiation: Anchor around verified Mercer benchmark data rather than emotional demands.',
      'Firm Statutory Boundaries: Clearly communicate that legal statutory compliance (PF, POSH, PT) is non-negotiable.'
    ],
    sampleTask: 'Draft a verbal response to an employee who becomes angry during a 30-Day PIP notice meeting.',
    defaultInput: 'I understand that receiving a PIP notice is stressful, and I appreciate you sharing your frustration. However, our focus today is to provide clear milestone support and coaching so you can succeed. Let us review the objective sprint metrics together and build a plan to get you back on track.'
  },
  {
    id: 'pillar_reading',
    title: 'Pillar 6: Active Reading, Legal Comprehension & Rapid Review',
    category: 'Active Reading',
    icon: 'fa-book-open-reader',
    description: 'Rapidly review complex statutory labor acts, legal employment contracts, and policy charters to spot compliance risks.',
    coreRules: [
      'Skim & Scan Technique: Read heading -> Definitions -> Penalty sections -> Execution clauses.',
      'Red Flag Spotting: Look for ambiguous notice period clauses, missing statutory caps, or unapproved liability transfers.',
      'Annotate & Summarize: Write 1-sentence takeaways in margins for quick executive briefings.'
    ],
    sampleTask: 'Draft a 3-bullet executive summary after reading a 15-page Maharashtra Shops & Establishments Act amendment.',
    defaultInput: '1. Registration Mandate: Online Form A registration required for offices with 10+ employees.\n2. Work Hour Limits: Capped at 9 hrs/day and 48 hrs/week; overtime paid at double rate.\n3. Statutory Leave: Earned leave accrued at 1 day per 20 working days with 45-day carry forward cap.'
  }
];

export const ExecutiveCommView: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<CommPillar>(commPillarsData[0]);
  const [userInput, setUserInput] = useState(commPillarsData[0].defaultInput);
  const [aiEvaluation, setAiEvaluation] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);

  const handleSelectPillar = (p: CommPillar) => {
    setSelectedPillar(p);
    setUserInput(p.defaultInput);
    setAiEvaluation('');
  };

  const handleAuditCommunication = async () => {
    if (!userInput.trim()) return;

    setIsAuditing(true);

    const prompt = `Act as an Executive Leadership Coach & Corporate Communication Specialist. Audit candidate Priyanka Vartak's response for "${selectedPillar.title}":\n\nPillar Category: ${selectedPillar.category}\nCore Rules:\n${selectedPillar.coreRules.join('; ')}\n\nPractical Task Assigned:\n"${selectedPillar.sampleTask}"\n\nCandidate Submission:\n"${userInput}"\n\nProvide Feedback Report:\n1. Executive Presence & Professionalism Score (1-10)\n2. Grammar, Vocabulary & Tone Precision\n3. What was executed well\n4. Missing executive nuances & A-Grade Model Polish.`;

    const result = await callGeminiAI(prompt);
    setIsAuditing(false);

    setAiEvaluation(result || 'Evaluation completed successfully.');
  };

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        {/* Header Banner */}
        <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Executive Personality & Leadership Development</span>
            <h2 className="text-2xl font-bold text-slate-900">Workplace Personality & Executive Communication Masterclass</h2>
            <p className="text-xs text-slate-500 mt-1">
              Master vocal clarity, business writing, C-suite presentation storytelling, executive attire & body language, conflict negotiation, and active legal reading.
            </p>
          </div>
        </div>

        {/* 6 Pillar Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {commPillarsData.map((p) => {
            const isSelected = p.id === selectedPillar.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPillar(p)}
                className={`p-4 rounded-xl border-2 text-left transition-all space-y-2 flex flex-col justify-between ${
                  isSelected ? 'border-indigo-600 bg-indigo-50/30 shadow-md' : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="bg-indigo-100 text-indigo-800 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">
                      {p.category}
                    </span>
                    <i className={`fa-solid ${p.icon} ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`}></i>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{p.title}</h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{p.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span className={isSelected ? 'text-indigo-700' : 'text-slate-400'}>
                    {isSelected ? 'Active Pillar' : 'Practice Pillar'}
                  </span>
                  <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </div>
              </button>
            );
          })}
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          {/* Left Sub-Panel (6/12): Core Executive Rules & Guidelines */}
          <div className="lg:col-span-6 bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="text-[10px] font-extrabold text-indigo-700 uppercase">{selectedPillar.category}</span>
                <h3 className="font-bold text-slate-900 text-base">{selectedPillar.title}</h3>
              </div>
              <i className={`fa-solid ${selectedPillar.icon} text-indigo-600 text-xl`}></i>
            </div>

            <p className="text-slate-700 leading-relaxed font-normal">{selectedPillar.description}</p>

            <div className="space-y-2">
              <strong className="text-slate-900 block font-bold text-xs">Core Executive Rules & MNC Standards:</strong>
              <div className="space-y-2">
                {selectedPillar.coreRules.map((rule, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 flex items-start space-x-2.5 shadow-sm">
                    <span className="bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-slate-800 text-[11px] font-medium leading-relaxed">{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sub-Panel (6/12): Practice Workspace & Gemini AI Audit */}
          <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                <i className="fa-solid fa-[#000] fa-microphone text-indigo-600"></i>
                <span>Executive Practice Workspace</span>
              </h3>
              <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded">
                Gemini AI Audited
              </span>
            </div>

            <div className="bg-indigo-50 p-3.5 rounded-xl border border-indigo-200 text-indigo-950 font-medium">
              <strong className="text-indigo-900 block font-bold mb-1">Assigned Executive Practice Task:</strong>
              <span>{selectedPillar.sampleTask}</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Your Executive Response / Speech Pitch / Writing Draft:
              </label>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                rows={6}
                placeholder="Type or dictate your executive response here to test grammar, tone, vocabulary, and executive presence..."
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono leading-relaxed"
              ></textarea>
            </div>

            <button
              disabled={isAuditing}
              onClick={handleAuditCommunication}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl shadow flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <span>{isAuditing ? 'Auditing Executive Presence...' : 'Audit Communication & Tone with Gemini AI'}</span>
            </button>

            {/* AI Evaluation Report */}
            {aiEvaluation && (
              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto">
                <div className="text-amber-400 font-bold border-b border-slate-800 pb-1 flex items-center justify-between">
                  <span>Gemini AI Executive Leadership Audit Report</span>
                  <i className="fa-solid fa-circle-check text-emerald-400"></i>
                </div>
                <div>{aiEvaluation}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
