# ONESELF-AI — AI-Powered Virtual Interview System

## Project Overview
ONESELF-AI is a full-stack interview preparation platform that helps candidates practice interviews based on their resumes and chosen job roles. It evaluates answers across technical knowledge, communication, reasoning, and behavioral skills, then provides scores and learning recommendations.

## Key Features
- **Resume Intelligence:** Upload a PDF resume. The system extracts skills and experience to personalize interview questions.
- **Personalized Questions:** Generates questions based on the candidate's profile and selected role.
- **Voice Interview:** The AI interviewer uses text-to-speech. Candidates can answer by speaking, with browser-based speech-to-text.
- **Answer Evaluation:** Evaluates answers using four scoring categories.
- **Scorecard and Dashboard:** Shows grades, interview history, analytics, and coaching feedback.
- **Learning Recommendations:** Connects weaker skill areas to courses, with progress tracking and certificates.
- **Session Recovery:** Can finalize an interrupted interview using the saved transcript.
- **Responsive Interface:** Designed for phones, tablets, and desktops.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui |
| Data fetching and charts | SWR, Recharts |
| Backend | Node.js 20, REST APIs, Edge Runtime |
| Authentication and validation | JWT, bcryptjs, Zod, rate limiting |
| AI and language models | Groq (Llama 3.3), OpenAI GPT, Gemini |
| Voice | ElevenLabs Text-to-Speech, Web Speech API |
| Resume processing | pdf-parse |
| Relational database | PostgreSQL (Neon) |
| Document database | MongoDB (MongoDB Atlas), Mongoose |
| Cache and counters | Upstash Redis |
| File storage | Cloudflare R2, AWS S3 SDK |
| Deployment and CI/CD | Vercel, GitHub Actions |
| Payments | Razorpay |

## How It Works
1. The candidate uploads a PDF resume.
2. `pdf-parse` extracts the resume text.
3. An LLM processes the information to identify skills and experience.
4. The system generates questions tailored to the candidate's profile and selected role.
5. The candidate answers by voice or text during the mock interview.
6. AI evaluation assesses the answers across four categories.
7. The application calculates a final score, assigns a grade, and displays the scorecard.
8. The system recommends courses related to weaker areas.

### Scoring Formula
The final score is calculated using the following weights:

- Core Knowledge: **50%**
- Communication: **25%**
- Reasoning: **15%**
- Behavioral: **10%**

### Grade Scale
| Grade | Score |
|---|---:|
| A | 85 and above |
| B | 70–84 |
| C | 50–69 |
| D | Below 50 |

## System Architecture
```text
Candidate (Browser)
        |
        v
Next.js 16 + React 19 Frontend
        |
        v
Vercel Edge Middleware / Route Protection
        |
        v
Node.js REST APIs
        |
        +------ Authentication, validation, rate limiting
        |
        +------ AI services (Groq / OpenAI / Gemini)
        |
        +------ PostgreSQL (Neon)
        |
        +------ MongoDB (Atlas)
        |
        +------ Upstash Redis
        |
        +------ Cloudflare R2 (resume PDFs)
        |
        v
Interview Scorecard and Learning Recommendations
```

## Database and Storage
- **PostgreSQL (Neon):** Stores structured information such as users, subscriptions, course progress, certificates, and quiz submissions.
- **MongoDB Atlas:** Stores interview sessions, evaluations, resume metadata, bookmarks, and the question bank.
- **Cloudflare R2:** Stores uploaded resume PDF files.
- **Upstash Redis:** Supports rate-limit counters and session continuity using time-to-live (TTL) keys.

## Security
- Passwords are hashed using `bcryptjs` with 10 cost rounds.
- JWTs are signed using HMAC-SHA256 and expire after 7 days.
- Authentication tokens are stored in HttpOnly cookies.
- Rate limits are applied to login and registration requests.
- Vercel Edge Middleware protects restricted routes.
- Admin authentication uses a separate JWT secret and cookie.
- Secrets are managed through environment variables and should not be committed to Git.

## Deployment
The project uses GitHub and Vercel for deployment. A push to the `main` branch triggers an automated Vercel build, while pull requests can use preview deployments. API routes run as serverless functions, and static assets are served through Vercel's global CDN.

## Project Modules
The project is divided into five modules:
1. **System Architecture and Integration:** Overall design, technology selection, integration, and security architecture.
2. **Frontend and User Experience:** User-facing screens, dashboard, navigation, and responsive design.
3. **Backend Services and Authentication:** REST APIs, JWT authentication, session management, and middleware.
4. **AI and Interview Intelligence:** Resume parsing, LLM integration, question generation, and scoring.
5. **Data Engineering, Storage, and Cloud:** Databases, file storage, Redis, deployment, and cloud configuration.

## Future Scope
- Video interviews with facial-expression analysis
- Industry-specific question banks
- Support for additional interview languages
- Native mobile application
- Recruiter dashboard and job-platform integrations
- ATS compatibility scoring
- Group discussion simulation
- Custom domain-specific language model
- Coding interview environment

## Project Details
- **Project:** ONESELF-AI
- **Type:** Final Year Project
- **Academic Year:** 2025–2026
- **Institute:** DKTE Society's Textile and Engineering Institute, Ichalkaranji
- **University:** Shivaji University, Kolhapur
- **Department:** Artificial Intelligence and Data Science
