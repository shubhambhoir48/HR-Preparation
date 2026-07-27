'use client';

import React, { useState } from 'react';
import { callGeminiAI } from '@/lib/gemini';

export const DocStudioView: React.FC = () => {
  const [docType, setDocType] = useState('pip');
  const [name, setName] = useState('Priyanka Vartak');
  const [role, setRole] = useState('HR Lead / Senior HR Generalist');
  const [office, setOffice] = useState('Technology Hub, Pune');
  const [salary, setSalary] = useState('65000');
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedDoc, setGeneratedDoc] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateDoc = async () => {
    if (docType === 'ai_custom') {
      if (!customPrompt) {
        setGeneratedDoc("Please type a custom prompt in the box above and click 'Generate Document Draft'.");
        return;
      }
      setIsGenerating(true);
      const prompt = `Draft a formal, legally bulletproof Indian statutory HR document for:\nRecipient: ${name}\nRole: ${role}\nOffice: ${office}\nScenario: ${customPrompt}`;
      const text = await callGeminiAI(prompt);
      setIsGenerating(false);
      setGeneratedDoc(text || 'Draft generated.');
      return;
    }

    if (docType === 'plan306090') {
      setIsGenerating(true);
      const prompt = `Act as an executive HR VP. Generate a 30-60-90 Day Executive HR Strategic Plan for ${name} entering as ${role} at ${office}:\n- Days 1-30: Audit statutory compliance (PF, ESIC, POSH), ATS SLA, and cNPS pulse.\n- Days 31-60: Optimize developer performance matrix, 30-day PIP cadence, and recruitment funnel.\n- Days 61-90: Scale employer branding and maintain FnF SLA < 48 hours.`;
      const text = await callGeminiAI(prompt);
      setIsGenerating(false);
      setGeneratedDoc(text || 'Strategic Plan generated.');
      return;
    }

    if (docType === 'pip') {
      setGeneratedDoc(`FORMAL 30-DAY PERFORMANCE IMPROVEMENT PLAN (PIP) NOTICE\n\nTo: ${name} (${role})\nLocation: ${office}\nDuration: 30 Days\n\n1. IDENTIFIED PERFORMANCE GAPS:\n- Missed sprint milestone deliverables over past 3 review cycles.\n\n2. SMART GOALS:\n- Milestone 1: 100% on-time completion of assigned Jira tickets.\n- Milestone 2: Pass code review with < 3% bug rate.\n\n3. CONSEQUENCE:\nFailure to complete targets by Day 30 may lead to formal employment termination under company policy.`);
    } else if (docType === 'posh') {
      setGeneratedDoc(`POSH INTERNAL COMPLAINTS COMMITTEE (ICC) CHARTER\n\nOffice: ${office}\n\n1. Presiding Officer: Senior Woman Leader\n2. Internal Members: 2 Senior Staff\n3. External Member: NGO Advocate\n\nSubmit confidential complaints to: posh-icc@company.com`);
    } else if (docType === 'offer') {
      const sal = parseFloat(salary) || 50000;
      setGeneratedDoc(`OFFER LETTER ANNEXURE - CTC BREAKUP\n\nRecipient: ${name}\nRole: ${role}\nMonthly Basic: ₹${sal}\nHRA (50%): ₹${sal * 0.5}\nEmployer PF: ₹1800\nTotal Est Monthly Gross: ₹${sal * 1.5 + 1800}`);
    } else if (docType === 'fnf') {
      const sal = parseFloat(salary) || 50000;
      setGeneratedDoc(`FULL & FINAL (FnF) SETTLEMENT STATEMENT\n\nEmployee: ${name}\nDesignation: ${role}\nOffice: ${office}\nEarned Salary: ₹${sal}\nNet FnF Payable: ₹${sal - 2000} (after PT ₹200 and PF ₹1800 deductions)`);
    }
  };

  const handleCopy = () => {
    if (!generatedDoc) return;
    navigator.clipboard.writeText(generatedDoc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">AI Powered Document Studio</span>
          <h2 className="text-2xl font-bold text-slate-900">Statutory & Operational HR Document Generator</h2>
          <p className="text-xs text-slate-500 mt-1">
            Instantly generate bulletproof PIP notices, POSH charters, Offer CTC breakups, 30-60-90 Day Executive Plans, and FnF statements using Gemini AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Document Template:</label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg font-medium"
              >
                <option value="plan306090">✨ Executive 30-60-90 Day Strategic Plan</option>
                <option value="pip">30-Day PIP Notice</option>
                <option value="posh">POSH ICC Committee Charter</option>
                <option value="offer">Offer CTC Breakup Annexure</option>
                <option value="fnf">Full & Final (FnF) Statement</option>
                <option value="ai_custom">✨ Custom Gemini AI Document</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Employee / Candidate Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Designation / Role:</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Office / Location:</label>
              <input
                type="text"
                value={office}
                onChange={(e) => setOffice(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>

            {(docType === 'offer' || docType === 'fnf') && (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Monthly Basic Salary (₹):</label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>
            )}

            {docType === 'ai_custom' && (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Custom Prompt Instructions:</label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  rows={3}
                  placeholder="e.g. Draft an ESOP vesting schedule policy for Series A startup..."
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                ></textarea>
              </div>
            )}

            <button
              disabled={isGenerating}
              onClick={handleGenerateDoc}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-xs shadow flex items-center justify-center space-x-2"
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <span>{isGenerating ? 'Gemini AI Drafting...' : 'Generate Document Draft'}</span>
            </button>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-sm">Generated Document Preview</h3>
              {generatedDoc && (
                <button
                  onClick={handleCopy}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs border flex items-center space-x-1"
                >
                  <i className="fa-solid fa-copy"></i>
                  <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                </button>
              )}
            </div>

            <div className="bg-slate-900 text-slate-100 p-5 rounded-xl border border-slate-800 text-xs min-h-[350px] font-mono leading-relaxed whitespace-pre-line overflow-y-auto max-h-[500px]">
              {generatedDoc || 'Select options on the left and click "Generate Document Draft" to build your custom HR policy document.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
