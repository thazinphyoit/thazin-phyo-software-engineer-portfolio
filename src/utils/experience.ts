/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CAREER_START_DATE } from '../data/careerStartDate';

export function getYearsOfExperience(referenceDate: Date = new Date()): number {
  const start = new Date(CAREER_START_DATE);
  let years = referenceDate.getFullYear() - start.getFullYear();
  const monthDiff = referenceDate.getMonth() - start.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && referenceDate.getDate() < start.getDate())) {
    years--;
  }
  return years;
}

export function getExperienceLabel(referenceDate?: Date): string {
  return `${getYearsOfExperience(referenceDate)}+ Years`;
}
