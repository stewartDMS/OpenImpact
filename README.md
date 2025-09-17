# Open Impact

**Open Impact** is an open-source dashboard and data platform that analyzes and benchmarks the social, environmental, economic, and cultural impacts of companies, industries, and countries in real time using open datasets and AI.

## Vision

Empower everyone—investors, media, regulators, students, and companies—to freely explore, understand, and improve global impact, using transparent data and AI-driven insights.

---

## Features

- 🔑 **Authentication System** (NextAuth.js with Google OAuth and Demo Credentials)
- 🗺️ **Interactive Global Dashboard** (by country, industry, sector, company)
- 🌐 **Open Data Integrations**: World Bank, OECD, Transparency International, SEC/EDGAR, ASX, etc.
- 🧠 **AI Analytics**: Natural language insights, benchmarking, and report automation (OpenAI, Claude, etc.)
- 🏢 **Company API Onboarding**: Companies can securely connect and share read-only data
- 📈 **Tracking & Improvement**: Historical metrics, benchmarks, improvement suggestions
- 💳 **Stripe Integration**: Donations/support/premium
- 🛠️ **Planned**: Voluntary API Kit (Xero, Workday, Snowflake); Blockchain/Tokenisation for “Impact Units”

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend/API:** Next.js API Routes, Node.js, Python (scraping & ETL microservices)
- **Data:** Firebase, PostgreSQL, Public APIs
- **AI/ML:** OpenAI, Claude, HuggingFace
- **Payments:** Stripe
- **DevOps:** Vercel, Docker, GitHub Actions

---

## Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/stewartDMS/OpenImpact.git
   cd OpenImpact
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (copy `.env.local.example` to `.env.local`):
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```
   # NextAuth.js Configuration (required)
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here-change-in-production
   
   # Google OAuth (optional - leave empty to use demo credentials only)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   # Other API Keys
   NEXT_PUBLIC_FIREBASE_API_KEY=xxx
   OPENAI_API_KEY=xxx
   STRIPE_API_KEY=xxx
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Visit [http://localhost:3000](http://localhost:3000)

## Authentication

The app uses NextAuth.js for authentication with two providers:

### Demo Credentials
- **Username:** `demo`
- **Password:** `password`
- Use these credentials to test the authentication flow without setting up OAuth

### Google OAuth (optional)
To enable Google sign-in:
1. Create a Google OAuth application in the [Google Cloud Console](https://console.cloud.google.com/)
2. Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs  
3. Copy the Client ID and Client Secret to your `.env.local` file

### Authentication Flow
- **Landing Page:** Shows "Sign In" button when unauthenticated
- **Sign In Page:** `/auth` - Choose between Google OAuth or demo credentials
- **Authenticated State:** Shows user menu with name/email and "Sign Out" option
- **Dashboard:** Authenticated users see a personalized dashboard on the home page

---

## Folder Structure

```
OpenImpact/
├── public/               # Static assets (incl. logo)
├── src/
│   ├── components/       # React components
│   ├── pages/            # Next.js pages (incl. API routes)
│   ├── lib/              # Utility functions & API clients
│   ├── styles/
│   └── types/
├── scripts/              # Data scraping/ETL
├── README.md
├── CONTRIBUTING.md
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## Contributing

Contributions are welcome! See [`CONTRIBUTING.md`](CONTRIBUTING.md).

---

## License

[MIT](LICENSE)

---

## Placeholder Logo

![Open Impact Logo](public/logo-placeholder.png)

---

## TODO / Backlog

- [ ] Integrate first open data API (World Bank)
- [ ] Set up Firebase authentication
- [ ] Build baseline dashboard UI
- [ ] Add AI insights endpoint (OpenAI/Claude)
- [ ] Set up company onboarding API flow
- [ ] Create Stripe integration for donations/support
- [ ] Prepare connectors for SEC/EDGAR, ASX
- [ ] (Backlog) Voluntary API Kit: Xero, Workday, Snowflake
- [ ] (Backlog) Tokenisation/blockchain for Impact Units

---

*Inspired by open data, global impact, and community collaboration.*
