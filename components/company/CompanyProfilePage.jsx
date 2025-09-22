import React, { useState } from 'react';
import NavBar from '../NavBar';
import Sidebar from '../Sidebar';

const CompanyProfilePage = ({ companyData }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Mock company data if not provided
  const company = companyData || {
    name: 'Tesla, Inc.',
    ticker: 'TSLA',
    industry: 'Automotive',
    location: 'Austin, TX',
    employees: '127,855',
    founded: '2003',
    website: 'https://tesla.com',
    logo: '⚡',
    impactScore: 95,
    description: 'Tesla, Inc. is an American electric vehicle and clean energy company based in Austin, Texas. Tesla designs and manufactures electric cars, battery energy storage systems, and solar panels, as well as other related products and services.',
    metrics: {
      carbonReduction: '2.5M tons',
      renewableEnergy: '85%',
      wasteReduction: '78%',
      socialImpact: '92%'
    },
    recentUpdates: [
      { date: '2024-01-15', title: 'Q4 Sustainability Report Released', type: 'report' },
      { date: '2024-01-10', title: 'New Solar Panel Factory Opened', type: 'facility' },
      { date: '2024-01-05', title: 'Carbon Neutral Goal Achieved', type: 'milestone' },
    ],
    certifications: [
      { name: 'B Corp Certified', year: '2022' },
      { name: 'ISO 14001', year: '2021' },
      { name: 'LEED Platinum', year: '2023' },
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'metrics', label: 'Impact Metrics', icon: '📈' },
    { id: 'reports', label: 'Reports', icon: '📄' },
    { id: 'certifications', label: 'Certifications', icon: '🏆' },
  ];

  const getImpactScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Industry</label>
                    <p className="text-gray-900">{company.industry}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Founded</label>
                    <p className="text-gray-900">{company.founded}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Employees</label>
                    <p className="text-gray-900">{company.employees}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Location</label>
                    <p className="text-gray-900">{company.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Website</label>
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">
                      {company.website}
                    </a>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Ticker</label>
                    <p className="text-gray-900">{company.ticker}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
              <p className="text-gray-700 leading-relaxed">{company.description}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Updates</h3>
              <div className="space-y-3">
                {company.recentUpdates.map((update, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-lg">
                      {update.type === 'report' ? '📄' : update.type === 'facility' ? '🏭' : '🎯'}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{update.title}</p>
                      <p className="text-sm text-gray-500">{update.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'metrics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(company.metrics).map(([key, value]) => (
                <div key={key} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact Trends</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">Impact metrics chart would be displayed here</p>
              </div>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sustainability Reports</h3>
              <div className="space-y-3">
                {['2023 Annual Impact Report', '2023 ESG Report', '2022 Sustainability Report'].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">📄</span>
                      <div>
                        <p className="font-medium text-gray-900">{report}</p>
                        <p className="text-sm text-gray-500">PDF • 2.4 MB</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-500 font-medium">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'certifications':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications & Awards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {company.certifications.map((cert, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg text-center">
                    <span className="text-3xl mb-2 block">🏆</span>
                    <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                    <p className="text-sm text-gray-500">Awarded {cert.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <div className="flex-1 lg:ml-0">
          {/* Mobile menu button */}
          <div className="lg:hidden p-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md bg-white shadow-sm hover:bg-gray-50"
            >
              <span className="text-gray-600">☰</span>
            </button>
          </div>

          <div className="p-6">
            {/* Company Header */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">{company.logo}</span>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
                    <p className="text-gray-600">{company.ticker} • {company.industry}</p>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-lg border ${getImpactScoreColor(company.impactScore)}`}>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{company.impactScore}</p>
                    <p className="text-xs font-medium">Impact Score</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfilePage;