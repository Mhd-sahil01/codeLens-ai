import React from 'react';
import { HelpCircle, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { EdgeCaseFinding } from '../../types';

interface EdgeCasesSectionProps {
  edgeCases: EdgeCaseFinding[];
}

export const EdgeCasesSection: React.FC<EdgeCasesSectionProps> = ({ edgeCases }) => {
  if (!edgeCases || edgeCases.length === 0) {
    return (
      <div className="bg-[#10141e] border border-[#1f2638] rounded-2xl p-10 text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-4">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Defensive Boundaries Solid</h3>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          The code appears to handle edge boundaries or relies on strict typing without obvious unhandled null or empty states.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="pb-2 border-b border-[#1d2435]">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <HelpCircle size={18} className="text-purple-400" />
          Edge Cases & Error Handling Analysis ({edgeCases.length})
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Vulnerabilities under boundary conditions, malformed arguments, null pointers, and unusual input states.
        </p>
      </div>

      <div className="space-y-3">
        {edgeCases.map((ec, i) => {
          const id = ec.id || `edge-${i}`;

          return (
            <div
              key={id}
              className="bg-[#10141e] border border-[#20283c] rounded-xl p-5 hover:border-[#2f3a52] transition-all space-y-3"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center text-xs font-bold font-mono">
                  {i + 1}
                </span>
                <h4 className="text-sm font-bold text-white">{ec.scenario}</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-[#0a0d14] p-3 rounded-lg border border-[#1d2435]">
                  <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Current Execution Behavior
                  </div>
                  <div className="text-xs text-gray-300 leading-relaxed">
                    {ec.currentBehavior}
                  </div>
                </div>

                <div className="bg-rose-500/5 p-3 rounded-lg border border-rose-500/20">
                  <div className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <AlertTriangle size={12} />
                    Potential Failure Mode
                  </div>
                  <div className="text-xs text-rose-200 leading-relaxed">
                    {ec.potentialFailure}
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/5 p-3.5 rounded-lg border border-emerald-500/20">
                <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <ShieldCheck size={13} />
                  Defensive Remediation
                </div>
                <div className="text-xs text-gray-300 leading-relaxed font-mono-code">
                  {ec.recommendedHandling}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
