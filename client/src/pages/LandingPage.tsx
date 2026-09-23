import type React from 'react';
import {
  Code2,
  Sparkles,
  GraduationCap,
  ShieldAlert,
  Clock,
  Zap,
  FlaskConical,
  ArrowRight,
  FileCode,
  Terminal,
  Award,
  AlertCircle,
} from 'lucide-react';
import type { CodeSample, ServerStatus } from '../types';

interface LandingPageProps {
  onStartWorkspace: (sampleCode?: string, language?: string) => void;
  samples: CodeSample[];
  status: ServerStatus | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartWorkspace,
  samples,
  status: _status,
}) => {
  const features = [
    {
      icon: GraduationCap,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      title: 'College Professor Mode',
      desc: 'Deep algorithmic intuition, concrete step-by-step variable state traces, mental models, and interactive comprehension quizzes.',
    },
    {
      icon: AlertCircle,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      title: 'Bug & Flaw Detection',
      desc: 'Pinpoints logical faults, undefined references, and off-by-one errors with production impact analysis and actionable fixes.',
    },
    {
      icon: ShieldAlert,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      title: 'Security Vulnerability Audit',
      desc: 'Scans for injection vectors, hardcoded secrets, resource exhaustion, and unsafe evaluations with defensive mitigations.',
    },
    {
      icon: Clock,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      title: 'Big-O Complexity Analysis',
      desc: 'Mathematical step-by-step proofs for Time and Space Complexity, distinguishing input space from auxiliary memory.',
    },
    {
      icon: Zap,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      title: 'Performance & Inefficiencies',
      desc: 'Detects redundant loops, unnecessary object allocations, cache misses, and garbage collector strain.',
    },
    {
      icon: Sparkles,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      title: 'Refactored Solutions & Diffs',
      desc: 'Side-by-side comparison of original code versus clean, production-grade refactored code with specific change logs.',
    },
    {
      icon: FlaskConical,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      title: 'Unit Test Suite Generation',
      desc: 'Auto-generates nominal, boundary, invalid, and edge-case test suites ready to run in Jest, PyTest, JUnit, or C assert.',
    },
    {
      icon: Award,
      color: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
      title: 'Code Quality & Best Practices',
      desc: 'Calculates overall maintainability scores, readability indices, and enforces language-specific idiomatic conventions.',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131926] border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wide shadow-[0_0_15px_rgba(14,165,233,0.15)]">
            <Sparkles size={14} className="text-cyan-400 animate-pulse" />
            <span>Understand. Review. Improve.</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Stop Guessing Your Code.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              Analyze, Review & Truly Understand It.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            The AI code review tool that doesn't just list errors — it teaches you like a distinguished university professor. Comprehensive logic audits, Big-O proofs, refactored diffs, and step-by-step variable traces.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onStartWorkspace()}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-[0_0_25px_rgba(14,165,233,0.4)] transition-all flex items-center gap-2.5 active:scale-95 cursor-pointer"
            >
              <Code2 size={18} />
              Launch CodeLens Workspace
              <ArrowRight size={16} />
            </button>

            {samples && samples.length > 0 && (
              <button
                onClick={() => onStartWorkspace(samples[0].code, samples[0].language)}
                className="px-5 py-3.5 rounded-xl bg-[#121622] hover:bg-[#181e2e] text-gray-200 border border-[#242f47] hover:border-cyan-500/40 text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Terminal size={16} className="text-cyan-400" />
                Try Interactive Two Sum Demo
              </button>
            )}
          </div>

          {/* Language chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4 text-xs text-gray-400">
            <span className="font-semibold text-gray-400">Supported:</span>
            {['JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'HTML', 'CSS'].map((lang) => (
              <span
                key={lang}
                className="px-2.5 py-0.5 rounded-md bg-[#10141e] border border-[#1f2638] text-gray-300 font-mono-code text-[11px]"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Hero Interactive Code Preview Mockup */}
        <div className="mt-12 max-w-5xl mx-auto rounded-2xl bg-[#0b0e16] border border-[#222c40] shadow-2xl overflow-hidden text-left relative">
          <div className="bg-[#121624] px-4 py-3 border-b border-[#20293d] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono-code text-gray-400">twoSum.js — CodeLens AI Multi-Audit</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Score: 88/100
              </span>
              <span className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                O(n) Linear
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#1d2537]">
            {/* Code column */}
            <div className="lg:col-span-7 p-5 font-mono-code text-xs text-gray-300 space-y-1 bg-[#080a10]">
              <div className="text-gray-400">// CodeLens Optimized Implementation</div>
              <div><span className="text-purple-400">function</span> <span className="text-blue-400">twoSum</span>(nums, target) &#123;</div>
              <div className="pl-4 text-gray-400">// Hash Map lookup for O(1) complement checks</div>
              <div className="pl-4"><span className="text-purple-400">const</span> map = <span className="text-purple-400">new</span> <span className="text-cyan-300">Map</span>();</div>
              <div className="pl-4"><span className="text-purple-400">for</span> (<span className="text-purple-400">let</span> i = <span className="text-amber-300">0</span>; i &lt; nums.length; i++) &#123;</div>
              <div className="pl-8"><span className="text-purple-400">const</span> complement = target - nums[i];</div>
              <div className="pl-8"><span className="text-purple-400">if</span> (map.<span className="text-cyan-300">has</span>(complement)) &#123;</div>
              <div className="pl-12 text-emerald-300"><span className="text-purple-400">return</span> [map.<span className="text-cyan-300">get</span>(complement), i];</div>
              <div className="pl-8">&#125;</div>
              <div className="pl-8">map.<span className="text-cyan-300">set</span>(nums[i], i);</div>
              <div className="pl-4">&#125;</div>
              <div className="pl-4 text-purple-400">return [];</div>
              <div>&#125;</div>
            </div>

            {/* Analysis Callouts column */}
            <div className="lg:col-span-5 p-5 bg-[#0e121b] space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <GraduationCap size={15} />
                Professor Lab Highlights
              </div>

              <div className="bg-[#121724] border border-[#20293d] p-3 rounded-xl text-xs space-y-1">
                <div className="font-semibold text-white">Algorithmic Mental Model</div>
                <div className="text-gray-400 text-[11px] leading-relaxed">
                  Instead of quadratic nested scans, we trade O(n) auxiliary memory for instantaneous O(1) complement lookups.
                </div>
              </div>

              <div className="bg-[#121724] border border-[#20293d] p-3 rounded-xl text-xs space-y-1">
                <div className="font-semibold text-emerald-400">Concrete Variable Trace (nums=[2,7,11], target=9)</div>
                <div className="font-mono-code text-[11px] text-cyan-300">
                  Step 1: i=0, num=2 → comp=7 → map={'{2:0}'}<br />
                  Step 2: i=1, num=7 → comp=2 → Match found! Returns [0, 1]
                </div>
              </div>

              <div className="bg-[#121724] border border-[#20293d] p-3 rounded-xl text-xs space-y-1">
                <div className="font-semibold text-amber-300">Common Student Pitfall</div>
                <div className="text-gray-400 text-[11px]">
                  Setting values into map before checking complement can cause an element to match itself.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12 Core Pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Complete 12-Dimensional Code Intelligence
          </h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            Engineered specifically to solve real production challenges while providing profound educational clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-[#0f131c] border border-[#1f2638] rounded-2xl p-6 hover:border-cyan-500/40 hover:bg-[#131824] transition-all group space-y-3"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${feat.color} group-hover:scale-110 transition-transform`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pre-Seeded Code Samples Showcase */}
      {samples && samples.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <FileCode size={22} className="text-cyan-400" />
                Instant Interactive Code Samples
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Explore real algorithms and common anti-patterns with 1-click instant audit reports.
              </p>
            </div>
            <button
              onClick={() => onStartWorkspace()}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
            >
              Open Clean Workspace →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {samples.map((sample) => (
              <div
                key={sample.id}
                className="bg-[#10141e] border border-[#20283c] rounded-2xl p-5 hover:border-cyan-500/40 hover:bg-[#141a27] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded">
                      {sample.language}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      {sample.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{sample.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2">
                    {sample.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#1d2435] flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 font-mono">
                    {sample.code.split('\n').length} lines
                  </span>
                  <button
                    onClick={() => onStartWorkspace(sample.code, sample.language)}
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-bold text-xs border border-cyan-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Analyze Sample</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3-Step Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#101522] to-[#141b2c] border border-[#212b3e] rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              How CodeLens AI Works
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Three seamless steps to mastery and bulletproof code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="space-y-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-bold text-base mx-auto sm:mx-0">
                1
              </div>
              <h4 className="text-base font-bold text-white">Paste or Upload Code</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Enter code in Monaco Editor or drag-and-drop any source file in JavaScript, TypeScript, Python, Java, C, or C++.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center font-bold text-base mx-auto sm:mx-0">
                2
              </div>
              <h4 className="text-base font-bold text-white">Select Your Level</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Choose between Beginner, Intermediate, or Advanced pedagogical modes to match your exact learning or engineering needs.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-base mx-auto sm:mx-0">
                3
              </div>
              <h4 className="text-base font-bold text-white">Inspect 12 Dimensions</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Explore bugs, security alerts, Big-O proofs, refactored code diffs, runnable test suites, and interactive professor code lab lessons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-cyan-950/40 via-[#101828] to-blue-950/40 border border-cyan-500/30 rounded-3xl p-8 sm:p-14 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Ready to elevate your code?
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto">
            Join developers, computer science students, and engineering leads who use CodeLens AI every day.
          </p>
          <button
            onClick={() => onStartWorkspace()}
            className="px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm shadow-[0_0_25px_rgba(14,165,233,0.4)] transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Code2 size={18} />
            Start Analyzing Now
          </button>
        </div>
      </section>
    </div>
  );
};
