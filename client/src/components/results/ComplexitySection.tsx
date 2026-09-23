import { Clock, Database, TrendingUp, Info } from 'lucide-react';
import type { ComplexityAnalysis } from '../../types';

interface ComplexitySectionProps {
  complexity: ComplexityAnalysis;
}

export const ComplexitySection: React.FC<ComplexitySectionProps> = ({ complexity }) => {
  const { timeComplexity, spaceComplexity } = complexity;

  const getBigOColor = (bigO: string) => {
    const clean = bigO.toLowerCase();
    if (clean.includes('o(1)') || clean.includes('o(log')) {
      return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    }
    if (clean.includes('o(n)') && !clean.includes('n²') && !clean.includes('n^2') && !clean.includes('n log')) {
      return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
    }
    if (clean.includes('o(n log n)')) {
      return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    }
    if (clean.includes('n²') || clean.includes('n^2')) {
      return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    }
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  };

  return (
    <div className="space-y-6">
      {/* 2-Column Grid: Time & Space */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time Complexity Card */}
        <div className="bg-[#10141e] border border-[#21293c] rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Time Complexity</h4>
                  <p className="text-xs text-gray-400">Computational execution growth</p>
                </div>
              </div>

              <div className={`px-3 py-1 rounded-xl text-base font-extrabold font-mono-code border ${getBigOColor(timeComplexity.bigO)}`}>
                {timeComplexity.bigO}
              </div>
            </div>

            {/* Mathematical Reasoning */}
            <div className="mt-4">
              <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Info size={13} className="text-cyan-400" />
                Step-by-Step Mathematical Proof
              </h5>
              <div className="text-sm text-gray-300 bg-[#090c12] p-4 rounded-xl border border-[#1d2537] leading-relaxed">
                {timeComplexity.reasoning}
              </div>
            </div>
          </div>

          {/* Cases Breakdown */}
          <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-[#1d2537]">
            <div className="bg-[#0b0e16] p-2.5 rounded-lg border border-[#1b2234] text-center">
              <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Best Case</div>
              <div className="text-xs font-mono-code text-white font-bold mt-1">
                {timeComplexity.bestCase || 'N/A'}
              </div>
            </div>
            <div className="bg-[#0b0e16] p-2.5 rounded-lg border border-[#1b2234] text-center">
              <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">Average Case</div>
              <div className="text-xs font-mono-code text-white font-bold mt-1">
                {timeComplexity.averageCase || timeComplexity.bigO}
              </div>
            </div>
            <div className="bg-[#0b0e16] p-2.5 rounded-lg border border-[#1b2234] text-center">
              <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Worst Case</div>
              <div className="text-xs font-mono-code text-white font-bold mt-1">
                {timeComplexity.worstCase || timeComplexity.bigO}
              </div>
            </div>
          </div>
        </div>

        {/* Space Complexity Card */}
        <div className="bg-[#10141e] border border-[#21293c] rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Database size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Space Complexity</h4>
                  <p className="text-xs text-gray-400">Memory footprint & allocations</p>
                </div>
              </div>

              <div className={`px-3 py-1 rounded-xl text-base font-extrabold font-mono-code border ${getBigOColor(spaceComplexity.bigO)}`}>
                {spaceComplexity.bigO}
              </div>
            </div>

            {/* Memory Allocation Reasoning */}
            <div className="mt-4">
              <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Info size={13} className="text-purple-400" />
                Memory Allocation Analysis
              </h5>
              <div className="text-sm text-gray-300 bg-[#090c12] p-4 rounded-xl border border-[#1d2537] leading-relaxed">
                {spaceComplexity.reasoning}
              </div>
            </div>
          </div>

          {/* Input vs Auxiliary Space */}
          <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-[#1d2537]">
            <div className="bg-[#0b0e16] p-3 rounded-lg border border-[#1b2234]">
              <div className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                Auxiliary Space (Extra)
              </div>
              <div className="text-xs font-mono-code text-gray-200 mt-1">
                {spaceComplexity.auxiliarySpace || 'O(1) extra storage'}
              </div>
            </div>
            <div className="bg-[#0b0e16] p-3 rounded-lg border border-[#1b2234]">
              <div className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                Input Space
              </div>
              <div className="text-xs font-mono-code text-gray-200 mt-1">
                {spaceComplexity.inputSpace || 'O(n) inputs passed'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Big-O Cheatsheet Visual Guide */}
      <div className="bg-[#0d1017] border border-[#1c2333] rounded-xl p-5">
        <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
          <TrendingUp size={14} className="text-cyan-400" />
          Asymptotic Efficiency Spectrum
        </h5>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs font-mono-code">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <div className="font-bold">O(1)</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Constant (Ideal)</div>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <div className="font-bold">O(log n)</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Logarithmic</div>
          </div>
          <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <div className="font-bold">O(n)</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Linear</div>
          </div>
          <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <div className="font-bold">O(n log n)</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Linearithmic</div>
          </div>
          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <div className="font-bold">O(n²)</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Quadratic</div>
          </div>
          <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <div className="font-bold">O(2ⁿ) / O(n!)</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Exponential</div>
          </div>
        </div>
      </div>
    </div>
  );
};
