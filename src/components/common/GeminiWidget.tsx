'use client';

import React, { useState, useEffect } from 'react';

export const GeminiWidget: React.FC = () => {
  const [isWorking, setIsWorking] = useState(false);
  const [statusMsg, setStatusMsg] = useState('Gemini AI Engine Active...');

  useEffect(() => {
    const handleStart = () => {
      setIsWorking(true);
      setStatusMsg('Gemini AI Processing...');
    };

    const handleEnd = () => {
      setStatusMsg('AI Analysis Complete!');
      setTimeout(() => {
        setIsWorking(false);
      }, 1500);
    };

    window.addEventListener('gemini_start', handleStart);
    window.addEventListener('gemini_end', handleEnd);

    return () => {
      window.removeEventListener('gemini_start', handleStart);
      window.removeEventListener('gemini_end', handleEnd);
    };
  }, []);

  if (!isWorking) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="bg-slate-900/90 text-white backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl border border-purple-500/50 flex items-center space-x-3 text-xs font-semibold">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-md">
          <i className="fa-solid fa-sparkles text-amber-400 text-sm animate-spin"></i>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"></span>
        </div>
        <div>
          <div className="flex items-center space-x-1.5">
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-emerald-300">
              Gemini AI Engine
            </span>
            <span className="bg-purple-500/30 text-purple-200 text-[9px] font-bold px-1.5 py-0.5 rounded border border-purple-400/30 uppercase">
              LIVE
            </span>
          </div>
          <p className="text-[11px] text-slate-300 font-normal mt-0.5">{statusMsg}</p>
        </div>
      </div>
    </div>
  );
};
