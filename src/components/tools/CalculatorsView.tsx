'use client';

import React, { useState } from 'react';

export const CalculatorsView: React.FC = () => {
  // FnF Calculator State
  const [basicSalary, setBasicSalary] = useState('60000');
  const [earnedDays, setEarnedDays] = useState('15');
  const [leaveDays, setLeaveDays] = useState('18');
  const [noticeReq, setNoticeReq] = useState('60');
  const [noticeServed, setNoticeServed] = useState('45');

  // cNPS Calculator State
  const [promoters, setPromoters] = useState('18');
  const [passives, setPassives] = useState('5');
  const [detractors, setDetractors] = useState('2');

  // FnF Calculation
  const basic = parseFloat(basicSalary) || 0;
  const perDay = basic / 30;
  const earnedPay = (parseFloat(earnedDays) || 0) * perDay;
  const leavePay = (parseFloat(leaveDays) || 0) * perDay;
  const noticeShortfall = Math.max(0, (parseFloat(noticeReq) || 0) - (parseFloat(noticeServed) || 0));
  const noticeRec = noticeShortfall * perDay;
  const netFnF = earnedPay + leavePay - noticeRec - 200; // PT 200

  // cNPS Calculation
  const p = parseFloat(promoters) || 0;
  const pas = parseFloat(passives) || 0;
  const d = parseFloat(detractors) || 0;
  const totalResp = p + pas + d;
  const cNPS = totalResp > 0 ? Math.round(((p - d) / totalResp) * 100) : 0;

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">HR Operational Calculators</span>
          <h2 className="text-2xl font-bold text-slate-900">FnF Payout & cNPS Metric Calculators</h2>
          <p className="text-xs text-slate-500 mt-1">
            Perform instant statutory and candidate metrics calculations with legal formulas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* FnF Settlement Calculator */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center justify-between">
              <span>Full & Final (FnF) Settlement Calculator</span>
              <i className="fa-solid fa-calculator text-emerald-600"></i>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Monthly Basic (₹):</label>
                <input
                  type="number"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(e.target.value)}
                  className="w-full p-2 bg-white border rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Earned Days Worked:</label>
                <input
                  type="number"
                  value={earnedDays}
                  onChange={(e) => setEarnedDays(e.target.value)}
                  className="w-full p-2 bg-white border rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Earned Leave Balance:</label>
                <input
                  type="number"
                  value={leaveDays}
                  onChange={(e) => setLeaveDays(e.target.value)}
                  className="w-full p-2 bg-white border rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notice Required (Days):</label>
                <input
                  type="number"
                  value={noticeReq}
                  onChange={(e) => setNoticeReq(e.target.value)}
                  className="w-full p-2 bg-white border rounded-lg text-xs"
                />
              </div>
              <div className="col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Notice Served (Days):</label>
                <input
                  type="number"
                  value={noticeServed}
                  onChange={(e) => setNoticeServed(e.target.value)}
                  className="w-full p-2 bg-white border rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between">
                <span>Earned Salary:</span>
                <span className="font-bold">₹{earnedPay.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Leave Encashment:</span>
                <span className="font-bold">+ ₹{leavePay.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>Notice Recovery ({noticeShortfall} days):</span>
                <span className="font-bold">- ₹{noticeRec.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Professional Tax (PT):</span>
                <span>- ₹200.00</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-sm font-bold text-slate-900 font-sans">
                <span>Net FnF Payable:</span>
                <span className="text-emerald-600">₹{netFnF.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* cNPS Score Calculator */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center justify-between">
              <span>Candidate NPS (cNPS) Calculator</span>
              <i className="fa-solid fa-chart-line text-blue-600"></i>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Promoters (Score 9-10):</label>
                <input
                  type="number"
                  value={promoters}
                  onChange={(e) => setPromoters(e.target.value)}
                  className="w-full p-2 bg-white border rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Passives (Score 7-8):</label>
                <input
                  type="number"
                  value={passives}
                  onChange={(e) => setPassives(e.target.value)}
                  className="w-full p-2 bg-white border rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detractors (Score 0-6):</label>
                <input
                  type="number"
                  value={detractors}
                  onChange={(e) => setDetractors(e.target.value)}
                  className="w-full p-2 bg-white border rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center space-y-2">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block">Calculated cNPS Score</span>
              <div className={`text-4xl font-extrabold ${cNPS >= 50 ? 'text-emerald-600' : cNPS >= 0 ? 'text-amber-500' : 'text-rose-600'}`}>
                {cNPS > 0 ? `+${cNPS}` : cNPS}
              </div>
              <p className="text-xs text-slate-500">
                {cNPS >= 50
                  ? 'Excellent candidate experience! (> +50 is top tier).'
                  : 'Needs improvement to boost candidate retention.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
