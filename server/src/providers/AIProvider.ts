// AI Provider Abstract Interface

import { AnalysisRequest, CodeAnalysisResult } from '../types/analysis';

export interface AIProvider {
  name: string;
  isConfigured(): boolean;
  analyzeCode(request: AnalysisRequest): Promise<CodeAnalysisResult>;
}
