import { useState } from 'react';
import { Sparkles, Copy, Check, Split, AlignJustify, CheckCircle2 } from 'lucide-react';
import type { CodeImprovement, SupportedLanguage } from '../../types';

interface DiffViewSectionProps {
  improvements: CodeImprovement;
  language: SupportedLanguage;
}

export const DiffViewSection: React.FC<DiffViewSectionProps> = ({ improvements, language }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');

  const handleCopyImproved = () => {
    navigator.clipboard.writeText(improvements.improvedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header with benefits & copy */}
      <div className="bg-[#10141e] border border-[#20283c] rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#1d2537]">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-cyan-400" />
              Refactored & Production-Optimized Code
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Production-hardened implementation with edge-case guards, optimized algorithms, and clean idioms.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center bg-[#090c12] border border-[#1d2435] rounded-lg p-1 text-xs">
              <button
                onClick={() => setViewMode('split')}
                className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all ${
                  viewMode === 'split' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Split size={13} />
                Side-by-Side
              </button>
              <button
                onClick={() => setViewMode('unified')}
                className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all ${
                  viewMode === 'unified' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                <AlignJustify size={13} />
                Improved Only
              </button>
            </div>

            <button
              onClick={handleCopyImproved}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-[0_0_12px_rgba(14,165,233,0.3)] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={14} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Refactored</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Change breakdown cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          <div className="bg-[#0b0e16] p-3.5 rounded-xl border border-[#1b2234]">
            <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-2">
              Key Changes Applied
            </div>
            <ul className="space-y-1.5 text-xs text-gray-300">
              {improvements.summaryOfChanges.map((change, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-cyan-400">•</span>
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0b0e16] p-3.5 rounded-xl border border-[#1b2234]">
            <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wider mb-2">
              Why This Changed
            </div>
            <ul className="space-y-1.5 text-xs text-gray-300">
              {improvements.whyChanged.map((reason, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-purple-400">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0b0e16] p-3.5 rounded-xl border border-[#1b2234]">
            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2">
              Expected Benefits
            </div>
            <ul className="space-y-1.5 text-xs text-gray-300">
              {improvements.expectedBenefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <CheckCircle2 size={12} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Code Editor Preview: Side-by-side or Full improved */}
      {viewMode === 'split' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Original */}
          <div className="bg-[#090b10] border border-[#1f2638] rounded-xl overflow-hidden flex flex-col">
            <div className="bg-[#121622] px-4 py-2.5 border-b border-[#1f2638] flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Original Code
              </span>
              <span className="text-[10px] font-mono uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded">
                Before
              </span>
            </div>
            <pre className="p-4 font-mono-code text-xs text-gray-300 overflow-x-auto leading-relaxed flex-1 bg-[#07090e]">
              {improvements.originalCode}
            </pre>
          </div>

          {/* Improved */}
          <div className="bg-[#090b10] border border-cyan-500/30 rounded-xl overflow-hidden flex flex-col shadow-[0_0_20px_rgba(14,165,233,0.05)]">
            <div className="bg-[#121622] px-4 py-2.5 border-b border-[#1f2638] flex items-center justify-between">
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={12} />
                Refactored Solution
              </span>
              <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                After
              </span>
            </div>
            <pre className="p-4 font-mono-code text-xs text-cyan-200 overflow-x-auto leading-relaxed flex-1 bg-[#06080d]">
              {improvements.improvedCode}
            </pre>
          </div>
        </div>
      ) : (
        <div className="bg-[#090b10] border border-cyan-500/40 rounded-xl overflow-hidden shadow-xl">
          <div className="bg-[#121622] px-4 py-2.5 border-b border-[#1f2638] flex items-center justify-between">
            <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={13} />
              Production Refactored Code ({language})
            </span>
          </div>
          <pre className="p-5 font-mono-code text-xs text-cyan-200 overflow-x-auto leading-relaxed bg-[#06080d]">
            {improvements.improvedCode}
          </pre>
        </div>
      )}
    </div>
  );
};
