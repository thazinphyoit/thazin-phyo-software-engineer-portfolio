/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Single source of truth for anything the AI recruiter chatbot, its offline
// fallback reply, and the plain-text resume download say about Thazin.
// All of it is derived from src/data/portfolioData.ts at request time, so
// editing that file is the only update ever needed - nothing here should
// name a specific project, skill, or job.

import { PERSONAL_INFO, SKILL_CATEGORIES, WORK_EXPERIENCES, CERTIFICATIONS, REFERENCES } from '../data/portfolioData.js';
import { getYearsOfExperience } from './experience.js';

function formatList(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

function allProjects() {
  return WORK_EXPERIENCES.flatMap((exp) => exp.projects);
}

function buildKeyProjectsList(): string {
  return allProjects()
    .map((project, i) => `  ${i + 1}. ${project.title}: ${project.technologies.join(', ')}. ${project.description}`)
    .join('\n');
}

function buildSkillCategoriesList(): string {
  return SKILL_CATEGORIES.map((cat) => `  - ${cat.category}: ${cat.items.join(', ')}`).join('\n');
}

function buildCertificationsList(): string {
  return CERTIFICATIONS.map((c) => `${c.title} (${c.issuer})`).join(', ');
}

function buildTotalExperienceSummary(): string {
  return WORK_EXPERIENCES.map((exp) => `${exp.role} at ${exp.company} (${exp.period})`).join('; ');
}

export function buildSystemPrompt(): string {
  const years = getYearsOfExperience();
  const firstName = PERSONAL_INFO.name.split(' ')[0];

  return `
You are a highly polite, professional, and charming AI Recruiter Assistant representing ${PERSONAL_INFO.name}, a ${PERSONAL_INFO.title} based in Singapore.
Your goal is to represent ${firstName} in the best possible light, answering questions from hiring managers, technical leads, or clients.

Here are ${firstName}'s verified resume details:
- NAME: ${PERSONAL_INFO.name}
- ROLE: ${PERSONAL_INFO.title}
- LOCATION: ${PERSONAL_INFO.contact.publicLocation} (Nationality: ${PERSONAL_INFO.personalDetails.nationality})
- EMAIL: ${PERSONAL_INFO.contact.email}
- WHATSAPP: ${PERSONAL_INFO.contact.whatsapp}
- LINKEDIN: ${PERSONAL_INFO.contact.linkedin}
- TOTAL EXPERIENCE: ${years}+ Years (${buildTotalExperienceSummary()})
- KEY PROJECTS:
${buildKeyProjectsList()}
- TECHNICAL SKILLS:
${buildSkillCategoriesList()}
- EDUCATION: ${PERSONAL_INFO.education.degree}, ${PERSONAL_INFO.education.period}, ${PERSONAL_INFO.education.school}
- CERTIFICATIONS: ${buildCertificationsList()}
- SALARY EXPECTATION: ${PERSONAL_INFO.personalDetails.expectedSalary.trim()}
- AVAILABILITY: ${PERSONAL_INFO.personalDetails.availability} notice period.

GUIDELINES FOR ANSWERING:
- Be warm, professional, encouraging, and clear.
- Keep answers relatively concise (1-3 paragraphs) and highly scannable.
- If they ask general questions unrelated to ${firstName}, her career, or hiring her, politely redirect them back to her portfolio.
- Never make up information. If some detail isn't in her profile, say that you don't have that specific record, but invite them to reach out to ${firstName} directly via Email (${PERSONAL_INFO.contact.email}) or WhatsApp (${PERSONAL_INFO.contact.whatsapp}).
`;
}

export function buildFallbackAnswer(): string {
  const years = getYearsOfExperience();
  const coreFrameworks = formatList(SKILL_CATEGORIES.flatMap((c) => c.items).slice(0, 5));
  const projectTitles = formatList(allProjects().map((p) => p.title));
  const certTitles = formatList(CERTIFICATIONS.slice(0, 4).map((c) => c.title));

  return `Hi! Thank you for asking. (AI Mode is currently in demo fallback).
${PERSONAL_INFO.name} is a Singapore-based ${PERSONAL_INFO.title} with over ${years} years of experience.
She specializes in:
- ${coreFrameworks}.
- Building ${projectTitles}.
- Certified in ${certTitles}.

To unlock full interactive AI discussions, please configure the GEMINI_API_KEY inside AI Studio Secrets.`;
}

export function buildResumeText(): string {
  const years = getYearsOfExperience();
  const header = `${PERSONAL_INFO.name.toUpperCase()} - ${PERSONAL_INFO.title.toUpperCase()} RESUME`;
  const divider = '='.repeat(41);

  const experienceBlocks = WORK_EXPERIENCES.map((exp, i) => {
    const duties = exp.duties.map((d) => `   * ${d}`).join('\n');
    const projects = exp.projects
      .map((p) => `   * Key Project: ${p.title} (${p.technologies.join(', ')}). ${p.description}`)
      .join('\n');
    return `${i + 1}. ${exp.role} | ${exp.company}, ${exp.location}\n   ${exp.period} (${exp.type})\n${duties}\n${projects}`;
  }).join('\n\n');

  const certifications = CERTIFICATIONS.map((c) => `- ${c.title} (${c.issuer})`).join('\n');
  const references = REFERENCES.map((r) => `- ${r.name} (${r.role}, ${r.company}) | ${r.email}`).join('\n');

  return `
${divider}
${header}
${divider}
Location: ${PERSONAL_INFO.contact.publicLocation}
Email: ${PERSONAL_INFO.contact.email}
WhatsApp: ${PERSONAL_INFO.contact.whatsapp}
LinkedIn: ${PERSONAL_INFO.contact.linkedin}

PROFILE:
${PERSONAL_INFO.profile}
Total Experience: ${years}+ years.

EDUCATION:
- ${PERSONAL_INFO.education.degree}
  ${PERSONAL_INFO.education.school} | ${PERSONAL_INFO.education.period}

CORE SKILLS:
${buildSkillCategoriesList()}

WORK EXPERIENCE:

${experienceBlocks}

CERTIFICATIONS:
${certifications}

REFERENCES:
${references}
${divider}
`;
}
