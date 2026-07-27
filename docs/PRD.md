# Product Requirement Document (PRD)
## HR Lead Mastery & Multi-Company Accelerator Platform

### Document Metadata
- **Product Name**: HR Lead Mastery Pro
- **Target Audience**: HR Professionals (HR Leads, Senior HR Generalists, HRBPs)
- **Version**: 1.0.0 (Production Ready)
- **Tech Stack**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, Netlify Blobs, Gemini AI

---

## 1. Product Vision & Goals
The **HR Lead Mastery Platform** is a full-stack career accelerator and operational learning workspace. It bridges the gap between **theoretical HR knowledge** and **real-world execution** by enabling candidates to:
1. Practice interview preparation tailored dynamically to specific Job Descriptions (JDs).
2. Master 50+ granular HR SOPs across startups vs. top IT enterprise MNCs.
3. Utilize AI-driven tools (Gemini AI) to parse JDs, polish STAR stories, evaluate interview responses, and generate Indian statutory HR documents.
4. Persist data seamlessly using Netlify Blobs with local storage fallback.

---

## 2. Core Functional Modules & Specifications

### 2.1 Multi-Company Target Hub & JD Analyzer
- **Description**: Add/manage multiple target companies (SaaS, Startup, Enterprise). Paste JD text to trigger automatic skill keyword extraction and fit score calculation.
- **AI Integration**: Gemini AI parses JD text to extract 5 core competencies and generate a 2-sentence tailored elevator pitch.

### 2.2 Interactive Dashboard & Cheat Sheet
- **Description**: Central readiness command center. Displays JD Match Fit %, mastered questions count, SOPs read count, elevator pitch script, and recommended software tools.
- **Deliverable**: 1-Page downloadable/copyable Executive Interview Cheat Sheet summarizing 30-60-90 day plans and key competencies.

### 2.3 50+ Granular HR Process Playbooks (SOPs)
- **Description**: Step-by-step SOPs covering 8 categories: Recruitment & Sourcing, Headhunting, Onboarding, Statutory Laws, Payroll & FnF, Performance & PIP, ER & POSH, and HRIS Analytics.
- **Dual Architecture**: Compares **Startup Execution Stack** (e.g., Cutshort, Keka, Slack) vs. **Enterprise Stack** (e.g., Workday, Mercer, RPO agencies).

### 2.4 120+ HR Interview Question Repository & Flashcard Deck
- **Description**: 120+ structured questions across 8 HR domains.
- **Dual Views**:
  - *List View*: Filter by Domain, JD Match, or Status (Mastered / Review / Unanswered) with expandable model answer blueprints.
  - *Flashcard Deck*: 3D flip card self-testing mode with Web Speech API text-to-speech audio playback.

### 2.5 STAR Method Interview Storybuilder
- **Description**: Framework for drafting behavioral interview stories (Situation, Task, Action, Result).
- **AI Integration**: Gemini AI enhances draft stories into metric-driven responses featuring strong action verbs and quantified impact.

### 2.6 25 Practical HR Deliverable Work Labs
- **Description**: Real-world operational scenarios (FnF calculations, PIP notices, statutory audit checklists). Includes benchmark solutions and checklists.

### 2.7 Interactive HR Document & Policy Studio
- **Description**: Automated legal document generator for Indian statutory compliance:
  - 30-Day Performance Improvement Plan (PIP) Notice
  - POSH Internal Complaints Committee (ICC) Charter
  - Offer Letter CTC Breakup Annexure
  - Full & Final (FnF) Settlement Statement
  - Custom AI-generated policies via Gemini API.

### 2.8 HR Calculators & Analytics Studio
- **Description**: Interactive financial and metric calculators:
  - *FnF Settlement Calculator*: Computes daily basic, earned pay, leave encashment, notice recovery shortfall, PT deductions, and net payout.
  - *cNPS Calculator*: Computes Candidate Net Promoter Score (% Promoters - % Detractors).

### 2.9 Interactive Mock Interview Simulator
- **Description**: Simulated interview round. Candidates type custom responses to interview questions and receive instant Gemini AI scoring (1-10), strengths, missing details, and model responses.

### 2.10 Candidate Profile & Skill Gap Engine
- **Description**: Analyzes candidate resume text against target company JD to highlight **Verified Resume Skills** vs. **Missing Skill Gaps**. Tracks learning curve metrics.

---

## 3. Candidate Workflow Journey

```
[Step 1: Profile & Resume Input] ──► [Step 2: Add Target Company & JD]
                                              │
                                              ▼
[Step 4: STAR Stories & Labs] ◄── [Step 3: Study SOPs & Flashcards]
          │
          ▼
[Step 5: AI Mock Simulator] ──► [Step 6: Cheat Sheet & Interview Execution]
```

---

## 4. Technical Architecture & Security
- **Authentication**: Single-user credential access (`priyankavartak17@gmail.com` / `123456789`).
- **Storage**: `@netlify/blobs` store key `hr-prep-user-data` + `localStorage` fallback.
- **AI Route**: `/api/gemini` handling server-side Gemini 1.5 Flash API calls with environment variable protection (`GEMINI_API_KEY`).
- **Deployment**: Netlify serverless deployment via `@netlify/plugin-nextjs`.
