'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        localStorage.setItem('hr_prep_auth', 'true');
        router.push('/');
      } else {
        setError(data.error || 'Invalid credentials.');
      }
    } catch (err) {
      setLoading(false);
      setError('Connection failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center p-4 font-sans">
      <div className="max-w-md w-full bg-slate-800/80 border border-slate-700 p-8 rounded-2xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-xl flex items-center justify-center h-12 w-12 rounded-2xl mx-auto shadow-lg">
            HR
          </div>
          <h1 className="text-xl font-bold">HR Lead Mastery Pro</h1>
          <p className="text-xs text-slate-400">Single-User Account Access</p>
        </div>

        {error && (
          <div className="bg-rose-500/20 border border-rose-500/50 text-rose-300 p-3 rounded-lg text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="priyankavartak17@gmail.com"
              required
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="123456789"
              required
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/50 text-[11px] text-slate-400 space-y-1">
            <div className="font-bold text-slate-300">Account Credentials:</div>
            <div>Email: <code className="text-blue-400">priyankavartak17@gmail.com</code></div>
            <div>Password: <code className="text-blue-400">123456789</code></div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all text-xs flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
