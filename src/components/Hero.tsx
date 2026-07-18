/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Download, Mail, Phone, MapPin, Linkedin, Sparkles, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onStartChat: () => void;
}

export default function Hero({ onStartChat }: HeroProps) {
  return (
    <section id="about" className="relative py-20 lg:py-28 overflow-hidden bg-slate-950">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Text (7 columns) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3.5 py-1.5 text-xs font-mono font-medium tracking-wide text-blue-400">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              Available Immediately for Singapore
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">{PERSONAL_INFO.name}</span>
            </h1>
            
            <h2 className="text-xl sm:text-2xl font-mono font-medium text-slate-300">
              {PERSONAL_INFO.title}
            </h2>
            
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {PERSONAL_INFO.profile}
            </p>

            {/* Quick Contact Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-mono text-slate-300 pt-2">
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2">
                <MapPin className="h-3.5 w-3.5 text-blue-500" />
                <span>Simei, Singapore</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2">
                <Mail className="h-3.5 w-3.5 text-indigo-500" />
                <a href={`mailto:${PERSONAL_INFO.contact.email}`} className="selectable hover:text-blue-400 transition-colors">
                  {PERSONAL_INFO.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2">
                <Phone className="h-3.5 w-3.5 text-emerald-500" />
                <a href={`https://wa.me/${PERSONAL_INFO.contact.whatsapp.replace('+', '')}`} target="_blank" rel="noreferrer" className="selectable hover:text-emerald-400 transition-colors">
                  {PERSONAL_INFO.contact.whatsapp}
                </a>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="/api/resume/download"
                download
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all duration-200"
                id="hero-btn-download-resume"
              >
                <Download className="h-4 w-4" />
                Download Resume (TXT)
              </a>
              <button
                onClick={onStartChat}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition-all duration-200"
                id="hero-btn-chat-ai"
              >
                <MessageSquare className="h-4 w-4 text-emerald-500" />
                Ask My AI Assistant
              </button>
            </div>
          </div>

          {/* Visual Profile/Avatar Container (5 columns) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-[280px] sm:max-w-[320px]">
              {/* Card glowing borders */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 opacity-25 blur-lg transition duration-1000 group-hover:opacity-40" />
              
              <div className="relative rounded-2xl border border-slate-800 bg-slate-900 p-3 shadow-2xl">
                <img
                  src={PERSONAL_INFO.avatarUrl}
                  alt={PERSONAL_INFO.name}
                  className="rounded-xl w-full aspect-square object-cover grayscale-[20%] group-hover:grayscale-0 transition duration-500"
                  style={{ objectPosition: 'center 17%' }}
                  referrerPolicy="no-referrer"
                  id="hero-profile-image"
                />
                
                {/* Embedded Quick Details Info */}
                <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span className="font-mono text-slate-500">Education</span>
                    <span className="font-medium text-slate-200 text-right max-w-[180px] truncate" title={PERSONAL_INFO.education.degree}>
                      B.Eng (IT)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-slate-500">Nationality</span>
                    <span className="font-medium text-slate-200">{PERSONAL_INFO.personalDetails.nationality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-slate-500">Expected Salary</span>
                    <span className="font-medium text-slate-200">{PERSONAL_INFO.personalDetails.expectedSalary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-slate-500">Notice Period</span>
                    <span className="font-medium text-emerald-400 font-semibold">{PERSONAL_INFO.personalDetails.availability}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
