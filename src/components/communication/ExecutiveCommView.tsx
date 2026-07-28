'use client';

import React, { useState } from 'react';
import { callGeminiAI } from '@/lib/gemini';

export interface ExecutiveCommViewProps {
  completedIds?: string[];
  onToggleComplete?: (id: string) => void;
  userName?: string;
}

export interface CommPillar {
  id: string;
  title: string;
  category: 'Vocal & Speech' | 'Business Writing' | 'C-Suite Presentations' | 'Executive Attire & Presence' | 'Conflict & Negotiation' | 'Active Reading' | 'Public Speaking' | 'Body Language' | 'Global Communication' | 'Radical Candor' | 'Crisis Management' | 'Data Storytelling';
  icon: string;
  description: string;
  coreRules: string[];
  behaviors: string[];
  terms: { term: string; definition: string }[];
  howToSteps: string[];
  sampleTask: string;
  defaultInput: string;
}

export const commPillarsData: CommPillar[] = [
  {
    id: 'pillar_vocal',
    title: 'Pillar 1: Executive Vocal Clarity, Pitch & Speech Modulation',
    category: 'Vocal & Speech',
    icon: 'fa-microphone-lines',
    description: 'Master authoritative vocal inflection, optimal speaking pace (140-160 WPM), and eliminate filler words.',
    coreRules: [
      'Pace: Speak at a measured 140 - 160 words per minute for maximum executive authority.',
      'Eliminate Filler Words: Replace "um", "ah", "basically", "you know" with purposeful 1-second pauses.',
      'Downward Inflection: End key statements with downward pitch inflection to convey certainty.',
      'Diaphragmatic Breathing: Breathe deeply to prevent high-pitched vocal strain during intense meetings.'
    ],
    behaviors: [
      'Maintain a calm, measured tone even when challenged.',
      'Pause for 2-3 seconds after making a critical point to let it sink in.',
      'Project voice from the diaphragm, not the throat, to command a boardroom.'
    ],
    terms: [
      { term: 'Uptalk', definition: 'The habit of making statements sound like questions by raising pitch at the end. (Avoid this)' },
      { term: 'Vocal Fry', definition: 'Dropping the voice to a low, croaky register at the end of sentences. (Projects fatigue or apathy)' },
      { term: 'Pacing', definition: 'Deliberately controlling the speed of speech to emphasize importance.' }
    ],
    howToSteps: [
      '1. Record yourself answering a common HR question (e.g., "Why should we hire you?").',
      '2. Listen back and tally every filler word used.',
      '3. Practice speaking the same answer, consciously stopping to breathe where you would normally use a filler.',
      '4. End your final sentence confidently with a downward pitch.'
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
    behaviors: [
      'Never send an email while angry (apply the 24-hour rule for heated conflicts).',
      'Use bullet points instead of long paragraphs to respect executive time.',
      'Double-check all names and titles before hitting send.'
    ],
    terms: [
      { term: 'BLUF', definition: 'Bottom Line Up Front. The core message comes first.' },
      { term: 'Active Voice', definition: 'The subject performs the action (e.g., "HR finalized the budget").' },
      { term: 'CYA Email', definition: '"Cover Your Assets" - A polite email documenting a decision or warning to mitigate future risk.' }
    ],
    howToSteps: [
      '1. Write a draft of your email.',
      '2. Move your absolute most important point to the very first sentence.',
      '3. Delete adverbs (very, really, deeply) and tighten sentences.',
      '4. Format action items clearly with assignees and deadlines.',
      '5. Proofread via Grammarly or Hemingway App before sending.'
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
    behaviors: [
      'Never read directly off the slides. Look at the executives.',
      'Anticipate the 3 hardest questions they will ask and put the answers in the appendix.',
      'If you do not know the answer, say "I do not have that exact data point, but I will follow up by 3 PM." Never guess.'
    ],
    terms: [
      { term: 'SCR Structure', definition: 'Situation (Context), Complication (The Problem), Recommendation (The Solution).' },
      { term: 'Hostile Q&A', definition: 'Aggressive questioning from stakeholders designed to test your knowledge or rattle you.' },
      { term: 'Executive Summary', definition: 'The first slide that summarizes the entire deck so busy leaders can get the gist immediately.' }
    ],
    howToSteps: [
      '1. Start with a hook or a powerful data point to grab attention.',
      '2. Map out the SCR narrative before touching PowerPoint.',
      '3. Design slides using minimal text and strong visual data charts.',
      '4. Practice transitioning smoothly between slides without looking back at the screen.',
      '5. Conduct a "murder board" (mock aggressive Q&A) with a colleague.'
    ],
    sampleTask: 'Draft the opening slide pitch for presenting the 30-60-90 Day HR Strategic Plan to the VP of Engineering.',
    defaultInput: 'Situation: Our Pune hub is expanding from 50 to 200 developers. Complication: Statutory compliance and developer turnover threaten sprint velocity. Recommendation: We are executing a 3-phase strategic plan focused on statutory audits, cNPS optimization, and FnF payout SLAs < 48 hours.'
  },
  {
    id: 'pillar_attire',
    title: 'Pillar 4: Executive Attire, Grooming & Professional Presence',
    category: 'Executive Attire & Presence',
    icon: 'fa-user-tie',
    description: 'Master MNC professional dress codes, flawless grooming, power dressing, and how to command respect visually before speaking.',
    coreRules: [
      'The "One-Step Above" Rule: Always dress one notch slightly more formal than your audience.',
      'Fit Over Brand: A tailored, inexpensive suit looks infinitely more professional than a baggy designer suit.',
      'Grooming Standards: Neat, pulled-back hair; clean nails; minimal, non-distracting fragrances.',
      'Video Call Etiquette: Dress professionally from the waist up, ensure soft front lighting, and a clutter-free background.'
    ],
    behaviors: [
      'Project personal hygiene and crispness; wrinkled clothes subconsciously signal sloppy work.',
      'Use conservative, neutral colors (Navy, Charcoal, White, Beige) for high-stakes negotiations.',
      'Keep accessories minimal—one watch, simple earrings. Avoid clanking jewelry.'
    ],
    terms: [
      { term: 'Power Dressing', definition: 'Dressing in a way that conveys authority, competence, and confidence.' },
      { term: 'Business Formal', definition: 'Full matching suit and tie for men; tailored suit or formal business dress/saree for women.' },
      { term: 'Smart Casual', definition: 'Professional but relaxed. Blazers with dark jeans or chinos; no t-shirts with logos.' }
    ],
    howToSteps: [
      '1. Audit your wardrobe: Remove anything frayed, stained, or ill-fitting.',
      '2. Invest in a tailoring: Have blazers and trousers professionally tailored to your specific measurements.',
      '3. Establish a morning grooming routine ensuring flawless hair, skin, and nail presentation.',
      '4. Test your video setup: Turn on your webcam, check lighting, background, and camera angle (eye-level).'
    ],
    sampleTask: 'Formulate an executive checklist for personal posture, attire, and video call setup before chairing a POSH ICC inquiry.',
    defaultInput: '1. Attire: Tailored navy blue executive blazer with white formal blouse.\n2. Grooming: Neat hair, professional neutral makeup, minimalist accessories.\n3. Camera: Eye-level webcam position with front ring light.\n4. Demeanor: Neutral, empathetic, authoritative facial expression with steady eye contact.'
  },
  {
    id: 'pillar_conflict',
    title: 'Pillar 5: Conflict Resolution & Negotiation Mastery',
    category: 'Conflict & Negotiation',
    icon: 'fa-handshake',
    description: 'De-escalate heated employee disputes, negotiate salary buyouts, and assert statutory compliance firmly without burning bridges.',
    coreRules: [
      'Separate People from Problems: Focus on the issue, not the personality defect.',
      'De-escalation Technique: Validate emotion -> Probe with open questions -> Pivot to objective policy.',
      'BATNA: Always know your Best Alternative To a Negotiated Agreement before entering a salary talk.',
      'Firm Statutory Boundaries: Clearly communicate that legal statutory compliance (PF, POSH, PT) is non-negotiable.'
    ],
    behaviors: [
      'Never raise your voice, even if the other person is screaming.',
      'Use "I" statements ("I feel concerned when we miss deadlines") instead of "You" statements ("You always miss deadlines").',
      'Embrace silence during a negotiation to let the other party counter-offer against themselves.'
    ],
    terms: [
      { term: 'BATNA', definition: 'Best Alternative to a Negotiated Agreement. Your walk-away plan.' },
      { term: 'Mirroring', definition: 'Repeating the last three words of the other person to encourage them to elaborate.' },
      { term: 'Anchoring', definition: 'Setting the initial number or terms in a negotiation to pull subsequent offers toward it.' }
    ],
    howToSteps: [
      '1. Allow the angry employee to vent completely without interrupting.',
      '2. Validate their feelings: "I can see why you are frustrated with this payout delay."',
      '3. Realign on shared goals: "We both want to ensure you are compensated fairly and legally."',
      '4. Present data-backed solutions: "Here is the statutory calculation sheet showing exactly how this was taxed."'
    ],
    sampleTask: 'Draft a verbal response to an employee who becomes angry during a 30-Day PIP notice meeting.',
    defaultInput: 'I understand that receiving a PIP notice is stressful, and I appreciate you sharing your frustration. However, our focus today is to provide clear milestone support and coaching so you can succeed. Let us review the objective sprint metrics together and build a plan to get you back on track.'
  },
  {
    id: 'pillar_reading',
    title: 'Pillar 6: Active Reading & Legal Comprehension',
    category: 'Active Reading',
    icon: 'fa-book-open-reader',
    description: 'Rapidly review complex statutory labor acts, legal employment contracts, and policy charters to spot compliance risks.',
    coreRules: [
      'Skim & Scan Technique: Read heading -> Definitions -> Penalty sections -> Execution clauses.',
      'Red Flag Spotting: Look for ambiguous notice period clauses, missing statutory caps, or unapproved liability transfers.',
      'Annotate & Summarize: Write 1-sentence takeaways in margins for quick executive briefings.'
    ],
    behaviors: [
      'Do not assume standard boilerplate is safe. Read the exact clauses.',
      'Highlight dates, financial penalties, and termination clauses in bright colors.',
      'Translate dense legalese into simple business impact statements for the CEO.'
    ],
    terms: [
      { term: 'Legalese', definition: 'Formal, technical language of legal documents.' },
      { term: 'Boilerplate', definition: 'Standardized text in contracts that is often unread but highly binding.' },
      { term: 'Indemnity', definition: 'Security or protection against a loss or other financial burden.' }
    ],
    howToSteps: [
      '1. Read the document summary or preamble first to understand the intent.',
      '2. Scan for defined terms (usually capitalized) to understand exact scope.',
      '3. Hunt for words like "shall", "must", and "liability" which indicate strict obligations.',
      '4. Summarize the risk exposure into a 3-bullet email for the legal team.'
    ],
    sampleTask: 'Draft a 3-bullet executive summary after reading a 15-page Maharashtra Shops & Establishments Act amendment.',
    defaultInput: '1. Registration Mandate: Online Form A registration required for offices with 10+ employees.\n2. Work Hour Limits: Capped at 9 hrs/day and 48 hrs/week; overtime paid at double rate.\n3. Statutory Leave: Earned leave accrued at 1 day per 20 working days with 45-day carry forward cap.'
  },
  {
    id: 'pillar_public_speaking',
    title: 'Pillar 7: Public Speaking & Town Hall Leadership',
    category: 'Public Speaking',
    icon: 'fa-users-viewfinder',
    description: 'Command large audiences during All-Hands meetings, manage stage presence, and effectively use microphones.',
    coreRules: [
      'The 3-Second Stare: Before speaking, plant your feet and look at the audience in silence for 3 seconds.',
      'Microphone Etiquette: Hold the mic 1-2 inches from your chin; if turning your head, the mic moves with your head.',
      'Eye Contact Zoning: Divide the room into 3 zones (Left, Center, Right) and spend 5 seconds connecting with one person in each zone.',
      'The "Power Pose": Feet shoulder-width apart, weight evenly distributed. Do not shift weight side-to-side.'
    ],
    behaviors: [
      'Use natural, expansive hand gestures rather than keeping arms pinned to your sides.',
      'Project confidence even if technology fails (e.g., slides freeze). Keep talking smoothly.',
      'Smile genuinely when walking onto the stage to build instant warmth.'
    ],
    terms: [
      { term: 'Town Hall / All-Hands', definition: 'A company-wide gathering where leadership shares updates and fields Q&A.' },
      { term: 'Podium Grip', definition: 'The nervous habit of gripping the podium tightly. (Rest hands lightly instead).' },
      { term: 'Vocal Projection', definition: 'Pushing your voice to reach the back of the room without screaming.' }
    ],
    howToSteps: [
      '1. Rehearse the opening 2 minutes relentlessly so you start strong despite adrenaline.',
      '2. Walk onto the stage with purpose, plant your feet, and pause.',
      '3. Deliver your message using the zone-based eye contact method.',
      '4. When taking live Q&A, repeat the question into the mic so the whole room hears it before answering.'
    ],
    sampleTask: 'Draft an opening hook for a Town Hall addressing an upcoming massive change in the Remote Work policy.',
    defaultInput: 'Good afternoon team. Over the last two years, we redefined how we work. Today, we are taking the next step in our evolution. I want to address the new hybrid work policy head-on, explain exactly why the leadership team made this decision, and how we will support you through this transition.'
  },
  {
    id: 'pillar_body_language',
    title: 'Pillar 8: Body Language & Non-Verbal Presence',
    category: 'Body Language',
    icon: 'fa-person-chalkboard',
    description: 'Read the room, detect micro-expressions, control your own non-verbal leaks, and exude Executive Gravitas.',
    coreRules: [
      'Open Posture: Avoid crossing arms or legs during negotiations, which signals defensiveness.',
      'The "Steeple": Resting fingertips together (forming a steeple) conveys high confidence and intellect.',
      'Nodding Dynamics: A slow nod indicates deep listening; a fast nod indicates impatience ("hurry up").',
      'Micro-Expressions: Watch for fleeting facial expressions (disgust, fear, anger) that reveal true feelings.'
    ],
    behaviors: [
      'Lean in slightly when someone is speaking to show active engagement.',
      'Avoid touching your face or neck (pacifying behaviors that show anxiety).',
      'Match and mirror the posture of the person you are speaking with to build subconscious rapport.'
    ],
    terms: [
      { term: 'Gravitas', definition: 'A demeanor of dignity, seriousness, and profound executive authority.' },
      { term: 'Micro-expression', definition: 'A brief, involuntary facial expression showing true emotion.' },
      { term: 'Pacifying Behavior', definition: 'Self-soothing touches (rubbing neck, adjusting tie) that indicate stress.' }
    ],
    howToSteps: [
      '1. Enter the room with your head up and shoulders back.',
      '2. Offer a firm, dry handshake with direct eye contact.',
      '3. Sit upright, occupying your space fully (do not shrink into the chair).',
      '4. Observe the feet of others; feet pointed toward the door indicate a desire to leave.'
    ],
    sampleTask: 'Describe your physical posture and non-verbal cues when listening to a CEO give a highly critical performance review of your HR department.',
    defaultInput: 'I will sit with an open posture, feet planted firmly on the ground. My hands will be resting loosely on the table, taking notes. I will maintain steady eye contact with the CEO, offering slow, deliberate nods to show I am absorbing the feedback without becoming defensive or crossing my arms.'
  },
  {
    id: 'pillar_global',
    title: 'Pillar 9: Cross-Cultural & Global Communication',
    category: 'Global Communication',
    icon: 'fa-earth-americas',
    description: 'Navigate cultural nuances, adjust communication styles for US, EU, and APAC stakeholders, and master timezone empathy.',
    coreRules: [
      'High vs. Low Context: US/UK are low-context (explicit, direct). Japan/India are high-context (nuanced, read-between-the-lines).',
      'Timezone Empathy: Rotate meeting times so one region does not always bear the burden of midnight calls.',
      'Direct vs. Indirect Feedback: Germans prefer blunt, direct feedback. Southeast Asians prefer softer, indirect feedback to save face.',
      'Avoid Idioms: Do not use local sports idioms ("knock it out of the park", "sticky wicket") in global emails.'
    ],
    behaviors: [
      'Slow down your speaking pace slightly for non-native English speakers.',
      'Always send a written summary after a global call, as reading comprehension is often higher than auditory comprehension.',
      'Respect cultural holidays and out-of-office norms (e.g., European August holidays).'
    ],
    terms: [
      { term: 'High-Context Culture', definition: 'Cultures where communication relies heavily on implicit, non-verbal cues and relationships.' },
      { term: 'Saving Face', definition: 'Avoiding public humiliation or preserving dignity, highly critical in Asian cultures.' },
      { term: 'Timezone Empathy', definition: 'The practice of considering global time differences before scheduling or expecting replies.' }
    ],
    howToSteps: [
      '1. Identify the cultural background of your stakeholders using Hofstede\'s cultural dimensions.',
      '2. Adapt your email tone: Use warm greetings for relationship-based cultures, and get straight to business for task-based cultures.',
      '3. Clarify agreements explicitly at the end of meetings to ensure nothing was lost in translation.',
      '4. Use international date/time formats (e.g., 15-Oct-2026, 14:00 UTC) to prevent confusion.'
    ],
    sampleTask: 'Draft a Slack message to a German engineering manager and an Indian QA lead regarding a delayed release.',
    defaultInput: 'Hi Team. @Klaus (Germany): The sprint release is delayed by 2 days due to server configuration issues. Please adjust the Jira timeline. @Rahul (India): Thank you for your team\'s hard work this week. Could you kindly review the QA logs and let us know if we can assist in accelerating the final checks?'
  },
  {
    id: 'pillar_radical_candor',
    title: 'Pillar 10: Radical Candor & Performance Feedback',
    category: 'Radical Candor',
    icon: 'fa-bullseye',
    description: 'Master the art of "Caring Personally while Challenging Directly" when giving tough performance reviews.',
    coreRules: [
      'Radical Candor Matrix: Care Personally + Challenge Directly.',
      'The SBI Model: Situation, Behavior, Impact. Frame feedback around facts, not character attacks.',
      'Praise in Public, Criticize in Private: Never humiliate an employee in front of peers.',
      'Don\'t Sandwich: The "compliment sandwich" dilutes the feedback. Be direct and kind.'
    ],
    behaviors: [
      'Deliver tough feedback face-to-face or on video, never via Slack or Email.',
      'Ask for feedback on yourself regularly to build a culture of psychological safety.',
      'Give feedback within 24 hours of the event. Do not wait for annual reviews.'
    ],
    terms: [
      { term: 'Ruinous Empathy', definition: 'Caring personally but failing to challenge directly, leading to poor performance.' },
      { term: 'Obnoxious Aggression', definition: 'Challenging directly without showing you care personally (being a jerk).' },
      { term: 'SBI Model', definition: 'A framework for feedback: Situation, Behavior, Impact.' }
    ],
    howToSteps: [
      '1. State your intention: "I\'m sharing this because I want to see you succeed here."',
      '2. Use SBI: "In yesterday\'s client meeting (Situation), you interrupted the client twice (Behavior), which caused them to end the meeting early (Impact)." ',
      '3. Pause and let them respond.',
      '4. Co-create a solution: "How can we ensure this goes better next time?"'
    ],
    sampleTask: 'Deliver Radical Candor feedback to a highly talented but arrogant Senior Developer who frequently insults junior staff in code reviews.',
    defaultInput: 'Arjun, your technical architecture is world-class, and we value your expertise. However, I need to talk to you about your tone in PR reviews. When you use phrases like "this is garbage code" (Behavior), it destroys the confidence of our junior devs and slows down our velocity (Impact). Going forward, I need you to focus your feedback strictly on the code logic, not the person. Can we agree on that?'
  },
  {
    id: 'pillar_crisis',
    title: 'Pillar 11: HR Crisis Management & Damage Control',
    category: 'Crisis Management',
    icon: 'fa-shield-halved',
    description: 'Communicate calmly during mass layoffs, PR scandals, leadership exits, or sudden policy rollbacks.',
    coreRules: [
      'Speed vs. Accuracy: Acknowledge the crisis immediately ("We are aware..."), provide details when verified.',
      'Empathy First: Acknowledge the human impact before quoting corporate policy.',
      'One Unified Voice: Ensure all leadership is speaking from the exact same approved talking points.',
      'Control the Narrative: If you don\'t speak, the rumor mill will create the narrative for you.'
    ],
    behaviors: [
      'Project extreme calm. If HR panics, the entire company panics.',
      'Never say "No Comment" to employees; say "We are currently investigating and will update you by 5 PM." ',
      'Set up a dedicated channel or FAQ document to centralize rumors and answers.'
    ],
    terms: [
      { term: 'Holding Statement', definition: 'An immediate, pre-drafted response acknowledging a crisis while facts are gathered.' },
      { term: 'Town Square Effect', definition: 'The rapid spread of rumors in company Slack channels during a vacuum of official information.' },
      { term: 'RTO', definition: 'Return To Office - A common source of modern corporate crisis communication.' }
    ],
    howToSteps: [
      '1. Assemble the Crisis Response Team (HR, Legal, PR, CEO).',
      '2. Issue a 3-sentence Holding Statement to the company within 60 minutes.',
      '3. Draft comprehensive Talking Points and FAQs for managers.',
      '4. Hold an emergency All-Hands to address the issue with radical transparency.',
      '5. Monitor employee sentiment via pulse surveys post-crisis.'
    ],
    sampleTask: 'Draft a Holding Statement for the company Slack after a rumor leaks that the company missed funding and will do layoffs.',
    defaultInput: 'Team, we are aware of the rumors circulating in the press regarding our Series C funding. We understand this causes anxiety. Leadership is finalizing our Q3 financial briefing right now. The CEO will hold an All-Hands meeting tomorrow at 10 AM to share the full, transparent facts with you. Please hold all questions until then.'
  },
  {
    id: 'pillar_data_story',
    title: 'Pillar 12: Data Storytelling & Persuasion for HR Budgets',
    category: 'Data Storytelling',
    icon: 'fa-chart-line',
    description: 'Transform boring HR metrics into compelling financial stories that convince the CFO to approve your budgets.',
    coreRules: [
      'Speak the Language of Business: Connect HR metrics (Turnover) to Business metrics (Revenue Loss).',
      'The "So What?" Test: For every data point, answer "So what does this mean for the company?"',
      'Use the Rule of Three: Human brains remember things in threes. Give 3 data points, 3 reasons, or 3 options.',
      'Visualize Clearly: Use bar charts for comparisons, line charts for trends. Eliminate chart junk.'
    ],
    behaviors: [
      'Do not overwhelm executives with huge spreadsheets. Show them the insight, keep the spreadsheet in your back pocket.',
      'Frame HR investments not as "nice to haves", but as risk mitigation and ROI drivers.',
      'Anticipate the CFO\'s objections and dismantle them with data before they ask.'
    ],
    terms: [
      { term: 'Cost of Vacancy (COV)', definition: 'The daily revenue lost when a critical role remains unfilled.' },
      { term: 'Data Storytelling', definition: 'The ability to build a compelling narrative around complex data.' },
      { term: 'Chart Junk', definition: 'Unnecessary visual clutter (3D effects, gridlines) that distracts from the data.' }
    ],
    howToSteps: [
      '1. Identify your core argument (e.g., "We need to buy LinkedIn Recruiter").',
      '2. Gather the current state data (Time to fill is currently 65 days).',
      '3. Calculate the financial impact (65 days x $1,000 Cost of Vacancy = $65k lost per role).',
      '4. Present the ROI (A $10k license saves $55k per role).',
      '5. Conclude with a clear Call to Action for budget approval.'
    ],
    sampleTask: 'Pitch a request to the CFO for a ₹5 Lakh budget for a new Employee Wellness App using Data Storytelling.',
    defaultInput: 'Currently, our burnout-related absenteeism has spiked by 22%, costing us roughly ₹15 Lakhs in lost productivity this quarter. Competitors who implemented wellness tools saw a 30% drop in absenteeism. I am requesting ₹5 Lakhs for a wellness app. This is not a perk, it is a risk mitigation strategy that yields a 3x ROI by keeping our engineers at their desks and productive.'
  }
];

export const ExecutiveCommView: React.FC<ExecutiveCommViewProps> = ({ completedIds = [], onToggleComplete, userName = 'HR Professional' }) => {
  const [selectedPillar, setSelectedPillar] = useState<CommPillar>(commPillarsData[0]);
  const [activeTab, setActiveTab] = useState<'masterclass' | 'practice'>('masterclass');
  const [userInput, setUserInput] = useState(commPillarsData[0].defaultInput);
  const [aiEvaluation, setAiEvaluation] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);

  const handleSelectPillar = (p: CommPillar) => {
    setSelectedPillar(p);
    setUserInput(p.defaultInput);
    setAiEvaluation('');
    setActiveTab('masterclass');
  };

  const handleAuditCommunication = async () => {
    if (!userInput.trim()) return;
    setIsAuditing(true);

    const prompt = `Act as an Executive Leadership Coach & Corporate Communication Specialist. Audit candidate ${userName}'s response for "${selectedPillar.title}":\n\nPillar Category: ${selectedPillar.category}\nCore Rules:\n${selectedPillar.coreRules.join('; ')}\n\nPractical Task Assigned:\n"${selectedPillar.sampleTask}"\n\nCandidate Submission:\n"${userInput}"\n\nProvide Feedback Report:\n1. Executive Presence & Professionalism Score (1-10)\n2. Grammar, Vocabulary & Tone Precision\n3. What was executed well\n4. Missing executive nuances & A-Grade Model Polish.`;

    const result = await callGeminiAI(prompt);
    setIsAuditing(false);
    setAiEvaluation(result || 'Evaluation completed successfully.');
  };

  return (
    <section className="h-[calc(100vh-120px)] flex flex-col space-y-4">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Executive Personality & Leadership Development</span>
            <h2 className="text-2xl font-bold text-slate-900">Workplace Personality & Executive Communication Masterclass</h2>
            <p className="text-xs text-slate-500 mt-1">
              12 Comprehensive Pillars: Master public speaking, boardroom presence, crisis management, data storytelling, grooming, and radical candor.
            </p>
          </div>
          <button
            onClick={() => {
              if (onToggleComplete) onToggleComplete(selectedPillar.id);
            }}
            className={`font-bold text-xs px-4 py-2 rounded-xl transition-colors border shadow-sm ${
              completedIds.includes(selectedPillar.id) 
                ? 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200' 
                : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
            }`}
          >
            {completedIds.includes(selectedPillar.id) ? (
              <><i className="fa-solid fa-check mr-1.5"></i> Pillar Mastered</>
            ) : (
              <><i className="fa-solid fa-check-double mr-1.5"></i> Mark Pillar Mastered</>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden gap-4">
        {/* Left Sidebar: Pillar Navigation */}
        <div className="w-80 bg-white border border-slate-200 rounded-xl flex flex-col shadow-sm shrink-0 overflow-hidden">
          <div className="bg-slate-50 p-3 border-b border-slate-200 font-bold text-sm text-slate-800 shrink-0">
            Select a Mastery Pillar ({commPillarsData.length})
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {commPillarsData.map((p) => {
              const isSelected = p.id === selectedPillar.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPillar(p)}
                  className={`w-full text-left p-3 rounded-lg border flex flex-col transition-all ${
                    isSelected 
                    ? 'border-indigo-500 bg-indigo-50/50 shadow-sm' 
                    : 'border-transparent hover:bg-slate-50 hover:border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${isSelected ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-500'}`}>
                      {p.category}
                    </span>
                    <i className={`fa-solid ${p.icon} ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`}></i>
                  </div>
                  <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>
                    {p.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white border border-slate-200 rounded-xl flex flex-col shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-200 shrink-0 bg-slate-50">
            <button 
              onClick={() => setActiveTab('masterclass')}
              className={`flex-1 py-3 text-sm font-bold border-b-2 flex justify-center items-center gap-2 transition-colors ${
                activeTab === 'masterclass' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-slate-500 hover:bg-slate-100'
              }`}
            >
              <i className="fa-solid fa-graduation-cap"></i>
              Masterclass & Guidelines
            </button>
            <button 
              onClick={() => setActiveTab('practice')}
              className={`flex-1 py-3 text-sm font-bold border-b-2 flex justify-center items-center gap-2 transition-colors ${
                activeTab === 'practice' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-slate-500 hover:bg-slate-100'
              }`}
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              AI Practice Workspace
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6">
            
            {/* MASTERCLASS TAB */}
            {activeTab === 'masterclass' && (
              <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{selectedPillar.title}</h3>
                  <p className="text-slate-600 font-medium">{selectedPillar.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Col: Rules & Behaviors */}
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl">
                      <h4 className="text-blue-900 font-bold text-sm mb-3 flex items-center gap-2">
                        <i className="fa-solid fa-scale-balanced"></i> Core Executive Rules
                      </h4>
                      <ul className="space-y-2.5">
                        {selectedPillar.coreRules.map((rule, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-blue-800 text-xs leading-relaxed">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0 mt-1.5"></span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-amber-50 border border-amber-100 p-5 rounded-xl">
                      <h4 className="text-amber-900 font-bold text-sm mb-3 flex items-center gap-2">
                        <i className="fa-solid fa-user-tie"></i> Expected Behaviors & Polish
                      </h4>
                      <ul className="space-y-2.5">
                        {selectedPillar.behaviors.map((beh, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-amber-900 text-xs leading-relaxed">
                            <i className="fa-solid fa-check text-amber-500 mt-0.5 shrink-0"></i>
                            <span>{beh}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Col: How-To & Vocabulary */}
                  <div className="space-y-6">
                    <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl">
                      <h4 className="text-emerald-900 font-bold text-sm mb-3 flex items-center gap-2">
                        <i className="fa-solid fa-list-ol"></i> Step-by-Step Execution
                      </h4>
                      <div className="space-y-3">
                        {selectedPillar.howToSteps.map((step, idx) => (
                          <div key={idx} className="text-emerald-800 text-xs font-medium leading-relaxed bg-white p-2.5 rounded-lg border border-emerald-100/50 shadow-sm">
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-100 p-5 rounded-xl">
                      <h4 className="text-purple-900 font-bold text-sm mb-3 flex items-center gap-2">
                        <i className="fa-solid fa-book"></i> Professional Vocabulary
                      </h4>
                      <div className="space-y-3 text-xs">
                        {selectedPillar.terms.map((term, idx) => (
                          <div key={idx} className="bg-white p-2.5 rounded-lg border border-purple-100 shadow-sm">
                            <strong className="text-purple-900 block mb-0.5">{term.term}</strong>
                            <span className="text-slate-600">{term.definition}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PRACTICE TAB */}
            {activeTab === 'practice' && (
              <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-slate-900 text-white p-6 rounded-xl relative overflow-hidden shadow-lg">
                  <div className="absolute -right-4 -top-4 opacity-10">
                    <i className="fa-solid fa-microphone-lines text-9xl"></i>
                  </div>
                  <h3 className="font-bold text-lg flex items-center space-x-2 mb-2 relative z-10">
                    <i className="fa-solid fa-dumbbell text-indigo-400"></i>
                    <span>Executive Practice Scenario</span>
                  </h3>
                  <p className="text-slate-300 text-sm relative z-10 leading-relaxed">
                    {selectedPillar.sampleTask}
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="block font-bold text-slate-800">
                    Your Response / Pitch / Writing Draft:
                  </label>
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    rows={8}
                    placeholder="Type your executive response here..."
                    className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-mono leading-relaxed focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none"
                  ></textarea>
                </div>

                <button
                  disabled={isAuditing}
                  onClick={handleAuditCommunication}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  {isAuditing ? (
                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                  ) : (
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                  )}
                  <span>{isAuditing ? 'Analyzing Executive Polish...' : 'Audit Tone & Polish with Gemini AI'}</span>
                </button>

                {aiEvaluation && (
                  <div className="bg-slate-900 text-slate-100 p-5 rounded-xl border border-slate-800 space-y-3 text-sm font-mono leading-relaxed whitespace-pre-line shadow-xl animate-in zoom-in-95 duration-300">
                    <div className="text-amber-400 font-bold border-b border-slate-800 pb-2 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <i className="fa-solid fa-robot"></i> Gemini AI Executive Audit
                      </span>
                      <i className="fa-solid fa-circle-check text-emerald-400"></i>
                    </div>
                    <div>{aiEvaluation}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
