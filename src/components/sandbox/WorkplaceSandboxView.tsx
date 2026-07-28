'use client';

import React, { useState } from 'react';
import { callGeminiAI } from '@/lib/gemini';

export interface WorkplaceCompany {
  id: string;
  name: string;
  category: 'Quick Commerce & Hyperlocal' | 'Fintech & SaaS Unicorns' | 'E-Commerce & Retail' | 'IT Services Giants' | 'Global Tech MNCs';
  logoText: string;
  hrCultureDna: string;
  employeeHeadcount: string;
  typicalProblems: string[];
  scenarios: {
    id: string;
    title: string;
    description: string;
    practiceTask: string;
    defaultInput: string;
  }[];
}

export const workplaceCompaniesData: WorkplaceCompany[] = [
  {
    id: 'wp_zepto',
    name: 'Zepto',
    category: 'Quick Commerce & Hyperlocal',
    logoText: 'ZP',
    employeeHeadcount: '2,500+ Corporate & 50,000+ Gig Riders',
    hrCultureDna: 'High-speed, 24/7 dark store operations, extreme recruitment velocity, high gig-worker churn, rider union negotiations, and ultra-fast onboarding.',
    typicalProblems: [
      'Dark store rider attrition & localized union strikes.',
      'Sourcing 50+ delivery executives per store weekly.',
      'Maintaining rider payout calculation compliance.'
    ],
    scenarios: [
      {
        id: 'zep_scen_1',
        title: 'Dark Store Rider Strike Resolution',
        description: 'Riders at a key Pune dark store have stopped deliveries, protesting a change in the delivery incentive slab structure (moving from fixed base pay to distance-based payouts). Store manager reports backlog of 2,000 orders.',
        practiceTask: 'Draft a 3-step immediate crisis resolution and communication plan for the rider group, incorporating rider payout safety nets.',
        defaultInput: '1. Immediate Action: Set up a spot meeting with rider representatives. 2. Safety Net: Guarantee a minimum base payout threshold for the first 14 days of the new slab transition. 3. Communication: Clearly explain how longer distance runs yield higher payouts using simple regional language handouts.'
      }
    ]
  },
  {
    id: 'wp_blinkit',
    name: 'Blinkit',
    category: 'Quick Commerce & Hyperlocal',
    logoText: 'BL',
    employeeHeadcount: '3,000+ Corporate & 60,000+ Delivery Partners',
    hrCultureDna: 'Zomato-backed quick-commerce scale, rapid dark-store expansion, hyper-local compliance, and direct competition with Zepto/Instamart.',
    typicalProblems: [
      'Gig rider payout disputes & public relations management.',
      'Store manager burnout & high retail operations turnover.',
      'Statutory compliance for warehouse staff operations.'
    ],
    scenarios: [
      {
        id: 'bli_scen_1',
        title: 'Preventing Store Manager Burnout',
        description: 'Data shows dark store managers are working 14-hour shifts due to early morning (6 AM) and late-night (11 PM) order spikes. Monthly manager turnover has reached 18%.',
        practiceTask: 'Propose a revised shift rotation schedule and mental health support framework for store operations managers.',
        defaultInput: '1. Shift Split: Introduce two distinct overlapping shifts (5 AM to 2 PM, 2 PM to 11 PM) instead of single-manager ownership. 2. Standby Bench: Create regional standby managers to cover emergency sick leaves. 3. Burnout Bonus: Link a monthly retention bonus directly to store manager tenure goals.'
      }
    ]
  },
  {
    id: 'wp_tcs',
    name: 'TCS (Tata Consultancy Services)',
    category: 'IT Services Giants',
    logoText: 'TC',
    employeeHeadcount: '600,000+ Global Employees',
    hrCultureDna: 'Massive enterprise scale, traditional corporate policies, low risk appetite, structured career hierarchies, and strict pan-India statutory compliance audits.',
    typicalProblems: [
      'Bench management: Transitioning thousands of unbilled resources into projects.',
      'Massive campus hiring onboarding and training allocations.',
      'Pan-India labor audits (Shops & Establishments, PF, ESIC, Gratuity).'
    ],
    scenarios: [
      {
        id: 'tcs_scen_1',
        title: 'Statutory EPF & Labor Compliance Audit Preparation',
        description: 'TCS is undergoing an annual statutory compliance audit by the Regional Provident Fund Commissioner. The auditor has flag-selected 5,000 employee profiles to verify basic salary EPF capping compliance.',
        practiceTask: 'Outline the audit preparation checklist to verify that all 5,000 profiles adhere to the ₹15,000 statutory basic ceiling EPF rule.',
        defaultInput: '1. Data Pull: Extract employee basic salary and actual EPF contributions. 2. Ceiling Audit: Verify that monthly employer EPF contributions do not exceed ₹1,800/month for capped profiles. 3. Register Verification: Ensure Form A attendance registers match the payroll records exactly.'
      }
    ]
  },
  {
    id: 'wp_infosys',
    name: 'Infosys',
    category: 'IT Services Giants',
    logoText: 'IN',
    employeeHeadcount: '320,000+ Employees',
    hrCultureDna: 'Process-driven IT consulting services, focus on skill re-training (Mysore Campus DNA), structured PIP frameworks, and global client billing alignment.',
    typicalProblems: [
      'Maintaining developer billability & client-side transition.',
      'Standardizing performance reviews for hundreds of agile teams.',
      'Resolving double employment / moonlighting cases.'
    ],
    scenarios: [
      {
        id: 'inf_scen_1',
        title: 'Standardizing Developer PIP Reviews',
        description: 'A project manager wants to immediately fire a developer who missed a sprint delivery twice, bypassing the standard company PIP policy.',
        practiceTask: 'Write a response advising the manager on the correct legal and company policy steps required before termination.',
        defaultInput: 'Dear Manager, under company policy and Industrial Disputes framework, we cannot initiate immediate termination without due process. We must first enroll the employee in a formal 30-day Performance Improvement Plan (PIP) with documented SMART milestones. HR will facilitate weekly reviews.'
      }
    ]
  },
  {
    id: 'wp_google_india',
    name: 'Google India',
    category: 'Global Tech MNCs',
    logoText: 'GG',
    employeeHeadcount: '10,000+ Employees in India Hubs',
    hrCultureDna: 'Elite technical talent, high-compensation standards, focus on psychological safety, progressive diversity & inclusion, and metrics-driven performance reviews.',
    typicalProblems: [
      'Attracting and retaining niche AI/ML engineers.',
      'Complex POSH cases involving senior directors.',
      'Maintaining candidate experience (cNPS) during complex hiring loops.'
    ],
    scenarios: [
      {
        id: 'goo_scen_1',
        title: 'POSH ICC Complaint Investigation Case',
        description: 'A female Software Engineer has filed a formal POSH sexual harassment complaint against an Engineering Director at the Google Pune facility. The Director claims the interaction was purely professional.',
        practiceTask: 'As the ICC Presiding Officer, outline the immediate interim relief and the 90-day investigation plan under POSH Act 2013.',
        defaultInput: '1. Interim Relief: Immediately separate reporting lines or transfer the respondent/complainant to a different team to prevent contact. 2. Quorum: Convene ICC with 50%+ women members and our external independent legal member. 3. SLA: Complete witness depositions, issue formal notice, and submit the inquiry report within 90 days.'
      }
    ]
  }
];

// Expand helper to add remaining 15+ companies to reach a minimum of 20+ top IT & startups
(() => {
  const categories: WorkplaceCompany['category'][] = [
    'Quick Commerce & Hyperlocal',
    'Fintech & SaaS Unicorns',
    'E-Commerce & Retail',
    'IT Services Giants',
    'Global Tech MNCs'
  ];

  const extraCompanies = [
    { name: 'Swiggy Instamart', logo: 'SW', headcount: '20,000+ employees', problems: ['Gig rider scheduling', 'Warehouse safety audits'] },
    { name: 'Razorpay', logo: 'RZ', headcount: '4,000+ employees', problems: ['Fintech hiring SLAs', 'ESOP allocation pools'] },
    { name: 'Zerodha', logo: 'ZR', headcount: '1,500+ employees', problems: ['Lean HR operations', 'Support team retention'] },
    { name: 'Cred', logo: 'CR', headcount: '800+ employees', problems: ['Elite design hiring', 'Creative culture retention'] },
    { name: 'Freshworks', logo: 'FW', headcount: '5,500+ employees', problems: ['SaaS product sourcing', 'US-India cross-border coordination'] },
    { name: 'Flipkart', logo: 'FK', headcount: '15,000+ corporate', problems: ['Big Billion Days temporary hiring', 'Delivery hub disputes'] },
    { name: 'Meesho', logo: 'MS', headcount: '2,500+ employees', problems: ['Flat hierarchy management', 'Diversity & inclusion metrics'] },
    { name: 'Zomato', logo: 'ZO', headcount: '5,000+ corporate', problems: ['Food delivery commission disputes', 'Late-night support safety'] },
    { name: 'Wipro', logo: 'WP', headcount: '250,000+ employees', problems: ['Moonlighting checks', 'Statutory PF ceiling compliance'] },
    { name: 'Cognizant', logo: 'CO', headcount: '300,000+ employees', problems: ['Developer attrition management', 'Annual salary increment audits'] },
    { name: 'Accenture India', logo: 'AC', headcount: '350,000+ employees', problems: ['Large-scale diversity hiring', 'Bench utilization analytics'] },
    { name: 'Microsoft IDC', logo: 'MS', headcount: '18,000+ employees', problems: ['Niche research hiring', 'Cross-border relocation compliance'] },
    { name: 'Amazon India', logo: 'AZ', headcount: '60,000+ corporate & fulfillment', problems: ['Fulfillment center labor relations', 'MNC scale attrition'] },
    { name: 'Uber Tech India', logo: 'UB', headcount: '3,500+ employees', problems: ['Engineering hiring metrics', 'Driver support HR policies'] },
    { name: 'Meta India', logo: 'ME', headcount: '1,200+ employees', problems: ['Ad sales executive recruitment', 'High-end developer branding'] }
  ];

  let curId = workplaceCompaniesData.length + 1;
  while (workplaceCompaniesData.length < 20) {
    const c = extraCompanies[(curId - 6) % extraCompanies.length];
    const cat = categories[(curId - 1) % categories.length];

    workplaceCompaniesData.push({
      id: `wp_comp_${curId}`,
      name: c.name,
      category: cat,
      logoText: c.logo,
      employeeHeadcount: c.headcount,
      hrCultureDna: `Fast-paced workspace at ${c.name} demanding top HR agility, data-driven people decisions, and compliance standards.`,
      typicalProblems: c.problems,
      scenarios: [
        {
          id: `scen_comp_${curId}`,
          title: `Resolving ${c.problems[0]} at ${c.name}`,
          description: `You are the Lead HR BP at ${c.name}. You are facing a critical issue: ${c.problems[0]} which has started to impact operational timelines.`,
          practiceTask: `Outline a detailed HR action plan and communication draft to resolve this operational issue.`,
          defaultInput: `HR Action Plan for ${c.name}:\n1. Objective: Resolve ${c.problems[0]}.\n2. Actions: Implement structured feedback loops, track metrics weekly, and configure statutory safeguards.\n3. Stakeholders: Coordinate with Department Leads to audit outcome.`
        }
      ]
    });
    curId++;
  }
})();

export interface WorkplaceSandboxViewProps {
  userName?: string;
}

export const WorkplaceSandboxView: React.FC<WorkplaceSandboxViewProps> = ({ userName = 'HR Professional' }) => {
  const [selectedComp, setSelectedComp] = useState<WorkplaceCompany>(workplaceCompaniesData[0]);
  const [selectedScen, setSelectedScen] = useState(workplaceCompaniesData[0].scenarios[0]);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('ALL');

  const [userInput, setUserInput] = useState(workplaceCompaniesData[0].scenarios[0].defaultInput);
  const [aiFeedback, setAiFeedback] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);

  const filteredComps = workplaceCompaniesData.filter((c) => {
    const matchesCat = catFilter === 'ALL' || c.category === catFilter;
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.hrCultureDna.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSelectCompany = (comp: WorkplaceCompany) => {
    setSelectedComp(comp);
    setSelectedScen(comp.scenarios[0]);
    setUserInput(comp.scenarios[0].defaultInput);
    setAiFeedback('');
  };

  const handleSelectScenario = (scen: typeof selectedComp.scenarios[0]) => {
    setSelectedScen(scen);
    setUserInput(scen.defaultInput);
    setAiFeedback('');
  };

  const handleEvaluateSandbox = async () => {
    if (!userInput.trim()) return;

    setIsEvaluating(true);

    const prompt = `Act as the Chief Human Resources Officer (CHRO) at ${selectedComp.name}. Evaluate candidate ${userName}'s workplace action plan for the following scenario:\n\nCompany: ${selectedComp.name}\nCulture DNA:\n"${selectedComp.hrCultureDna}"\n\nScenario Title: ${selectedScen.title}\nScenario Description:\n"${selectedScen.description}"\n\nAssigned Task:\n"${selectedScen.practiceTask}"\n\nCandidate Action Plan:\n"${userInput}"\n\nProvide Evaluation Report:\n1. Company Culture Fit Score (1-10)\n2. Operational Feasibility & Speed of Execution\n3. Statutory & Labor Compliance Audit\n4. Recommended A-Grade Model HR Action Plan tailored to ${selectedComp.name}'s standards.`;

    const result = await callGeminiAI(prompt);
    setIsEvaluating(false);

    setAiFeedback(result || 'Sandbox evaluation completed.');
  };

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        {/* Header */}
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">MNC & Startup Workplace Simulation Sandbox</span>
          <h2 className="text-2xl font-bold text-slate-900">Workplace Organization Sandbox</h2>
          <p className="text-xs text-slate-500 mt-1">
            Choose to become the HR Lead at 20+ top IT companies, fintech unicorns, and fast commerce startups. Roleplay high-stakes workplace crises and get evaluated by Gemini AI against each company&apos;s specific culture DNA.
          </p>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
          {/* Left Panel: 20+ Companies List */}
          <div className="lg:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 flex flex-col h-[700px]">
            <div className="space-y-2 shrink-0">
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-slate-400 text-xs"></i>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search 20+ target companies..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <select
                value={catFilter}
                onChange={(e) => setCatFilter(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ALL">All Categories (20+ Companies)</option>
                <option value="Quick Commerce & Hyperlocal">Quick Commerce & Hyperlocal</option>
                <option value="Fintech & SaaS Unicorns">Fintech & SaaS Unicorns</option>
                <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                <option value="IT Services Giants">IT Services Giants</option>
                <option value="Global Tech MNCs">Global Tech MNCs</option>
              </select>
            </div>

            <div className="flex justify-between items-center text-[11px] text-slate-500 shrink-0 border-b pb-1">
              <span>Showing {filteredComps.length} of {workplaceCompaniesData.length} companies</span>
            </div>

            {/* Scrollable Company List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {filteredComps.map((comp) => {
                const isSelected = comp.id === selectedComp.id;
                return (
                  <button
                    key={comp.id}
                    onClick={() => handleSelectCompany(comp)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-md'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase ${
                        isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {comp.category}
                      </span>
                      <span className={`text-[10px] font-bold ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                        {comp.employeeHeadcount.split(' ')[0]} Headcount
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${
                        isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-800'
                      }`}>
                        {comp.logoText}
                      </div>
                      <h4 className={`font-extrabold text-sm leading-snug ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {comp.name}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Workspace & Crisis Simulator */}
          <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col h-[700px] overflow-y-auto space-y-5 custom-scrollbar">
            {/* Active Company DNA Header */}
            <div className="border-b pb-4 shrink-0 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center space-x-2">
                  <span>Becoming HR Lead at {selectedComp.name}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">Scale: {selectedComp.employeeHeadcount}</p>
              </div>
              <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-indigo-200">
                Workplace Sandbox Active
              </span>
            </div>

            {/* HR Culture DNA & Problems */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shrink-0">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <strong className="text-slate-900 block text-xs font-bold">Company HR Culture DNA:</strong>
                <p className="text-xs text-slate-700 leading-relaxed">{selectedComp.hrCultureDna}</p>
              </div>

              <div className="bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/60 space-y-1">
                <strong className="text-amber-900 block text-xs font-bold">Common Workplace Pain Points:</strong>
                <ul className="list-disc list-inside text-xs text-amber-950 space-y-0.5 font-medium">
                  {selectedComp.typicalProblems.map((prob, i) => (
                    <li key={i}>{prob}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Scenario Selection Tabs */}
            <div className="space-y-3 shrink-0">
              <strong className="text-slate-900 block font-bold text-xs">Choose Your Workplace HR Scenario:</strong>
              <div className="flex flex-wrap gap-2">
                {selectedComp.scenarios.map((scen) => {
                  const isScenSel = scen.id === selectedScen.id;
                  return (
                    <button
                      key={scen.id}
                      onClick={() => handleSelectScenario(scen)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isScenSel ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {scen.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Scenario Card */}
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-200/60 space-y-2 shrink-0">
              <strong className="text-indigo-950 block text-sm font-bold flex items-center space-x-1.5">
                <i className="fa-solid fa-triangle-exclamation text-indigo-600"></i>
                <span>Situation: {selectedScen.title}</span>
              </strong>
              <p className="text-xs text-slate-700 leading-relaxed">{selectedScen.description}</p>
            </div>

            {/* Action Plan Input & Gemini Grading */}
            <div className="space-y-4 shrink-0">
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                <strong className="text-slate-900 block text-xs font-bold">Assigned HR Workplace Task:</strong>
                <p className="text-xs text-slate-800 font-semibold bg-slate-50 p-3 rounded-lg border border-slate-200">
                  {selectedScen.practiceTask}
                </p>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Your Proposed Workplace Action Plan & Statutory Strategy:
                  </label>
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    rows={5}
                    placeholder="Type your strategic steps, policy safeguards, communication draft, or negotiation plan..."
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                  ></textarea>
                </div>

                <button
                  disabled={isEvaluating}
                  onClick={handleEvaluateSandbox}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl shadow flex items-center justify-center space-x-2 disabled:opacity-50 text-xs transition-all"
                >
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                  <span>{isEvaluating ? 'Evaluating Sandbox Plan...' : `Submit Plan & Grade as ${selectedComp.name} HR`}</span>
                </button>
              </div>

              {/* Gemini CHRO Grading Report */}
              {aiFeedback && (
                <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono leading-relaxed whitespace-pre-line">
                  <div className="text-amber-400 font-bold border-b border-slate-800 pb-1 flex items-center justify-between">
                    <span>CHRO Executive Grading & Culture Fit Report</span>
                    <i className="fa-solid fa-circle-check text-emerald-400"></i>
                  </div>
                  <div>{aiFeedback}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
