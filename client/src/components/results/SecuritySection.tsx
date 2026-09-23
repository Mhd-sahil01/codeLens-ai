import { useState } from 'react';
import { ShieldCheck, Lock, AlertTriangle, CheckCircle, ChevronDown, ChevronRight } from 'lucide-react';
import type { SecurityFinding, SeverityLevel } from '../../types';

interface SecuritySectionProps {
  securityIssues: SecurityFinding[];
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({ securityIssues }) => {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    securityIssues.forEach((s, idx) => {
      initial[s.id || `sec-${idx}`] = true;
    });
    return initial;
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
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
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      default:
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    }
  };

  if (!securityIssues || securityIssues.length === 0) {
    return (
      <div className="bg-[#10141e] border border-[#1f2638] rounded-2xl p-10 text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-4">
          <ShieldCheck size={28} />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">No High-Risk Patterns Found</h3>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          No common injection, unauthorized execution, or resource leak patterns were detected in the supplied snippet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Notice header */}
      <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 text-xs text-blue-300 flex items-start gap-3">
        <Lock size={16} className="shrink-0 mt-0.5 text-blue-400" />
        <div>
          <span className="font-semibold text-white">Security Analysis Principles: </span>
          Findings are presented as potential security hazards and defensive recommendations. True vulnerability depends on caller environment, sanitization layers, and threat models.
        </div>
      </div>

      <div className="space-y-3">
        {securityIssues.map((sec, index) => {
          const secId = sec.id || `sec-${index}`;
          const isExpanded = expandedIds[secId] ?? true;

          return (
            <div
              key={secId}
              className="bg-[#10141e] border border-[#232b3f] rounded-xl overflow-hidden hover:border-[#313c55] transition-all"
            >
              {/* Header */}
              <div
                onClick={() => toggleExpand(secId)}
                className="p-4 flex items-start sm:items-center justify-between gap-3 cursor-pointer bg-[#131824]/60 hover:bg-[#161c2b]"
              >
                <div className="flex items-center gap-3">
                  <button className="text-gray-400 hover:text-white">
                    {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                  <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${getSeverityStyle(sec.severity)} uppercase tracking-wider`}>
                    {sec.severity}
                  </span>
                  <span className="text-xs font-semibold text-cyan-300 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-500/20">
                    {sec.category}
                  </span>
                  {sec.line !== undefined && (
                    <span className="text-xs font-mono-code text-gray-400">
                      Line {sec.line}
                    </span>
                  )}
                  <span className="text-sm font-semibold text-white truncate max-w-sm sm:max-w-md">
                    {sec.issue}
                  </span>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="p-4 sm:p-5 border-t border-[#1d2435] space-y-4">
                  <div>
                    <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Identified Risk
                    </h5>
                    <p className="text-sm text-gray-200 bg-[#0a0d14] p-3 rounded-lg border border-[#1b2234]">
                      {sec.issue}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <AlertTriangle size={13} />
                      Attack Vector & Hazard Explanation
                    </h5>
                    <p className="text-sm text-gray-300 leading-relaxed bg-amber-500/5 p-3 rounded-lg border border-amber-500/20">
                      {sec.explanation}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <CheckCircle size={13} />
                      Safer Approach & Mitigation Pattern
                    </h5>
                    <div className="text-sm text-gray-300 bg-emerald-500/5 p-3.5 rounded-lg border border-emerald-500/20 leading-relaxed">
                      {sec.saferApproach}
                    </div>
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
