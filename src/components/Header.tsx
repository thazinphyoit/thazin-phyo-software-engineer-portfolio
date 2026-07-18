/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Terminal, Github, Linkedin, MessageSquare, BarChart2, UserCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
  scrollToSection: (id: string) => void;
}

export default function Header({ activeView, setActiveView, scrollToSection }: HeaderProps) {
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveView('portfolio');
    setTimeout(() => {
      scrollToSection(id);
    }, 50);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <button 
          onClick={() => { setActiveView('portfolio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 text-left hover:opacity-90"
          id="brand-logo"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-mono text-lg font-bold text-white shadow-lg shadow-blue-500/20">
            TP
          </div>
          <div>
            <span className="block font-sans text-sm font-bold tracking-tight text-white">{PERSONAL_INFO.name}</span>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-slate-400">{PERSONAL_INFO.title}</span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {activeView === 'portfolio' && navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              id={`nav-link-${item.id}`}
            >
              {item.label}
            </button>
          ))}
          {activeView !== 'portfolio' && (
            <button
              onClick={() => setActiveView('portfolio')}
              className="px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              id="nav-link-portfolio-back"
            >
              ← Back to Portfolio
            </button>
          )}
        </nav>

        {/* Dashboard and AI Recruiter Shortcuts */}
        <div className="flex items-center gap-2">
          {/* AI Recruiter Assistant */}
          <button
            onClick={() => setActiveView(activeView === 'ai-chat' ? 'portfolio' : 'ai-chat')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 ${
              activeView === 'ai-chat'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
            id="nav-btn-ai-recruiter"
            title="Talk with Thazin's AI Resume Assistant"
          >
            <UserCheck className="h-3.5 w-3.5 animate-pulse" />
            <span className="hidden sm:inline">AI Recruiter</span>
          </button>

          {/* Visitor Analytics */}
          <button
            onClick={() => setActiveView(activeView === 'analytics' ? 'portfolio' : 'analytics')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 ${
              activeView === 'analytics'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
            id="nav-btn-analytics"
            title="View Live Visitor Engagement Analytics"
          >
            <BarChart2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Analytics</span>
          </button>

          {/* Social Icons */}
          <div className="hidden lg:flex items-center gap-1 pl-2 border-l border-slate-800">
            <a
              href={PERSONAL_INFO.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-slate-400 hover:text-blue-500 transition-colors"
              id="social-header-linkedin"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={PERSONAL_INFO.contact.github}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              id="social-header-github"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

      </div>
    </header>
  );
}
