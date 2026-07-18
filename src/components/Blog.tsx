/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/portfolioData';
import { BlogPost } from '../types';
import { Calendar, User, Clock, ArrowRight, X, ChevronRight, BookOpen } from 'lucide-react';

export default function Blog() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-20 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Technical Blog & Insights
          </h2>
          <p className="mt-4 text-slate-400">
            Professional write-ups sharing architectural approaches, security designs, and DevOps deployment automation.
          </p>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article 
              key={post.id}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:border-slate-700 transition duration-300 shadow-xl group"
              id={`blog-card-${post.id}`}
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-100 group-hover:text-blue-400 transition mb-3">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              {/* Card Footer action button */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="inline-flex rounded-md bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[9px] font-mono font-medium text-blue-400 uppercase tracking-wider">
                  {post.category}
                </span>

                <button
                  onClick={() => setActivePost(post)}
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-all"
                  id={`blog-btn-read-${post.id}`}
                >
                  Read Post
                  <ArrowRight className="h-3.5 w-3.5 text-blue-400" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Blog Post Immersive Reader Overlay */}
        {activePost && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div 
              className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl animate-scaleUp max-h-[85vh] overflow-y-auto"
              id="blog-reader-modal"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 p-1.5 text-slate-400 hover:text-white border border-slate-700/50"
                id="blog-reader-close"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Category tag */}
              <span className="inline-flex rounded bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-[10px] font-mono font-semibold text-blue-400 uppercase tracking-widest mb-4">
                {activePost.category}
              </span>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
                {activePost.title}
              </h2>

              {/* Writer Header */}
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 border-b border-slate-800 pb-4 mb-6">
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-blue-500" />
                  By {activePost.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-blue-500" />
                  {activePost.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-blue-500" />
                  {activePost.readTime}
                </span>
              </div>

              {/* Post Content */}
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4 font-sans whitespace-pre-line">
                {activePost.content}
              </div>

              {/* Suggested Actions inside modal */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end gap-3">
                <button
                  onClick={() => setActivePost(null)}
                  className="rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2.5 text-xs font-mono font-semibold text-slate-300"
                  id="blog-reader-footer-close"
                >
                  Close Reader
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
