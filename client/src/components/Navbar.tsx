// CodeLens AI - Navbar Component

import React from 'react';
import { Code2, Sparkles, BookOpen, Layers, AlertTriangle } from 'lucide-react';
import type { ServerStatus } from '../types';

interface NavbarProps {
  currentView: 'landing' | 'workspace';
  onNavigate: (view: 'landing' | 'workspace') => void;
  status: ServerStatus | null;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, status }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#090b10]/90 border-b border-[#1f2638] px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(14,165,233,0.2)] group-hover:border-cyan-400 group-hover:scale-105 transition-all">
            <Code2 size={22} className="group-hover:rotate-6 transition-transform" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white font-mono-code">
                CodeLens<span className="text-cyan-400">.ai</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-gray-400 -mt-0.5 tracking-wide hidden sm:block">
              Understand. Review. Improve.
            </p>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#121622] border border-[#232c40] rounded-xl p-1">
          <button
            onClick={() => onNavigate('workspace')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentView === 'workspace'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(14,165,233,0.15)]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers size={14} />
            Code Workspace
          </button>
          <button
            onClick={() => onNavigate('landing')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentView === 'landing'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles size={14} />
            Features & About
          </button>
        </nav>

        {/* Status indicator & Primary CTA */}
        <div className="flex items-center gap-3">
          {/* AI Status Badge */}
          {status && (
            <div
              className={`hidden sm:flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${
                status.isConfigured
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}
              title={
                status.isConfigured
                  ? `AI Provider active: ${status.providerName} (${status.model})`
                  : 'Gemini API key not configured yet. Interactive pre-seeded samples are ready!'
              }
            >
              {status.isConfigured ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-medium">AI Ready</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={12} />
                  <span className="font-medium">Samples Ready</span>
                </>
              )}
            </div>
          )}

          {/* Action CTA */}
          {currentView === 'landing' ? (
            <button
              onClick={() => onNavigate('workspace')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Code2 size={15} />
              Start Analyzing
            </button>
          ) : (
            <button
              onClick={() => onNavigate('landing')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-300 hover:text-white bg-[#161c29] border border-[#263148] hover:border-cyan-500/40 transition-all flex items-center gap-1.5"
            >
              <BookOpen size={14} />
              About CodeLens
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
