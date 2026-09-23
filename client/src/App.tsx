import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { getServerStatus, getCodeSamples } from './services/api';
import type { ServerStatus, CodeSample } from './types';
import { Code2 } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'workspace'>('landing');
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [samples, setSamples] = useState<CodeSample[]>([]);
  const [initialWorkspaceCode, setInitialWorkspaceCode] = useState<string | undefined>(undefined);
  const [initialWorkspaceLanguage, setInitialWorkspaceLanguage] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Fetch server status & code samples
    const initData = async () => {
      try {
        const [serverStatus, codeSamples] = await Promise.all([
          getServerStatus(),
          getCodeSamples(),
        ]);
        setStatus(serverStatus);
        setSamples(codeSamples);
      } catch (err) {
        console.warn('Initial data load warning:', err);
      }
    };
    initData();
  }, []);

  const handleStartWorkspace = (sampleCode?: string, language?: string) => {
    if (sampleCode) {
      setInitialWorkspaceCode(sampleCode);
    }
    if (language) {
      setInitialWorkspaceLanguage(language);
    }
    setCurrentView('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: 'landing' | 'workspace') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        status={status}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' ? (
          <LandingPage
            onStartWorkspace={handleStartWorkspace}
            samples={samples}
            status={status}
          />
        ) : (
          <WorkspacePage
            initialCode={initialWorkspaceCode}
            initialLanguage={initialWorkspaceLanguage}
            samples={samples}
            status={status}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#182030] bg-[#07090e] py-10 px-4 sm:px-6 lg:px-8 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
              <Code2 size={16} />
            </div>
            <div>
              <span className="font-extrabold text-white font-mono-code text-sm">
                CodeLens<span className="text-cyan-400">.ai</span>
              </span>
              <span className="text-[11px] text-gray-400 ml-2">
                Understand. Review. Improve.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNavigate('landing')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Overview & Features
            </button>
            <button
              onClick={() => handleNavigate('workspace')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Interactive Workspace
            </button>
            <span className="text-gray-600">|</span>
            <div className="flex items-center gap-1.5 text-gray-400">
              <span>Powered by Google Gemini & AST Engine</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
