import React, { useState } from 'react';
import {
  FileText,
  GraduationCap,
  AlertCircle,
  ShieldAlert,
  Clock,
  Zap,
  Award,
  HelpCircle,
  Sparkles,
  FlaskConical,
  Download,
  Copy,
  Check,
} from 'lucide-react';
import type { CodeAnalysisResult } from '../../types';
import { OverviewCard } from './OverviewCard';
import { BugsSection } from './BugsSection';
import { SecuritySection } from './SecuritySection';
import { ComplexitySection } from './ComplexitySection';
import { PerformanceSection } from './PerformanceSection';
import { QualitySection } from './QualitySection';
import { EdgeCasesSection } from './EdgeCasesSection';
import { DiffViewSection } from './DiffViewSection';
import { TestsSection } from './TestsSection';
import { TeacherExplanationSection } from './TeacherExplanationSection';

interface AnalysisDashboardProps {
  analysis: CodeAnalysisResult;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ analysis }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [copiedJson, setCopiedJson] = useState(false);

  const handleCopyReportJson = () => {
    navigator.clipboard.writeText(JSON.stringify(analysis, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleDownloadReport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(analysis, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `codelens-analysis-${analysis.language}-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: FileText,
      badge: null,
      highlight: false,
    },
    {
      id: 'teacher',
      label: 'Teach Me (Professor Mode)',
      icon: GraduationCap,
      badge: 'Core',
      highlight: true,
    },
    {
      id: 'bugs',
      label: 'Bugs & Issues',
      icon: AlertCircle,
      badge: analysis.bugs.length > 0 ? `${analysis.bugs.length}` : null,
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    },
    {
      id: 'security',
      label: 'Security & Risks',
      icon: ShieldAlert,
      badge: analysis.securityIssues.length > 0 ? `${analysis.securityIssues.length}` : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      id: 'complexity',
      label: 'Complexity (Big-O)',
      icon: Clock,
      badge: analysis.complexity.timeComplexity.bigO,
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    },
    {
      id: 'performance',
      label: 'Performance',
      icon: Zap,
      badge: analysis.performance.length > 0 ? `${analysis.performance.length}` : null,
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    },
    {
      id: 'quality',
      label: 'Quality & Best Practices',
      icon: Award,
      badge: `${analysis.metrics.qualityScore}`,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 'edgeCases',
      label: 'Edge Cases',
      icon: HelpCircle,
      badge: analysis.edgeCases.length > 0 ? `${analysis.edgeCases.length}` : null,
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    },
    {
      id: 'diff',
      label: 'Refactored Diff',
      icon: Sparkles,
      badge: 'Optimized',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    },
    {
      id: 'tests',
      label: 'Unit Tests',
      icon: FlaskConical,
      badge: `${analysis.testCases.cases.length}`,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Action bar (Export JSON, Download, Print) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0d1017] border border-[#1d2537] p-3 rounded-xl">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Multi-Dimensional Audit Ready</span>
          <span className="text-gray-400">•</span>
          <span className="font-mono text-cyan-400">{analysis.language.toUpperCase()}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyReportJson}
            className="px-3 py-1.5 rounded-lg bg-[#141a28] hover:bg-[#1a2336] text-gray-300 hover:text-white border border-[#20293d] text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            title="Copy entire raw JSON report"
          >
            {copiedJson ? (
              <>
                <Check size={13} className="text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied JSON</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy JSON</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadReport}
            className="px-3 py-1.5 rounded-lg bg-[#141a28] hover:bg-[#1a2336] text-gray-300 hover:text-white border border-[#20293d] text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            title="Download full report file"
          >
            <Download size={13} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#1f2638]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                isActive
                  ? tab.highlight
                    ? 'bg-gradient-to-r from-cyan-500/25 to-blue-600/30 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(14,165,233,0.2)]'
                    : 'bg-[#182030] text-white border border-cyan-500/30 shadow-[0_0_10px_rgba(14,165,233,0.1)]'
                  : tab.highlight
                  ? 'bg-cyan-950/20 text-cyan-400 hover:bg-cyan-900/30 border border-cyan-500/20'
                  : 'bg-[#10141e] text-gray-400 hover:text-white hover:bg-[#151b27] border border-[#1d2537]'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-cyan-400' : 'text-gray-400'} />
              <span>{tab.label}</span>

              {tab.badge && (
                <span
                  className={`text-[10px] font-mono-code font-bold px-1.5 py-0.2 rounded border ${
                    tab.badgeColor || 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="animate-tab-appear" key={activeTab}>
        {activeTab === 'overview' && (
          <OverviewCard analysis={analysis} onSelectTab={(tabId) => setActiveTab(tabId)} />
        )}
        {activeTab === 'teacher' && (
          <TeacherExplanationSection explanation={analysis.explanation} />
        )}
        {activeTab === 'bugs' && <BugsSection bugs={analysis.bugs} />}
        {activeTab === 'security' && <SecuritySection securityIssues={analysis.securityIssues} />}
        {activeTab === 'complexity' && <ComplexitySection complexity={analysis.complexity} />}
        {activeTab === 'performance' && <PerformanceSection performance={analysis.performance} />}
        {activeTab === 'quality' && (
          <QualitySection
            codeQuality={analysis.codeQuality}
            bestPractices={analysis.bestPractices}
          />
        )}
        {activeTab === 'edgeCases' && <EdgeCasesSection edgeCases={analysis.edgeCases} />}
        {activeTab === 'diff' && (
          <DiffViewSection improvements={analysis.improvements} language={analysis.language} />
        )}
        {activeTab === 'tests' && <TestsSection testCases={analysis.testCases} />}
      </div>
    </div>
  );
};
