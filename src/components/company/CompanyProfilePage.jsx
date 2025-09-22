import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import CompanySearchModal from './CompanySearchModal';

const CompanyProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Mock company data
  const mockCompanyData = {
    id: 1,
    name: 'Apple Inc.',
    symbol: 'AAPL',
    industry: 'Technology',
    founded: '1976',
    headquarters: 'Cupertino, CA',
    employees: '164,000',
    market_cap: '$2.8T',
    revenue: '$394.3B',
    logo: '🍎',
    impact_score: 85,
    description: 'Apple Inc. is an American multinational technology company that specializes in consumer electronics, software and online services.',
    metrics: {
      environmental: {
        score: 88,
        details: [
          { metric: 'Carbon Neutrality', value: '2030 Target', status: 'on-track' },
          { metric: 'Renewable Energy', value: '100%', status: 'achieved' },
          { metric: 'Recycled Materials', value: '20%', status: 'improving' },
        ]
      },
      social: {
        score: 82,
        details: [
          { metric: 'Diversity & Inclusion', value: '50% diverse workforce', status: 'on-track' },
          { metric: 'Employee Satisfaction', value: '92%', status: 'achieved' },
          { metric: 'Community Investment', value: '$100M annually', status: 'achieved' },
        ]
      },
      governance: {
        score: 85,
        details: [
          { metric: 'Board Independence', value: '87.5%', status: 'achieved' },
          { metric: 'Executive Compensation', value: 'Aligned with performance', status: 'achieved' },
          { metric: 'Transparency Score', value: '85/100', status: 'good' },
        ]
      }
    }
  };

  const company = selectedCompany || mockCompanyData;

  const handleSelectCompany = (selectedCompany) => {
    setSelectedCompany(selectedCompany);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'achieved': return 'text-green-600 bg-green-100';
      case 'on-track': return 'text-blue-600 bg-blue-100';
      case 'improving': return 'text-yellow-600 bg-yellow-100';
      case 'good': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Company Profile</h1>
            </div>
            <button
              onClick={() => setSearchModalOpen(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Search Companies
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 lg:pl-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Company Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-start space-x-6">
                <div className="text-6xl">{company.logo}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h2 className="text-3xl font-bold text-gray-900">{company.name}</h2>
                    <span className="text-lg text-gray-500">({company.symbol})</span>
                  </div>
                  <p className="text-gray-600 mb-4">{company.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Industry:</span>
                      <p className="text-gray-600">{company.industry}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Founded:</span>
                      <p className="text-gray-600">{company.founded}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Employees:</span>
                      <p className="text-gray-600">{company.employees}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Market Cap:</span>
                      <p className="text-gray-600">{company.market_cap}</p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Impact Score</div>
                  <div className={`text-4xl font-bold ${
                    company.impact_score >= 85 ? 'text-green-600' :
                    company.impact_score >= 70 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {company.impact_score}
                  </div>
                  <div className="text-sm text-gray-500">out of 100</div>
                </div>
              </div>
            </div>

            {/* ESG Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Environmental */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <span className="mr-2">🌱</span>
                      Environmental
                    </h3>
                    <span className="text-2xl font-bold text-green-600">
                      {company.metrics.environmental.score}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {company.metrics.environmental.details.map((detail, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{detail.metric}</p>
                          <p className="text-sm text-gray-600">{detail.value}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(detail.status)}`}>
                          {detail.status.replace('-', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <span className="mr-2">👥</span>
                      Social
                    </h3>
                    <span className="text-2xl font-bold text-blue-600">
                      {company.metrics.social.score}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {company.metrics.social.details.map((detail, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{detail.metric}</p>
                          <p className="text-sm text-gray-600">{detail.value}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(detail.status)}`}>
                          {detail.status.replace('-', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Governance */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <span className="mr-2">⚖️</span>
                      Governance
                    </h3>
                    <span className="text-2xl font-bold text-purple-600">
                      {company.metrics.governance.score}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {company.metrics.governance.details.map((detail, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{detail.metric}</p>
                          <p className="text-sm text-gray-600">{detail.value}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(detail.status)}`}>
                          {detail.status.replace('-', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-center space-x-4">
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Generate Report
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors">
                Compare with Peers
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors">
                Export Data
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Company Search Modal */}
      <CompanySearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectCompany={handleSelectCompany}
      />
    </div>
  );
};

export default CompanyProfilePage;