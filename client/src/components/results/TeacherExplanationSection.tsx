import { useState } from 'react';
import {
  GraduationCap,
  Lightbulb,
  Workflow,
  Cpu,
  Layers,
  AlertTriangle,
  Eye,
  EyeOff,
  BookOpen,
} from 'lucide-react';
import type { TeacherExplanation } from '../../types';

interface TeacherExplanationSectionProps {
  explanation: TeacherExplanation;
}

export const TeacherExplanationSection: React.FC<TeacherExplanationSectionProps> = ({ explanation }) => {
  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const [activeStep, setActiveStep] = useState<number>(0);

  const toggleHint = (index: number) => {
    setRevealedHints((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleAnswer = (index: number) => {
    setRevealedAnswers((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="space-y-8">
      {/* College Professor Hero Card */}
      <div className="bg-gradient-to-r from-[#101726] via-[#141b2d] to-[#121929] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <GraduationCap size={15} />
              University Computer Science Code Lab
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Professor's Deep Guided Walkthrough
            </h2>
            <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
              Understand the core algorithmic mental model, trace concrete variable states step-by-step, review common pitfalls, and test your understanding.
            </p>
          </div>

          <div className="bg-[#0b0e16]/80 border border-[#222d42] p-4 rounded-xl flex items-center gap-4 shrink-0">
            <div className="text-3xl">👨‍🏫</div>
            <div className="text-xs">
              <div className="font-bold text-white">Pedagogical Mode</div>
              <div className="text-cyan-400 font-mono">No Fluff • Real Intuition</div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. What It Does & Core Mental Model */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#10141e] border border-[#20283c] rounded-2xl p-6 shadow-lg space-y-3">
          <div className="flex items-center gap-2.5 text-cyan-400 text-sm font-bold uppercase tracking-wider">
            <BookOpen size={16} />
            What Does This Program Actually Do?
          </div>
          <p className="text-sm text-gray-200 leading-relaxed bg-[#0a0d14] p-4 rounded-xl border border-[#1b2234]">
            {explanation.whatItDoes}
          </p>
        </div>

        <div className="bg-[#10141e] border border-[#20283c] rounded-2xl p-6 shadow-lg space-y-3">
          <div className="flex items-center gap-2.5 text-purple-400 text-sm font-bold uppercase tracking-wider">
            <Lightbulb size={16} />
            The Core Mental Model (Algorithmic Intuition)
          </div>
          <p className="text-sm text-gray-200 leading-relaxed bg-[#0a0d14] p-4 rounded-xl border border-[#1b2234]">
            {explanation.mainIdea}
          </p>
        </div>
      </div>

      {/* 2. Structural Anatomy Breakdown */}
      {explanation.codeStructure && (
        <div className="bg-[#10141e] border border-[#20283c] rounded-2xl p-6 shadow-lg space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers size={18} className="text-cyan-400" />
            Code Anatomy & Component Inventory
          </h3>
          <p className="text-xs text-gray-400">
            A breakdown of the building blocks that make up this implementation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <div className="bg-[#0a0d14] p-3.5 rounded-xl border border-[#1b2234]">
              <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-2">Functions</div>
              <ul className="text-xs text-gray-300 space-y-1">
                {explanation.codeStructure.functions?.map((fn, i) => (
                  <li key={i} className="font-mono-code text-[11px] text-gray-300">• {fn}</li>
                ))}
              </ul>
            </div>

            <div className="bg-[#0a0d14] p-3.5 rounded-xl border border-[#1b2234]">
              <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wider mb-2">Variables & State</div>
              <ul className="text-xs text-gray-300 space-y-1">
                {explanation.codeStructure.variables?.map((v, i) => (
                  <li key={i} className="font-mono-code text-[11px] text-gray-300">• {v}</li>
                ))}
              </ul>
            </div>

            <div className="bg-[#0a0d14] p-3.5 rounded-xl border border-[#1b2234]">
              <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2">Loops & Logic</div>
              <ul className="text-xs text-gray-300 space-y-1">
                {explanation.codeStructure.loops?.map((l, i) => (
                  <li key={i} className="text-[11px] text-gray-300">• {l}</li>
                ))}
              </ul>
            </div>

            <div className="bg-[#0a0d14] p-3.5 rounded-xl border border-[#1b2234]">
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2">Data Structures</div>
              <ul className="text-xs text-gray-300 space-y-1">
                {explanation.codeStructure.dataStructures?.map((ds, i) => (
                  <li key={i} className="text-[11px] text-gray-300">• {ds}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 3. Block-by-Block Guided Tour */}
      {explanation.blockByBlock && explanation.blockByBlock.length > 0 && (
        <div className="bg-[#10141e] border border-[#20283c] rounded-2xl p-6 shadow-lg space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Workflow size={18} className="text-cyan-400" />
            Block-by-Block Guided Tour
          </h3>
          <p className="text-xs text-gray-400">
            Examining each functional section of the code and the exact role it plays.
          </p>

          <div className="space-y-3 pt-2">
            {explanation.blockByBlock.map((block, idx) => (
              <div
                key={idx}
                className="bg-[#0b0e16] border border-[#1d2537] rounded-xl p-4 hover:border-cyan-500/30 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xs font-bold font-mono">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-bold text-white">{block.blockName}</span>
                  </div>
                  {block.lines && (
                    <span className="text-xs font-mono-code text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                      {block.lines}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-300 leading-relaxed pl-8">
                  {block.plainExplanation}
                </p>

                {block.conceptHighlighted && (
                  <div className="pl-8 pt-1">
                    <span className="text-[11px] text-purple-300 bg-purple-950/30 border border-purple-500/20 px-2 py-0.5 rounded font-mono">
                      Key Concept: {block.conceptHighlighted}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Execution Flow */}
      {explanation.executionFlow && explanation.executionFlow.length > 0 && (
        <div className="bg-[#10141e] border border-[#20283c] rounded-2xl p-6 shadow-lg space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Cpu size={18} className="text-blue-400" />
            Execution Flow & Lifecycle
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {explanation.executionFlow.map((flow, i) => (
              <div
                key={i}
                className="bg-[#0b0e16] border border-[#1d2537] p-4 rounded-xl relative overflow-hidden flex flex-col justify-between"
              >
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  {flow.phase}
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {flow.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Concrete Example Walkthrough & Variable Trace */}
      {explanation.exampleWalkthrough && (
        <div className="bg-[#10141e] border border-[#20283c] rounded-2xl p-6 shadow-lg space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1d2537]">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">📊</span>
                Step-by-Step Concrete Variable Trace
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Sample Input:{' '}
                <span className="font-mono-code text-cyan-300 font-bold">
                  {explanation.exampleWalkthrough.sampleInput}
                </span>
              </p>
            </div>

            <div className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full font-mono font-bold">
              Final Output: {explanation.exampleWalkthrough.finalOutput}
            </div>
          </div>

          {/* Stepper buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {explanation.exampleWalkthrough.steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeStep === idx
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(14,165,233,0.3)]'
                    : 'bg-[#090c12] text-gray-400 hover:text-white border border-[#1b2234]'
                }`}
              >
                Step {step.stepNumber || idx + 1}
              </button>
            ))}
          </div>

          {/* Active Step Details */}
          {explanation.exampleWalkthrough.steps[activeStep] && (
            <div className="bg-[#090c12] border border-[#1d2537] rounded-xl p-5 space-y-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Step {explanation.exampleWalkthrough.steps[activeStep].stepNumber || activeStep + 1} Action
                </span>
                <p className="text-sm text-gray-200 mt-1 leading-relaxed">
                  {explanation.exampleWalkthrough.steps[activeStep].description}
                </p>
              </div>

              {explanation.exampleWalkthrough.steps[activeStep].stateValues && (
                <div>
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2 block">
                    Variable State Snapshot
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {Object.entries(explanation.exampleWalkthrough.steps[activeStep].stateValues!).map(
                      ([key, val]) => (
                        <div
                          key={key}
                          className="bg-[#121622] p-2.5 rounded-lg border border-[#20293d] font-mono-code text-xs"
                        >
                          <div className="text-[10px] text-gray-400">{key}</div>
                          <div className="text-cyan-300 font-bold mt-0.5 truncate">{val}</div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 6. Key CS Concepts Deep-Dive */}
      {explanation.keyConceptsUsed && explanation.keyConceptsUsed.length > 0 && (
        <div className="bg-[#10141e] border border-[#20283c] rounded-2xl p-6 shadow-lg space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Lightbulb size={18} className="text-amber-400" />
            Fundamental Computer Science Concepts Explained
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {explanation.keyConceptsUsed.map((concept, i) => (
              <div
                key={i}
                className="bg-[#0b0e16] border border-[#1d2537] p-5 rounded-xl space-y-2 hover:border-[#2b354c] transition-all"
              >
                <div className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {concept.concept}
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {concept.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Common Student Mistakes & Gotchas */}
      {explanation.commonStudentMistakes && explanation.commonStudentMistakes.length > 0 && (
        <div className="bg-[#10141e] border border-[#20283c] rounded-2xl p-6 shadow-lg space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <AlertTriangle size={18} className="text-rose-400" />
            Common Student Misconceptions & Gotchas
          </h3>
          <p className="text-xs text-gray-400">
            Why students frequently struggle with this pattern and how to avoid the trap.
          </p>

          <div className="space-y-3 pt-2">
            {explanation.commonStudentMistakes.map((item, i) => (
              <div
                key={i}
                className="bg-[#0b0e16] border border-rose-500/20 rounded-xl p-4 space-y-2"
              >
                <div className="text-sm font-bold text-rose-300">
                  ⚠️ {item.mistake}
                </div>
                <div className="text-xs text-gray-300">
                  <span className="font-semibold text-gray-400">Why Students Fall For This: </span>
                  {item.whyStudentsMakeIt}
                </div>
                <div className="text-xs text-emerald-300 bg-emerald-500/5 border border-emerald-500/20 p-2.5 rounded-lg mt-1">
                  <span className="font-semibold text-white">How To Avoid: </span>
                  {item.howToAvoid}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. Interactive Self-Test Quiz */}
      {explanation.selfQuizQuestions && explanation.selfQuizQuestions.length > 0 && (
        <div className="bg-[#10141e] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center text-lg">
              🎯
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Comprehension Self-Check Quiz
              </h3>
              <p className="text-xs text-gray-400">
                Test your understanding like you would in a university lab quiz. Reveal hints if you get stuck.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {explanation.selfQuizQuestions.map((quiz, i) => {
              const showHint = revealedHints[i] || false;
              const showAnswer = revealedAnswers[i] || false;

              return (
                <div
                  key={i}
                  className="bg-[#0b0e16] border border-[#1e2538] rounded-xl p-5 space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/50 border border-cyan-500/30 px-2 py-0.5 rounded shrink-0">
                      Q{i + 1}
                    </span>
                    <h4 className="text-sm font-bold text-white">{quiz.question}</h4>
                  </div>

                  {/* Actions for Hint & Answer */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => toggleHint(i)}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-[#141a28] hover:bg-[#1a2336] text-amber-300 border border-amber-500/20 flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <Lightbulb size={12} />
                      {showHint ? 'Hide Hint' : 'Reveal Hint'}
                    </button>

                    <button
                      onClick={() => toggleAnswer(i)}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-[#141a28] hover:bg-[#1a2336] text-cyan-300 border border-cyan-500/20 flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      {showAnswer ? <EyeOff size={12} /> : <Eye size={12} />}
                      {showAnswer ? 'Hide Answer' : 'Show Answer'}
                    </button>
                  </div>

                  {/* Hint Box */}
                  {showHint && (
                    <div className="text-xs text-amber-200 bg-amber-500/5 border border-amber-500/20 p-3 rounded-lg leading-relaxed">
                      💡 <span className="font-semibold text-white">Hint: </span>{quiz.hint}
                    </div>
                  )}

                  {/* Answer Box */}
                  {showAnswer && (
                    <div className="text-xs text-emerald-200 bg-emerald-500/5 border border-emerald-500/20 p-3.5 rounded-lg leading-relaxed">
                      ✅ <span className="font-semibold text-white">Professor's Explanation: </span>{quiz.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
