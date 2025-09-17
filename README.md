# Open Impact

**Open Impact** is an open-source dashboard and data platform that analyzes and benchmarks the social, environmental, economic, and cultural impacts of companies, industries, and countries in real time using open datasets and AI.

## Vision

Empower everyone—investors, media, regulators, students, and companies—to freely explore, understand, and improve global impact, using transparent data and AI-driven insights.

---

## Features

- 🔑 **Sign-In Functions** (Firebase Auth)
- 🗺️ **Interactive Global Dashboard** (by country, industry, sector, company)
- 🌐 **Open Data Integrations**: World Bank, OECD, Transparency International, SEC/EDGAR, ASX, etc.
- 🧠 **AI Analytics**: Natural language insights, benchmarking, and report automation (OpenAI, Claude, etc.)
- 🏢 **Company API Onboarding**: Companies can securely connect and share read-only data
- 📈 **Tracking & Improvement**: Historical metrics, benchmarks, improvement suggestions
- 💳 **Stripe Integration**: Donations/support/premium
- 🛠️ **Planned**: Voluntary API Kit (Xero, Workday, Snowflake); Blockchain/Tokenisation for “Impact Units”

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Material-UI
- **Backend/API:** Next.js API Routes, Node.js, Python (scraping & ETL microservices)
- **Authentication:** NextAuth.js (Google OAuth + Credentials)
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

3. Set up environment variables (`.env.local`):
   ```
   # NextAuth.js Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-key-here
   
   # Google OAuth (optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   # Other API Keys
   NEXT_PUBLIC_FIREBASE_API_KEY=xxx
   OPENAI_API_KEY=xxx
   STRIPE_API_KEY=xxx
   # Add more as needed
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Visit [http://localhost:3000](http://localhost:3000)

---

## Authentication

Open Impact uses NextAuth.js for secure authentication with multiple providers:

### Demo Credentials
For testing and development, use these demo credentials:
- **Username:** `demo`
- **Password:** `password`

### Google OAuth (Optional)
To enable Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in your `.env.local`

### Authentication Flow
1. **Unauthenticated users** see the landing page with features and a "Sign In" button
2. **Click "Sign In"** redirects to `/auth` page with sign-in options
3. **After authentication** users see a personalized dashboard with their profile
4. **User menu** in the header allows access to profile and sign out

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
