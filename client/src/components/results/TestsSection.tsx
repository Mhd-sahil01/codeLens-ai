import { useState } from 'react';
import { FlaskConical, Copy, Check, FileCode } from 'lucide-react';
import type { TestCaseItem } from '../../types';

interface TestsSectionProps {
  testCases: {
    suiteName: string;
    framework: string;
    unitTestCode: string;
    cases: TestCaseItem[];
  };
}

export const TestsSection: React.FC<TestsSectionProps> = ({ testCases }) => {
  const [copied, setCopied] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const handleCopyCode = () => {
    navigator.clipboard.writeText(testCases.unitTestCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Normal':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Boundary':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      case 'Invalid':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      case 'Edge Case':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      default:
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    }
  };

  const filteredCases = activeFilter === 'All'
    ? testCases.cases
    : testCases.cases.filter((tc) => tc.category === activeFilter);

  return (
    <div className="space-y-6">
      {/* Test Suite Header */}
      <div className="bg-[#10141e] border border-[#20283c] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded">
              Framework: {testCases.framework}
            </span>
            <span className="text-xs text-gray-400">
              {testCases.cases.length} Scenarios Designed
            </span>
          </div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FlaskConical size={18} className="text-cyan-400" />
            {testCases.suiteName || 'Automated Test Scenarios'}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Comprehensive regression suite covering nominal paths, boundary conditions, and invalid arguments.
          </p>
        </div>

        <button
          onClick={handleCopyCode}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-[0_0_12px_rgba(14,165,233,0.3)] transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>Suite Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy Runnable Test Suite</span>
            </>
          )}
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'Normal', 'Boundary', 'Invalid', 'Edge Case'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === cat
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(14,165,233,0.15)]'
                : 'bg-[#10141e] text-gray-400 hover:text-white border border-[#1e2536]'
            }`}
          >
            {cat} {cat !== 'All' && `(${testCases.cases.filter((c) => c.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* Test Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCases.map((tc, i) => (
          <div
            key={tc.id || `tc-${i}`}
            className="bg-[#10141e] border border-[#20283c] rounded-xl p-5 hover:border-[#2f3950] transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm font-bold text-white">{tc.title}</h4>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold border uppercase tracking-wider shrink-0 ${getCategoryBadge(tc.category)}`}>
                {tc.category}
              </span>
            </div>

            <p className="text-xs text-gray-300">
              <span className="font-semibold text-gray-400">Purpose: </span>
              {tc.purpose}
            </p>

            <div className="space-y-1.5 font-mono-code text-xs">
              <div className="bg-[#090c12] p-2.5 rounded-lg border border-[#1d2537]">
                <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider mb-0.5">Input:</div>
                <div className="text-gray-200 overflow-x-auto">{tc.input}</div>
              </div>
              <div className="bg-[#090c12] p-2.5 rounded-lg border border-[#1d2537]">
                <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-0.5">Expected Output:</div>
                <div className="text-emerald-300 overflow-x-auto">{tc.expectedOutput}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Runnable Test Code Preview */}
      <div className="bg-[#090c12] border border-[#1f2638] rounded-2xl overflow-hidden">
        <div className="bg-[#121622] px-5 py-3 border-b border-[#1f2638] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode size={15} className="text-cyan-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Ready-to-Run Test Suite ({testCases.framework})
            </span>
          </div>
          <button
            onClick={handleCopyCode}
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold cursor-pointer"
          >
            <Copy size={12} />
            Copy Code
          </button>
        </div>
        <pre className="p-5 font-mono-code text-xs text-gray-300 overflow-x-auto leading-relaxed bg-[#07090e]">
          {testCases.unitTestCode}
        </pre>
      </div>
    </div>
  );
};
