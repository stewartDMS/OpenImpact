import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import NavBar from '../NavBar';
import Sidebar from '../Sidebar';
import CompanySearchModal from './CompanySearchModal';

const CompanyDashboardPage = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([
    {
      id: 1,
      name: 'Tesla, Inc.',
      ticker: 'TSLA',
      industry: 'Automotive',
      impactScore: 95,
      logo: '⚡',
      change: '+2.1%'
    },
    {
      id: 2,
      name: 'Patagonia, Inc.',
      ticker: 'PRIVATE',
      industry: 'Retail',
      impactScore: 98,
      logo: '🏔️',
      change: '+0.8%'
    }
  ]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSelectCompany = (company) => {
    setSelectedCompanies(prev => {
      const exists = prev.find(c => c.id === company.id);
      if (!exists) {
        return [...prev, { ...company, change: '+0.0%' }];
      }
      return prev;
    });
  };

  const handleRemoveCompany = (companyId) => {
    setSelectedCompanies(prev => prev.filter(c => c.id !== companyId));
  };

  const industryStats = [
    { industry: 'Technology', avgScore: 82, companies: 45, trend: 'up' },
    { industry: 'Automotive', avgScore: 78, companies: 12, trend: 'up' },
    { industry: 'Retail', avgScore: 71, companies: 38, trend: 'down' },
    { industry: 'Finance', avgScore: 68, companies: 23, trend: 'up' },
  ];

  const topPerformers = [
    { name: 'Patagonia', score: 98, industry: 'Retail' },
    { name: 'Interface Inc.', score: 96, industry: 'Manufacturing' },
    { name: 'Tesla', score: 95, industry: 'Automotive' },
    { name: 'Ben & Jerry\'s', score: 94, industry: 'Food & Beverage' },
    { name: 'Salesforce', score: 93, industry: 'Technology' },
  ];

  const getImpactScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? '📈' : '📉';
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
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Company Impact Dashboard</h1>
                <p className="text-gray-600 mt-2">
                  Analyze and compare corporate impact metrics across industries
                </p>
              </div>
              <button
                onClick={() => setSearchModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                + Add Company
              </button>
            </div>

            {/* Tracked Companies */}
            {selectedCompanies.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Your Tracked Companies</h2>
                  <span className="text-sm text-gray-500">{selectedCompanies.length} companies</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedCompanies.map((company) => (
                    <div key={company.id} className="relative p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors">
                      <button
                        onClick={() => handleRemoveCompany(company.id)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      >
                        ✕
                      </button>
                      
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">{company.logo}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{company.name}</h3>
                          <p className="text-sm text-gray-600">{company.industry}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactScoreColor(company.impactScore)}`}>
                          Score: {company.impactScore}
                        </div>
                        <span className="text-sm text-green-600 font-medium">{company.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Industry Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Industry Impact Scores</h2>
                <div className="space-y-4">
                  {industryStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{getTrendIcon(stat.trend)}</span>
                        <div>
                          <h3 className="font-medium text-gray-900">{stat.industry}</h3>
                          <p className="text-sm text-gray-600">{stat.companies} companies</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 rounded-full text-sm font-medium ${getImpactScoreColor(stat.avgScore)}`}>
                          {stat.avgScore}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Impact Performers</h2>
                <div className="space-y-3">
                  {topPerformers.map((company, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{company.name}</h3>
                          <p className="text-sm text-gray-600">{company.industry}</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-sm font-medium ${getImpactScoreColor(company.score)}`}>
                        {company.score}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Impact Analytics */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Impact Analytics Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
                  <p className="text-sm text-gray-600">Companies Tracked</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">78.5</div>
                  <p className="text-sm text-gray-600">Avg Impact Score</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">42</div>
                  <p className="text-sm text-gray-600">Industries Covered</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">156M</div>
                  <p className="text-sm text-gray-600">People Impacted</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setSearchModalOpen(true)}
                  className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <span className="text-2xl mb-2 block">🔍</span>
                  <h3 className="font-medium text-gray-900">Search Companies</h3>
                  <p className="text-sm text-gray-600">Find and analyze new companies</p>
                </button>
                
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <span className="text-2xl mb-2 block">📊</span>
                  <h3 className="font-medium text-gray-900">Create Comparison</h3>
                  <p className="text-sm text-gray-600">Compare impact metrics side-by-side</p>
                </button>
                
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <span className="text-2xl mb-2 block">📈</span>
                  <h3 className="font-medium text-gray-900">Generate Report</h3>
                  <p className="text-sm text-gray-600">Create custom impact analysis report</p>
                </button>
              </div>
            </div>
          </div>
        </div>
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

export default CompanyDashboardPage;