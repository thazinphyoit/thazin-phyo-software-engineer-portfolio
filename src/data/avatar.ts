/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Kept separate from portfolioData.ts so that server-side code (server.ts,
// api/index.ts) can import the text resume data without pulling in a binary
// image asset, which only Vite's bundler (not plain Node) knows how to load.
import profilePicture from '../assets/profile.jpeg';

export const AVATAR_URL = profilePicture;
