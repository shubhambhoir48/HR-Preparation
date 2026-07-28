'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, googleProvider, signInWithPopup, signOut, isEmailWhitelisted, WHITELISTED_EMAILS } from '@/lib/firebase';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (user && isEmailWhitelisted(user.email)) {
        localStorage.setItem('hr_prep_auth', 'true');
        if (user.email) {
          localStorage.setItem('hr_prep_user_email', user.email);
        }
        if (user.displayName) {
          localStorage.setItem('hr_prep_user_name', user.displayName);
        }
        router.push('/');
      } else {
        // Sign out immediately if not whitelisted
        await signOut(auth);
        localStorage.removeItem('hr_prep_auth');
        setLoading(false);
        setError(`Access Denied: The account "${user?.email || 'Unknown'}" is not authorized. Only whitelisted HR platform accounts can log in.`);
      }
    } catch (err: any) {
      setLoading(false);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled. Please click the Google button to authenticate.');
      } else {
        console.error('Google Sign-In Error:', err);
        setError(err.message || 'Failed to authenticate with Google. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center p-4 font-sans">
      <div className="max-w-md w-full bg-slate-800/80 border border-slate-700 p-8 rounded-2xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-xl flex items-center justify-center h-14 w-14 rounded-2xl mx-auto shadow-lg">
            HR
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">HR Lead Mastery Pro</h1>
          <p className="text-xs text-slate-400">Enterprise HR Learning & Preparation Platform</p>
        </div>

        {error && (
          <div className="bg-rose-500/20 border border-rose-500/50 text-rose-300 p-4 rounded-xl text-xs font-semibold leading-relaxed">
            <i className="fa-solid fa-triangle-exclamation mr-2 text-rose-400"></i>
            {error}
          </div>
        )}

        <div className="space-y-4 text-xs">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold py-3.5 px-4 rounded-xl shadow-xl transition-all text-xs flex items-center justify-center space-x-3 disabled:opacity-50 transform active:scale-98"
          >
            {loading ? (
              <i className="fa-solid fa-circle-notch fa-spin text-blue-600 text-lg"></i>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span className="text-sm font-bold text-slate-800">
              {loading ? 'Authenticating with Google...' : 'Sign in with Google'}
            </span>
          </button>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/60 space-y-2 text-[11px] text-slate-400">
            <div className="font-bold text-slate-300 flex items-center gap-1.5">
              <i className="fa-solid fa-[#0F9D58] fa-shield-halved text-emerald-400"></i>
              Authorized Accounts Whitelist:
            </div>
            <ul className="space-y-1 font-mono text-[11px] text-slate-300 pl-1">
              {WHITELISTED_EMAILS.map((email) => (
                <li key={email} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <code>{email}</code>
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
              Note: Unregistered or public signups are disabled. Only whitelisted Google accounts are permitted access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
