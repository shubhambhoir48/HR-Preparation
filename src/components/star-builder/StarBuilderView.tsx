'use client';

import React, { useState } from 'react';
import { StarStory } from '@/types';
import { callGeminiAI } from '@/lib/gemini';

interface StarBuilderViewProps {
  stories: StarStory[];
  onAddStory: (story: StarStory) => void;
  onOpenModal: (title: string, body: string) => void;
}

export const StarBuilderView: React.FC<StarBuilderViewProps> = ({
  stories,
  onAddStory,
  onOpenModal,
}) => {
  const [title, setTitle] = useState('');
  const [competency, setCompetency] = useState('cNPS & Candidate Experience');
  const [situation, setSituation] = useState('');
  const [task, setTask] = useState('');
  const [action, setAction] = useState('');
  const [result, setResult] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhanceWithAI = async () => {
    if (!situation || !action) {
      onOpenModal('AI Star Enhancer', 'Please fill in at least Situation and Action fields before calling Gemini AI.');
      return;
    }

    setIsEnhancing(true);

    const prompt = `Act as an executive HR interview coach. Enhance and polish this draft STAR story for a senior HR Lead candidate:\nTitle: ${title}\nSituation: ${situation}\nTask: ${task}\nAction: ${action}\nResult: ${result}\n\nProvide improved, metric-driven text in JSON format: {"s":"...", "t":"...", "a":"...", "r":"..."}`;

    const text = await callGeminiAI(prompt);
    setIsEnhancing(false);

    if (text) {
      try {
        const match = text.match(/\{[\s\S]*\}/);
        if (match) {
          const parsed = JSON.parse(match[0]);
          if (parsed.s) setSituation(parsed.s);
          if (parsed.t) setTask(parsed.t);
          if (parsed.a) setAction(parsed.a);
          if (parsed.r) setResult(parsed.r);
          onOpenModal('STAR Story Enhanced!', 'Gemini AI has polished your STAR story with strong action verbs and quantified impact metrics.');
        } else {
          onOpenModal('AI Response', text);
        }
      } catch (e) {
        onOpenModal('AI Response', text);
      }
    }
  };

  const handleSaveStory = () => {
    if (!title || !situation || !action) {
      onOpenModal('Validation Error', 'Please enter a Title, Situation, and Action for your STAR story.');
      return;
    }

    const newStory: StarStory = {
      id: 'star_' + Date.now(),
      title,
      competency,
      situation,
      task,
      action,
      result,
    };

    onAddStory(newStory);

    // Reset Form
    setTitle('');
    setSituation('');
    setTask('');
    setAction('');
    setResult('');

    onOpenModal('STAR Story Saved!', 'Your behavioral story has been added to your interview pitch library.');
  };

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Behavioral Interview Framework</span>
          <h2 className="text-2xl font-bold text-slate-900">STAR Method Interview Storybuilder</h2>
          <p className="text-xs text-slate-500 mt-1">
            Prepare compelling personal stories using the STAR format (Situation, Task, Action, Result) mapped to your active company&apos;s HR competencies. Enhance with Gemini AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Input */}
          <div className="lg:col-span-1 bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center justify-between">
              <span>Draft New Behavioral Story</span>
              <i className="fa-solid fa-star text-amber-500"></i>
            </h3>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Story Title / Scenario Name:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Scaling Tech Hiring under tight deadlines"
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Competency:</label>
              <select
                value={competency}
                onChange={(e) => setCompetency(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg font-medium"
              >
                <option value="cNPS & Candidate Experience">cNPS & Candidate Experience</option>
                <option value="Headhunting & Tech Sourcing">Headhunting & Niche Tech Sourcing</option>
                <option value="Statutory Audit & Labor Law Compliance">Statutory Audit & Labor Law Compliance</option>
                <option value="Employee Relations & Conflict Mediation">Employee Relations & Conflict Mediation</option>
                <option value="Performance Improvement Plan (PIP) Execution">Performance Improvement Plan (PIP) Execution</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Situation (Context & Background):</label>
              <textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                rows={2}
                placeholder="Describe the company setting, challenge, or team scenario..."
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              ></textarea>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Task (Your Responsibility):</label>
              <textarea
                value={task}
                onChange={(e) => setTask(e.target.value)}
                rows={2}
                placeholder="What specific objective were you responsible for achieving?"
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              ></textarea>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Action (Steps You Executed):</label>
              <textarea
                value={action}
                onChange={(e) => setAction(e.target.value)}
                rows={3}
                placeholder="Detail the tools (e.g. Cutshort, Keka), workflows, and decisions you took..."
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              ></textarea>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Result (Quantifiable Impact):</label>
              <textarea
                value={result}
                onChange={(e) => setResult(e.target.value)}
                rows={2}
                placeholder="Metrics achieved (e.g., cNPS +55, 95% offer acceptance rate)..."
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              ></textarea>
            </div>

            <div className="space-y-2 pt-2">
              <button
                disabled={isEnhancing}
                onClick={handleEnhanceWithAI}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center space-x-1.5 shadow"
              >
                <i className="fa-solid fa-sparkles"></i>
                <span>{isEnhancing ? 'Gemini AI Enhancing...' : 'AI Polish & Metricize STAR Story'}</span>
              </button>

              <button
                onClick={handleSaveStory}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center space-x-1.5 shadow"
              >
                <i className="fa-solid fa-floppy-disk"></i>
                <span>Save Story to Library</span>
              </button>
            </div>
          </div>

          {/* Stories List */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Your Prepared STAR Stories ({stories.length})</h3>
            {stories.length === 0 ? (
              <div className="bg-slate-50 p-8 rounded-xl text-center text-xs text-slate-500 border border-slate-200">
                No STAR stories added yet. Use the builder on the left to draft your interview pitch scripts.
              </div>
            ) : (
              stories.map((st) => (
                <div key={st.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex justify-between items-start border-b pb-2">
                    <div>
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        {st.competency}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm mt-1">{st.title}</h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-lg border">
                      <strong className="text-slate-800 block text-[11px]">S - Situation:</strong>
                      <p className="text-slate-600">{st.situation}</p>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-lg border">
                      <strong className="text-slate-800 block text-[11px]">T - Task:</strong>
                      <p className="text-slate-600">{st.task}</p>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-lg border md:col-span-2">
                      <strong className="text-slate-800 block text-[11px]">A - Action:</strong>
                      <p className="text-slate-600">{st.action}</p>
                    </div>
                    <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 md:col-span-2">
                      <strong className="text-emerald-900 block text-[11px]">R - Result (Impact):</strong>
                      <p className="text-emerald-800 font-medium">{st.result}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
