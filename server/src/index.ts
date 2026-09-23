// CodeLens AI - Backend Server Entrypoint

import dns from 'dns';
// Prefer IPv4 first to avoid slow or failing IPv6 handshakes on Windows
try {
  dns.setDefaultResultOrder('ipv4first');
} catch {
  // Ignore on platforms without setDefaultResultOrder
}

import path from 'path';
import dotenv from 'dotenv';

// Load environment variables immediately before routes and services are imported
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config(); // fallback to current working directory

import express from 'express';
import cors from 'cors';
import analysisRoutes from './routes/analysisRoutes';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: "https://codelens-ai-1-2021.onrender.com", // Allow frontend dev server.
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'CodeLens AI API',
    time: new Date().toISOString()
  });
});

// API Routes
app.use('/api', analysisRoutes);

app.listen(PORT, () => {
  console.log(`🚀 CodeLens AI Server running on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🤖 AI Status: http://localhost:${PORT}/api/status`);
});
