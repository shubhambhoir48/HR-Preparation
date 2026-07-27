import { HRLab } from '@/types';

export const initialLabs: HRLab[] = (() => {
  const base: HRLab[] = [
    {
      id: 1, category: "Payroll & Statutory", title: "Full & Final Settlement (FnF) Calculation with Shortfall Recovery",
      scenario: "An employee with Basic Salary ₹50,000/month resigns on Aug 12. Notice required: 60 days. Notice served: 40 days (shortfall 20 days). Earned Leave balance: 14 days.",
      task: "Calculate Earned Salary, Leave Encashment, Notice Recovery, and Net Payable FnF.",
      solution: "1. Daily Basic = ₹50,000 / 30 = ₹1,666.67\n2. Earned Salary (12 Days) = 12 * 1,666.67 = ₹20,000\n3. Leave Encashment (14 Days) = 14 * 1,666.67 = ₹23,333.33\n4. Notice Recovery (20 Days) = 20 * 1,666.67 = ₹33,333.33\nGross FnF = ₹20,000 + ₹23,333.33 - ₹33,333.33 = ₹10,000 Net Payable (before PT ₹200 deduction)."
    },
    {
      id: 2, category: "Policy & Drafts", title: "30-Day Performance Improvement Plan (PIP) Formal Notice",
      scenario: "A Senior Developer working on UI components has missed 3 consecutive sprint deadlines.",
      task: "Draft a formal PIP notice with SMART goals, weekly evaluation milestones, and consequence clause.",
      solution: "PIP TEMPLATE:\nTo: [Employee Name]\nSubject: 30-Day Performance Improvement Plan (PIP)\nDuration: Aug 1 to Aug 30\nMilestone 1: Zero missed sprint tasks for UI modules.\nMilestone 2: 100% code unit test coverage approved by Tech Lead.\nReviews: Mandatory weekly check-in every Friday at 4 PM.\nConsequence: Failure to meet targets will lead to termination under company HR Policy."
    }
  ];

  let curId = base.length + 1;
  const cats = ["Payroll & Statutory", "Policy & Drafts", "Strategy & Engagement"];
  for (let i = 0; i < 23; i++) {
    const cat = cats[i % cats.length];
    base.push({
      id: curId,
      category: cat,
      title: `Practical Deliverable Lab #${curId}: ${cat} Execution`,
      scenario: `Real-world operational task in tech office setting.`,
      task: `Draft execution SOP and audit trail.`,
      solution: `BENCHMARK SOLUTION:\n1. Verify compliance guidelines.\n2. Draft preliminary document.\n3. Executive signoff within 48-hour SLA.`
    });
    curId++;
  }

  return base;
})();
