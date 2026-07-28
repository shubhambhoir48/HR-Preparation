'use client';

import React, { useState } from 'react';
import { HRQuestion, TargetCompany, UserProgress } from '@/types';
import { callGeminiAI } from '@/lib/gemini';

interface QuestionsViewProps {
  questions: HRQuestion[];
  company: TargetCompany;
  userProgress: UserProgress;
  onToggleStatus: (id: number, type: 'mastered' | 'review') => void;
}

export const QuestionsView: React.FC<QuestionsViewProps> = ({
  questions: initialPropsQuestions,
  company,
  userProgress,
  onToggleStatus,
}) => {
  // Master Question State (combines static + dynamically fetched AI questions)
  const [questionsList, setQuestionsList] = useState<HRQuestion[]>(initialPropsQuestions);
  
  // Navigation Tabs State
  const [activeTab, setActiveTab] = useState<'master' | 'company' | 'saved' | 'archive'>('master');

  // Filter States
  const [search, setSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState('ALL');
  const [topicFilter, setTopicFilter] = useState('ALL');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Display Mode & State
  const [viewMode, setViewMode] = useState<'list' | 'flashcard'>('list');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [openAnswers, setOpenAnswers] = useState<Record<number, boolean>>({});

  // Saved & Archived Local State
  const [savedIds, setSavedIds] = useState<number[]>(userProgress.savedQuestions || []);
  const [archivedIds, setArchivedIds] = useState<number[]>(userProgress.archivedQuestions || []);

  // AI Fetching State
  const [isFetchingAI, setIsFetchingAI] = useState(false);

  // Extract company JD keywords for code-based automated matching
  const extractJDKeywords = (jd: string) => {
    const keywords = [
      "cNPS", "headhunting", "PF", "ESIC", "Maharashtra Shops", "POSH", "FnF",
      "PIP", "Workday", "Keka", "Cutshort", "Instahyre", "BGV", "React", "Node",
      "Logistics AI", "Mercer", "OKRs", "campus", " statutory", "recruitment"
    ];
    return keywords.filter((kw) => jd.toLowerCase().includes(kw.toLowerCase()));
  };

  const jdKeywords = extractJDKeywords(company.jd).map((k) => k.toLowerCase());

  // Toggle Save / Bookmark
  const handleToggleSave = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Toggle Soft-Delete / Archive
  const handleToggleArchive = (id: number) => {
    setArchivedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Live Fetch AI Questions from Gemini
  const handleFetchMoreAIQuestions = async () => {
    setIsFetchingAI(true);

    const prompt = `Act as an executive HR Recruiter. Generate 5 high-yield, company-specific HR interview questions and model answers for candidate interviewing at ${company.name}:\nJob Role: ${company.role}\nJD Details: "${company.jd}"\n\nReturn JSON Array format:\n[\n  {\n    "domain": "Recruitment & Sourcing",\n    "topic": "Tech Sourcing",\n    "targetRole": "Senior HRBP",\n    "difficulty": "Executive Lead",\n    "question": "Question text here...",\n    "answer": "Comprehensive HR answer model..."\n  }\n]`;

    const text = await callGeminiAI(prompt);
    setIsFetchingAI(false);

    if (text) {
      try {
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          let curMaxId = Math.max(...questionsList.map((q) => q.id), 500) + 1;

          const newQs: HRQuestion[] = parsed.map((item: any) => ({
            id: curMaxId++,
            domain: item.domain || 'Recruitment & Sourcing',
            topic: item.topic || 'Tech Sourcing',
            targetRole: item.targetRole || 'HR Lead / Manager',
            difficulty: item.difficulty || 'Intermediate',
            question: item.question,
            answer: item.answer,
            quloiContext: `Dynamically generated AI question for ${company.name}.`,
            tags: ['Gemini AI', company.name]
          }));

          setQuestionsList((prev) => [...newQs, ...prev]);
        }
      } catch (e) {
        console.warn('AI question parse error:', e);
      }
    }
  };

  // Filter Pipeline
  const filtered = questionsList.filter((q) => {
    const isArchived = archivedIds.includes(q.id);
    const isSaved = savedIds.includes(q.id);

    // Tab Filter
    if (activeTab === 'archive') {
      if (!isArchived) return false;
    } else {
      if (isArchived) return false; // Hide archived questions from all other tabs
      if (activeTab === 'saved' && !isSaved) return false;
      if (activeTab === 'company') {
        // Code-based keyword automation filter matching company JD
        const matchesJD = jdKeywords.some(
          (kw) => q.question.toLowerCase().includes(kw) || q.answer.toLowerCase().includes(kw)
        );
        if (!matchesJD) return false;
      }
    }

    // Search Keyword Filter
    const matchesSearch =
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.answer.toLowerCase().includes(search.toLowerCase()) ||
      (q.topic && q.topic.toLowerCase().includes(search.toLowerCase()));

    // Rich Attribute Filters
    const matchesDomain = domainFilter === 'ALL' || q.domain === domainFilter;
    const matchesTopic = topicFilter === 'ALL' || q.topic === topicFilter;
    const matchesRole = roleFilter === 'ALL' || q.targetRole === roleFilter;
    const matchesDifficulty = difficultyFilter === 'ALL' || q.difficulty === difficultyFilter;

    // Status Filter
    let matchesStatus = true;
    if (statusFilter === 'mastered') matchesStatus = userProgress.mastered.includes(q.id);
    if (statusFilter === 'review') matchesStatus = userProgress.review.includes(q.id);
    if (statusFilter === 'unanswered')
      matchesStatus = !userProgress.mastered.includes(q.id) && !userProgress.review.includes(q.id);

    return (
      matchesSearch &&
      matchesDomain &&
      matchesTopic &&
      matchesRole &&
      matchesDifficulty &&
      matchesStatus
    );
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
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider">500+ Question Master Repository</span>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                Target: {company.name}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">HR Interview Question Bank & Practice Deck</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Practice 500+ curated HR questions across 8 domains, code-matched target company questions, bookmarks, and soft-delete archiving.
            </p>
          </div>

          <button
            disabled={isFetchingAI}
            onClick={handleFetchMoreAIQuestions}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow flex items-center space-x-2 disabled:opacity-50"
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            <span>{isFetchingAI ? 'Fetching AI Questions...' : '✨ Fetch More AI Questions (Gemini)'}</span>
          </button>
        </div>

        {/* 4 Main View Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('master')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'master'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <i className="fa-solid fa-globe"></i>
            <span>🌐 Master Repository (500+)</span>
          </button>

          <button
            onClick={() => setActiveTab('company')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'company'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <i className="fa-solid fa-bullseye"></i>
            <span>🎯 Company Targeted Questions</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'saved'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <i className="fa-solid fa-bookmark"></i>
            <span>⭐ Saved Bookmarks ({savedIds.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('archive')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'archive'
                ? 'bg-slate-800 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <i className="fa-solid fa-box-archive"></i>
            <span>📥 Archived Vault ({archivedIds.length})</span>
          </button>
        </div>

        {/* Search & Rich Multi-Attribute Filters */}
        <div className="space-y-3 pt-2">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-slate-400 text-xs"></i>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search keywords, topics, labor law sections (e.g. cNPS, PF ceiling, Maharashtra Shops, POSH, FnF, PIP)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
            {/* Domain Filter */}
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All HR Domains</option>
              <option value="Recruitment & Sourcing">Recruitment & Sourcing</option>
              <option value="Headhunting & Executive Search">Headhunting & Search</option>
              <option value="Statutory Compliance & Labor Laws">Statutory & Labor Laws</option>
              <option value="Payroll, Compensation & Benefits">Payroll & Compensation</option>
              <option value="Employee Relations & POSH Inquiry">ER & POSH Inquiry</option>
              <option value="Performance Management & PIP">Performance & PIP</option>
              <option value="HRIS Stack & HR Analytics">HRIS & Analytics</option>
            </select>

            {/* Topic Filter */}
            <select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All HR Topics</option>
              <option value="Tech Sourcing">Tech Sourcing</option>
              <option value="EPF Capping">EPF Capping</option>
              <option value="FnF Shortfalls">FnF Shortfalls</option>
              <option value="POSH ICC">POSH ICC</option>
              <option value="PIP Notice">PIP Notice</option>
              <option value="ESOP Vesting">ESOP Vesting</option>
              <option value="cNPS Metric">cNPS Metric</option>
              <option value="Workday HRIS">Workday HRIS</option>
              <option value="Maharashtra Shops & Est">Maharashtra Shops & Est</option>
            </select>

            {/* Target Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Target Roles</option>
              <option value="HR Generalist">HR Generalist</option>
              <option value="HR Lead / Manager">HR Lead / Manager</option>
              <option value="Senior HRBP">Senior HRBP</option>
              <option value="Head of People">Head of People</option>
              <option value="CHRO">CHRO</option>
            </select>

            {/* Difficulty Filter */}
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Difficulties</option>
              <option value="Foundational">Foundational</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Executive Lead">Executive Lead</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="mastered">Mastered</option>
              <option value="review">Needs Review</option>
              <option value="unanswered">Unattempted</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-100 gap-2">
            <span>Showing {filtered.length} of {questionsList.length} total questions</span>
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
                  setTopicFilter('ALL');
                  setRoleFilter('ALL');
                  setDifficultyFilter('ALL');
                  setStatusFilter('ALL');
                }}
                className="text-blue-600 hover:underline font-semibold"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-white p-8 rounded-xl text-center text-xs text-slate-500">
              No questions found matching active filters in this tab.
            </div>
          ) : (
            filtered.map((q) => {
              const isMastered = userProgress.mastered.includes(q.id);
              const isReview = userProgress.review.includes(q.id);
              const isSaved = savedIds.includes(q.id);
              const isArchived = archivedIds.includes(q.id);
              const showAns = !!openAnswers[q.id];

              return (
                <div key={q.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                      <span className="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded">
                        {q.domain}
                      </span>
                      {q.topic && (
                        <span className="bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded">
                          {q.topic}
                        </span>
                      )}
                      {q.targetRole && (
                        <span className="bg-purple-50 text-purple-800 font-bold px-2 py-0.5 rounded">
                          {q.targetRole}
                        </span>
                      )}
                      <span className="text-slate-400 font-mono">ID: #{q.id}</span>
                    </div>

                    {/* Bookmark, Archive & Master Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => speakText(q.question)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 rounded"
                        title="Read Aloud"
                      >
                        <i className="fa-solid fa-volume-high"></i>
                      </button>

                      {/* Bookmark Button */}
                      <button
                        onClick={() => handleToggleSave(q.id)}
                        className={`p-1.5 rounded transition-colors ${
                          isSaved ? 'text-amber-500' : 'text-slate-300 hover:text-amber-500'
                        }`}
                        title={isSaved ? 'Remove Bookmark' : 'Bookmark Question'}
                      >
                        <i className={`fa-${isSaved ? 'solid' : 'regular'} fa-bookmark text-sm`}></i>
                      </button>

                      {/* Archive / Soft-Delete / Restore Button */}
                      {isArchived ? (
                        <button
                          onClick={() => handleToggleArchive(q.id)}
                          className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded text-xs font-bold flex items-center space-x-1"
                          title="Restore Question to Main Library"
                        >
                          <i className="fa-solid fa-rotate-left"></i>
                          <span>Restore to Library</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleToggleArchive(q.id)}
                          className="p-1.5 text-slate-300 hover:text-rose-600 rounded"
                          title="Archive / Soft-Delete Question"
                        >
                          <i className="fa-solid fa-box-archive text-sm"></i>
                        </button>
                      )}

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
                      <strong className="text-slate-900 font-bold block">Model HR Response Blueprint:</strong>
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
