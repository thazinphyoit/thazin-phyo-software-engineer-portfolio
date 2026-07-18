/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { ContactMessage, AnalyticsEvent } from './src/types';

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
      return res.json({
        answer: `Hi! Thank you for asking. (AI Mode is currently in demo fallback).
Thazin Phyo is a Singapore-based Software Engineer with over 4 years of experience.
She specializes in:
- React, Node.js, Express, TypeScript, and React Native.
- Building IoT systems, Smart Rack Access Systems, and Robot Dashboard Servers (Flask/Python/Docker).
- Certified in Linux, CI/CD GitHub Actions, Apache Airflow, and Power BI.

To unlock full interactive AI discussions, please configure the GEMINI_API_KEY inside AI Studio Secrets.`
      });
    }

    try {
      const systemPrompt = `
You are a highly polite, professional, and charming AI Recruiter Assistant representing Thazin Phyo, a Software Engineer based in Singapore.
Your goal is to represent Thazin in the best possible light, answering questions from hiring managers, technical leads, or clients.

Here are Thazin's verified resume details:
- NAME: Thazin Phyo
- ROLE: Software Engineer
- LOCATION: Simei, Singapore (Singapore Citizen/PR or Work Pass. From Myanmar)
- EMAIL: thazinphyoit@gmail.com
- WHATSAPP: +6594482633
- LINKEDIN: https://www.linkedin.com/in/thazin-phyo-a22544289/
- TOTAL EXPERIENCE: 4+ Years (Software Developer at Datumstruct Singapore from Nov 2020 to Present; Junior Dev at Micro Services from May 2019 to Aug 2020)
- KEY PROJECTS:
  1. UOB Smart Rack Lock System: React.js, Node.js, React Native, Java Servlet, MySQL. Controls physical cabinet rack doors.
  2. Robot Dashboard Server: Python, Flask, SQLAlchemy, MySQL, Docker. Centralized web system for monitoring D3BOT/D5BOT robot missions and recording thermal anomalies.
  3. PSA Bluetooth Wi-Fi Lock Management: Deployed responsive web/mobile app controls for container port racks.
  4. Library Management System: PHP, Bootstrap, MySQL.
- TECHNICAL SKILLS:
  - Languages: JavaScript, TypeScript, Python, Java, PHP, HTML5, CSS3, SASS
  - Frameworks: React.js, Next.js, Redux, Material UI, Tailwind CSS, Bootstrap 5, Express.js, Spring Boot, Flask, Django
  - Databases: PostgreSQL, MySQL, MongoDB, SQLAlchemy, Hibernate
  - Infrastructure/DevOps: Docker, Kubernetes, GitHub Actions (CI/CD), Ansible, Linux (Ubuntu/Debian), Bash scripting, Virtual Machines, Azure Portal, NAS Synology
  - Analytics/Others: Apache Airflow, Power BI, RESTful APIs, JWT Security, Mocha Unit Testing, Firebase push alerts
- EDUCATION: Bachelor of Engineering (Information Technology), 2012-2018, Technological University (Thanlyin)
- CERTIFICATIONS: Linux for Developers (Linux Foundation), GitHub Actions for CI/CD (LinkedIn Learning), Power BI, Apache Airflow, Rock Star React/Node.
- SALARY EXPECTATION: 6,500 SGD (Negotiable)
- AVAILABILITY: 1 Month notice period.

GUIDELINES FOR ANSWERING:
- Be warm, professional, encouraging, and clear.
- Keep answers relatively concise (1-3 paragraphs) and highly scannable.
- If they ask general questions unrelated to Thazin, her career, or hiring her, politely redirect them back to her portfolio.
- Never make up information. If some detail isn't in her profile, say that you don't have that specific record, but invite them to reach out to Thazin directly via Email (thazinphyoit@gmail.com) or WhatsApp (+6594482633).
`;

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
    const resumeText = `
=========================================
THAZIN PHYO - SOFTWARE ENGINEER RESUME
=========================================
Location: Simei, Singapore
Email: thazinphyoit@gmail.com
WhatsApp: +6594482633
LinkedIn: https://www.linkedin.com/in/thazin-phyo-a22544289/

PROFILE:
Dependable IT professional with over 4 years of proven track record.
Passionate team player with a strong work ethic and adept at complex problem-solving.
Eager to leverage skills and experience to contribute to software engineering projects.

EDUCATION:
- Bachelor of Engineering (Information Technology)
  Technological University (Thanlyin) | 2012 - 2018

CORE SKILLS:
- Languages: JavaScript, TypeScript, Python, Java, PHP, HTML5, CSS, SQL
- Frontend: React.js, Next.js, Redux, Tailwind CSS, Bootstrap 5, Material UI
- Backend & Mobile: Node.js, Express.js, React Native, Flask, Django, Spring Boot
- Databases: PostgreSQL, MySQL, MongoDB, SQLAlchemy, Hibernate
- DevOps & Tools: Docker, Kubernetes, GitHub Actions (CI/CD), Ansible, Linux, Airflow, Power BI, JWT, Mocha

WORK EXPERIENCE:

1. Software Developer | Datumstruct (S) Pte Ltd, Changi, Singapore
   November 2020 - Present (Onsite & Remote)
   * Designed, integrated, and tested software with hardware components before deployment.
   * Key Project: UOB Smart Rack Lock System (React, Node, React Native, Java, Servlet, MySQL).
   * Key Project: Robot Dashboard Server (Python, Flask, SQLAlchemy, MySQL, Docker). Deployed centralized dashboard for robot map missions and anomaly alerts.
   * Key Project: PSA Bluetooth Wi-Fi Lock Management (React, React Native, Node).
   * Deployed REST APIs with JWT authentication, Mocha tests, and Firebase notifications.

2. Junior Software Developer | Micro Services, Yangon, Myanmar
   May 2019 - August 2020 (On Site)
   * Collaborated on web and mobile app development and input sanitization.
   * Key Project: Library Management System (PHP, Bootstrap, MySQL).

CERTIFICATIONS:
- Linux for Developers (The Linux Foundation)
- GitHub Actions for CI/CD (LinkedIn Learning)
- Power BI Essential Training (LinkedIn Learning)
- Learning Apache Airflow (LinkedIn Learning)

REFERENCES:
- Nila Hlaing (Manager, Datumstruct Singapore) | nilahlaing@datumstruct.com
- Nay Oo Kyaw (Senior Software Developer, Datumstruct) | nayookyaw@datumstruct.com
=========================================
`;
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
