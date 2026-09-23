import React from 'react';
import {
  FileCode,
  Layers,
  Activity,
  Award,
  AlertCircle,
  ShieldAlert,
  Zap,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';
import type { CodeAnalysisResult } from '../../types';

interface OverviewCardProps {
  analysis: CodeAnalysisResult;
  onSelectTab: (tabId: string) => void;
}

export const OverviewCard: React.FC<OverviewCardProps> = ({ analysis, onSelectTab }) => {
  const { metrics, summary, bugs, securityIssues, performance, edgeCases } = analysis;

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'Excellent':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Good':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      case 'Needs Attention':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Critical Issues':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      default:
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'from-emerald-400 to-teal-500 text-emerald-400';
    if (score >= 70) return 'from-cyan-400 to-blue-500 text-cyan-400';
    if (score >= 50) return 'from-amber-400 to-orange-500 text-amber-400';
    return 'from-rose-500 to-red-600 text-rose-400';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Score + Key Stats + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-gradient-to-br from-[#121622] to-[#161c2c] border border-[#232d42] rounded-2xl p-6 shadow-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Quality Score Circle / Card */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-[#0c0f17]/80 border border-[#1e2638] rounded-xl text-center relative">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3">
            <Award size={14} className="text-cyan-400" />
            Code Quality Index
          </div>

          <div className="relative flex items-center justify-center my-2">
            <div className="w-28 h-28 rounded-full border-4 border-[#1e273a] flex items-center justify-center relative">
              <span className={`text-4xl font-extrabold tracking-tight bg-gradient-to-br ${getScoreColor(metrics.qualityScore)} bg-clip-text text-transparent`}>
                {metrics.qualityScore}
              </span>
              <span className="text-xs text-gray-400 absolute bottom-3">/ 100</span>
            </div>
          </div>

          <div className={`mt-3 px-3 py-1 rounded-full text-xs font-bold border ${getVerdictColor(metrics.verdict)}`}>
            {metrics.verdict}
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Automated multi-factor evaluation
          </p>
        </div>

        {/* Summary & Core Metrics */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                {analysis.language}
              </span>
              <span className="text-xs text-gray-400">
                Analyzed at {new Date(analysis.analyzedAt).toLocaleTimeString()}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Executive Evaluation Summary
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed bg-[#0b0e16]/60 p-4 rounded-xl border border-[#1b2234]">
              {summary}
            </p>
          </div>

          {/* Metric mini tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-[#0e121b] border border-[#1f273b] p-3 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1.5 text-gray-400 text-xs mb-1">
                <FileCode size={13} className="text-blue-400" />
                <span>Lines of Code</span>
              </div>
              <div className="text-lg font-bold text-white font-mono-code">
                {metrics.codeLines} <span className="text-xs text-gray-400 font-normal">/ {metrics.totalLines}</span>
              </div>
            </div>

            <div className="bg-[#0e121b] border border-[#1f273b] p-3 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1.5 text-gray-400 text-xs mb-1">
                <Layers size={13} className="text-purple-400" />
                <span>Functions</span>
              </div>
              <div className="text-lg font-bold text-white font-mono-code">
                {metrics.functionsCount}
              </div>
            </div>

            <div className="bg-[#0e121b] border border-[#1f273b] p-3 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1.5 text-gray-400 text-xs mb-1">
                <TrendingUp size={13} className="text-cyan-400" />
                <span>Complexity</span>
              </div>
              <div className="text-xs font-bold text-cyan-300 font-mono-code truncate px-1">
                {metrics.estimatedComplexity}
              </div>
            </div>

            <div className="bg-[#0e121b] border border-[#1f273b] p-3 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1.5 text-gray-400 text-xs mb-1">
                <Activity size={13} className="text-emerald-400" />
                <span>Classes / Modules</span>
              </div>
              <div className="text-lg font-bold text-white font-mono-code">
                {metrics.classesCount}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Quick-Navigation Cards to Dimensions */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
          <span>Key Findings by Dimension</span>
          <span className="text-[10px] text-gray-400 lowercase font-normal">(Click any card to jump directly to details)</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Bugs */}
          <button
            onClick={() => onSelectTab('bugs')}
            className="p-4 rounded-xl bg-[#111520] border border-[#20283c] hover:border-rose-500/50 hover:bg-[#151a28] text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <AlertCircle size={18} />
              </span>
              <span className="text-xs font-bold font-mono-code px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30">
                {bugs.length} found
              </span>
            </div>
            <div className="font-semibold text-white text-sm">Bugs & Logic Risks</div>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
              {bugs.length > 0 ? bugs[0].problem : 'No critical logic bugs identified.'}
            </p>
          </button>

          {/* Security */}
          <button
            onClick={() => onSelectTab('security')}
            className="p-4 rounded-xl bg-[#111520] border border-[#20283c] hover:border-amber-500/50 hover:bg-[#151a28] text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldAlert size={18} />
              </span>
              <span className="text-xs font-bold font-mono-code px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                {securityIssues.length} alerts
              </span>
            </div>
            <div className="font-semibold text-white text-sm">Security & Risks</div>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
              {securityIssues.length > 0 ? securityIssues[0].category : 'No immediate injection or leak vectors found.'}
            </p>
          </button>

          {/* Performance */}
          <button
            onClick={() => onSelectTab('performance')}
            className="p-4 rounded-xl bg-[#111520] border border-[#20283c] hover:border-cyan-500/50 hover:bg-[#151a28] text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap size={18} />
              </span>
              <span className="text-xs font-bold font-mono-code px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                {performance.length} areas
              </span>
            </div>
            <div className="font-semibold text-white text-sm">Performance Bottlenecks</div>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
              {performance.length > 0 ? performance[0].area : 'Execution profile appears lightweight.'}
            </p>
          </button>

          {/* Edge Cases */}
          <button
            onClick={() => onSelectTab('edgeCases')}
            className="p-4 rounded-xl bg-[#111520] border border-[#20283c] hover:border-purple-500/50 hover:bg-[#151a28] text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <HelpCircle size={18} />
              </span>
              <span className="text-xs font-bold font-mono-code px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30">
                {edgeCases.length} scenarios
              </span>
            </div>
            <div className="font-semibold text-white text-sm">Edge Cases & Bounds</div>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
              {edgeCases.length > 0 ? edgeCases[0].scenario : 'Basic bounds handled.'}
            </p>
          </button>
        </div>
      </div>

      {/* College Professor Feature Highlight Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-[#10192e] to-blue-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 text-xl font-bold">
            🎓
          </div>
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              College Professor Code Lab Mode Ready
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-mono uppercase font-bold">
                Featured
              </span>
            </h4>
            <p className="text-xs text-gray-300 mt-0.5">
              Step-by-step walkthrough, variable trace table, core mental model, and student quiz questions.
            </p>
          </div>
        </div>

        <button
          onClick={() => onSelectTab('teacher')}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all whitespace-nowrap cursor-pointer"
        >
          Open Professor Explanation →
        </button>
      </div>
    </div>
  );
};
