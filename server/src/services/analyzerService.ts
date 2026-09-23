// CodeLens Analyzer Service - Orchestration, Caching, and Validation

import { AnalysisRequest, CodeAnalysisResult } from '../types/analysis';
import { GeminiProvider } from '../providers/GeminiProvider';
import { CODE_SAMPLES } from '../data/sampleCodes';

export class AnalyzerService {
  private geminiProvider: GeminiProvider;
  private cache: Map<string, CodeAnalysisResult> = new Map();

  constructor() {
    this.geminiProvider = new GeminiProvider();
  }

  public getProviderStatus() {
    return {
      providerName: this.geminiProvider.name,
      isConfigured: this.geminiProvider.isConfigured(),
      model: this.geminiProvider.getModel(),
      supportedLanguages: [
        'javascript',
        'typescript',
        'python',
        'java',
        'c',
        'cpp',
        'html',
        'css'
      ]
    };
  }

  public getSamples() {
    return CODE_SAMPLES;
  }

  public async analyze(request: AnalysisRequest): Promise<CodeAnalysisResult> {
    // 1. Validation
    if (!request.code || request.code.trim().length === 0) {
      throw new Error('Add some code before starting the analysis.');
    }

    if (request.code.length > 50000) {
      throw new Error('Code is too large. Maximum supported size is 50,000 characters (approx. 1,500 lines).');
    }

    const trimmedCode = request.code.trim();

    // 2. Check memory cache for identical code + options
    const cacheKey = `${request.language}:${request.explanationLevel}:${trimmedCode}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // 3. Check if live AI provider is configured
    if (!this.geminiProvider.isConfigured()) {
      throw new Error(
        'AI code analysis is currently unconfigured on the server. Please add your GEMINI_API_KEY to server/.env to enable live analysis.'
      );
    }

    // 4. Invoke live Gemini AI Provider
    const result = await this.geminiProvider.analyzeCode(request);

    // Save in cache (cap at 100 entries)
    if (this.cache.size > 100) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }
    this.cache.set(cacheKey, result);

    return result;
  }
}

export const analyzerService = new AnalyzerService();
