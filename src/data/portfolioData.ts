/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SkillCategory, Experience, Certification, BlogPost } from '../types';
import { CAREER_START_DATE } from './careerStartDate';
import profilePicture from '../assets/profile.jpeg';

export const PERSONAL_INFO = {
  name: "Thazin Phyo",
  title: "Software Engineer",
  avatarUrl: profilePicture,
  profile: "Dependable IT professional with a proven track record of meeting deadlines. Passionate team player with a strong work ethic and adept at complex problem-solving. Eager to leverage skills and experience to contribute effectively to software development teams.",
  contact: {
    address: "Block 232, #10-142, Simei Street 4, Singapore 520232",
    email: "thazinphyoit@gmail.com",
    whatsapp: "+6594482633",
    linkedin: "https://www.linkedin.com/in/thazin-phyo-a22544289/",
    github: "https://github.com/thazinphyoit"
  },
  personalDetails: {
    dob: "24/09/1995",
    nationality: "Myanmar",
    maritalStatus: "Single",
    availability: "1 Month",
    expectedSalary: " SGD 6,500(Negotiable)"
  },
  careerStartDate: CAREER_START_DATE,
  education: {
    degree: "Bachelor of Engineering (Information Technology)",
    period: "2012-2018",
    school: "Technological University (Thanlyin)"
  }
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages & Core",
    items: ["JavaScript", "TypeScript", "Python", "Java", "PHP", "HTML5", "CSS3", "SASS"]
  },
  {
    category: "Frontend Frameworks",
    items: ["React.js", "Next.js", "Redux", "Material UI", "Tailwind CSS", "Bootstrap 5", "JQuery", "AJAX"]
  },
  {
    category: "Backend & Mobile",
    items: ["Node.js", "Express.js", "React Native", "Spring Boot", "Flask", "Django", "Java Servlet"]
  },
  {
    category: "Databases & ORM",
    items: ["PostgreSQL", "MySQL", "MongoDB", "SQLAlchemy", "Hibernate"]
  },
  {
    category: "DevOps & Cloud",
    items: ["Docker", "Kubernetes", "GitHub Actions (CI/CD)", "Ansible", "Git / GitLab", "Linux / Bash", "Virtual Machines", "Azure Portal", "NAS Synology"]
  },
  {
    category: "Specialized Tools",
    items: ["Apache Airflow", "Power BI", "RESTful APIs", "JWT Auth", "Mocha Unit Testing", "Firebase Push Notifications", "SDLC / Agile"]
  }
];

export const WORK_EXPERIENCES: Experience[] = [
  {
    role: "Software Developer",
    type: "Onsite and Remote",
    company: "Datumstruct (S) Pte Ltd",
    location: "Changi, Singapore",
    period: "November 2020 to Present",
    description: "Datumstruct Group is a leading IT product distributor and solution provider in Singapore and the Asia Pacific region, servicing data centers, command centers, workspace solutions, environmental technology, and autonomous robotics.",
    duties: [
      "Transitioned to working onsite at the Singapore office, gaining additional hardware knowledge and experience through hardware QC tasks and software-hardware integration.",
      "Gained practical onsite experience by working on company projects servicing Singapore data centers and food factories.",
      "Collaborated remotely with the development team to define project goals and deliver high-quality software solutions.",
      "Developed web and mobile applications, focusing on User Interface and database structure.",
      "Implemented REST APIs for mobile and desktop clients, including JWT-based authentication.",
      "Applied Mocha unit testing and Firebase push notifications.",
      "Utilized Git and GitLab for source control and code collaboration.",
      "Presented progress reports and contributions during engineering team meetings."
    ],
    projects: [
      {
        title: "Smart Rack Access",
        description: "Integrated website with middleware and mobile applications for controlling physical rack doors and requests.",
        details: [
          "Developed web interfaces using React.js and backend integrations with Node.js and Java Servlets.",
          "Implemented mobile apps in React Native to allow authorized technicians to unlock cabinet racks via Bluetooth/Wi-Fi.",
          "Used MySQL for transactional logging and rack state storage on Windows and Linux systems."
        ],
        technologies: ["React.js", "Node.js", "React Native", "Java", "Servlet", "MySQL", "Windows", "Linux"]
      },
      {
        title: "Surveillance and Escort Robot Monitoring Dashboard",
        description: "A centralized web dashboard for surveillance and escort robot map missions and detection image recording.",
        details: [
          "Created a web dashboard for controlling robot navigation, patrolling schedules, and real-time path maps.",
          "Integrated real-time surveillance video streams and automated logging of detection events (e.g. thermal hotspots, foreign objects).",
          "Engineered the backend using Python, Flask, SQLAlchemy, and Docker."
        ],
        technologies: ["Python", "Flask", "SQLAlchemy", "MySQL", "Docker", "HTML5", "CSS3", "JavaScript"]
      },
      {
        title: "Bluetooth Wi-Fi Lock Management",
        description: "Enterprise software suite for rack door access management and service request tracking.",
        details: [
          "Developed dual web & mobile systems for port-side data center cabinet security controls.",
          "Ensured strong authentication protocols using JWT and deployed Firebase push notifications for instant alerts.",
          "Hosted physical project links: Website (https://psa.rack-lock.com), iOS and Android Apps."
        ],
        technologies: ["React.js", "Node.js", "React Native", "Java", "Servlet", "MySQL", "Firebase", "JWT", "iOS", "Android"],
        links: {
          website: "https://psa.rack-lock.com",
          ios: "https://apps.apple.com/us/app/id1526798401",
          android: "https://apkpure.com/troy-x-psa/com.nila"
        }
      }
    ]
  },
  {
    role: "Junior Software Developer",
    type: "On Site",
    company: "Micro Services",
    location: "Yangon, Myanmar",
    period: "May 2019 to August 2020",
    description: "Micro Services Group is an established IT product distributor and custom software services firm based in Yangon.",
    duties: [
      "Assisted with data entry, system configurations, and setup at client offices.",
      "Collaborated on responsive web and mobile application development.",
      "Validated inputs for security, sanitized parameters, and assisted in REST API design.",
      "Reported progress and sprint items to Senior Software Developers."
    ],
    projects: [
      {
        title: "Library Management System",
        description: "Responsive web system for search, rental tracking, reading reports, and analytics.",
        details: [
          "Designed the book search indexing and member reservation workflows.",
          "Developed using PHP, Bootstrap, JavaScript, and MySQL on Windows and Linux."
        ],
        technologies: ["PHP", "Bootstrap", "JavaScript", "MySQL", "Windows", "Linux"]
      }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Linux for Developers",
    issuer: "The Linux Foundation & Coursera",
    date: "March 18, 2024",
    imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "GitHub Actions for CI/CD",
    issuer: "LinkedIn Learning",
    date: "October 08, 2023",
    imageUrl: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "Learning Apache Airflow",
    issuer: "LinkedIn Learning",
    date: "December 10, 2023",
    imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "Power BI Essential Training",
    issuer: "LinkedIn Learning",
    date: "February 08, 2024",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "Certificate in Python Development",
    issuer: "Technological University",
    date: "2018",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "Certificate in Rock Star - React and Node",
    issuer: "Tech Academy",
    date: "2019",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400"
  }
];

export const REFERENCES = [
  {
    name: "NILA HLAING",
    role: "Manager",
    company: "Datumstruct (S) Pte Ltd (Singapore)",
    phone: "+6581860364",
    email: "nilahlaing@datumstruct.com"
  },
  {
    name: "NAY OO KYAW",
    role: "Senior Software Developer",
    company: "Datumstruct (S) Pte Ltd (Singapore)",
    phone: "+6594253068",
    email: "nayookyaw@datumstruct.com"
  }
];

export const GALLERY_IMAGES = [
  {
    title: "Datum Robotics - Integrated Surveillance D3BOT",
    description: "Empowering smarter data center patrolling and foreign object detection, as presented onsite.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Singapore Tech Week Exhibition",
    description: "Showcasing the Data Center Hardware Tracking System and Robot Mission Dashboard.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Smart Rack Locks & Access Audits",
    description: "Industrial grade lock controller dashboards, monitoring door status and access logs in real-time.",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "robot-monitoring-dashboards",
    title: "Building Real-Time Robot Monitoring Dashboards with Python & Flask",
    excerpt: "Learn how we built the Surveillance and Escort Robot Monitoring Dashboard to handle map mission coordinates, patrolling paths, and thermal detection event logs for commercial robotics.",
    category: "Robotics & Python",
    readTime: "5 min read",
    date: "June 14, 2026",
    author: "Thazin Phyo",
    content: `
### The Challenge of Robot Mission Monitoring
In modern industrial settings, data centers, and food factories, automated patrolling robots (like the **Datum Robotics D3BOT/D5BOT**) require reliable central servers to stream telemetry, issue mission coordinates, and log thermal/acoustic anomalies.

In this article, I will explain the high-level architecture of our **Surveillance and Escort Robot Monitoring Dashboard** which we successfully engineered and deployed.

### Core Architecture Components

1. **The Telemetry Intake API (Flask)**:
   We used Flask for its lightweight and highly flexible routing. The robots send HTTP POST requests with JSON payloads containing current battery state, XY map coordinates, and detection event flags every 500ms.

   \`\`\`python
   @app.route('/api/robot/telemetry', methods=['POST'])
   def post_telemetry():
       data = request.json
       robot_id = data.get('robot_id')
       coordinates = data.get('coords') # {x: 12.4, y: -4.5}
       
       # Store in Redis/RAM for real-time fetch, and commit anomalies to MySQL
       save_to_cache(robot_id, data)
       if data.get('anomaly_detected'):
           trigger_anomaly_alert(robot_id, data)
       return jsonify({"status": "received"}), 200
   \`\`\`

2. **Database Management (SQLAlchemy & MySQL)**:
   To log detection images, warning details, and historical robot missions, we integrated **SQLAlchemy** ORM. This allowed us to quickly pivot schema parameters during hardware QC tests without writing raw queries manually.

3. **Containerized Deployment (Docker)**:
   Deploying complex web dashboards with python packages, databases, and reverse proxies can lead to "it works on my machine" issues. By packing everything into Docker containers, we ensured smooth staging and instant rollouts across client servers.

### Key Takeaways
Integrating software with physical hardware requires extreme defensive programming. Network connections in data centers can flicker; therefore, we implemented offline caching on the robot clients and idempotent transaction logging on the Flask server.
`
  },
  {
    id: "industrial-iot-lock-systems",
    title: "Implementing Secure Industrial IoT Lock Systems with React & JWT",
    excerpt: "A deep dive into Bluetooth/Wi-Fi smart rack access controls, REST APIs with JWT, and Firebase push notifications for Singapore data center operators.",
    category: "IoT & Full-Stack",
    readTime: "7 min read",
    date: "April 20, 2026",
    author: "Thazin Phyo",
    content: `
### Security and Audits in Data Centers
Cabinet racks in enterprise data centers store mission-critical financial servers. Unscheduled physical access can lead to millions in downtime. Our client requested the **Smart Rack Access**—an enterprise solution requiring web, mobile, and controller integrations.

### Designing the JWT Authentication Flow
When a physical technician wants to open a rack door, they submit an unlock request through their React Native mobile app.

The authentication steps are as follows:
1. **User Identity verification**: The technician logs in via OAuth/JWT. The Express server validates credentials and signs a token containing specific permissions (e.g., "unlock-rack-63-bfront").
2. **Time-locked request approval**: The user submits a request for a 3-minute unlock window. The server checks the scheduled itinerary in the DB and approves the token.
3. **Hardware Trigger**: The Express server issues an encrypted payload via a WebSocket/REST API bridge to the hardware lock controller middleware.

\`\`\`typescript
// Express JWT permission gate
export const checkRackPermission = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    
    // Check if user has permission for this specific cabinet ID
    if (verified.allowedCabinets.includes(req.body.cabinetId)) {
      next();
    } else {
      res.status(403).json({ error: "Unauthorized for this cabinet rack" });
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid Token" });
  }
};
\`\`\`

### Firebase Push Notifications for Audits
Whenever a cabinet rack door changes state (e.g., opened, closed, or left ajar), the IoT controller pushes an event to our backend. The backend uses the **Firebase Admin SDK** to immediately trigger high-priority push notifications to the facility security staff's iOS and Android apps, logging details directly to MySQL.

### Summary
Building smart locks requires combining responsive UI/UX (React/Tailwind) with high reliability and secure cryptography. Storing access control tokens in secure device keys and implementing automatic timeouts ensures high trust.
`
  },
  {
    id: "github-actions-cicd",
    title: "Setting Up Bulletproof CI/CD Pipelines with GitHub Actions",
    excerpt: "How to automate testing, build artifacts, and deploy Node.js/React apps seamlessly using GitHub Actions worklows.",
    category: "DevOps",
    readTime: "4 min read",
    date: "January 11, 2026",
    author: "Thazin Phyo",
    content: `
### Why Automation Matters
As a software engineer, manual deployments are an anti-pattern. They are slow, prone to human error, and disrupt the flow of continuous delivery. 

In this post, we will walk through setting up a complete GitHub Actions workflow for a **React + Express** application, ensuring every commit is linted, tested, compiled, and containerized.

### The CI/CD Pipeline Breakdown

Our workflow consists of three primary stages:
1. **Verification**: Linting the TypeScript code and running unit tests (e.g., via Mocha/Jest).
2. **Build**: Compiling the React application and building the server artifacts.
3. **Deploy**: Packaging into a Docker image and pushing it to a registry or triggering cloud deployment (e.g. Vercel, Cloud Run).

Here is a typical robust pipeline YAML file:

\`\`\`yaml
name: Build and Deploy Full-Stack

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Linter
        run: npm run lint

      - name: Execute Tests
        run: npm run test

  build-and-push:
    needs: verify
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Registry
        uses: docker/login-action@v3
        with:
          username: \${{ secrets.DOCKER_USERNAME }}
          password: \${{ secrets.DOCKER_PASSWORD }}

      - name: Build and Push Docker Image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: thazinphyo/smartportfolio:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
\`\`\`

### Benefits of Docker Caching in GHA
Using GitHub Actions' native caching (\`cache-from: type=gha\`) speeds up Docker builds from **5 minutes down to 30 seconds** by preserving intermediate image layers. This feedback loop is essential for productive agile development teams!
`
  }
];
