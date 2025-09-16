# Open Impact

**Open Impact** is an open-source dashboard and data platform that analyzes and benchmarks the social, environmental, economic, and cultural impacts of companies, industries, and countries in real time using open datasets and AI.

> **Note:** This is a fresh start from Inscite-AI, containing only the essential project files to build a clean, focused foundation for the Open Impact platform.

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

3. Set up environment variables (`.env.local`):
   ```
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

## Folder Structure

```
OpenImpact/
├── server/               # Server-side code and API services
├── src/
│   ├── components/       # React components
│   ├── pages/            # Next.js pages (incl. API routes)
│   ├── lib/              # Utility functions & API clients
│   ├── styles/
│   └── types/
├── .gitignore
├── README.md
├── index.html           # Main HTML template
├── next.config.js
├── package.json
├── package-lock.json
└── tsconfig.json
```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to contribute to this project.

---

## License

[MIT](LICENSE)

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
