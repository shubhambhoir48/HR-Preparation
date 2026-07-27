export interface TargetCompany {
  id: string;
  name: string;
  role: string;
  web: string;
  loc: string;
  social: string;
  type: 'Startup' | 'SaaS' | 'Enterprise';
  jd: string;
  aiNotes?: string;
  interviewOutcome?: 'Shortlisted' | 'Rejected' | 'Interview Pending' | 'Offer Received';
  askedQuestions?: string;
  failureAnalysis?: string;
  remediationPlan?: {
    adaptiveSummary: string;
    recommendedFocus: string[];
    actionPlan: string;
  };
}

export interface SOPPlaybook {
  id: number;
  cat: string;
  title: string;
  startupWay: string;
  enterpriseWay: string;
  tools: string[];
  steps: string[];
}

export interface HRQuestion {
  id: number;
  domain: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  answer: string;
  quloiContext: string;
  tags: string[];
}

export interface HRLab {
  id: number;
  category: string;
  title: string;
  scenario: string;
  task: string;
  solution: string;
}

export interface StarStory {
  id: string;
  title: string;
  competency: string;
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface CustomTrainingModule {
  title: string;
  summary: string;
  strengths: string[];
  gaps: string[];
  recommendedSOPs: string[];
  recommendedTopics: string[];
  priorityAction: string;
}

export interface UserProfile {
  name: string;
  level: string;
  linkedIn: string;
  resumeText: string;
  resumeFileName?: string;
  parsedSkills?: string[];
  customTrainingModule?: CustomTrainingModule;
}

export interface UserProgress {
  mastered: number[];
  review: number[];
  sopsRead: number[];
  labCompleted: number[];
  streakDays: number;
}

export interface AppState {
  targetCompanies: TargetCompany[];
  activeCompanyId: string;
  userProfile: UserProfile;
  userProgress: UserProgress;
  starStoriesData: StarStory[];
  updatedAt?: string;
}
