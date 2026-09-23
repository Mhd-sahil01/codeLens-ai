import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import {
  Play,
  RotateCcw,
  Upload,
  Sparkles,
  ChevronDown,
  AlertCircle,
  FileCode,
  GraduationCap,
  CheckCircle2,
  Loader2,
  Copy,
  Check,
} from 'lucide-react';
import type {
  CodeAnalysisResult,
  CodeSample,
  SupportedLanguage,
  ExplanationLevel,
  ServerStatus,
} from '../types';
import { analyzeCode } from '../services/api';
import { AnalysisDashboard } from '../components/results/AnalysisDashboard';

interface WorkspacePageProps {
  initialCode?: string;
  initialLanguage?: string;
  samples: CodeSample[];
  status: ServerStatus | null;
}

const SUPPORTED_LANGS: Array<{ id: SupportedLanguage; label: string }> = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'c', label: 'C' },
  { id: 'cpp', label: 'C++' },
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
];

const ANALYSIS_STEPS = [
  'Parsing AST & architectural patterns...',
  'Running bug & logic flaw detection heuristics...',
  'Performing security & injection vulnerability audit...',
  'Calculating asymptotic Big-O time and space complexity...',
  'Profiling runtime bottlenecks & cache efficiency...',
  'Synthesizing university professor code lab explanation...',
];

export const WorkspacePage: React.FC<WorkspacePageProps> = ({
  initialCode,
  initialLanguage,
  samples,
  status: _status,
}) => {
  const [code, setCode] = useState<string>(
    initialCode ||
      `// Two Sum: Find indices of two numbers that add up to target
function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] == target) {
        return [i, j];
      }
    }
  }
}`
  );

  const [language, setLanguage] = useState<SupportedLanguage>(
    (initialLanguage as SupportedLanguage) || 'javascript'
  );
  const [level, setLevel] = useState<ExplanationLevel>('Intermediate');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [analysis, setAnalysis] = useState<CodeAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sampleDropdownOpen, setSampleDropdownOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync if initial props change
  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
    if (initialLanguage) {
      setLanguage(initialLanguage as SupportedLanguage);
    }
  }, [initialCode, initialLanguage]);

  // Stepper animation while loading
  useEffect(() => {
    let interval: any;
    if (loading) {
      setCurrentStepIndex(0);
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => (prev + 1) % ANALYSIS_STEPS.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleRunAnalysis = async () => {
    if (!code || code.trim().length === 0) {
      setError('Please add some code before starting the analysis.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await analyzeCode(code, language, level);
      setAnalysis(res);
    } catch (err: any) {
      console.error('Analysis failed:', err);
      setError(
        err.message ||
          'Analysis failed. If using custom code, ensure GEMINI_API_KEY is configured in server/.env, or test one of the pre-loaded interactive samples.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setCode(content);

        // Auto-detect language by file extension
        const ext = file.name.split('.').pop()?.toLowerCase();
        if (ext === 'js' || ext === 'jsx') setLanguage('javascript');
        else if (ext === 'ts' || ext === 'tsx') setLanguage('typescript');
        else if (ext === 'py') setLanguage('python');
        else if (ext === 'java') setLanguage('java');
        else if (ext === 'c') setLanguage('c');
        else if (ext === 'cpp' || ext === 'cc' || ext === 'cxx' || ext === 'h' || ext === 'hpp') setLanguage('cpp');
        else if (ext === 'html') setLanguage('html');
        else if (ext === 'css') setLanguage('css');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleSelectSample = (sample: CodeSample) => {
    setCode(sample.code);
    setLanguage(sample.language);
    setSampleDropdownOpen(false);
    setError(null);
  };

  const handleClearCode = () => {
    setCode('');
    setAnalysis(null);
    setError(null);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Editor & Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Monaco Code Editor & Actions */}
        <div className="lg:col-span-5 flex flex-col bg-[#0b0e16] border border-[#20293d] rounded-2xl overflow-hidden shadow-2xl">
          {/* Editor Header Bar */}
          <div className="bg-[#121624] px-4 py-3 border-b border-[#20293d] flex flex-wrap items-center justify-between gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-semibold">Language:</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                className="bg-[#0b0e16] border border-[#232c42] rounded-lg px-2.5 py-1 text-xs font-mono-code text-cyan-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {SUPPORTED_LANGS.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Actions (Samples, Upload, Clear, Copy) */}
            <div className="flex items-center gap-2">
              {/* Sample Picker Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSampleDropdownOpen(!sampleDropdownOpen)}
                  className="px-2.5 py-1 rounded-lg bg-[#182030] hover:bg-[#202b40] text-gray-300 hover:text-white border border-[#28354e] text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <FileCode size={13} className="text-cyan-400" />
                  <span>Samples</span>
                  <ChevronDown size={12} />
                </button>

                {sampleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#121624] border border-[#26324b] rounded-xl shadow-2xl py-2 z-50">
                    <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-[#1f283c]">
                      Pre-Seeded Algorithms
                    </div>
                    {samples.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => handleSelectSample(s)}
                        className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-cyan-500/10 flex flex-col gap-0.5 cursor-pointer"
                      >
                        <span className="font-semibold">{s.title}</span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {s.language.toUpperCase()} • {s.category}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Upload file button */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept=".js,.jsx,.ts,.tsx,.py,.java,.c,.cpp,.h,.hpp,.html,.css"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 rounded-lg bg-[#182030] hover:bg-[#202b40] text-gray-300 hover:text-white border border-[#28354e] text-xs transition-all cursor-pointer"
                title="Upload code file (.js, .py, .java, .cpp, etc.)"
              >
                <Upload size={14} />
              </button>

              {/* Copy Code */}
              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded-lg bg-[#182030] hover:bg-[#202b40] text-gray-300 hover:text-white border border-[#28354e] text-xs transition-all cursor-pointer"
                title="Copy current code"
              >
                {copiedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>

              {/* Clear button */}
              <button
                onClick={handleClearCode}
                className="p-1.5 rounded-lg bg-[#182030] hover:bg-rose-500/20 text-gray-400 hover:text-rose-300 border border-[#28354e] hover:border-rose-500/30 text-xs transition-all cursor-pointer"
                title="Clear editor"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* Monaco Editor Container */}
          <div className="h-[480px] sm:h-[580px] w-full bg-[#080a10]">
            <Editor
              height="100%"
              language={language === 'c' || language === 'cpp' ? 'cpp' : language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                fontSize: 13,
                fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                lineNumbersMinChars: 3,
                wordWrap: 'on',
                padding: { top: 12, bottom: 12 },
                cursorBlinking: 'smooth',
                smoothScrolling: true,
                renderLineHighlight: 'all',
              }}
            />
          </div>

          {/* Editor Footer / Level Toggle & Primary CTA */}
          <div className="bg-[#121624] px-4 py-3.5 border-t border-[#20293d] flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Professor Pedagogical Level Switcher */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                <GraduationCap size={14} className="text-cyan-400" />
                Level:
              </span>
              <div className="flex items-center bg-[#090c12] border border-[#212b40] rounded-lg p-0.5 text-xs">
                {(['Beginner', 'Intermediate', 'Advanced'] as ExplanationLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setLevel(lvl)}
                    className={`px-2.5 py-1 rounded font-semibold transition-all cursor-pointer ${
                      level === lvl
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_8px_rgba(14,165,233,0.2)]'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Run Analysis Button */}
            <button
              onClick={handleRunAnalysis}
              disabled={loading}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                loading
                  ? 'bg-cyan-500/40 text-slate-900 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(14,165,233,0.35)] active:scale-95'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin text-slate-950" />
                  <span>Auditing Code...</span>
                </>
              ) : (
                <>
                  <Play size={16} fill="currentColor" />
                  <span>Analyze Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Results Dashboard / Loading / Empty State */}
        <div className="lg:col-span-7 space-y-6">
          {/* Error Banner */}
          {error && (
            <div className="bg-rose-950/20 border border-rose-500/40 p-4 rounded-2xl flex items-start gap-3 text-rose-200 text-xs">
              <AlertCircle size={18} className="text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-white">Analysis Alert</div>
                <div className="leading-relaxed">{error}</div>
                {samples && samples.length > 0 && (
                  <button
                    onClick={() => handleSelectSample(samples[0])}
                    className="text-cyan-400 underline font-semibold mt-1 block cursor-pointer"
                  >
                    Try loading the pre-seeded Two Sum algorithm sample instead
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Loading Animation Card */}
          {loading && (
            <div className="bg-[#0f131d] border border-cyan-500/30 rounded-2xl p-10 text-center shadow-2xl space-y-6">
              <div className="relative w-20 h-20 mx-auto">
                <div className="w-20 h-20 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-cyan-400">
                  <Sparkles size={24} className="animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">
                  Conducting Deep Multi-Dimensional Audit
                </h3>
                <p className="text-sm font-mono-code text-cyan-300 bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-500/20 max-w-md mx-auto">
                  {ANALYSIS_STEPS[currentStepIndex]}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-lg mx-auto text-left text-xs">
                {ANALYSIS_STEPS.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg border text-[11px] flex items-center gap-1.5 ${
                      idx === currentStepIndex
                        ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 font-semibold'
                        : idx < currentStepIndex
                        ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                        : 'bg-[#0b0e16] border-[#1d2537] text-gray-400'
                    }`}
                  >
                    {idx < currentStepIndex ? (
                      <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                    ) : idx === currentStepIndex ? (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-gray-600 shrink-0" />
                    )}
                    <span className="truncate">{step.split('...')[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analysis Results View */}
          {!loading && analysis && <AnalysisDashboard analysis={analysis} />}

          {/* Empty / Initial State View */}
          {!loading && !analysis && (
            <div className="bg-[#0f131d] border border-[#1f2638] rounded-2xl p-8 sm:p-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center">
                <Sparkles size={28} />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-xl font-bold text-white">
                  Ready to Analyze Your Code
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Click <span className="text-cyan-400 font-bold">"Analyze Code"</span> to generate an executive review, find bugs, audit security hazards, compute Big-O complexity, refactor code, and receive college professor teaching.
                </p>
              </div>

              {/* Sample Quick Launch */}
              {samples && samples.length > 0 && (
                <div className="pt-4 border-t border-[#1d2537] space-y-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                    Or select an interactive sample algorithm:
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {samples.slice(0, 4).map((sample) => (
                      <button
                        key={sample.id}
                        onClick={() => handleSelectSample(sample)}
                        className="px-3 py-1.5 rounded-lg bg-[#141a27] hover:bg-cyan-500/15 text-gray-300 hover:text-cyan-300 border border-[#212c42] hover:border-cyan-500/40 text-xs font-medium transition-all cursor-pointer"
                      >
                        {sample.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
