/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GALLERY_IMAGES } from '../data/portfolioData';
import { Image, Camera, ZoomIn } from 'lucide-react';

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-slate-900 border-t border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Gallery & Onsite Deployments
          </h2>
          <p className="mt-4 text-slate-400">
            Showcasing real-world physical installations, tech exhibitions, and industrial IoT solutions across Singapore facilities.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_IMAGES.map((img, index) => (
            <div 
              key={index} 
              className="relative group rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl transition duration-300 hover:border-slate-700"
              id={`gallery-item-${index}`}
            >
              
              {/* Image box */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-500"
                  referrerPolicy="no-referrer"
                  id={`gallery-img-${index}`}
                />
                
                {/* Floating category marker */}
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-lg px-2.5 py-1 text-[10px] font-mono text-slate-300 uppercase tracking-widest flex items-center gap-1">
                  <Camera className="h-3 w-3 text-blue-500" />
                  Deployment View
                </div>

                {/* Overlaid Zoom feedback icon */}
                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-slate-900/90 border border-slate-700 flex items-center justify-center text-white shadow-lg">
                    <ZoomIn className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Detail section */}
              <div className="p-5">
                <h3 className="text-sm font-bold text-slate-100 group-hover:text-blue-400 transition mb-2">
                  {img.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {img.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
