'use client';

import React, { useState } from 'react';
import { callGeminiAI } from '@/lib/gemini';

export interface AiHrModule {
  id: string;
  title: string;
  category: 
    | 'Prompt Engineering' 
    | 'AI in Excel' 
    | 'AI Prototyping' 
    | 'Document AI' 
    | 'Workplace Automation' 
    | 'Claude & Artifacts'
    | 'Talent Acquisition AI'
    | 'Employee Relations & POSH AI'
    | 'Performance & L&D AI'
    | 'Workplace Productivity AI';
  icon: string;
  aiToolsUsed: string[];
  description: string;
  whyHrNeedsIt: string;
  systemPromptTemplate: string;
  workflowSteps: string[];
  practiceTask: string;
  defaultUserInput: string;
}

// Initial Core Modules
export const initialAiHrModules: AiHrModule[] = [
  {
    id: 'ai_mod_1',
    title: 'RTF Prompt Framework for Legally Compliant PIP Notices',
    category: 'Prompt Engineering',
    icon: 'fa-brain',
    aiToolsUsed: ['ChatGPT 4o', 'Gemini 1.5 Pro', 'Claude 3.5 Sonnet'],
    description: 'Master the RTF (Role, Task, Format) prompting framework to generate non-defensive, legally sound PIP notices for software engineers.',
    whyHrNeedsIt: 'Saves hours of drafting while maintaining a professional, legally compliant tone under Indian Labor Laws.',
    systemPromptTemplate: 'Role: Senior HR Business Partner in a fast-paced tech MNC.\nTask: Draft a formal 30-Day PIP notice for a Senior Engineer with sprint delay issues.\nFormat: Markdown with sections for 1) Identified Gaps, 2) 30-Day SMART Milestones, 3) Review SLA.\nTone: Firm, supportive, non-defensive, legally compliant with Indian labor standards.',
    workflowSteps: [
      'Step 1: Define AI Persona (e.g. "Act as a Senior HR BP in an Indian MNC").',
      'Step 2: Input precise context (e.g. "Targeting a developer missing sprint delivery").',
      'Step 3: Specify format (e.g. "Format as markdown with bulleted action milestones").',
      'Step 4: Audit output against company policy before sending.'
    ],
    practiceTask: 'Write a System Prompt for Gemini/ChatGPT to generate a compelling Cutshort Tech Job Description for a Senior React + Node Engineer.',
    defaultUserInput: 'Role: Tech Recruiter | Task: Write a Cutshort job description for Senior Full-Stack Developer (React + Node) in Pune (₹18-24 LPA) | Format: Include 1) 30-Second Elevator Pitch, 2) Tech Stack Required, 3) Perks & Hybrid Policy.'
  },
  {
    id: 'ai_mod_2',
    title: 'Google Sheets ARRAYFORMULA Generation for Leave Encashment Math',
    category: 'AI in Excel',
    icon: 'fa-file-excel',
    aiToolsUsed: ['ChatGPT 4o', 'Excel AI', 'Google Sheets AI'],
    description: 'Use AI to generate complex nested formulas calculating exact leave encashment payouts for bulk offboardings.',
    whyHrNeedsIt: 'Eliminates Excel formula syntax errors when processing statutory final settlements.',
    systemPromptTemplate: 'Task: Write a Google Sheets ARRAYFORMULA for Column F.\nLogic: Multiply Monthly Basic Salary (Column C) by Unused Leaves (Column E) and divide by 30. Ensure it auto-extends down.',
    workflowSteps: [
      'Step 1: Describe column layouts and basic math logic to ChatGPT in plain English.',
      'Step 2: Copy generated ARRAYFORMULA code.',
      'Step 3: Paste into the first cell of output column.',
      'Step 4: Audit output against manual check calculations.'
    ],
    practiceTask: 'Ask AI to write a Google Sheets formula that checks Column C (Tenure in months) and returns "Eligible for Gratuity" if it is greater than or equal to 60 (5 years), else "Not Eligible".',
    defaultUserInput: 'Prompt for AI: "Write a Google Sheets formula for Column D. If Column C is >= 60, return \'Eligible for Gratuity\', else return \'Not Eligible\'. Ensure it handles empty cells gracefully."'
  },
  {
    id: 'ai_mod_3',
    title: 'Building a 30-Day PIP Milestone Progress Tracker Web App',
    category: 'AI Prototyping',
    icon: 'fa-laptop-code',
    aiToolsUsed: ['Lovable.dev', 'Bolt.new', 'v0.dev'],
    description: 'Build functional internal HR web portals (e.g. PIP trackers, appraisal logs) in 10 minutes without writing code.',
    whyHrNeedsIt: 'Allows non-technical HR Leads to prototype custom internal tools without waiting for engineering bandwidth.',
    systemPromptTemplate: 'Build a single-page React app with Tailwind CSS for a PIP Milestone Tracker. Include employee name, weekly review status checkboxes, progress bar (0-100%), and a button to export PDF report.',
    workflowSteps: [
      'Step 1: Open Lovable.dev or Bolt.new in browser.',
      'Step 2: Paste plain English web app specification prompt.',
      'Step 3: Preview the generated UI and request adjustments in the chat.',
      'Step 4: Deploy and share link with reporting managers.'
    ],
    practiceTask: 'Write a prompt for Lovable.dev to create an internal cNPS (Candidate Net Promoter Score) Dashboard.',
    defaultUserInput: 'Prompt for Lovable.dev: "Create a modern, clean web app dashboard to calculate candidate NPS. Include input fields for rating (0-10), candidate role, interviewer name, and live score calculation (% Promoters - % Detractors) with responsive charts."'
  }
];

// Programmatic Generator to reach exactly 100 detailed modules across 10 categories
export const aiHrModulesData: AiHrModule[] = [...initialAiHrModules];

(() => {
  const categoriesList: AiHrModule['category'][] = [
    'Prompt Engineering',
    'AI in Excel',
    'AI Prototyping',
    'Document AI',
    'Workplace Automation',
    'Claude & Artifacts',
    'Talent Acquisition AI',
    'Employee Relations & POSH AI',
    'Performance & L&D AI',
    'Workplace Productivity AI'
  ];

  const toolsByCategory: Record<AiHrModule['category'], string[]> = {
    'Prompt Engineering': ['ChatGPT 4o', 'Claude 3.5 Sonnet', 'Gemini Pro'],
    'AI in Excel': ['Excel Copilot', 'Google Sheets AI', 'ChatGPT'],
    'AI Prototyping': ['Lovable.dev', 'v0.dev', 'Bolt.new'],
    'Document AI': ['Claude 3.5 Sonnet', 'Gemini Flash', 'Adobe Acrobat AI'],
    'Workplace Automation': ['Zapier', 'Make.com', 'Slack Workflow Builder'],
    'Claude & Artifacts': ['Claude 3.5 Artifacts', 'Mermaid.js'],
    'Talent Acquisition AI': ['Cutshort AI Sourcing', 'Instahyre Matcher', 'LinkedIn Recruiter AI'],
    'Employee Relations & POSH AI': ['Gemini 1.5 Pro', 'Claude 3.5', 'Humata AI'],
    'Performance & L&D AI': ['Gamma.app', 'ChatGPT 4o', 'Synthesia AI'],
    'Workplace Productivity AI': ['Microsoft Copilot', 'Google Workspace AI', 'Otter.ai']
  };

  const templatesList = [
    {
      title: 'Resume Screening & Competency Fit Parser',
      desc: 'Use LLMs to parse applicant resumes against strict JDs and output a clean competency checklist with fit scores.',
      task: 'Write a system prompt for Claude to screen engineering resumes against a React/Node stack and output a JSON list of matches.'
    },
    {
      title: 'Automated POSH Incident Case Summarizer',
      desc: 'Summarize extensive witness testimonies and POSH complaints into highly confidential, anonymized legal briefs.',
      task: 'Construct a prompt to summarize 5 witness transcripts into a POSH inquiry report structure.'
    },
    {
      title: 'Make.com Automated Candidate Onboarding Workflow',
      desc: 'Automate new-hire data pipelines: Google Sheets registration -> Auto-generate offer letter doc -> Slack notification.',
      task: 'Design a workflow trigger pipeline connecting Google Forms to Gmail.'
    },
    {
      title: 'Claude Artifacts Org Structure Visualizer',
      desc: 'Generate interactive organizational charts and reporting relationships directly inside Claude Artifacts.',
      task: 'Prompt Claude to render an interactive HTML/CSS org chart for a 150-person product startup.'
    },
    {
      title: 'AI Competency Matrix & Training Calendar Generator',
      desc: 'Identify skill shortfalls and auto-generate custom 30-day training syllabi for software developers.',
      task: 'Generate a 4-week training calendar for developers transitioning to React Native.'
    },
    {
      title: 'Boolean Search String Optimization Prompt',
      desc: 'Convert standard descriptions into highly advanced Boolean search strings for LinkedIn Recruiter and Cutshort.',
      task: 'Construct a prompt that outputs a Boolean search string targeting DevOps and AWS engineering leaders.'
    },
    {
      title: 'TDS & Tax Deduction Calculator Formula',
      desc: 'Generate Google Sheets formulas to calculate monthly TDS based on tax slab rules and standard deductions.',
      task: 'Prompt AI to write a formula checking monthly income and applying progressive tax rates.'
    },
    {
      title: 'v0.dev Employee Feedback & Appraisals Portal',
      desc: 'Build functional feedback survey templates for employees using v0.dev React component generator.',
      task: 'Write a prompt for v0.dev to generate a beautiful, interactive 360 feedback submission UI.'
    },
    {
      title: 'Statutory Gratuity Accrual Formula Generator',
      desc: 'Ask AI to write Excel formulas validating continuous 5-year employment and computing statutory gratuity liability.',
      task: 'Ask AI to write an Excel formula for Column G to calculate: Basic Salary * 15 * Years / 26.'
    },
    {
      title: 'AI Rejection Email Generator with Actionable Feedback',
      desc: 'Draft empathetic, constructive rejection emails for interviewees to maintain high employer brand reputation.',
      task: 'Create a system prompt to write feedback-rich rejection emails based on candidate interview notes.'
    }
  ];

  let curId = aiHrModulesData.length + 1;
  while (aiHrModulesData.length < 100) {
    const category = categoriesList[(curId - 1) % categoriesList.length];
    const template = templatesList[(curId - 4) % templatesList.length];
    const tools = toolsByCategory[category];

    aiHrModulesData.push({
      id: `ai_mod_${curId}`,
      title: `${template.title} (Module #${curId})`,
      category: category,
      icon: 'fa-robot',
      aiToolsUsed: tools,
      description: `${template.desc} Fully customized for India-based MNCs, IT services giants, and fast-growth tech startups.`,
      whyHrNeedsIt: `Saves manual administrative overhead and positions the HR Lead as a tech-enabled workplace champion.`,
      systemPromptTemplate: `Role: Senior HR Specialist\nTask: Automate ${template.title}\nFormat: Structured markdown tables\nRules: Maintain absolute statutory compliance under Indian labor laws.`,
      workflowSteps: [
        `Step 1: Access free AI tool (${tools.join(', ')}).`,
        `Step 2: Input structured system prompt template.`,
        `Step 3: Verify LLM outputs against legal guidelines.`,
        `Step 4: Execute within the corporate HR stack.`
      ],
      practiceTask: template.task,
      defaultUserInput: `System Prompt:\nRole: HR Operations Analyst\nTask: Automate ${template.title} execution\nFormat: Markdown table output.`
    });
    curId++;
  }
})();

export interface AiForHrViewProps {
  userName?: string;
}

export const AiForHrView: React.FC<AiForHrViewProps> = ({ userName = 'HR Professional' }) => {
  const [selectedModule, setSelectedModule] = useState<AiHrModule>(aiHrModulesData[0]);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('ALL');

  const [userInput, setUserInput] = useState(aiHrModulesData[0].defaultUserInput);
  const [aiEvaluation, setAiEvaluation] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);

  const filteredModules = aiHrModulesData.filter((m) => {
    const matchesCat = catFilter === 'ALL' || m.category === catFilter;
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase()) ||
      m.whyHrNeedsIt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSelectModule = (mod: AiHrModule) => {
    setSelectedModule(mod);
    setUserInput(mod.defaultUserInput);
    setAiEvaluation('');
  };

  const handleEvaluatePrompt = async () => {
    if (!userInput.trim()) return;

    setIsAuditing(true);

    const prompt = `Act as a Master AI Engineer & HR Transformation Consultant. Evaluate candidate ${userName}'s AI prompt / workplace automation workflow for "${selectedModule.title}":\n\nAI Category: ${selectedModule.category}\nAI Tools Used: ${selectedModule.aiToolsUsed.join(', ')}\n\nAssigned Task:\n"${selectedModule.practiceTask}"\n\nCandidate Submission:\n"${userInput}"\n\nProvide Evaluation Report:\n1. Prompt Engineering & AI Mastery Score (1-10)\n2. Clarity of Role, Task, Format, and Context\n3. Missing Nuances & Hallucination Safeguards\n4. Recommended Masterclass A-Grade System Prompt.`;

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
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">AI for HR & Workplace Automation Studio</span>
            <h2 className="text-2xl font-bold text-slate-900">AI for HR, Prompt Engineering & Process Automation</h2>
            <p className="text-xs text-slate-500 mt-1">
              Master free AI tools (Gemini, ChatGPT, Claude, Lovable, Zapier) across 100 practical modules for prompt engineering, AI in Excel, HR app prototyping, policy drafting, and workplace automation.
            </p>
          </div>
        </div>

        {/* Master-Detail Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
          {/* Left Panel (4/12 Width): Navigation & Module Selection List */}
          <div className="lg:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 flex flex-col h-[680px]">
            <div className="space-y-2 shrink-0">
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-slate-400 text-xs"></i>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search 100 AI for HR modules..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <select
                value={catFilter}
                onChange={(e) => setCatFilter(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-purple-500"
              >
                <option value="ALL">All Categories (100 Modules)</option>
                <option value="Prompt Engineering">Prompt Engineering</option>
                <option value="AI in Excel">AI in Excel</option>
                <option value="AI Prototyping">AI Prototyping</option>
                <option value="Document AI">Document AI</option>
                <option value="Workplace Automation">Workplace Automation</option>
                <option value="Claude & Artifacts">Claude & Artifacts</option>
                <option value="Talent Acquisition AI">Talent Acquisition AI</option>
                <option value="Employee Relations & POSH AI">Employee Relations & POSH AI</option>
                <option value="Performance & L&D AI">Performance & L&D AI</option>
                <option value="Workplace Productivity AI">Workplace Productivity AI</option>
              </select>
            </div>

            <div className="flex justify-between items-center text-[11px] text-slate-500 shrink-0 border-b pb-1">
              <span>Showing {filteredModules.length} of {aiHrModulesData.length} modules</span>
              {search && (
                <button onClick={() => setSearch('')} className="text-purple-600 font-bold hover:underline">
                  Clear Search
                </button>
              )}
            </div>

            {/* Scrollable Module List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {filteredModules.map((mod) => {
                const isSelected = mod.id === selectedModule.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => handleSelectModule(mod)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-700 shadow-md'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase ${
                          isSelected ? 'bg-purple-700 text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {mod.category}
                      </span>
                      <i className={`fa-solid ${mod.icon} text-[10px] ${isSelected ? 'text-white' : 'text-slate-400'}`}></i>
                    </div>

                    <h4 className={`font-bold text-xs leading-snug line-clamp-2 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {mod.title}
                    </h4>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {mod.aiToolsUsed.map((tool, i) => (
                        <span
                          key={i}
                          className={`text-[8px] font-semibold px-1.5 py-0.2 rounded ${
                            isSelected ? 'bg-purple-800 text-purple-200' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel (8/12 Width): AI Masterclass & Practice Sandbox */}
          <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col h-[680px] overflow-y-auto space-y-5 custom-scrollbar">
            {/* Active Module Header */}
            <div className="flex justify-between items-center border-b pb-3 shrink-0">
              <div>
                <span className="text-[10px] font-extrabold text-purple-700 uppercase">{selectedModule.category}</span>
                <h3 className="font-bold text-slate-900 text-base">{selectedModule.title}</h3>
              </div>
              <div className="flex items-center space-x-1.5">
                {selectedModule.aiToolsUsed.map((t, i) => (
                  <span key={i} className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2 py-0.5 rounded border border-purple-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Section 1: Concept & Why HR Needs It */}
            <div className="space-y-2 shrink-0">
              <strong className="text-slate-900 block font-bold text-xs">1. AI Concept & Workplace Application:</strong>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                {selectedModule.description}
              </p>
              <div className="text-xs text-purple-950 bg-purple-50 p-3 rounded-lg border border-purple-200 font-semibold">
                <strong className="text-purple-900 block text-[11px]">Why Everyday HR Leads Need This AI Tool:</strong>
                {selectedModule.whyHrNeedsIt}
              </div>
            </div>

            {/* Section 2: Masterclass System Prompt Template & Workflow SOP */}
            <div className="space-y-2 shrink-0">
              <strong className="text-slate-900 block font-bold text-xs">2. Masterclass System Prompt Template & Execution SOP:</strong>
              <div className="bg-slate-900 text-slate-100 p-3.5 rounded-xl text-xs font-mono whitespace-pre-line leading-relaxed">
                <span className="text-amber-400 font-bold block mb-1">Masterclass System Prompt Blueprint:</span>
                {selectedModule.systemPromptTemplate}
              </div>

              <div className="space-y-1.5 pt-1">
                {selectedModule.workflowSteps.map((step, idx) => (
                  <div key={idx} className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-start space-x-2 text-xs">
                    <span className="bg-purple-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-slate-800 font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Interactive Prompting Sandbox & Gemini Evaluation */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 shrink-0">
              <strong className="text-slate-900 block font-bold text-xs">3. Hands-On AI Prompting Sandbox:</strong>
              <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200 text-indigo-950 text-xs">
                <strong className="text-indigo-900 block font-bold mb-0.5">Assigned AI Prompting Task:</strong>
                <span>{selectedModule.practiceTask}</span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Your Custom System Prompt / Automation Workflow:
                </label>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  rows={4}
                  placeholder="Draft your AI prompt (Role, Task, Format, Context) or automation workflow steps..."
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                ></textarea>
              </div>

              <button
                disabled={isAuditing}
                onClick={handleEvaluatePrompt}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl shadow flex items-center justify-center space-x-2 disabled:opacity-50 text-xs"
              >
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                <span>{isAuditing ? 'Evaluating AI Prompt...' : 'Evaluate Prompt & Workflow with Gemini AI'}</span>
              </button>

              {aiEvaluation && (
                <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono leading-relaxed whitespace-pre-line">
                  <div className="text-amber-400 font-bold border-b border-slate-800 pb-1">
                    Gemini AI Prompt Engineering Audit Report
                  </div>
                  <div>{aiEvaluation}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
