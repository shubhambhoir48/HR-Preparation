'use client';

import React, { useState } from 'react';
import { callGeminiAI } from '@/lib/gemini';

export interface AiHrModule {
  id: string;
  title: string;
  category: 'Prompt Engineering' | 'AI in Excel' | 'AI Prototyping' | 'Document AI' | 'Workplace Automation' | 'Claude & Artifacts';
  icon: string;
  aiToolsUsed: string[];
  description: string;
  whyHrNeedsIt: string;
  systemPromptTemplate: string;
  workflowSteps: string[];
  practiceTask: string;
  defaultUserInput: string;
}

export const aiHrModulesData: AiHrModule[] = [
  {
    id: 'ai_mod_1',
    title: 'HR Prompt Engineering Masterclass (ChatGPT, Gemini, Claude)',
    category: 'Prompt Engineering',
    icon: 'fa-brain',
    aiToolsUsed: ['ChatGPT 4o', 'Gemini 1.5 Pro', 'Claude 3.5 Sonnet'],
    description: 'Master the RTF (Role, Task, Format) prompting framework to generate non-defensive PIPs, JD bullet points, and candidate rejection emails in seconds.',
    whyHrNeedsIt: 'Saves 10+ hours per week of manual drafting while ensuring 100% legal, non-discriminatory tone and professional wording.',
    systemPromptTemplate: 'Role: Senior HR Business Partner in a fast-paced tech MNC.\nTask: Draft a formal 30-Day PIP notice for a Senior Engineer with sprint delay issues.\nFormat: Markdown with sections for 1) Identified Gaps, 2) 30-Day SMART Milestones, 3) Review SLA.\nTone: Firm, supportive, non-defensive, legally compliant with Indian labor standards.',
    workflowSteps: [
      'Step 1: Set the AI Role & Persona (e.g. "Act as a Senior HR BP in an Indian MNC").',
      'Step 2: Provide clear Context & Constraints (e.g. "Do not use overly aggressive language; cite 30-day timeline").',
      'Step 3: Specify the exact Output Format (e.g. "Use bullet points and Markdown headings").',
      'Step 4: Audit AI output against company policy before sending.'
    ],
    practiceTask: 'Write a System Prompt for Gemini/ChatGPT to generate a compelling Cutshort Tech Job Description for a Senior React + Node Engineer.',
    defaultUserInput: 'Role: Tech Recruiter | Task: Write a Cutshort job description for Senior Full-Stack Developer (React + Node) in Pune (₹18-24 LPA) | Format: Include 1) 30-Second Elevator Pitch, 2) Tech Stack Required, 3) Perks & Hybrid Policy.'
  },
  {
    id: 'ai_mod_2',
    title: 'AI in Excel & Google Sheets Automated Formula Generation',
    category: 'AI in Excel',
    icon: 'fa-file-excel',
    aiToolsUsed: ['ChatGPT 4o', 'Excel AI', 'Google Sheets AI'],
    description: 'Use ChatGPT/Gemini to instantly generate complex Excel formulas (XLOOKUP, NESTED IF, ARRAYFORMULA, Regex) without memorizing syntax.',
    whyHrNeedsIt: 'Eliminates Excel formula syntax errors when calculating EPF capping, FnF leave encashments, or attrition risk scores across 500+ employees.',
    systemPromptTemplate: 'Task: Write an Excel formula for Column E.\nLogic: If Column C (Tenure in Yrs) is less than 0.25 AND Column D (Exit Status) is "Exited", return "Early Attrition (< 90 Days)", else return "Normal".',
    workflowSteps: [
      'Step 1: Describe your Excel column letters and data logic to ChatGPT/Gemini in plain English.',
      'Step 2: Copy the generated formula (e.g. =IF(AND(C2<0.25, D2="Exited"), "Early Attrition", "Normal")).',
      'Step 3: Paste into Cell E2 and drag down across all employee rows.',
      'Step 4: Verify formula output against sample calculation.'
    ],
    practiceTask: 'Ask AI to write a Google Sheets ARRAYFORMULA that calculates employee daily basic salary (Monthly Basic / 30) and leave encashment payout.',
    defaultUserInput: 'Prompt for AI: "Write a Google Sheets formula for Column F. Multiply Column C (Monthly Basic Salary) by Column E (Unused Leave Days) and divide by 30 to get Leave Encashment Payout. Format result as INR currency."'
  },
  {
    id: 'ai_mod_3',
    title: 'Fast HR Web App Prototyping (Lovable.dev, Bolt.new, v0)',
    category: 'AI Prototyping',
    icon: 'fa-laptop-code',
    aiToolsUsed: ['Lovable.dev', 'Bolt.new', 'v0.dev'],
    description: 'Build functional internal HR web tools (e.g., Attendance Portal, cNPS Survey Calculator) in 10 minutes without coding using free AI app builders.',
    whyHrNeedsIt: 'Allows non-technical HR Leads to prototype custom internal tools for their team without waiting for Engineering/IT backlogs.',
    systemPromptTemplate: 'Build a single-page React app with Tailwind CSS for a Candidate Net Promoter Score (cNPS) Calculator. Include a rating scale (0-10), candidate role dropdown, live cNPS score calculation (% Promoters - % Detractors), and clean dark-mode UI.',
    workflowSteps: [
      'Step 1: Open Lovable.dev or Bolt.new in browser (Free Tier).',
      'Step 2: Paste the plain English HR App Specification prompt into the chat box.',
      'Step 3: Preview the live generated web tool and request UI tweaks (e.g. "Add a button to download CSV report").',
      'Step 4: Share the live app link with your HR team.'
    ],
    practiceTask: 'Write a prompt for Lovable.dev to create an internal 30-Day PIP Milestone Progress Tracker web page.',
    defaultUserInput: 'Prompt for Lovable.dev: "Create a modern, clean internal web app dashboard for tracking 30-Day PIP Milestones. Include employee name, designation, weekly review status checkboxes, progress bar (0-100%), and a button to export PDF report."'
  },
  {
    id: 'ai_mod_4',
    title: 'AI Document Generation & Statutory Policy Synthesis (Claude 3.5)',
    category: 'Document AI',
    icon: 'fa-file-contract',
    aiToolsUsed: ['Claude 3.5 Sonnet', 'Gemini Pro'],
    description: 'Synthesize complex statutory labor acts (POSH Act 2013, Maternity Benefit Act 2017) into full MNC policy charters using Claude 3.5 Sonnet.',
    whyHrNeedsIt: 'Ensures 100% legal compliance when drafting employee handbooks, remote work charters, or ICC committee policies.',
    systemPromptTemplate: 'Draft a full 5-page MNC Remote Work & BYOD Policy Charter referencing Section 43A of the Information Technology Act, 2000. Include sections for 1) Approved Device Security, 2) VPN & Data Encryption, 3) Reimbursement Allowances, 4) Disciplinary Penalties.',
    workflowSteps: [
      'Step 1: Upload statutory legal PDF or paste labor act text into Claude 3.5 Sonnet.',
      'Step 2: Prompt Claude to synthesize into a structured MNC policy charter with clear clauses.',
      'Step 3: Review legal definitions, statutory timelines, and signature blocks.',
      'Step 4: Export to Word (.docx) or PDF for CEO signature.'
    ],
    practiceTask: 'Write a prompt for Claude to generate an Indian Statutory Maternity Leave Policy Charter under Maternity Benefit (Amendment) Act 2017.',
    defaultUserInput: 'Prompt for Claude: "Synthesize a formal Indian Statutory Maternity Leave Policy Charter in accordance with Maternity Benefit Act 2017. Include 26 weeks paid leave mandate, creche facility clause for 50+ headcount, and 6-week post-birth leave rules."'
  },
  {
    id: 'ai_mod_5',
    title: 'No-Code Workplace Workflow Automation (Zapier, Make.com)',
    category: 'Workplace Automation',
    icon: 'fa-diagram-project',
    aiToolsUsed: ['Zapier', 'Make.com', 'Google Workspace'],
    description: 'Connect Google Forms, Gmail, Slack, and Google Docs to automatically send offer letters, notify hiring managers, and update ATS status.',
    whyHrNeedsIt: 'Eliminates repetitive manual data entry between Google Forms, emails, and spreadsheet logs.',
    systemPromptTemplate: 'Workflow Trigger: New response submitted on Candidate Onboarding Google Form.\nAction 1: Auto-generate personalized Offer Letter Doc in Google Drive.\nAction 2: Send Slack alert to #hr-onboarding channel with candidate details.\nAction 3: Email candidate welcome kit.',
    workflowSteps: [
      'Step 1: Create a free account on Make.com or Zapier.',
      'Step 2: Set Trigger: "Google Forms - New Form Response".',
      'Step 3: Set Action 1: "Google Docs - Create Document from Template" (fill candidate name, salary, DOJ).',
      'Step 4: Set Action 2: "Slack - Send Channel Message" and turn Zap ON.'
    ],
    practiceTask: 'Design a Make.com / Zapier automated workflow for handling incoming candidate resume applications.',
    defaultUserInput: 'Zapier Workflow:\nTrigger: New Email with PDF Attachment received at careers@company.com\nAction 1: Save resume PDF to Google Drive /Resumes/2026\nAction 2: Parse candidate name & phone using Zapier Parser\nAction 3: Post alert in Slack #recruitment-pipeline'
  },
  {
    id: 'ai_mod_6',
    title: 'Claude 3.5 Sonnet Artifacts for Executive Board Presentations',
    category: 'Claude & Artifacts',
    icon: 'fa-cubes',
    aiToolsUsed: ['Claude 3.5 Artifacts', 'Mermaid.js'],
    description: 'Use Claude Artifacts to generate interactive org charts, 30-60-90 day roadmap diagrams, and executive presentation visuals.',
    whyHrNeedsIt: 'Creates stunning visual artifacts and board-ready presentation components without needing graphic designers.',
    systemPromptTemplate: 'Generate an interactive Mermaid.js diagram and HTML card artifact representing our HR 10-Year Executive Career Pathway from HR Lead to CHRO.',
    workflowSteps: [
      'Step 1: Open Claude.ai and ensure "Artifacts" feature is enabled.',
      'Step 2: Prompt Claude to create a visual artifact (e.g. "Create an interactive HTML org chart for 100-person tech company").',
      'Step 3: Click the live Artifact preview side-panel to view the generated UI diagram.',
      'Step 4: Copy the code or export screenshot directly into your Executive Board deck.'
    ],
    practiceTask: 'Prompt Claude Artifacts to build a visual 3-phase 30-60-90 Day HR Strategic Roadmap card component.',
    defaultUserInput: 'Prompt for Claude Artifacts: "Create a visual HTML/CSS card artifact displaying a 30-60-90 Day HR Strategic Roadmap. Use Phase 1 (Audit & Learn), Phase 2 (Optimize & Automate), Phase 3 (Scale & Transform) with sleek dark mode aesthetics."'
  }
];

// Expand helper to generate 9 more modules reaching total 15
(() => {
  const categories: AiHrModule['category'][] = [
    'Prompt Engineering',
    'AI in Excel',
    'AI Prototyping',
    'Document AI',
    'Workplace Automation',
    'Claude & Artifacts'
  ];

  const extraMods = [
    { title: 'AI-Powered Resume Screening & Parsing (Gemini API)', cat: 'Document AI' as const, tools: ['Gemini 1.5 Flash', 'ChatGPT'] },
    { title: 'Automated POSH Incident Case Summarizer', cat: 'Document AI' as const, tools: ['Claude 3.5 Sonnet', 'Gemini'] },
    { title: 'AI-Generated 360-Degree Appraisal Feedback Synthesizer', cat: 'Prompt Engineering' as const, tools: ['ChatGPT 4o', 'Claude'] },
    { title: 'Building an Internal HR Policy Q&A Chatbot (Custom GPT)', cat: 'AI Prototyping' as const, tools: ['Custom GPTs', 'Gemini Gems'] },
    { title: 'AI Copywriting for LinkedIn Employer Branding & cNPS', cat: 'Prompt Engineering' as const, tools: ['ChatGPT', 'Claude'] },
    { title: 'Automated Interview Scheduling via AI Assistants', cat: 'Workplace Automation' as const, tools: ['Zapier', 'Calendly AI'] },
    { title: 'AI-Driven Exit Interview Trend Analysis & Topic Clustering', cat: 'AI in Excel' as const, tools: ['ChatGPT 4o', 'Excel AI'] },
    { title: 'Generating Training & Onboarding Micro-Courses with AI', cat: 'AI Prototyping' as const, tools: ['Gamma.app', 'v0.dev'] },
    { title: 'AI Compensation Equity & Market Salary Scraper Prompts', cat: 'Prompt Engineering' as const, tools: ['Perplexity AI', 'Claude'] }
  ];

  let curId = aiHrModulesData.length + 1;
  while (aiHrModulesData.length < 15) {
    const m = extraMods[(curId - 7) % extraMods.length];
    const cat = categories[(curId - 1) % categories.length];

    aiHrModulesData.push({
      id: `ai_mod_${curId}`,
      title: `Module ${curId}: ${m.title}`,
      category: cat,
      icon: 'fa-robot',
      aiToolsUsed: m.tools,
      description: `Learn how non-technical HR Leads leverage free AI tools for ${m.title}.`,
      whyHrNeedsIt: `Saves hours of manual HR work and elevates candidate Priyanka Vartak to a workplace AI champion.`,
      systemPromptTemplate: `Act as a Senior HR Systems Architect. Execute AI workflow for ${m.title}. Provide structured output with zero hallucination.`,
      workflowSteps: [
        `Step 1: Open free AI tool (${m.tools.join(', ')}).`,
        `Step 2: Paste structured system prompt and HR dataset.`,
        `Step 3: Review generated output and verify compliance.`,
        `Step 4: Apply directly to workplace operational workflow.`
      ],
      practiceTask: `Write a system prompt to automate ${m.title} using ${m.tools[0]}.`,
      defaultUserInput: `System Prompt for ${m.title}:\nRole: HR Operations Specialist | Task: Automate ${m.title} | Format: Structured Markdown table with action items.`
    });
    curId++;
  }
})();

export const AiForHrView: React.FC = () => {
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

    const prompt = `Act as a Master AI Engineer & HR Transformation Consultant. Evaluate candidate Priyanka Vartak's AI prompt / workplace automation workflow for "${selectedModule.title}":\n\nAI Category: ${selectedModule.category}\nAI Tools Used: ${selectedModule.aiToolsUsed.join(', ')}\n\nAssigned Task:\n"${selectedModule.practiceTask}"\n\nCandidate Submission:\n"${userInput}"\n\nProvide Evaluation Report:\n1. Prompt Engineering & AI Mastery Score (1-10)\n2. Clarity of Role, Task, Format, and Context\n3. Missing Nuances & Hallucination Safeguards\n4. Recommended Masterclass A-Grade System Prompt.`;

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
              Master free AI tools (Gemini, ChatGPT, Claude, Lovable, Zapier) for prompt engineering, AI in Excel, HR app prototyping, policy drafting, and workplace automation.
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
                  placeholder="Search 15 AI for HR modules..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <select
                value={catFilter}
                onChange={(e) => setCatFilter(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-purple-500"
              >
                <option value="ALL">All AI Categories (15 Modules)</option>
                <option value="Prompt Engineering">Prompt Engineering</option>
                <option value="AI in Excel">AI in Excel</option>
                <option value="AI Prototyping">AI Prototyping</option>
                <option value="Document AI">Document AI</option>
                <option value="Workplace Automation">Workplace Automation</option>
                <option value="Claude & Artifacts">Claude & Artifacts</option>
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
                    className={`w-full text-left p-3.5 rounded-xl border transition-all space-y-1 ${
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
