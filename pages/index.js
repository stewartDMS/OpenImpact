import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: '🌍',
      title: 'Global Impact Tracking',
      desc: 'Monitor social and environmental impact across countries and industries with real-time data and AI-driven insights.'
    },
    {
      icon: '📊',
      title: 'Open Data Integration',
      desc: 'Access comprehensive datasets from World Bank, OECD, SEC/EDGAR, and other trusted sources in one platform.'
    },
    {
      icon: '🤖',
      title: 'AI-Powered Analytics',
      desc: 'Get natural language insights, automated benchmarking, and intelligent recommendations for impact improvement.'
    },
    {
      icon: '🏢',
      title: 'Company Onboarding',
      desc: 'Secure API connections allow companies to share read-only data and track their impact metrics transparently.'
    },
    {
      icon: '📈',
      title: 'Historical Benchmarking',
      desc: 'Compare performance over time and against industry standards with comprehensive historical data analysis.'
    },
    {
      icon: '🌱',
      title: 'Impact Improvement',
      desc: 'Receive actionable suggestions and track progress toward sustainability and social responsibility goals.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Open Impact
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                An open-source platform to explore, analyze, and share social and environmental impact data.
              </p>
              
              {isAuthenticated ? (
                <div className="space-y-4">
                  <p className="text-lg text-blue-100">
                    Welcome back, {user?.name}!
                  </p>
                  <div className="space-x-4">
                    <Link href="/dashboard" className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                      Go to Dashboard
                    </Link>
                    <Link href="/company-dashboard" className="inline-block border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                      Company Analytics
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-x-4">
                  <Link href="/auth" className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                    Get Started
                  </Link>
                  <Link href="/auth" className="inline-block border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Open Impact?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Democratizing access to impact data and insights for a more sustainable and equitable world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of organizations using Open Impact to measure, analyze, and improve their social and environmental footprint.
          </p>
          
          {!isAuthenticated && (
            <div className="space-x-4">
              <Link href="/auth" className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Start Free Today
              </Link>
              <Link href="#learn-more" className="inline-block text-blue-600 font-semibold px-8 py-3 rounded-lg hover:text-blue-700 transition-colors">
                Learn More
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Open Impact</h3>
            <p className="text-gray-400 mb-6">
              Empowering Social and Environmental Change
            </p>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Open Impact. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}