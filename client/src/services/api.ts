// CodeLens AI - API Client Service

import type { CodeAnalysisResult, CodeSample, ServerStatus, SupportedLanguage, ExplanationLevel } from '../types';

const API_BASE = 'http://localhost:5001/api';

export async function getServerStatus(): Promise<ServerStatus> {
  try {
    const res = await fetch(`${API_BASE}/status`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[CodeLens API] Status check warning:', err);
    return {
      success: false,
      providerName: 'Google Gemini',
      isConfigured: false,
      model: 'gemini-2.0-flash',
      supportedLanguages: ['javascript', 'typescript', 'python', 'java', 'c', 'cpp', 'html', 'css']
    };
  }
}

export async function getCodeSamples(): Promise<CodeSample[]> {
  try {
    const res = await fetch(`${API_BASE}/samples`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.samples || [];
  } catch (err) {
    console.warn('[CodeLens API] Failed to fetch samples:', err);
    return [];
  }
}

export async function analyzeCode(
  code: string,
  language: SupportedLanguage,
  explanationLevel: ExplanationLevel,
  actions = { review: true, explain: true, improve: true, generateTests: true }
): Promise<CodeAnalysisResult> {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      code,
      language,
      explanationLevel,
      actions
    })
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Code analysis encountered an unexpected error.');
  }

  return json.data;
}
