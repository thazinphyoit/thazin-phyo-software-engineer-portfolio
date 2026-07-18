/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { WORK_EXPERIENCES } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, ChevronRight, ExternalLink, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function Experience() {
  const [expandedProject, setExpandedProject] = useState<string | null>("UOB Smart Rack Lock System");

  return (
    <section id="experience" className="py-20 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Professional Experience & Projects
          </h2>
          <p className="mt-4 text-slate-400">
            A comprehensive overview of full-time professional software developer roles and major enterprise shipments.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative border-l border-slate-800 ml-4 md:ml-8 space-y-16">
          {WORK_EXPERIENCES.map((exp, expIdx) => (
            <div key={expIdx} className="relative pl-8 sm:pl-10 group" id={`experience-block-${expIdx}`}>
              
              {/* Timeline Icon */}
              <div className="absolute -left-[17px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-blue-500 group-hover:border-blue-500 group-hover:bg-blue-950 transition duration-300">
                <Briefcase className="h-4 w-4" />
              </div>

              {/* Exp Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">
                    {exp.role} <span className="text-sm font-normal text-slate-500 font-mono">({exp.type})</span>
                  </h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-mono text-slate-400 mt-1">
                    <span className="font-semibold text-slate-300">{exp.company}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1 font-mono text-xs text-slate-300 self-start md:self-center">
                  <Calendar className="h-3 w-3 text-blue-500" />
                  {exp.period}
                </div>
              </div>

              {/* Company Intro */}
              <p className="text-sm text-slate-400 mb-6 italic max-w-4xl">
                {exp.description}
              </p>

              {/* Duties Bullet Points */}
              <div className="space-y-3 mb-8 max-w-4xl">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">Duties & Core Contributions</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exp.duties.map((duty, dIdx) => (
                    <li key={dIdx} className="flex gap-2 text-xs text-slate-400 leading-relaxed">
                      <ChevronRight className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>{duty}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Projects Implemented */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">Major Shipped Projects</h4>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left list of projects */}
                  <div className="lg:col-span-4 flex flex-col gap-2">
                    {exp.projects.map((proj) => (
                      <button
                        key={proj.title}
                        onClick={() => setExpandedProject(proj.title)}
                        className={`text-left p-3.5 rounded-xl border text-sm font-sans font-semibold transition-all flex justify-between items-center ${
                          expandedProject === proj.title
                            ? 'bg-slate-900 border-blue-500/50 text-white shadow-lg'
                            : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-white hover:border-slate-800'
                        }`}
                        id={`project-btn-${proj.title.replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        <span>{proj.title}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform ${expandedProject === proj.title ? 'rotate-90 text-blue-400' : 'text-slate-600'}`} />
                      </button>
                    ))}
                  </div>

                  {/* Right expanded project content panel */}
                  <div className="lg:col-span-8 min-h-[220px]">
                    {exp.projects.map((proj) => {
                      if (expandedProject !== proj.title) return null;
                      return (
                        <div 
                          key={proj.title}
                          className="border border-slate-800 bg-slate-900/50 rounded-2xl p-6 flex flex-col justify-between h-full animate-fadeIn"
                          id={`project-detail-${proj.title.replace(/\s+/g, '-').toLowerCase()}`}
                        >
                          <div>
                            <div className="flex justify-between items-start gap-4 mb-3">
                              <h5 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
                                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                                {proj.title}
                              </h5>
                              
                              {/* External Project Links */}
                              {proj.links && (
                                <div className="flex gap-2">
                                  {proj.links.website && (
                                    <a
                                      href={proj.links.website}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1 rounded bg-slate-800 border border-slate-700 px-2 py-1 text-[10px] font-mono font-medium text-slate-300 hover:text-white"
                                      id={`project-link-web-${proj.title.replace(/\s+/g, '-').toLowerCase()}`}
                                    >
                                      Web <ArrowUpRight className="h-2.5 w-2.5" />
                                    </a>
                                  )}
                                  {proj.links.ios && (
                                    <a
                                      href={proj.links.ios}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1 rounded bg-slate-800 border border-slate-700 px-2 py-1 text-[10px] font-mono font-medium text-slate-300 hover:text-white"
                                      id={`project-link-ios-${proj.title.replace(/\s+/g, '-').toLowerCase()}`}
                                    >
                                      iOS <ArrowUpRight className="h-2.5 w-2.5" />
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>

                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                              {proj.description}
                            </p>

                            <div className="space-y-1.5 mb-6">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">Technical Highlights</span>
                              {proj.details.map((detail, idx) => (
                                <p key={idx} className="text-xs text-slate-400 pl-3 relative before:absolute before:left-0 before:top-1.5 before:h-1 before:w-1 before:rounded-full before:bg-slate-600 leading-relaxed">
                                  {detail}
                                </p>
                              ))}
                            </div>
                          </div>

                          {/* Tech badget footer */}
                          <div className="pt-4 border-t border-slate-800/80">
                            <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2">Technologies Used</span>
                            <div className="flex flex-wrap gap-1.5">
                              {proj.technologies.map((tech) => (
                                <span 
                                  key={tech} 
                                  className="inline-flex rounded bg-slate-950 border border-slate-800 px-2 py-1 text-[10px] font-mono text-slate-400"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
