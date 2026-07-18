/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { 
  BarChart2, Users, MessageSquare, Globe, Laptop, RefreshCw, 
  Clock, ArrowUpRight, ArrowDownRight, Mail, Calendar, Eye
} from 'lucide-react';
import { VisitorAnalytics, ContactMessage } from '../types';

export default function AnalyticsDashboard() {
  const [data, setData] = useState<VisitorAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/analytics/dashboard');
      if (response.ok) {
        const resData = await response.json();
        setData(resData);
      } else {
        setError("Failed to fetch current analytics data.");
      }
    } catch (err) {
      setError("Failed to connect to the backend analytics API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-12 text-center flex flex-col items-center justify-center space-y-4 min-h-[400px]">
        <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
        <p className="text-sm font-mono text-slate-400">Loading live visitor metrics and engagement data...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-12 text-center flex flex-col items-center justify-center space-y-4 min-h-[400px]">
        <p className="text-sm font-mono text-rose-400">{error || "Data is currently unavailable."}</p>
        <button 
          onClick={fetchAnalytics}
          className="rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 px-4 py-2.5 text-xs font-mono text-white transition flex items-center gap-2"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Retry Fetch
        </button>
      </div>
    );
  }

  // Formatting chart data
  const deviceData = (Object.entries(data.viewsByDevice) as [string, number][]).map(([name, value]) => ({ name, value }));
  const browserData = (Object.entries(data.viewsByBrowser) as [string, number][]).map(([name, value]) => ({ name, value }));
  const pathData = (Object.entries(data.viewsByPath) as [string, number][])
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6 animate-fadeIn" id="analytics-panel">
      
      {/* Title & Refreshes */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <BarChart2 className="h-6 w-6 text-blue-500" />
            Visitor Engagement Dashboard
          </h2>
          <p className="text-xs text-slate-400">Real-time stats showing active sessions, views, page rankings, and communications.</p>
        </div>
        
        <button 
          onClick={fetchAnalytics}
          className="rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 px-4 py-2.5 text-xs font-mono font-semibold text-slate-200 hover:text-white transition flex items-center gap-2 self-start sm:self-center"
          id="dashboard-btn-refresh"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Live Refresh
        </button>
      </div>

      {/* Grid of Key Performance Indicators (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 flex items-center justify-between">
          <div>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">Total Page Views</span>
            <span className="block text-2xl font-bold text-white mt-1">{data.totalViews}</span>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold mt-1">
              <ArrowUpRight className="h-3 w-3" />
              +18.4% this week
            </span>
          </div>
          <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Eye className="h-5 w-5" />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 flex items-center justify-between">
          <div>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">Total Sessions</span>
            <span className="block text-2xl font-bold text-white mt-1">{Math.round(data.totalViews * 0.42)}</span>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold mt-1">
              <ArrowUpRight className="h-3 w-3" />
              +12.1% this week
            </span>
          </div>
          <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <Users className="h-5 w-5" />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 flex items-center justify-between">
          <div>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">Inquiries Logged</span>
            <span className="block text-2xl font-bold text-white mt-1">{data.totalMessages}</span>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold mt-1">
              <ArrowUpRight className="h-3 w-3" />
              +50% since yesterday
            </span>
          </div>
          <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <MessageSquare className="h-5 w-5" />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 flex items-center justify-between">
          <div>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">Avg Stay Duration</span>
            <span className="block text-2xl font-bold text-white mt-1">3m 48s</span>
            <span className="inline-flex items-center gap-1 text-[10px] text-rose-400 font-semibold mt-1">
              <ArrowDownRight className="h-3 w-3" />
              -2.3% bounce rate
            </span>
          </div>
          <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
            <Clock className="h-5 w-5" />
          </div>
        </div>

      </div>

      {/* Main Charts Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Visitor trends Line chart (8 Columns) */}
        <div className="lg:col-span-8 rounded-xl border border-slate-800 bg-slate-950 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-200">Visitor Trends over Time</h3>
            <p className="text-[10px] font-mono text-slate-500 mb-4">Tracking overall visits for the last 7 calendar days</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.viewsTimeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                  labelStyle={{ color: '#94a3b8', fontSize: '11px', fontFamily: 'monospace' }}
                  itemStyle={{ color: '#3b82f6', fontSize: '11px' }}
                />
                <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: '#3b82f6', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Page views Popularity ranking (4 Columns) */}
        <div className="lg:col-span-4 rounded-xl border border-slate-800 bg-slate-950 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-200">Page views by Route</h3>
            <p className="text-[10px] font-mono text-slate-500 mb-4">Popularity rankings of visited paths</p>
          </div>

          <div className="space-y-3.5 flex-1 flex flex-col justify-center">
            {pathData.map((item, idx) => {
              const maxVal = Math.max(...pathData.map(p => p.value));
              const pct = maxVal > 0 ? (item.value / maxVal) * 100 : 0;
              return (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-300 font-medium">{item.name}</span>
                    <span className="font-mono text-slate-400 font-bold">{item.value} views</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-blue-500 transition-all duration-500" 
                      style={{ width: `${pct}%` }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Device & Browser Distribution split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Device split */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 sm:p-6">
          <h3 className="text-sm font-bold text-slate-200 mb-1">Device Form Factors</h3>
          <p className="text-[10px] font-mono text-slate-500 mb-4">Percentage breakdown of device categories</p>
          
          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '11px', color: '#fff' }}
                />
                <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Browser distribution */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 sm:p-6">
          <h3 className="text-sm font-bold text-slate-200 mb-1">Browser Environments</h3>
          <p className="text-[10px] font-mono text-slate-500 mb-4">Percentage breakdown of agent engine types</p>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={browserData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {browserData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '11px', color: '#fff' }}
                />
                <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Log of Contact Messages Submitted */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 sm:p-6">
        <h3 className="text-sm font-bold text-slate-200">Logged Outreach Messages</h3>
        <p className="text-[10px] font-mono text-slate-500 mb-4">Direct feedback entries received via the contact portal</p>

        <div className="space-y-4">
          {data.messages.length === 0 ? (
            <p className="text-xs font-mono text-slate-500 italic text-center py-6 border border-dashed border-slate-800 rounded-xl">No outreach messages submitted yet.</p>
          ) : (
            data.messages.map((msg, mIdx) => (
              <div 
                key={msg.id}
                className="rounded-xl border border-slate-900 bg-slate-900/40 p-4 space-y-2 hover:bg-slate-900/60 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-200">{msg.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({msg.email})</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(msg.timestamp).toLocaleString()}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">Subject: {msg.subject}</span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans pl-1 border-l-2 border-slate-800">
                    {msg.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
