import { Zap, Gauge, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import type { PerformanceFinding } from '../../types';

interface PerformanceSectionProps {
  performance: PerformanceFinding[];
}

export const PerformanceSection: React.FC<PerformanceSectionProps> = ({ performance }) => {
  const getImpactStyle = (impact: 'High' | 'Medium' | 'Low') => {
    switch (impact) {
      case 'High':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      case 'Medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Low':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      default:
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    }
  };

  if (!performance || performance.length === 0) {
    return (
      <div className="bg-[#10141e] border border-[#1f2638] rounded-2xl p-10 text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-4">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">High Efficiency Confirmed</h3>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          No obvious redundant re-computations, excessive memory allocations, or quadratic nested iterations were found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="pb-2 border-b border-[#1d2435]">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Zap size={18} className="text-cyan-400" />
          Runtime Performance & Inefficiencies ({performance.length})
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Identified bottlenecks affecting CPU throughput, cache performance, and memory allocations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {performance.map((item, index) => {
          const id = item.id || `perf-${index}`;

          return (
            <div
              key={id}
              className="bg-[#10141e] border border-[#21293d] rounded-xl p-5 hover:border-[#2e3952] transition-all space-y-4"
            >
              <div className="flex items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <Gauge size={18} />
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.area}</h4>
                    <span className="text-[11px] text-gray-400">Bottleneck Analysis</span>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold border uppercase tracking-wider ${getImpactStyle(item.impact)}`}>
                  {item.impact} Impact
                </span>
              </div>

              <div>
                <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Mechanism & Cause
                </h5>
                <p className="text-sm text-gray-300 bg-[#090c12] p-3 rounded-lg border border-[#1b2234] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <ArrowUpRight size={14} />
                  Recommended Optimization
                </h5>
                <p className="text-sm text-gray-200 bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/20 leading-relaxed">
                  {item.suggestedOptimization}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
