// CodeLens AI - Comprehensive Analysis Types

export type SeverityLevel = 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
export type ExplanationLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type SupportedLanguage =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'java'
  | 'c'
  | 'cpp'
  | 'html'
  | 'css';

export interface AnalysisRequest {
  code: string;
  language: SupportedLanguage;
  actions: {
    review: boolean;
    explain: boolean;
    improve: boolean;
    generateTests: boolean;
  };
  explanationLevel: ExplanationLevel;
}

export interface CodeMetrics {
  totalLines: number;
  codeLines: number;
  functionsCount: number;
  classesCount: number;
  estimatedComplexity: string; // e.g. "Moderate (O(n log n))"
  qualityScore: number; // 0 - 100
  verdict: 'Excellent' | 'Good' | 'Needs Attention' | 'Critical Issues';
}

export interface BugFinding {
  id: string;
  severity: SeverityLevel;
  line?: number;
  problem: string;
  whyItMatters: string;
  suggestedFix: string;
  codeSnippet?: string;
}

export interface SecurityFinding {
  id: string;
  category: string; // e.g. "SQL Injection", "XSS", "Unsafe Eval", "Hardcoded Secret", "Resource Leak"
  severity: SeverityLevel;
  line?: number;
  issue: string;
  explanation: string;
  saferApproach: string;
}

export interface ComplexityAnalysis {
  timeComplexity: {
    bigO: string; // e.g. "O(n²)"
    reasoning: string;
    bestCase?: string;
    averageCase?: string;
    worstCase?: string;
  };
  spaceComplexity: {
    bigO: string; // e.g. "O(n)"
    reasoning: string;
    auxiliarySpace?: string;
    inputSpace?: string;
  };
}

export interface PerformanceFinding {
  id: string;
  area: string; // e.g. "Unnecessary Loop", "Repeated Calculation", "Inefficient Data Structure"
  impact: 'High' | 'Medium' | 'Low';
  description: string;
  suggestedOptimization: string;
}

export interface CodeQualityAnalysis {
  readability: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  naming: 'Consistent & Clear' | 'Acceptable' | 'Needs Improvement';
  maintainability: 'High' | 'Moderate' | 'Low';
  modularity: 'High' | 'Moderate' | 'Low';
  explanation: string;
  positiveAspects: string[];
}

export interface EdgeCaseFinding {
  id: string;
  scenario: string; // e.g. "Empty array input", "Null / undefined value", "Negative integer boundary"
  currentBehavior: string;
  potentialFailure: string;
  recommendedHandling: string;
}

export interface BestPracticeItem {
  id: string;
  rule: string;
  appliesTo: string; // e.g. "JavaScript async/await", "Python PEP 8", "C memory safety"
  explanation: string;
  recommendation: string;
}

export interface CodeImprovement {
  originalCode: string;
  improvedCode: string;
  summaryOfChanges: string[];
  whyChanged: string[];
  expectedBenefits: string[];
}

export interface TestCaseItem {
  id: string;
  title: string;
  category: 'Normal' | 'Boundary' | 'Invalid' | 'Edge Case';
  input: string;
  expectedOutput: string;
  purpose: string;
}

export interface TeacherExecutionStep {
  stepNumber: number;
  description: string;
  stateValues?: Record<string, string>; // e.g. { "i": "0", "currentSum": "2" }
}

export interface TeacherExplanation {
  whatItDoes: string; // Plain English summary a high-schooler or beginner understands
  mainIdea: string; // Core algorithm / conceptual mental model
  codeStructure: {
    functions: string[];
    variables: string[];
    loops: string[];
    conditionals: string[];
    dataStructures: string[];
  };
  blockByBlock: Array<{
    blockName: string;
    lines?: string;
    plainExplanation: string;
    conceptHighlighted?: string;
  }>;
  executionFlow: Array<{
    phase: string;
    description: string;
  }>;
  exampleWalkthrough: {
    sampleInput: string;
    steps: TeacherExecutionStep[];
    finalOutput: string;
  };
  keyConceptsUsed: Array<{
    concept: string; // e.g. "Recursion", "Hash Map", "Pointers", "Two Pointers"
    explanation: string;
  }>;
  commonStudentMistakes: Array<{
    mistake: string;
    whyStudentsMakeIt: string;
    howToAvoid: string;
  }>;
  howCouldThisBeImproved: string;
  selfQuizQuestions: Array<{
    question: string;
    hint: string;
    answer: string;
  }>;
}

export interface CodeAnalysisResult {
  id: string;
  analyzedAt: string;
  language: SupportedLanguage;
  summary: string;
  metrics: CodeMetrics;
  bugs: BugFinding[];
  securityIssues: SecurityFinding[];
  complexity: ComplexityAnalysis;
  performance: PerformanceFinding[];
  codeQuality: CodeQualityAnalysis;
  edgeCases: EdgeCaseFinding[];
  bestPractices: BestPracticeItem[];
  improvements: CodeImprovement;
  testCases: {
    suiteName: string;
    framework: string; // e.g. "Jest", "pytest", "JUnit"
    unitTestCode: string;
    cases: TestCaseItem[];
  };
  explanation: TeacherExplanation;
}
