'use client';

import React, { useState } from 'react';
import { mnc50DocTemplates, HRDocTemplate } from '@/lib/data/hrDocs';

export const DocStudioView: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<HRDocTemplate>(mnc50DocTemplates[0]);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('ALL');
  const [copied, setCopied] = useState(false);

  const filteredDocs = mnc50DocTemplates.filter((d) => {
    const matchesCat = catFilter === 'ALL' || d.category === catFilter;
    const matchesSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.actReference.toLowerCase().includes(search.toLowerCase()) ||
      d.content.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopyText = () => {
    navigator.clipboard.writeText(selectedDoc.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Direct Native Download as Microsoft Word (.doc / .docx)
  const handleDownloadDocx = () => {
    const formattedHtml = selectedDoc.content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br/>');

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>${selectedDoc.title}</title>
          <style>
            body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; font-size: 11pt; line-height: 1.6; color: #0f172a; margin: 1in; }
            h1, h2, h3 { color: #0f172a; font-weight: bold; }
            hr { border: 0; border-top: 1px solid #cbd5e1; margin: 15px 0; }
          </style>
        </head>
        <body>
          <h2>${selectedDoc.title}</h2>
          <p><strong>Statutory Act Reference:</strong> ${selectedDoc.actReference}</p>
          <hr/>
          <div>${formattedHtml}</div>
        </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedDoc.filename}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">MNC Standard Statutory HR Document Studio</span>
            <h2 className="text-2xl font-bold text-slate-900">50+ Critical Indian HR Legal Documents & Word Exporter</h2>
            <p className="text-xs text-slate-500 mt-1">
              Production-grade Indian statutory HR documents (POSH, 30-Day PIP, CTC Breakups, FnF Discharge Vouchers, NDA, Maternity Approvals) with 1-click Microsoft Word (.docx) export.
            </p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleCopyText}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl border border-slate-300 text-xs shadow-sm flex items-center space-x-1.5"
            >
              <i className="fa-solid fa-copy text-slate-600"></i>
              <span>{copied ? 'Copied Full Text!' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handleDownloadDocx}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg text-xs flex items-center space-x-2 transition-all"
            >
              <i className="fa-solid fa-file-word text-amber-300 text-sm"></i>
              <span>Download .docx Word File</span>
            </button>
          </div>
        </div>

        {/* Master-Detail Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
          {/* Left Panel (1/3 Width): Document Library Navigation List */}
          <div className="lg:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 flex flex-col h-[680px]">
            <div className="space-y-2 shrink-0">
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-slate-400 text-xs"></i>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search 50+ documents by title or act..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <select
                value={catFilter}
                onChange={(e) => setCatFilter(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ALL">All Document Categories (50 Docs)</option>
                <option value="Statutory & Compliance">Statutory & Compliance</option>
                <option value="Onboarding & Offer">Onboarding & Offer</option>
                <option value="Performance & PIP">Performance & PIP</option>
                <option value="Offboarding & FnF">Offboarding & FnF</option>
                <option value="Policies & Charters">Policies & Charters</option>
                <option value="Employee Relations">Employee Relations</option>
              </select>
            </div>

            <div className="flex justify-between items-center text-[11px] text-slate-500 shrink-0 border-b pb-1">
              <span>Showing {filteredDocs.length} of {mnc50DocTemplates.length} documents</span>
              {search && (
                <button onClick={() => setSearch('')} className="text-indigo-600 font-bold hover:underline">
                  Clear Search
                </button>
              )}
            </div>

            {/* Scrollable Document List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {filteredDocs.map((doc) => {
                const isSelected = doc.id === selectedDoc.id;
                return (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all space-y-1 ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-md'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase ${
                          isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {doc.category}
                      </span>
                      <i className={`fa-solid fa-chevron-right text-[10px] ${isSelected ? 'text-white' : 'text-slate-400'}`}></i>
                    </div>

                    <h4 className={`font-bold text-xs leading-snug line-clamp-2 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {doc.title}
                    </h4>

                    <p className={`text-[10px] line-clamp-1 ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                      {doc.actReference}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel (2/3 Width): Detailed Legal Document Viewer Workspace */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[680px]">
            {/* Active Document Header */}
            <div className="p-4 border-b border-slate-200 bg-slate-50 rounded-t-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 shrink-0">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="bg-indigo-100 text-indigo-800 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                    {selectedDoc.category}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded border border-emerald-200">
                    <i className="fa-solid fa-scale-balanced mr-1"></i>MNC Statutory Compliant
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mt-1">{selectedDoc.title}</h3>
                <p className="text-xs text-slate-500">Statutory Citation: {selectedDoc.actReference}</p>
              </div>

              <div className="flex space-x-2 shrink-0">
                <button
                  onClick={handleDownloadDocx}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-lg text-xs shadow flex items-center space-x-1.5"
                >
                  <i className="fa-solid fa-file-word text-amber-300"></i>
                  <span>Download .docx</span>
                </button>
              </div>
            </div>

            {/* Document Content View Area */}
            <div className="flex-1 p-6 bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed whitespace-pre-line overflow-y-auto custom-scrollbar">
              {selectedDoc.content}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
