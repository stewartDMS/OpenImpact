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

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Authentication:** NextAuth.js (GitHub, Google, Email providers)
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

3. Set up environment variables (copy `.env.example` to `.env.local`):
   ```bash
   cp .env.example .env.local
   ```

4. Configure authentication providers in `.env.local`:
   ```env
   # NextAuth.js Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here

   # GitHub OAuth (create at: https://github.com/settings/applications/new)
   GITHUB_ID=your_github_client_id
   GITHUB_SECRET=your_github_client_secret

   # Google OAuth (create at: https://console.developers.google.com/)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Email Provider (configure your SMTP server)
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your_smtp_user
   EMAIL_SERVER_PASSWORD=your_smtp_password
   EMAIL_FROM=noreply@openimpact.org
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Visit [http://localhost:3000](http://localhost:3000)

## Authentication

The application uses NextAuth.js for secure authentication with multiple providers:

- **GitHub OAuth**: Perfect for developers and tech-savvy users
- **Google OAuth**: Easy sign-in for general users  
- **Email (Magic Links)**: Passwordless authentication via email

### Setting up OAuth Providers

**GitHub OAuth:**
1. Go to [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/applications/new)
2. Create a new OAuth App with callback URL: `http://localhost:3000/api/auth/callback/github`
3. Add the Client ID and Secret to your `.env.local`

**Google OAuth:**
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create credentials for OAuth 2.0 client with callback URL: `http://localhost:3000/api/auth/callback/google`
3. Add the Client ID and Secret to your `.env.local`

**Email Provider:**
Configure your SMTP server details in `.env.local` for magic link authentication.

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
