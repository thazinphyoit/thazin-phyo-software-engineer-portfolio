/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Linkedin, Sparkles, CheckCircle, AlertTriangle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string | null;
  }>({ type: null, message: null });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const resData = await response.json();
      if (response.ok) {
        setStatus({ type: 'success', message: 'Your message has been delivered to Thazin Phyo! Thank you!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: resData.error || 'Failed to deliver message. Pls try again later.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Connection error. Please check if server is active.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let's Collaborate
          </h2>
          <p className="mt-4 text-slate-400">
            Hiring managers, partners, or technical teams—feel free to drop a message. You can also view the submitted entries in the Live Analytics Dashboard!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Info Side (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-400" />
                Singapore Workspace & Outreach
              </h3>
              
              <p className="text-xs text-slate-400 leading-relaxed">
                Thazin is currently based in Simei, Singapore, and is ready for full-time Software Engineer positions. Available for onsite roles, hybrid setups, or remote collaborations.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex gap-3 text-xs items-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-blue-500">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-300">Office Location</span>
                    <span className="selectable text-slate-400">{PERSONAL_INFO.contact.address}</span>
                  </div>
                </div>

                <div className="flex gap-3 text-xs items-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-indigo-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-300">Email Address</span>
                    <a href={`mailto:${PERSONAL_INFO.contact.email}`} className="selectable text-slate-400 hover:text-blue-400 transition-colors">
                      {PERSONAL_INFO.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-3 text-xs items-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-emerald-500">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-300">WhatsApp Hotlink</span>
                    <a href={`https://wa.me/${PERSONAL_INFO.contact.whatsapp.replace('+', '')}`} target="_blank" rel="noreferrer" className="selectable text-slate-400 hover:text-emerald-400 transition-colors">
                      {PERSONAL_INFO.contact.whatsapp}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick social footer link */}
            <div className="pt-6 border-t border-slate-900">
              <a
                href={PERSONAL_INFO.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white transition-all w-full justify-center"
                id="contact-linkedin-outreach"
              >
                <Linkedin className="h-4 w-4 text-blue-400" />
                Connect on Linkedin
              </a>
            </div>
          </div>

          {/* Form Side (7 Columns) */}
          <form 
            onSubmit={handleSubmit}
            className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 space-y-6 flex flex-col justify-between"
            id="contact-form"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-100">
                Direct Messaging Gateway
              </h3>

              {/* Status Banner */}
              {status.type && (
                <div 
                  className={`flex items-start gap-2 rounded-xl border p-4 text-xs leading-relaxed ${
                    status.type === 'success' 
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' 
                      : 'bg-rose-950/40 border-rose-800 text-rose-300'
                  }`}
                  id="contact-status-banner"
                >
                  {status.type === 'success' ? (
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-rose-400" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              {/* Grid Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4 py-3 text-xs text-white outline-none transition"
                    placeholder="E.g. John Doe"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4 py-3 text-xs text-white outline-none transition"
                    placeholder="E.g. john@company.com"
                  />
                </div>
              </div>

              {/* Subject Input */}
              <div className="space-y-1">
                <label htmlFor="subject" className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4 py-3 text-xs text-white outline-none transition"
                  placeholder="E.g. Opportunity details"
                />
              </div>

              {/* Message Input */}
              <div className="space-y-1">
                <label htmlFor="message" className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4 py-3 text-xs text-white outline-none transition resize-none"
                  placeholder="Type your message details here..."
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 disabled:bg-blue-800 disabled:opacity-50 transition-all duration-200"
              id="contact-btn-submit"
            >
              {loading ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Transmit Message</span>
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
