/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Gallery from './components/Gallery';
import Blog from './components/Blog';
import Contact from './components/Contact';
import AIChatBot from './components/AIChatBot';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { PERSONAL_INFO } from './data/portfolioData';
import { Terminal, Github, Linkedin, Mail, Cpu, BarChart2 } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<string>('portfolio');

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Sniff and Track visitor analytics on mount/page views
  useEffect(() => {
    const getDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) return 'Mobile';
      if (width < 1024) return 'Tablet';
      return 'Desktop';
    };

    const getBrowserType = () => {
      const ua = navigator.userAgent;
      if (ua.includes('Chrome') && !ua.includes('Chromium')) return 'Chrome';
      if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
      if (ua.includes('Firefox')) return 'Firefox';
      if (ua.includes('Edg')) return 'Edge';
      return 'Other';
    };

    const trackVisit = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: activeView === 'portfolio' ? '/' : `/${activeView}`,
            device: getDeviceType(),
            browser: getBrowserType(),
          })
        });
      } catch (err) {
        console.warn("Analytics tracking offline.");
      }
    };

    trackVisit();
  }, [activeView]);

  // Handle SEO Meta adjustments dynamically
  useEffect(() => {
    if (activeView === 'portfolio') {
      document.title = `${PERSONAL_INFO.name} | Professional Software Engineer Portfolio`;
    } else if (activeView === 'analytics') {
      document.title = `Engagement Analytics | ${PERSONAL_INFO.name} Portfolio`;
    } else if (activeView === 'ai-chat') {
      document.title = `AI Recruiter Assistant | ${PERSONAL_INFO.name} Portfolio`;
    }
  }, [activeView]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between" id="app-wrapper">
      
      {/* Shared Nav Header */}
      <Header 
        activeView={activeView} 
        setActiveView={setActiveView} 
        scrollToSection={scrollToSection} 
      />

      {/* Main Container */}
      <main className="flex-1">
        
        {/* Conditional Views Router */}
        {activeView === 'portfolio' && (
          <div className="animate-fadeIn" id="portfolio-view">
            <Hero onStartChat={() => setActiveView('ai-chat')} />
            <Skills />
            <Experience />
            <Gallery />
            <Blog />
            <Contact />
          </div>
        )}

        {activeView === 'analytics' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn" id="analytics-view">
            <div className="border border-slate-800 bg-slate-900/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <AnalyticsDashboard />
            </div>
          </div>
        )}

        {activeView === 'ai-chat' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn" id="ai-chat-view">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Information / Instruction side panel (4 columns) */}
              <div className="lg:col-span-4 border border-slate-800 bg-slate-900/30 rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
                  <Cpu className="h-5 w-5 text-emerald-400" />
                  Recruiter Briefcase
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  This intelligent assistant uses server-side **Gemini 3.5 Flash** processing to answer screening questions instantly on Thazin's behalf.
                </p>
                
                <div className="space-y-3.5 pt-4 text-xs font-mono text-slate-300">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="block text-[10px] text-slate-500 font-semibold mb-1">Key Screening Parameters</span>
                    <ul className="space-y-1">
                      <li>• Citizenship / Location: SG pass</li>
                      <li>• Experience level: 4+ Years</li>
                      <li>• Notice Window: 1 Month</li>
                      <li>• Targeted Roles: Software Engineer, Full-Stack Developer</li>
                    </ul>
                  </div>

                  <p className="text-[10px] text-slate-500 italic leading-relaxed">
                    Disclaimer: If the response doesn't cover specific corporate requirements, you are highly encouraged to contact Thazin directly at her listed parameters.
                  </p>
                </div>
              </div>

              {/* Chat frame panel (8 columns) */}
              <div className="lg:col-span-8">
                <AIChatBot />
              </div>

            </div>
          </div>
        )}

      </main>

      {/* Shared Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/40 py-12" id="footer-panel">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Meta and Copy */}
            <div className="text-center sm:text-left space-y-1">
              <span className="block text-sm font-sans font-bold text-white tracking-tight">{PERSONAL_INFO.name}</span>
              <span className="block text-xs font-mono text-slate-500">
                © 2026. Handcrafted with React, Tailwind, and custom Full-Stack Express.
              </span>
            </div>

            {/* Admin and analytics indicators */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveView('analytics')}
                className="text-xs font-mono font-medium text-slate-500 hover:text-blue-400 transition-colors flex items-center gap-1"
                id="footer-analytics-link"
              >
                <BarChart2 className="h-3.5 w-3.5" />
                Security & Engagement Logs
              </button>
              
              <span className="text-slate-700">•</span>
              
              {/* Quick social cluster */}
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 text-slate-500 hover:text-blue-500 transition-colors"
                  id="footer-linkedin"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={PERSONAL_INFO.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 text-slate-500 hover:text-white transition-colors"
                  id="footer-github"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}
