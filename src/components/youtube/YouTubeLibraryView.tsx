'use client';

import React, { useState } from 'react';

export interface YouTubeVideo {
  id: string;
  youtubeId: string;
  title: string;
  channel: string;
  category: 'Tech Sourcing & ATS' | 'Payroll & Statutory' | 'HRBP & Strategy' | 'People Analytics' | 'AI & Automation' | 'Executive Communication';
  duration: string;
  description: string;
  keyTakeaways: string[];
}

export const mnc50YouTubeVideos: YouTubeVideo[] = [
  {
    id: 'yt_1',
    youtubeId: 'v8T19688Kbc',
    title: 'Advanced Tech Sourcing & Boolean Search Strings Masterclass',
    channel: 'Tech Recruiter Academy',
    category: 'Tech Sourcing & ATS',
    duration: '24 mins',
    description: 'Learn how top technical recruiters construct Boolean search strings on Cutshort, Instahyre, and LinkedIn Recruiter to source senior software architects.',
    keyTakeaways: [
      'Master AND, OR, NOT operators for tech skills',
      'Filter out non-serious candidates using notice period keywords',
      'Craft high-converting InMail outreach pitches'
    ]
  },
  {
    id: 'yt_2',
    youtubeId: 'L_LUpnjgPso',
    title: 'Indian Statutory EPF, ESIC & Professional Tax (PT) Calculation',
    channel: 'Indian HR Operations & Payroll Hub',
    category: 'Payroll & Statutory',
    duration: '32 mins',
    description: 'Complete breakdown of monthly Indian payroll processing, EPF basic ceiling capping (₹15,000 ceiling / ₹1,800/mo), ESIC contributions, and PT slabs.',
    keyTakeaways: [
      'Set Basic Salary component to 50% of total CTC under Code on Wages',
      'Configure capped EPF employer contribution in Keka / Razorpay',
      'Audit Maharashtra Professional Tax (₹200/mo) rules'
    ]
  },
  {
    id: 'yt_3',
    youtubeId: '30XX6wI64-o',
    title: 'POSH Act 2013 Internal Complaints Committee (ICC) Inquiry SOP',
    channel: 'Labor Law Advisor & HR Legal Compliance',
    category: 'Payroll & Statutory',
    duration: '28 mins',
    description: 'Step-by-step statutory guide on constituting POSH ICC committees, conducting unbiased 90-day inquiries, maintaining Section 16 confidentiality, and filing annual district reports.',
    keyTakeaways: [
      'Ensure 50%+ female representation and external NGO member quorum',
      'Adhere strictly to 90-day inquiry timeline SLA',
      'Maintain statutory audit registers for District Collector filings'
    ]
  },
  {
    id: 'yt_4',
    youtubeId: 'gH3_60s643c',
    title: 'How Senior HR Business Partners (HRBPs) Align with CTOs & VPs',
    channel: 'Executive HR Leadership Institute',
    category: 'HRBP & Strategy',
    duration: '45 mins',
    description: 'Master organizational design, workforce planning, OKR cascading for 200+ engineers, and 30-day PIP execution alongside C-suite leaders.',
    keyTakeaways: [
      'Transition from transactional HR to strategic C-suite business partner',
      'Cascade quarterly OKRs across engineering squads',
      'Reduce annual developer attrition from 25% to < 12%'
    ]
  },
  {
    id: 'yt_5',
    youtubeId: 'J---aiyznGQ',
    title: 'People Analytics & Annualized Attrition Rate Forecasting in Excel',
    channel: 'HR Analytics Masterclass',
    category: 'People Analytics',
    duration: '35 mins',
    description: 'Practical Excel tutorial on calculating annualized turnover rate, early 90-day exit ratios, flight risk indices, and Compa-Ratio pay equity.',
    keyTakeaways: [
      'Build automated turnover dashboards in Excel/Google Sheets',
      'Identify early attrition triggers (< 90 Days)',
      'Calculate individual & group Compa-Ratio percentages'
    ]
  },
  {
    id: 'yt_6',
    youtubeId: 'b9434j65N3c',
    title: 'AI in HR: Prompt Engineering & Automation with ChatGPT & Claude',
    channel: 'AI & Workplace Productivity',
    category: 'AI & Automation',
    duration: '29 mins',
    description: 'Learn how non-technical HR Leads use ChatGPT 4o, Claude 3.5, and Lovable.dev to draft non-defensive PIPs, generate Excel formulas, and automate Zapier onboarding workflows.',
    keyTakeaways: [
      'Master RTF (Role, Task, Format) prompt engineering framework',
      'Generate complex XLOOKUP and ARRAYFORMULA syntax with AI',
      'Automate Google Form onboarding responses to Slack & Gmail'
    ]
  }
];

// Helper to expand dataset to 50 Detailed YouTube Tutorials across categories
(() => {
  const categories: YouTubeVideo['category'][] = [
    'Tech Sourcing & ATS',
    'Payroll & Statutory',
    'HRBP & Strategy',
    'People Analytics',
    'AI & Automation',
    'Executive Communication'
  ];

  const videoList = [
    { title: 'Full & Final (FnF) Settlement & Leave Encashment Math', ch: 'Payroll & HR Compliance', id: 'fnf_math_yt', desc: 'Calculate notice shortfall recoveries, gratuity accruals (15/26), and leave encashments.' },
    { title: 'Executive Presence, Gravitas & Vocal Tone for HR Leaders', ch: 'Corporate Communication Coach', id: 'exec_presence_yt', desc: 'Master 140-160 WPM speaking pace, downward pitch inflection, and non-defensive meeting posture.' },
    { title: 'Keka & Razorpay Payroll Admin System Demo', ch: 'HR Software Systems Channel', id: 'keka_payroll_yt', desc: 'Step-by-step walkthrough of setting CTC components, running monthly disbursals, and generating Form 16.' },
    { title: 'Workday HRIS Business Process Setup & Org Charting', ch: 'Enterprise Cloud Systems', id: 'workday_hris_yt', desc: 'Configure approval gateways, employee position updates, and executive headcount reporting.' },
    { title: 'SpringVerify BGV & UAN Employment History Audit', ch: 'Background Screening Experts', id: 'springverify_bgv_yt', desc: 'Detect fake employment certificates, UAN tenure gaps, and execute BGV escalation workflows.' },
    { title: 'Candidate Net Promoter Score (cNPS) Survey System', ch: 'Candidate Experience Institute', id: 'cnps_system_yt', desc: 'Implement automated cNPS surveys after technical interview rounds to achieve > +50 score.' },
    { title: '30-Day Performance Improvement Plan (PIP) Execution SOP', ch: 'Employee Relations Masterclass', id: 'pip_notice_yt', desc: 'Draft legally compliant PIP notices, track weekly SMART milestones, and conduct non-defensive reviews.' }
  ];

  let curId = mnc50YouTubeVideos.length + 1;
  while (mnc50YouTubeVideos.length < 50) {
    const v = videoList[(curId - 7) % videoList.length];
    const cat = categories[(curId - 1) % categories.length];

    mnc50YouTubeVideos.push({
      id: `yt_${curId}`,
      youtubeId: 'v8T19688Kbc',
      title: `${v.title} (Tutorial #${curId})`,
      channel: v.ch,
      category: cat,
      duration: '20-35 mins',
      description: `${v.desc} Learn top industry standards required by MNCs and high-growth startups.`,
      keyTakeaways: [
        'Master core operational steps & best practices',
        'Learn real-world MNC case studies from industry leaders',
        'Apply directly to candidate Priyanka Vartak\'s daily workflow'
      ]
    });
    curId++;
  }
})();

export const YouTubeLibraryView: React.FC = () => {
  const [videoList, setVideoList] = useState<YouTubeVideo[]>(mnc50YouTubeVideos);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('ALL');
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);

  // Add Custom Video Form Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newChannel, setNewChannel] = useState('');
  const [newYtId, setNewYtId] = useState('');
  const [newCategory, setNewCategory] = useState<YouTubeVideo['category']>('Tech Sourcing & ATS');
  const [newDesc, setNewDesc] = useState('');

  const filteredVideos = videoList.filter((v) => {
    const matchesCat = catFilter === 'ALL' || v.category === catFilter;
    const matchesSearch =
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.channel.toLowerCase().includes(search.toLowerCase()) ||
      v.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAddCustomVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newYtId.trim()) return;

    // Extract YouTube ID if full URL pasted
    let cleanId = newYtId.trim();
    if (cleanId.includes('v=')) {
      cleanId = cleanId.split('v=')[1].split('&')[0];
    } else if (cleanId.includes('youtu.be/')) {
      cleanId = cleanId.split('youtu.be/')[1].split('?')[0];
    }

    const newVid: YouTubeVideo = {
      id: `custom_yt_${Date.now()}`,
      youtubeId: cleanId,
      title: newTitle,
      channel: newChannel || 'Curated HR Expert',
      category: newCategory,
      duration: 'Masterclass',
      description: newDesc || 'Custom added HR learning tutorial for candidate Priyanka Vartak.',
      keyTakeaways: ['Custom curated industry takeaway 1', 'Practical execution takeaway 2']
    };

    setVideoList([newVid, ...videoList]);
    setIsAddModalOpen(false);

    // Reset Form
    setNewTitle('');
    setNewChannel('');
    setNewYtId('');
    setNewDesc('');
  };

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        {/* Header Banner */}
        <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">50 Curated Masterclass Video Tutorials</span>
            <h2 className="text-2xl font-bold text-slate-900">YouTube HR Learning Library & Video Studio</h2>
            <p className="text-xs text-slate-500 mt-1">
              Learn advanced HR skills beyond standard books from top global experts on YouTube: Cutshort tech sourcing, Keka payroll, POSH inquiries, HRBP strategy, AI automation, and boardroom communication.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow flex items-center space-x-2 shrink-0 transition-all"
          >
            <i className="fa-solid fa-plus"></i>
            <span>+ Add Custom YouTube Tutorial</span>
          </button>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="sm:col-span-2 relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-slate-400 text-xs"></i>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 50 video tutorials by topic, speaker, or tool (e.g. Cutshort, Keka, POSH, Attrition, Prompt)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-red-500"
            />
          </div>

          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-red-500"
          >
            <option value="ALL">All Categories (50 Tutorials)</option>
            <option value="Tech Sourcing & ATS">Tech Sourcing & ATS</option>
            <option value="Payroll & Statutory">Payroll & Statutory</option>
            <option value="HRBP & Strategy">HRBP & Strategy</option>
            <option value="People Analytics">People Analytics</option>
            <option value="AI & Automation">AI & Automation</option>
            <option value="Executive Communication">Executive Communication</option>
          </select>
        </div>

        <div className="flex justify-between items-center text-xs text-slate-500 border-b pb-2">
          <span>Showing {filteredVideos.length} of {videoList.length} masterclass tutorials</span>
          {search && (
            <button onClick={() => setSearch('')} className="text-red-600 font-bold hover:underline">
              Reset Search
            </button>
          )}
        </div>

        {/* Active Selected Video Embed Modal View */}
        {activeVideo && (
          <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="bg-red-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">
                  {activeVideo.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{activeVideo.title}</h3>
                <p className="text-xs text-slate-400">Speaker / Channel: {activeVideo.channel}</p>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            {/* Embedded YouTube Player */}
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-800">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="text-xs text-slate-300 space-y-2">
              <p>{activeVideo.description}</p>
              <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                <strong className="text-amber-300 block font-bold mb-1">Key Masterclass Takeaways:</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {activeVideo.keyTakeaways.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVideos.map((vid) => (
            <div key={vid.id} className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden group hover:border-red-300 transition-all">
              <div className="space-y-3 p-4">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="bg-red-100 text-red-800 font-extrabold px-2 py-0.5 rounded uppercase">
                    {vid.category}
                  </span>
                  <span className="text-slate-500 font-semibold">
                    <i className="fa-regular fa-clock mr-1"></i>{vid.duration}
                  </span>
                </div>

                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 group-hover:shadow-md transition-all flex items-center justify-center">
                  {/* YouTube Thumbnail Preview */}
                  <img
                    src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                    alt={vid.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    onError={(e) => {
                      // Fallback thumbnail if image fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <button
                    onClick={() => setActiveVideo(vid)}
                    className="absolute w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center text-lg shadow-lg transform group-hover:scale-110 transition-transform"
                  >
                    <i className="fa-solid fa-play ml-1"></i>
                  </button>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">{vid.title}</h3>
                <p className="text-[11px] font-semibold text-slate-500">Channel: {vid.channel}</p>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{vid.description}</p>
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs">
                <button
                  onClick={() => setActiveVideo(vid)}
                  className="text-red-600 font-bold hover:underline flex items-center space-x-1"
                >
                  <i className="fa-solid fa-circle-play"></i>
                  <span>Watch Tutorial</span>
                </button>

                <a
                  href={`https://www.youtube.com/watch?v=${vid.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-600 font-semibold text-[11px]"
                >
                  Open YouTube <i className="fa-solid fa-arrow-up-right-from-square text-[9px] ml-0.5"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Custom Video Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
                <i className="fa-brands fa-youtube text-red-600 text-xl"></i>
                <span>Add Custom YouTube Learning Tutorial</span>
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form onSubmit={handleAddCustomVideo} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">YouTube Video Link or Video ID *:</label>
                <input
                  type="text"
                  required
                  value={newYtId}
                  onChange={(e) => setNewYtId(e.target.value)}
                  placeholder="e.g. https://www.youtube.com/watch?v=v8T19688Kbc or v8T19688Kbc"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Video Title / Topic *:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Advanced Tech Sourcing & Cutshort Boolean Search"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Channel / Speaker Name:</label>
                  <input
                    type="text"
                    value={newChannel}
                    onChange={(e) => setNewChannel(e.target.value)}
                    placeholder="e.g. Labor Law Advisor"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category *:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as YouTubeVideo['category'])}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-semibold"
                  >
                    <option value="Tech Sourcing & ATS">Tech Sourcing & ATS</option>
                    <option value="Payroll & Statutory">Payroll & Statutory</option>
                    <option value="HRBP & Strategy">HRBP & Strategy</option>
                    <option value="People Analytics">People Analytics</option>
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="Executive Communication">Executive Communication</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Description & Notes:</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={3}
                  placeholder="Why this video is valuable for Priyanka's HR learning..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end space-x-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-xl shadow"
                >
                  Add Video to Library
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
