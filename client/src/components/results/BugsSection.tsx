import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronDown, ChevronRight, Copy, Check, Terminal } from 'lucide-react';
import type { BugFinding, SeverityLevel } from '../../types';

interface BugsSectionProps {
  bugs: BugFinding[];
}

export const BugsSection: React.FC<BugsSectionProps> = ({ bugs }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    bugs.forEach((b, idx) => {
      initial[b.id || `bug-${idx}`] = true;
    });
    return initial;
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getSeverityStyle = (severity: SeverityLevel) => {
    switch (severity) {
      case 'Critical':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      case 'High':
        return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'Medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Low':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  if (!bugs || bugs.length === 0) {
    return (
      <div className="bg-[#10141e] border border-[#1f2638] rounded-2xl p-10 text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-4">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">No Bugs Detected</h3>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          The analyzer did not identify direct runtime exceptions or syntax violations in the analyzed code structure.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[#1d2435]">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse" />
            Detected Bugs & Potential Logical Flaws ({bugs.length})
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Prioritized by severity with production failure explanations and proposed fixes.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {bugs.map((bug, index) => {
          const bugId = bug.id || `bug-${index}`;
          const isExpanded = expandedIds[bugId] ?? true;

          return (
            <div
              key={bugId}
              className="bg-[#10141e] border border-[#222a3d] rounded-xl overflow-hidden transition-all hover:border-[#2f3950]"
            >
              {/* Header */}
              <div
                onClick={() => toggleExpand(bugId)}
                className="p-3.5 sm:p-4 flex items-start sm:items-center justify-between gap-2 sm:gap-3 cursor-pointer bg-[#131824]/60 hover:bg-[#161c2b]"
              >
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <button className="text-gray-400 hover:text-white shrink-0">
                    {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold border shrink-0 ${getSeverityStyle(bug.severity)} uppercase tracking-wider`}>
                    {bug.severity}
                  </span>
                  {bug.line !== undefined && (
                    <span className="text-[11px] sm:text-xs font-mono-code text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20 shrink-0">
                      Line {bug.line}
                    </span>
                  )}
                  <span className="text-xs sm:text-sm font-semibold text-white truncate min-w-0 flex-1">
                    {bug.problem}
                  </span>
                </div>
              </div>

              {/* Body */}
              {isExpanded && (
                <div className="p-4 sm:p-5 border-t border-[#1d2435] space-y-4">
                  {/* Detailed problem description */}
                  <div>
                    <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Problem Statement
                    </h5>
                    <p className="text-sm text-gray-200 bg-[#0a0d14] p-3 rounded-lg border border-[#1b2234]">
                      {bug.problem}
                    </p>
                  </div>

                  {/* Why it matters */}
                  <div>
                    <h5 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <AlertCircle size={13} />
                      Why It Matters (Production Impact)
                    </h5>
                    <p className="text-sm text-gray-300 leading-relaxed bg-amber-500/5 p-3 rounded-lg border border-amber-500/20">
                      {bug.whyItMatters}
                    </p>
                  </div>

                  {/* Suggested Fix */}
                  <div>
                    <h5 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Terminal size={13} />
                      Recommended Solution
                    </h5>
                    <p className="text-sm text-gray-300 mb-2">
                      {bug.suggestedFix}
                    </p>

                    {bug.codeSnippet && (
                      <div className="relative group bg-[#090b10] border border-[#1f2638] rounded-lg p-3 font-mono-code text-xs text-cyan-300 overflow-x-auto">
                        <button
                          onClick={() => handleCopy(bugId, bug.codeSnippet!)}
                          className="absolute top-2 right-2 p-1.5 rounded-md bg-[#161d2b] hover:bg-[#20293d] text-gray-300 hover:text-white border border-[#2b354c] text-xs flex items-center gap-1 transition-all"
                          title="Copy snippet"
                        >
                          {copiedId === bugId ? (
                            <>
                              <Check size={12} className="text-emerald-400" />
                              <span className="text-[10px] text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span className="text-[10px]">Copy</span>
                            </>
                          )}
                        </button>
                        <pre className="pr-16">{bug.codeSnippet}</pre>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
