/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Eye, X } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

// Cosmetic deterrents only — view-source, curl, and DevTools always bypass these.
// Real protection is what actually matters: no secrets ship client-side (see api/index.ts),
// and the production build ships minified with no source maps.
export default function SourceGuard() {
  const [devToolsOpen, setDevToolsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    const threshold = 200;
    const checkDevTools = () => {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      setDevToolsOpen(widthDiff > threshold || heightDiff > threshold);
    };
    checkDevTools();
    const interval = setInterval(checkDevTools, 1500);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      clearInterval(interval);
    };
  }, []);

  if (!devToolsOpen || dismissed) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-[100] flex max-w-xs items-start gap-2 rounded-xl border border-amber-800 bg-amber-950/90 px-4 py-3 text-xs text-amber-200 shadow-2xl backdrop-blur"
      id="devtools-notice"
    >
      <Eye className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
      <div className="flex-1 leading-relaxed">
        This site's source isn't meant for reuse. Curious about the code, or want to collaborate?{' '}
        <a href={`mailto:${PERSONAL_INFO.contact.email}`} className="selectable underline hover:text-amber-100">
          Reach out directly
        </a>.
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="shrink-0 text-amber-400 hover:text-amber-100"
        aria-label="Dismiss"
        id="devtools-notice-dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
