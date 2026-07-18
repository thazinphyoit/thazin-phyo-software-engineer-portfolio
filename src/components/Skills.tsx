/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { getYearsOfExperience } from '../utils/experience';
import { CheckCircle2, Shield, Cpu, Code2, Database, GitBranch } from 'lucide-react';

export default function Skills() {
  // Map some nice tech-category icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages & Core':
        return <Code2 className="h-5 w-5 text-blue-500" />;
      case 'Frontend Frameworks':
        return <Cpu className="h-5 w-5 text-indigo-500" />;
      case 'Backend & Mobile':
        return <Shield className="h-5 w-5 text-emerald-500" />;
      case 'Databases & ORM':
        return <Database className="h-5 w-5 text-cyan-500" />;
      case 'DevOps & Cloud':
        return <GitBranch className="h-5 w-5 text-purple-500" />;
      default:
        return <CheckCircle2 className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-slate-900 border-t border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Technical Expertise & Stack
          </h2>
          <p className="mt-4 text-slate-400">
            Over {getYearsOfExperience()} years of professional engineering experience across full-stack applications, embedded device controllers, IoT smart integrations, and pipeline automation.
          </p>
        </div>

        {/* Bento Grid layout of categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, index) => (
            <div 
              key={index}
              className="relative rounded-2xl border border-slate-800 bg-slate-950 p-6 hover:border-slate-700 transition duration-300 shadow-xl group"
              id={`skill-card-${index}`}
            >
              {/* Highlight background lines */}
              <div className="absolute top-0 right-0 h-12 w-12 rounded-bl-2xl bg-slate-900 flex items-center justify-center border-l border-b border-slate-800 group-hover:bg-slate-800 group-hover:border-slate-700 transition duration-300">
                {getCategoryIcon(category.category)}
              </div>

              <h3 className="font-sans text-base font-bold text-slate-200 mb-4 pr-8">
                {category.category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center rounded-lg bg-slate-900 px-3 py-1.5 font-mono text-[11px] font-medium text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
