import { Award, CheckCircle2, Bookmark, ThumbsUp } from 'lucide-react';
import type { CodeQualityAnalysis, BestPracticeItem } from '../../types';

interface QualitySectionProps {
  codeQuality: CodeQualityAnalysis;
  bestPractices: BestPracticeItem[];
}

export const QualitySection: React.FC<QualitySectionProps> = ({ codeQuality, bestPractices }) => {
  const getRatingBadge = (val: string) => {
    switch (val) {
      case 'Excellent':
      case 'High':
      case 'Consistent & Clear':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Good':
      case 'Moderate':
      case 'Acceptable':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      case 'Fair':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      default:
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#10141e] border border-[#20283c] p-4 rounded-xl text-center">
          <div className="text-xs text-gray-400 font-semibold mb-1">Readability</div>
          <div className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border mt-1 ${getRatingBadge(codeQuality.readability)}`}>
            {codeQuality.readability}
          </div>
        </div>

        <div className="bg-[#10141e] border border-[#20283c] p-4 rounded-xl text-center">
          <div className="text-xs text-gray-400 font-semibold mb-1">Naming Clarity</div>
          <div className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border mt-1 ${getRatingBadge(codeQuality.naming)}`}>
            {codeQuality.naming}
          </div>
        </div>

        <div className="bg-[#10141e] border border-[#20283c] p-4 rounded-xl text-center">
          <div className="text-xs text-gray-400 font-semibold mb-1">Maintainability</div>
          <div className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border mt-1 ${getRatingBadge(codeQuality.maintainability)}`}>
            {codeQuality.maintainability}
          </div>
        </div>

        <div className="bg-[#10141e] border border-[#20283c] p-4 rounded-xl text-center">
          <div className="text-xs text-gray-400 font-semibold mb-1">Modularity</div>
          <div className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border mt-1 ${getRatingBadge(codeQuality.modularity)}`}>
            {codeQuality.modularity}
          </div>
        </div>
      </div>

      {/* Holistic Critique & Positive Highlights */}
      <div className="bg-[#10141e] border border-[#20283c] rounded-2xl p-6 space-y-4">
        <div>
          <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <Award size={16} className="text-cyan-400" />
            Holistic Engineering Critique
          </h4>
          <p className="text-sm text-gray-300 leading-relaxed bg-[#0a0d14] p-4 rounded-xl border border-[#1d2537]">
            {codeQuality.explanation}
          </p>
        </div>

        {codeQuality.positiveAspects && codeQuality.positiveAspects.length > 0 && (
          <div>
            <h5 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ThumbsUp size={13} />
              Constructive Strengths & Good Patterns
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {codeQuality.positiveAspects.map((aspect, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs text-gray-300 bg-emerald-500/5 border border-emerald-500/15 p-2.5 rounded-lg"
                >
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>{aspect}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Industry Best Practices Checklist */}
      <div>
        <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Bookmark size={16} className="text-blue-400" />
          Industry & Language Best Practices ({bestPractices.length})
        </h4>

        <div className="space-y-3">
          {bestPractices.map((bp, i) => (
            <div
              key={bp.id || `bp-${i}`}
              className="bg-[#10141e] border border-[#20283c] p-4 rounded-xl space-y-2 hover:border-[#2f3950] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">{bp.rule}</span>
                <span className="text-xs font-mono-code px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {bp.appliesTo}
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                {bp.explanation}
              </p>
              <div className="text-xs text-cyan-300 bg-cyan-950/30 border border-cyan-500/20 p-2.5 rounded-lg font-mono-code">
                💡 <span className="font-semibold text-white">Guideline: </span>{bp.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
