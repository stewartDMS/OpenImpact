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
├── public/               # Static assets (logos, images, etc.)
├── src/
│   ├── components/       # Reusable React components
│   │   ├── HelloWorld.tsx    # Example component with MUI styling
│   │   ├── AuthForm.tsx      # Authentication form component
│   │   ├── Dashboard.tsx     # Main dashboard component
│   │   └── DataInputForm.tsx # Data input form component
│   ├── layouts/          # Layout components
│   │   └── MainLayout.tsx    # Main app layout with AppBar and footer
│   ├── pages/            # Next.js pages and API routes
│   │   ├── index.tsx         # Landing page
│   │   └── api/              # API routes
│   ├── hooks/            # Custom React hooks
│   │   └── useIsMounted.ts   # Hook to check if component is mounted
│   ├── utils/            # Utility functions
│   │   └── formatDate.ts     # Date formatting utilities
│   ├── lib/              # API clients and external service integrations
│   │   ├── apiClient.ts      # Enhanced HTTP client with error handling
│   │   └── apiClients.ts     # Legacy API client functions
│   ├── styles/           # Global and component styles
│   │   └── globals.css       # Global CSS with custom utilities
│   └── types/            # TypeScript type definitions
├── scripts/              # Data scraping/ETL scripts
├── README.md
├── CONTRIBUTING.md
├── next.config.js
├── package.json
└── tsconfig.json
```

### Directory Descriptions

- **`/src/components/`** - Reusable React components that can be used across multiple pages. Each component should be self-contained with its own props interface.

- **`/src/layouts/`** - Layout components that wrap page content. Use these for consistent page structure, navigation, and footers.

- **`/src/pages/`** - Next.js pages for routing. Each file represents a route in your application. API routes go in `/src/pages/api/`.

- **`/src/hooks/`** - Custom React hooks for sharing stateful logic between components. Follow the `use*` naming convention.

- **`/src/utils/`** - Pure utility functions that don't depend on React. These should be framework-agnostic helper functions.

- **`/src/lib/`** - External service integrations, API clients, and library configurations. More complex than utils, often stateful.

- **`/src/styles/`** - Global CSS files, theme configurations, and style utilities. Components should use MUI's styling system when possible.

- **`/src/types/`** - TypeScript type definitions, interfaces, and enums used across the application.

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
