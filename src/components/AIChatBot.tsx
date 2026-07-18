/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, MessageSquare, CornerDownLeft, RefreshCw, AlertTriangle } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export default function AIChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: "Hi! I am Thazin Phyo's AI Career Representative. I have been fully trained on Thazin's resume, her projects (like the UOB Smart Lock & Robot Dashboard), her certifications, and notice period. What would you like to know about hiring her?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Tell me about the Robot Dashboard project",
    "What is her experience with React and Node.js?",
    "Where is she based and what is her notice period?",
    "What certifications does she hold?"
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    setError(null);
    const userMsg: ChatMessage = { sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: textToSend })
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [...prev, { sender: 'bot', text: data.answer }]);
      } else {
        setError(data.error || "Failed to retrieve AI response. Please try again.");
      }
    } catch (err) {
      setError("Connection failure. Ensure the server is actively running.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage(input);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        sender: 'bot',
        text: "Hi! I am Thazin Phyo's AI Career Representative. I have been fully trained on Thazin's resume, her projects (like the UOB Smart Lock & Robot Dashboard), her certifications, and notice period. What would you like to know about hiring her?"
      }
    ]);
    setError(null);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 flex flex-col h-[600px] overflow-hidden shadow-2xl">
      
      {/* Header bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/10">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              AI Recruiter Assistant
              <span className="inline-flex rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-mono text-emerald-400 font-semibold tracking-wider uppercase animate-pulse">
                Gemini Active
              </span>
            </h3>
            <p className="text-[10px] font-mono text-slate-400">Trained on Thazin's professional CV & projects</p>
          </div>
        </div>

        <button 
          onClick={handleReset}
          className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition text-[10px] font-mono flex items-center gap-1"
          id="chat-btn-reset"
          title="Reset Conversation"
        >
          <RefreshCw className="h-3 w-3" />
          Reset
        </button>
      </div>

      {/* Chat logs */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-950/40">
        {messages.map((msg, idx) => (
          <div 
            key={idx}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'bot' && (
              <div className="h-7 w-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="h-3.5 w-3.5 text-blue-500" />
              </div>
            )}
            
            <div 
              className={`rounded-2xl px-4 py-3 text-xs leading-relaxed max-w-[85%] whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none font-medium'
                  : 'bg-slate-900 text-slate-300 border border-slate-800/80 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="h-7 w-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
              <Bot className="h-3.5 w-3.5 text-blue-500 animate-spin" />
            </div>
            <div className="rounded-2xl rounded-tl-none px-4 py-3 bg-slate-900 border border-slate-800/80 text-xs text-slate-400 flex items-center gap-1.5">
              <span>Thinking... formulating reply</span>
              <span className="flex gap-0.5 mt-1.5">
                <span className="h-1 w-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-1 w-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-1 w-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-rose-950/30 border border-rose-800/80 text-rose-300 px-4 py-3 text-xs">
            <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggested prompting tags (horizontal list) */}
      {messages.length === 1 && (
        <div className="px-6 py-2 border-t border-slate-900 bg-slate-950">
          <p className="text-[10px] font-mono text-slate-500 mb-1.5">Suggested Questions:</p>
          <div className="flex flex-wrap gap-1.5">
            {suggestedPrompts.map((prompt, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleSendMessage(prompt)}
                className="rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 px-2.5 py-1.5 text-[10px] font-mono text-left transition"
                id={`chat-prompt-chip-${pIdx}`}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input container */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={loading}
          placeholder="Ask me something about Thazin's software experience..."
          className="flex-1 rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-xs text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          id="chat-input-field"
        />
        
        <button
          onClick={() => handleSendMessage(input)}
          disabled={loading || !input.trim()}
          className="h-10 w-10 shrink-0 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:opacity-50 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 transition"
          id="chat-btn-submit"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>

    </div>
  );
}
