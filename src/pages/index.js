import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  const features = [
    {
      title: 'Open Data Integration',
      desc: 'Connect with World Bank, OECD, and other trusted data sources',
      icon: '🌐'
    },
    {
      title: 'AI-Powered Insights',
      desc: 'Get intelligent analysis and recommendations using advanced AI',
      icon: '🧠'
    },
    {
      title: 'Real-time Dashboards',
      desc: 'Interactive visualizations of impact metrics and benchmarks',
      icon: '📊'
    },
    {
      title: 'ESG Tracking',
      desc: 'Monitor environmental, social, and governance performance',
      icon: '📈'
    },
    {
      title: 'Company Profiles',
      desc: 'Detailed impact profiles for companies and organizations',
      icon: '🏢'
    },
    {
      title: 'Benchmarking',
      desc: 'Compare performance against industry peers and standards',
      icon: '⚖️'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-primary-600">Open Impact</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              An open-source platform to explore, analyze, and share social and environmental impact data
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {session ? (
                <Link 
                  href="/dashboard"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors shadow-lg"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <Link 
                  href="/auth"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors shadow-lg"
                >
                  Get Started
                </Link>
              )}
              <a 
                href="https://github.com/stewartDMS/OpenImpact"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Open Impact?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empower everyone to freely explore, understand, and improve global impact using transparent data and AI-driven insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of organizations using Open Impact to drive positive change
          </p>
          {!session && (
            <Link 
              href="/auth"
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-medium transition-colors shadow-lg inline-block"
            >
              Start Your Journey
            </Link>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg">
            © {new Date().getFullYear()} Open Impact • Empowering Social and Environmental Change
          </p>
          <p className="text-gray-400 mt-2">
            Built with ❤️ for a better world
          </p>
        </div>
      </footer>
    </div>
  );
}