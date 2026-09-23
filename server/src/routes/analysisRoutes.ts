// CodeLens AI - API Routes

import { Router, Request, Response } from 'express';
import { analyzerService } from '../services/analyzerService';
import { AnalysisRequest } from '../types/analysis';

const router = Router();

// GET /api/status - Check AI configuration & engine health
router.get('/status', (_req: Request, res: Response) => {
  try {
    const status = analyzerService.getProviderStatus();
    return res.json({ success: true, ...status });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/samples - Get pre-seeded code samples
router.get('/samples', (_req: Request, res: Response) => {
  try {
    const samples = analyzerService.getSamples();
    return res.json({ success: true, samples });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/analyze - Main code analysis endpoint
router.post('/analyze', async (req: Request, res: Response) => {
  try {
    const { code, language, actions, explanationLevel } = req.body as AnalysisRequest;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Add some code before starting the analysis.'
      });
    }

    const validLanguages = [
      'javascript',
      'typescript',
      'python',
      'java',
      'c',
      'cpp',
      'html',
      'css'
    ];

    const lang = (language || 'javascript').toLowerCase();
    if (!validLanguages.includes(lang)) {
      return res.status(400).json({
        success: false,
        error: `Unsupported language "${language}". Supported: ${validLanguages.join(', ')}`
      });
    }

    const result = await analyzerService.analyze({
      code,
      language: lang as any,
      actions: actions || { review: true, explain: true, improve: true, generateTests: true },
      explanationLevel: explanationLevel || 'Intermediate'
    });

    return res.json({
      success: true,
      data: result
    });
  } catch (err: any) {
    console.error('[CodeLens Route Error]', err.message);
    const isConfigError = err.message.includes('not configured') || err.message.includes('GEMINI_API_KEY');
    return res.status(isConfigError ? 503 : 500).json({
      success: false,
      error: err.message || 'Code analysis is temporarily unavailable. Please try again later.',
      isConfigured: !isConfigError
    });
  }
});

export default router;
