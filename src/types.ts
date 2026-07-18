/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Project {
  title: string;
  description: string;
  details: string[];
  technologies: string[];
  links?: {
    website?: string;
    ios?: string;
    android?: string;
  };
}

export interface Experience {
  role: string;
  type: string; // e.g. "Onsite and Remote", "On Site"
  company: string;
  location: string;
  period: string;
  description: string;
  duties: string[];
  projects: Project[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  imageUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface AnalyticsEvent {
  path: string;
  referrer: string;
  device: string;
  browser: string;
  timestamp: string;
}

export interface VisitorAnalytics {
  totalViews: number;
  totalMessages: number;
  viewsByPath: Record<string, number>;
  viewsByDevice: Record<string, number>;
  viewsByBrowser: Record<string, number>;
  viewsTimeline: { date: string; count: number }[];
  messages: ContactMessage[];
}
