'use client';

import React, { useState } from 'react';
import { HRQuestion, TargetCompany, UserProgress } from '@/types';

interface QuestionsViewProps {
  questions: HRQuestion[];
  company: TargetCompany;
  userProgress: UserProgress;
  onToggleStatus: (id: number, type: 'mastered' | 'review') => void;
}

export const QuestionsView: React.FC<QuestionsViewProps> = ({
  questions,
  company,
  userProgress,
  onToggleStatus,
}) => {
  const [search, setSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState('ALL');
  const [jdMatchFilter, setJdMatchFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState<'list' | 'flashcard'>('list');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [openAnswers, setOpenAnswers] = useState<Record<number, boolean>>({});

  const extractJDKeywords = (jd: string) => {
    const keywords = [
      "cNPS", "headhunting", "PF", "ESIC", "Maharashtra Shops", "POSH", "FnF",
      "PIP", "Workday", "Keka", "Cutshort", "Instahyre", "BGV", "React", "Node",
      "Logistics AI", "Mercer", "OKRs", "campus"
    ];
    return keywords.filter((kw) => jd.toLowerCase().includes(kw.toLowerCase()));
  };

  const filtered = questions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.answer.toLowerCase().includes(search.toLowerCase());
    const matchesDomain = domainFilter === 'ALL' || q.domain === domainFilter;

    let matchesJD = true;
    if (jdMatchFilter === 'JD_MATCHED') {
      const keywords = extractJDKeywords(company.jd).map((k) => k.toLowerCase());
      matchesJD = keywords.some(
        (kw) => q.question.toLowerCase().includes(kw) || q.answer.toLowerCase().includes(kw)
      );
    }

    let matchesStatus = true;
    if (statusFilter === 'mastered') matchesStatus = userProgress.mastered.includes(q.id);
    if (statusFilter === 'review') matchesStatus = userProgress.review.includes(q.id);
    if (statusFilter === 'unanswered')
      matchesStatus = !userProgress.mastered.includes(q.id) && !userProgress.review.includes(q.id);

    return matchesSearch && matchesDomain && matchesJD && matchesStatus;
  });

  const toggleAnswer = (id: number) => {
    setOpenAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentFlashcard = filtered[flashcardIndex] || filtered[0];

  return (
    <section className="space-y-6">
      {/* Search & Filter Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-3.5 text-slate-400 text-sm"></i>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search keywords (e.g. cNPS, PF ceiling, Maharashtra Shops, POSH, FnF, PIP)..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Domains</option>
              <option value="Recruitment & cNPS">Recruitment & cNPS</option>
              <option value="Headhunting & Niche Executive Search">Headhunting & Search</option>
              <option value="Statutory Compliance & Labor Laws">Statutory & Labor Laws</option>
              <option value="Payroll, CTC & Tax">Payroll, CTC & Tax</option>
              <option value="Employee Relations & POSH">ER & POSH Inquiry</option>
              <option value="Performance & PIP">Performance & PIP</option>
              <option value="HR Analytics & HRIS">HR Analytics & HRIS</option>
              <option value="SaaS Engagement & Offboarding">Offboarding & FnF</option>
            </select>

            <select
              value={jdMatchFilter}
              onChange={(e) => setJdMatchFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Questions</option>
              <option value="JD_MATCHED">⭐ Curated for Active Company JD</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="mastered">Mastered</option>
              <option value="review">Needs Review</option>
              <option value="unanswered">Unattempted</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-100 gap-2">
          <span>Showing {filtered.length} of {questions.length} questions</span>
          <div className="flex items-center space-x-3">
            <div className="bg-slate-100 p-1 rounded-lg flex items-center text-xs border border-slate-200">
              <button
                onClick={() => setViewMode('list')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                  viewMode === 'list' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600'
                }`}
              >
                <i className="fa-solid fa-list mr-1"></i>List View
              </button>
              <button
                onClick={() => setViewMode('flashcard')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                  viewMode === 'flashcard' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600'
                }`}
              >
                <i className="fa-solid fa-clone mr-1"></i>Flashcard Deck
              </button>
            </div>
            <button
              onClick={() => {
                setSearch('');
                setDomainFilter('ALL');
                setJdMatchFilter('ALL');
                setStatusFilter('ALL');
              }}
              className="text-blue-600 hover:underline font-semibold"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-white p-8 rounded-xl text-center text-xs text-slate-500">
              No questions match active filters.
            </div>
          ) : (
            filtered.map((q) => {
              const isMastered = userProgress.mastered.includes(q.id);
              const isReview = userProgress.review.includes(q.id);
              const showAns = !!openAnswers[q.id];

              return (
                <div key={q.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                        {q.domain}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">ID: #{q.id}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => speakText(q.question)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 rounded"
                        title="Read Aloud"
                      >
                        <i className="fa-solid fa-volume-high"></i>
                      </button>
                      <button
                        onClick={() => onToggleStatus(q.id, 'mastered')}
                        className={`px-2.5 py-1 rounded text-xs font-semibold ${
                          isMastered ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-emerald-50'
                        }`}
                      >
                        <i className="fa-solid fa-circle-check"></i> {isMastered ? 'Mastered' : 'Mark Mastered'}
                      </button>
                      <button
                        onClick={() => onToggleStatus(q.id, 'review')}
                        className={`px-2.5 py-1 rounded text-xs font-semibold ${
                          isReview ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-amber-50'
                        }`}
                      >
                        <i className="fa-solid fa-flag"></i> {isReview ? 'Review' : 'Needs Review'}
                      </button>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">{q.question}</h3>

                  <button
                    onClick={() => toggleAnswer(q.id)}
                    className="text-xs text-blue-600 font-bold hover:underline"
                  >
                    <i className="fa-solid fa-eye mr-1"></i>
                    {showAns ? 'Hide Model Answer' : 'Show HR Answer Model'}
                  </button>

                  {showAns && (
                    <div className="mt-2 p-4 bg-slate-50 rounded-lg border text-xs text-slate-700 space-y-2 whitespace-pre-line">
                      <strong>Model HR Response Blueprint:</strong>
                      <p>{q.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Flashcard Deck View */}
      {viewMode === 'flashcard' && currentFlashcard && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>
              Card {flashcardIndex + 1} of {filtered.length}
            </span>
            <span className="text-blue-600 font-semibold">
              <i className="fa-solid fa-hand-pointer mr-1"></i>Click card to flip answer
            </span>
          </div>

          {/* Flip Card UI */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[300px] bg-white rounded-2xl border-2 border-blue-200 shadow-lg p-8 cursor-pointer flex flex-col justify-between relative transition-all hover:border-blue-400"
          >
            <div className="flex justify-between items-start">
              <span className="bg-blue-50 text-blue-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                {currentFlashcard.domain}
              </span>
              <div className="flex items-center space-x-2">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {currentFlashcard.difficulty}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(isFlipped ? currentFlashcard.answer : currentFlashcard.question);
                  }}
                  className="text-slate-400 hover:text-blue-600 text-base"
                  title="Read Aloud"
                >
                  <i className="fa-solid fa-volume-high"></i>
                </button>
              </div>
            </div>

            <div className="my-6 text-center">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                {isFlipped ? 'HR MODEL ANSWER' : 'QUESTION'}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                {isFlipped ? currentFlashcard.answer : currentFlashcard.question}
              </h3>
            </div>

            <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-3">
              <span className="text-slate-400 font-mono">ID: #{currentFlashcard.id}</span>
              <span className="text-blue-600 font-bold hover:underline">
                {isFlipped ? '&larr; Click to View Question' : 'Click to Reveal Answer Blueprint &rarr;'}
              </span>
            </div>
          </div>

          {/* Flashcard Navigation */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => {
                setIsFlipped(false);
                setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
              }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1"
            >
              <i className="fa-solid fa-chevron-left"></i>
              <span>Previous Card</span>
            </button>

            <button
              onClick={() => onToggleStatus(currentFlashcard.id, 'mastered')}
              className={`px-3 py-2 rounded-xl text-xs border font-bold flex items-center space-x-1 ${
                userProgress.mastered.includes(currentFlashcard.id)
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}
            >
              <i className="fa-solid fa-circle-check"></i>
              <span>{userProgress.mastered.includes(currentFlashcard.id) ? 'Mastered' : 'Mark Mastered'}</span>
            </button>

            <button
              onClick={() => {
                setIsFlipped(false);
                setFlashcardIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1"
            >
              <span>Next Card</span>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
