'use client';

import React, { useState } from 'react';
import { TargetCompany, HRQuestion } from '@/types';
import { callGeminiAI } from '@/lib/gemini';

interface MockInterviewViewProps {
  company: TargetCompany;
  questions: HRQuestion[];
}

export const MockInterviewView: React.FC<MockInterviewViewProps> = ({
  company,
  questions,
}) => {
  const [qIndex, setQIndex] = useState(0);
  const [userAns, setUserAns] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const currentQ = questions[qIndex] || questions[0];

  const handleEvaluateAnswer = async () => {
    if (!userAns.trim()) return;

    setIsEvaluating(true);
    const prompt = `Question asked in HR Lead Interview for ${company.name}: "${currentQ.question}"\n\nCandidate's Answer: "${userAns}"\n\nEvaluate the answer on a scale of 1-10, highlight 2 strengths, 2 missing legal/operational details, and provide a polished model response.`;

    const aiFeedback = await callGeminiAI(prompt);
    setIsEvaluating(false);
    setFeedback(aiFeedback || 'Evaluation completed.');
  };

  const handleNextQuestion = () => {
    setUserAns('');
    setFeedback(null);
    setQIndex((prev) => (prev < questions.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">AI Powered Interview Simulator</span>
          <h2 className="text-2xl font-bold text-slate-900">Live Mock Interview Simulator for {company.name}</h2>
          <p className="text-xs text-slate-500 mt-1">
            Simulate a real executive HR interview. Type your answer and receive real-time Gemini AI scoring, legal feedback, and model responses.
          </p>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="bg-blue-600 text-white font-bold px-2.5 py-1 rounded-full uppercase">
              Question {qIndex + 1} of {questions.length}
            </span>
            <span className="text-slate-400 font-mono">Domain: {currentQ.domain}</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">{currentQ.question}</h3>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
            Type Your Answer Here (Include tools, statutory acts, metrics):
          </label>
          <textarea
            value={userAns}
            onChange={(e) => setUserAns(e.target.value)}
            rows={5}
            placeholder="Type how you would answer this question in a live executive interview round..."
            className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:bg-white"
          ></textarea>

          <div className="flex justify-between items-center">
            <button
              disabled={isEvaluating || !userAns.trim()}
              onClick={handleEvaluateAnswer}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow flex items-center space-x-2 disabled:opacity-50"
            >
              <i className="fa-solid fa-sparkles"></i>
              <span>{isEvaluating ? 'Evaluating with Gemini AI...' : 'Get Gemini AI Feedback & Score'}</span>
            </button>

            <button
              onClick={handleNextQuestion}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl border flex items-center space-x-1"
            >
              <span>Next Question</span>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {feedback && (
          <div className="p-5 rounded-xl border border-purple-200 bg-purple-50 text-purple-900 space-y-2 text-xs">
            <div className="flex items-center space-x-2 font-bold text-purple-800">
              <i className="fa-solid fa-robot text-purple-600 text-sm"></i>
              <span>Gemini AI Live Evaluation Feedback:</span>
            </div>
            <p className="whitespace-pre-line leading-relaxed">{feedback}</p>
          </div>
        )}
      </div>
    </section>
  );
};
