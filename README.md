# Open Impact

**Open Impact** is an open-source dashboard and data platform that analyzes and benchmarks the social, environmental, economic, and cultural impacts of companies, industries, and countries in real time using open datasets and AI.

## 🚀 Fresh Rebuild Notice

This repository has been reset and rebuilt from the latest Next.js/MUI project structure. This represents a clean start with modern architecture and best practices.

## Vision

To democratize access to impact data and enable organizations, researchers, and individuals to make data-driven decisions that create positive social and environmental change.

## Features

- **Real-time Impact Analytics**: Live dashboards showing social, environmental, and economic metrics
- **Company Benchmarking**: Compare companies across industries on impact metrics
- **Open Data Integration**: Seamless access to World Bank, SEC, ASX, and other public datasets
- **AI-Powered Insights**: Machine learning analysis to identify trends and opportunities
- **Community Collaboration**: Open platform for sharing data, insights, and best practices

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Material-UI (MUI)
- **Backend/API:** Next.js API Routes, Node.js
- **Data:** Open APIs, Public Datasets
- **AI/ML:** OpenAI, Machine Learning Models
- **Deployment:** Vercel, GitHub Actions

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/stewartDMS/OpenImpact.git
   cd OpenImpact
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (`.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   OPENAI_API_KEY=your_openai_key
   # Add more as needed
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Visit [http://localhost:3000](http://localhost:3000) to see the application

## Project Structure

```
OpenImpact/
├── server/              # Server-side utilities and configurations
├── src/
│   ├── components/      # React components
│   ├── pages/           # Next.js pages and API routes
│   ├── lib/             # Utility functions & API clients
│   └── styles/          # Global styles and themes
├── index.html           # HTML template
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### API Endpoints

- `/api/health` - Health check endpoint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

- [ ] Integrate World Bank API
- [ ] Build interactive dashboard components
- [ ] Add user authentication
- [ ] Implement company data scraping
- [ ] Add AI-powered insights
- [ ] Create data visualization components
- [ ] Set up automated data pipelines

---

*Empowering positive change through open data and collaborative insights.*