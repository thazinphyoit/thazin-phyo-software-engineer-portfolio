# Thazin Phyo | Software Engineer Portfolio

A premium, full-stack, responsive digital portfolio and resume application engineered for **Thazin Phyo**, a Singapore-based Software Engineer specializing in full-stack web and mobile systems, industrial IoT lock controllers, and centralized robotics dashboards.

This application includes a server-side integrated **AI Recruiter Assistant** powered by Gemini, and a **Live Visitor Engagement Analytics Dashboard** graphing traffic metrics in real-time.

---

## 🚀 Key Features

- **Dynamic Interactive Resume**: Clean, responsive layout showcasing technical skill sets grouped by expertise category and interactive bento-style highlights of enterprise-grade projects.
- **AI Recruiter Assistant**: Built using server-side **Gemini 3.5 Flash** (via the `@google/genai` SDK) to instantly answer questions about Thazin's resume, specific project contributions, salary expectations, notice period, and Singapore work eligibility.
- **Visitor Engagement Analytics Dashboard**: Real-time traffic analyzer incorporating **Recharts** to plot visitor timelines, route popularity rankings, and device/browser environment distribution graphs.
- **Onsite Installations Gallery**: Photographic highlight reel capturing physical deployments, thermal anomaly robot monitoring servers, and smart rack locks.
- **Embedded Technical Blog**: In-depth architecture write-ups detailing real-time robot telemetry intake servers (Flask/Docker/SQLAlchemy) and JWT authorization flows.
- **Transactional Contact Form**: High-fidelity messaging system with instant receipt acknowledgment and live syncing with the analytics log.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Recharts, Lucide React
- **Backend & Middleware**: Express.js (Node.js), server-side routing, CORS, JSON parsing
- **AI Integration**: `@google/genai` (Gemini 3.5 Flash Model)
- **Tooling**: TypeScript, ESLint, `esbuild` (bundler), `tsx` (TypeScript runtime executor)

---

## 📁 Core Directory Structure

```text
├── server.ts                    # Full-Stack Express Server (AI Routing, Analytics & Static Build serving)
├── index.html                   # HTML Entry Point with optimized SEO parameters
├── package.json                 # Project configuration, builds, and dependencies
├── .env.example                 # Environment parameters template
├── .gitignore                   # Excluded build artifacts and local variables
└── src/
    ├── App.tsx                  # Root View Controller (sniffs user path and tracks metrics)
    ├── main.tsx                 # React DOM bootstrapper
    ├── index.css                # Global styles (declares custom Inter & JetBrains Mono typography)
    ├── types.ts                 # Shared global TypeScript types and analytics contract
    ├── data/
    │   └── portfolioData.ts     # Verified professional biography, projects list, certifications, and blog posts
    └── components/
        ├── Header.tsx           # Global responsive navigation and dashboard triggers
        ├── Hero.tsx             # Animated introductory banner with quick contact badges
        ├── Skills.tsx           # Bento-grid styled technical taxonomy 
        ├── Experience.tsx       # Timeline-organized professional histories and highlights
        ├── Gallery.tsx          # Real-world deployment exhibition grid
        ├── Blog.tsx             # Immersive pop-up overlay reader for technical posts
        ├── Contact.tsx          # Dual-column transactional form gateway
        ├── AIChatBot.tsx        # Chat interface for Gemini conversational responses
        └── AnalyticsDashboard.tsx # Data visualization layout plotting traffic metrics
```

---

## ⚙️ Setup & Installation

### Prerequisite
Ensure you have **Node.js (v18+)** installed.

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Configure Environment Secrets
Create a `.env` file in the root directory (based on `.env.example`):
```env
# Required for the AI Recruiter conversational capabilities
GEMINI_API_KEY=your_gemini_api_key_here
```
*Note: If no API key is specified, the Recruiter Assistant will gracefully execute in a static fallback demo mode.*

### 3. Start Development Server
This boots up the custom Express server with Vite middleware hot-reloads:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build and Launch Production Server
Compiles frontend static files to `dist/`, bundles `server.ts` into a standalone CommonJS bundle at `dist/server.cjs` with `esbuild`, and spins it up:
```bash
npm run build
npm run start
```

---

## 🔒 Security & Code Standards

- **Zero Client-Side Secrets**: All third-party interactions and Gemini requests are gated behind server-side `/api/*` proxies to hide critical API keys from the browser.
- **Lazy Initialization**: Critical clients are initialized lazily to guarantee standard startup stability even under empty environments.
- **Type Safety**: Strictly written using TypeScript to prevent runtime data exceptions.

---

## 🤝 References & Connections

- **Thazin Phyo**: [thazinphyoit@gmail.com](mailto:thazinphyoit@gmail.com) | [+6594482633](https://wa.me/6594482633)
- **LinkedIn**: [Thazin Phyo - LinkedIn](https://www.linkedin.com/in/thazin-phyo-a22544289/)
- **GitHub**: [@thazinphyoit](https://github.com/thazinphyoit)
