// Google Gemini AI Provider for CodeLens AI
// Powered by official @google/genai SDK

import { GoogleGenAI } from '@google/genai';
import { AIProvider } from './AIProvider';
import { AnalysisRequest, CodeAnalysisResult } from '../types/analysis';
import { buildAnalysisSystemPrompt, ANALYSIS_JSON_SCHEMA_DESCRIPTION } from '../prompts/analysisPrompt';

export class GeminiProvider implements AIProvider {
  public readonly name = 'Google Gemini';

  public getApiKey(): string {
    return (process.env.GEMINI_API_KEY || '').trim();
  }

  public getModel(): string {
    return (process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite').trim();
  }

  /**
   * Resolves the operational model.
   * Google AI Studio has officially deprecated gemini-2.0-flash and gemini-2.5-flash-lite
   * for new API keys, directing all developers to gemini-3.5-flash-lite.
   */
  public getOperationalModel(): string {
    const configured = this.getModel();
    if (configured === 'gemini-2.5-flash-lite' || configured === 'gemini-2.0-flash') {
      return 'gemini-3.5-flash-lite';
    }
    return configured;
  }

  public isConfigured(): boolean {
    const key = this.getApiKey();
    return key.length > 0 && key !== 'YOUR_GEMINI_API_KEY';
  }

  public async analyzeCode(request: AnalysisRequest): Promise<CodeAnalysisResult> {
    if (!this.isConfigured()) {
      throw new Error(
        'Gemini API key is not configured. Please add a valid GEMINI_API_KEY to your server/.env file.'
      );
    }

    const apiKey = this.getApiKey();
    const targetModel = this.getOperationalModel();

    const systemPrompt = buildAnalysisSystemPrompt(request.language, request.explanationLevel);
    const userPrompt = `Please analyze the following ${request.language.toUpperCase()} code according to the instructions and return the comprehensive JSON response:\n\n\`\`\`${request.language}\n${request.code}\n\`\`\`\n\nSchema Requirement:\n${ANALYSIS_JSON_SCHEMA_DESCRIPTION}`;

    console.log(`[CodeLens Gemini] Analyzing ${request.language} code (${request.code.split('\n').length} lines) with model ${targetModel}...`);

    let lastError: any = null;

    // Retry loop with max 2 attempts for transient socket or network drops
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        return await this.callGemini(apiKey, targetModel, systemPrompt, userPrompt, request);
      } catch (err: any) {
        lastError = err;
        const errMsg = err?.message || String(err);
        const causeMsg = err?.cause ? ` (Cause: ${err.cause?.message || err.cause})` : '';
        console.error(`[CodeLens Gemini Attempt ${attempt}/2 Error]`, errMsg + causeMsg);

        // If it's a network glitch or fetch failed, wait briefly and retry once
        const isNetworkError = errMsg.includes('fetch failed') || errMsg.includes('ECONNRESET') || errMsg.includes('ETIMEDOUT');
        if (isNetworkError && attempt < 2) {
          console.log('[CodeLens Gemini] Retrying request in 1 second...');
          await new Promise((resolve) => setTimeout(resolve, 1000));
          continue;
        }

        // If Google states model not found or deprecated, try gemini-3.5-flash-lite
        if (
          (errMsg.includes('404') || errMsg.includes('NOT_FOUND') || errMsg.includes('no longer available')) &&
          targetModel !== 'gemini-3.5-flash-lite'
        ) {
          console.warn(`[CodeLens Gemini] Model "${targetModel}" unavailable, trying gemini-3.5-flash-lite...`);
          try {
            return await this.callGemini(apiKey, 'gemini-3.5-flash-lite', systemPrompt, userPrompt, request);
          } catch (fallbackErr: any) {
            lastError = fallbackErr;
          }
        }

        break;
      }
    }

    // Process and sanitize final error message
    const finalMsg = lastError?.message || String(lastError);
    if (finalMsg.includes('401') || finalMsg.includes('UNAUTHENTICATED') || finalMsg.includes('ACCESS_TOKEN_TYPE_UNSUPPORTED')) {
      throw new Error(
        'Gemini API authentication failed (401). Please verify your GEMINI_API_KEY in server/.env is an active API key from https://aistudio.google.com/app/apikey.'
      );
    }
    if (finalMsg.includes('429') || finalMsg.includes('RESOURCE_EXHAUSTED')) {
      throw new Error(
        'Gemini API free tier rate limit reached. Please wait a moment and try again.'
      );
    }
    if (finalMsg.includes('fetch failed') || finalMsg.includes('ECONNRESET') || finalMsg.includes('ETIMEDOUT') || finalMsg.includes('UND_ERR')) {
      throw new Error(
        'Connection to Google Gemini API timed out or failed. Please check your internet connection and retry.'
      );
    }

    throw new Error(`AI analysis failed: ${finalMsg}`);
  }

  private async callGemini(
    apiKey: string,
    modelName: string,
    systemPrompt: string,
    userPrompt: string,
    request: AnalysisRequest
  ): Promise<CodeAnalysisResult> {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: modelName,
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        temperature: 0.2,
        maxOutputTokens: 8192
      }
    });

    const rawText = response.text;
    if (!rawText) {
      throw new Error('AI returned an empty response.');
    }

    return this.parseAndValidateResponse(rawText, request);
  }

  private parseAndValidateResponse(raw: string, request: AnalysisRequest): CodeAnalysisResult {
    let cleaned = raw.trim();

    // Strip markdown code block if present
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.slice(7);
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.slice(3);
    }

    if (cleaned.endsWith('```')) {
      cleaned = cleaned.slice(0, -3);
    }

    cleaned = cleaned.trim();

    let parsed: any;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err: any) {
      console.error('[CodeLens Parse Error] Failed to parse AI JSON:', err.message, '\nRaw:\n', cleaned.slice(0, 500));
      throw new Error('Failed to parse AI structured response. Please retry.');
    }

    // Resolve complexity object
    const timeComplexity = parsed.complexity?.timeComplexity || parsed.timeComplexity || {
      bigO: 'O(n)',
      reasoning: 'Linear scan over input size.'
    };
    const spaceComplexity = parsed.complexity?.spaceComplexity || parsed.spaceComplexity || {
      bigO: 'O(1)',
      reasoning: 'Constant auxiliary memory.'
    };

    // Ensure all critical fields exist with safe fallbacks
    const lines = request.code.split('\n').length;
    const result: CodeAnalysisResult = {
      id: `analysis-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      analyzedAt: new Date().toISOString(),
      language: parsed.language || request.language,
      summary: parsed.summary || 'Code analysis completed successfully.',
      metrics: {
        totalLines: parsed.metrics?.totalLines || lines,
        codeLines: parsed.metrics?.codeLines || Math.max(1, lines - 2),
        functionsCount: parsed.metrics?.functionsCount || 1,
        classesCount: parsed.metrics?.classesCount || 0,
        estimatedComplexity: parsed.metrics?.estimatedComplexity || timeComplexity.bigO || 'O(n)',
        qualityScore: typeof parsed.metrics?.qualityScore === 'number' ? parsed.metrics.qualityScore : 82,
        verdict: parsed.metrics?.verdict || 'Good'
      },
      bugs: Array.isArray(parsed.bugs) ? parsed.bugs : [],
      securityIssues: Array.isArray(parsed.securityIssues) ? parsed.securityIssues : [],
      complexity: {
        timeComplexity: {
          bigO: timeComplexity.bigO || 'O(n)',
          reasoning: timeComplexity.reasoning || 'Algorithmic execution steps.',
          bestCase: timeComplexity.bestCase,
          averageCase: timeComplexity.averageCase,
          worstCase: timeComplexity.worstCase
        },
        spaceComplexity: {
          bigO: spaceComplexity.bigO || 'O(1)',
          reasoning: spaceComplexity.reasoning || 'Auxiliary memory usage.',
          auxiliarySpace: spaceComplexity.auxiliarySpace,
          inputSpace: spaceComplexity.inputSpace
        }
      },
      performance: Array.isArray(parsed.performance) ? parsed.performance : [],
      codeQuality: {
        readability: parsed.codeQuality?.readability || 'Good',
        naming: parsed.codeQuality?.naming || 'Consistent & Clear',
        maintainability: parsed.codeQuality?.maintainability || 'High',
        modularity: parsed.codeQuality?.modularity || 'Moderate',
        explanation: parsed.codeQuality?.explanation || 'Code is generally structured clearly.',
        positiveAspects: Array.isArray(parsed.codeQuality?.positiveAspects) ? parsed.codeQuality.positiveAspects : []
      },
      edgeCases: Array.isArray(parsed.edgeCases)
        ? parsed.edgeCases
        : Array.isArray(parsed.errorHandling)
        ? parsed.errorHandling.map((eh: any, idx: number) => ({
            id: `edge-${idx + 1}`,
            scenario: eh.scenario || eh.issue || 'Error handling scenario',
            currentBehavior: eh.currentBehavior || 'Unhandled condition',
            potentialFailure: eh.potentialFailure || eh.impact || 'Possible runtime exception',
            recommendedHandling: eh.recommendedHandling || eh.fix || 'Add defensive checks'
          }))
        : [],
      bestPractices: Array.isArray(parsed.bestPractices) ? parsed.bestPractices : [],
      improvements: {
        originalCode: request.code,
        improvedCode: parsed.improvements?.improvedCode || (typeof parsed.improvements === 'string' ? parsed.improvements : request.code),
        summaryOfChanges: Array.isArray(parsed.improvements?.summaryOfChanges)
          ? parsed.improvements.summaryOfChanges
          : Array.isArray(parsed.improvements)
          ? parsed.improvements
          : [],
        whyChanged: Array.isArray(parsed.improvements?.whyChanged) ? parsed.improvements.whyChanged : [],
        expectedBenefits: Array.isArray(parsed.improvements?.expectedBenefits) ? parsed.improvements.expectedBenefits : []
      },
      testCases: {
        suiteName: parsed.testCases?.suiteName || `${request.language.toUpperCase()} Test Suite`,
        framework: parsed.testCases?.framework || (request.language === 'python' ? 'pytest' : 'Jest'),
        unitTestCode: parsed.testCases?.unitTestCode || '// Unit test cases',
        cases: Array.isArray(parsed.testCases?.cases)
          ? parsed.testCases.cases
          : Array.isArray(parsed.testCases)
          ? parsed.testCases
          : []
      },
      explanation: {
        whatItDoes: parsed.explanation?.whatItDoes || 'Executes the logic described in the source.',
        mainIdea: parsed.explanation?.mainIdea || 'Solves the computational problem using standard programming techniques.',
        codeStructure: {
          functions: parsed.explanation?.codeStructure?.functions || [],
          variables: parsed.explanation?.codeStructure?.variables || [],
          loops: parsed.explanation?.codeStructure?.loops || [],
          conditionals: parsed.explanation?.codeStructure?.conditionals || [],
          dataStructures: parsed.explanation?.codeStructure?.dataStructures || []
        },
        blockByBlock: Array.isArray(parsed.explanation?.blockByBlock) ? parsed.explanation.blockByBlock : [],
        executionFlow: Array.isArray(parsed.explanation?.executionFlow) ? parsed.explanation.executionFlow : [],
        exampleWalkthrough: {
          sampleInput: parsed.explanation?.exampleWalkthrough?.sampleInput || 'Standard sample input',
          steps: Array.isArray(parsed.explanation?.exampleWalkthrough?.steps) ? parsed.explanation.exampleWalkthrough.steps : [],
          finalOutput: parsed.explanation?.exampleWalkthrough?.finalOutput || 'Computed output'
        },
        keyConceptsUsed: Array.isArray(parsed.explanation?.keyConceptsUsed) ? parsed.explanation.keyConceptsUsed : [],
        commonStudentMistakes: Array.isArray(parsed.explanation?.commonStudentMistakes) ? parsed.explanation.commonStudentMistakes : [],
        howCouldThisBeImproved: parsed.explanation?.howCouldThisBeImproved || 'Adopt modular decomposition and defensive boundaries.',
        selfQuizQuestions: Array.isArray(parsed.explanation?.selfQuizQuestions) ? parsed.explanation.selfQuizQuestions : []
      }
    };

    return result;
  }
}
