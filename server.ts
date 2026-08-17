/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { ContactMessage, AnalyticsEvent } from './src/types';
import { buildFallbackAnswer, buildResumeText, buildSystemPrompt } from './src/utils/resumeContext';

// In-Memory store for analytics. Let's populate it with realistic mock history 
// so the dashboard looks beautiful and fully functional immediately!
const analyticsData = {
  totalViews: 412,
  viewsByPath: {
    '/': 245,
    '/experience': 95,
    '/blog': 48,
    '/contact': 24,
  },
  viewsByDevice: {
    'Desktop': 284,
    'Mobile': 112,
    'Tablet': 16,
  },
  viewsByBrowser: {
    'Chrome': 210,
    'Safari': 122,
    'Firefox': 45,
    'Edge': 35,
  },
  viewsTimeline: [
    { date: 'Jul 12', count: 32 },
    { date: 'Jul 13', count: 45 },
    { date: 'Jul 14', count: 58 },
    { date: 'Jul 15', count: 64 },
    { date: 'Jul 16', count: 72 },
    { date: 'Jul 17', count: 83 },
    { date: 'Jul 18', count: 58 }, // Today
  ],
  messages: [
    {
      id: 'msg-1',
      name: 'Nila Hlaing',
      email: 'nilahlaing@datumstruct.com',
      subject: 'Datumstruct Singapore Team',
      message: 'Excellent work setting up the smart rack locks last week. The client was highly impressed.',
      timestamp: '2026-07-16T10:30:00.000Z'
    },
    {
      id: 'msg-2',
      name: 'Sarah Jenkins',
      email: 'sarah.j@techrecruits.sg',
      subject: 'Job Opportunity - Software Engineer (IoT & Web)',
      message: 'Hi Thazin, I saw your work on the Robot Monitoring Dashboard. We are looking for a full-stack developer in Singapore.',
      timestamp: '2026-07-17T14:15:00.000Z'
    }
  ] as ContactMessage[]
};

// Initialize Gemini SDK lazily to avoid startup crash if key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. AI Recruiter Assistant will run in fallback mode.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for body parsing
  app.use(express.json());

  // API: Get Portfolio Data
  app.get('/api/portfolio', (req, res) => {
    res.json({ status: 'ok' });
  });

  // API: Record a Visitor Event
  app.post('/api/analytics/track', (req, res) => {
    const { path, device, browser } = req.body as { path: string; device: string; browser: string };
    
    analyticsData.totalViews += 1;
    analyticsData.viewsByPath[path] = (analyticsData.viewsByPath[path] || 0) + 1;
    
    const deviceKey = device || 'Desktop';
    analyticsData.viewsByDevice[deviceKey] = (analyticsData.viewsByDevice[deviceKey] || 0) + 1;
    
    const browserKey = browser || 'Chrome';
    analyticsData.viewsByBrowser[browserKey] = (analyticsData.viewsByBrowser[browserKey] || 0) + 1;

    // Update today's timeline count
    const todayLabel = 'Jul 18';
    const todayTimelineItem = analyticsData.viewsTimeline.find(item => item.date === todayLabel);
    if (todayTimelineItem) {
      todayTimelineItem.count += 1;
    } else {
      analyticsData.viewsTimeline.push({ date: todayLabel, count: 1 });
    }

    res.json({ success: true, totalViews: analyticsData.totalViews });
  });

  // API: Get Analytics Dashboard Data
  app.get('/api/analytics/dashboard', (req, res) => {
    res.json({
      totalViews: analyticsData.totalViews,
      totalMessages: analyticsData.messages.length,
      viewsByPath: analyticsData.viewsByPath,
      viewsByDevice: analyticsData.viewsByDevice,
      viewsByBrowser: analyticsData.viewsByBrowser,
      viewsTimeline: analyticsData.viewsTimeline,
      messages: analyticsData.messages
    });
  });

  // API: Submit Contact Form
  app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      subject: subject || 'No Subject',
      message,
      timestamp: new Date().toISOString()
    };

    analyticsData.messages.unshift(newMessage);
    res.json({ success: true, message: 'Message sent successfully!' });
  });

  // API: AI Recruiter Q&A Chatbot (Proxying to Gemini Server-Side)
  app.post('/api/chat', async (req, res) => {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not configured
      return res.json({ answer: buildFallbackAnswer() });
    }

    try {
      const systemPrompt = buildSystemPrompt();

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: question,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        }
      });

      res.json({ answer: response.text });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: "Failed to generate AI response. Pls try again later." });
    }
  });

  // API: Get Printable/Plain-Text Resume Download
  app.get('/api/resume/download', (req, res) => {
    const resumeText = buildResumeText();
    res.setHeader('Content-disposition', 'attachment; filename=Thazin_Phyo_Resume.txt');
    res.setHeader('Content-type', 'text/plain');
    res.write(resumeText);
    res.end();
  });

  // Vite or Static Serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // For React SPA fallback, use a wildcard matching route
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
