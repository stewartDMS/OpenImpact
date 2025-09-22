import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Sidebar from '../Sidebar';
import PremiumModal from '../PremiumModal';

const CompanyDashboardPage = () => {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);

  const companyMetrics = [
    {
      title: 'ESG Score',
      value: '82/100',
      change: '+5 points',
      trend: 'up',
      description: 'Overall ESG performance rating'
    },
    {
      title: 'Carbon Footprint',
      value: '2.1M tons',
      change: '-12%',
      trend: 'up',
      description: 'CO2 equivalent emissions this year'
    },
    {
      title: 'Employee Satisfaction',
      value: '4.6/5.0',
      change: '+0.2',
      trend: 'up',
      description: 'Average employee rating'
    },
    {
      title: 'Compliance Score',
      value: '95%',
      change: '+3%',
      trend: 'up',
      description: 'Regulatory compliance rate'
    }
  ];

  const impactAreas = [
    {
      category: 'Environmental',
      score: 85,
      initiatives: [
        { name: 'Renewable Energy Transition', progress: 78, target: '100% by 2025' },
        { name: 'Waste Reduction Program', progress: 92, target: '50% reduction' },
        { name: 'Water Conservation', progress: 65, target: '30% savings' }
      ]
    },
    {
      category: 'Social',
      score: 79,
      initiatives: [
        { name: 'Diversity & Inclusion', progress: 68, target: '50% diverse workforce' },
        { name: 'Employee Development', progress: 85, target: '40hrs training/employee' },
        { name: 'Community Investment', progress: 90, target: '$1M annually' }
      ]
    },
    {
      category: 'Governance',
      score: 88,
      initiatives: [
        { name: 'Board Independence', progress: 95, target: '80% independent' },
        { name: 'Ethics Training', progress: 100, target: '100% completion' },
        { name: 'Transparency Reporting', progress: 82, target: 'Quarterly reports' }
      ]
    }
  ];

  const recentActivities = [
    { action: 'Published Q3 Sustainability Report', time: '2 days ago', type: 'report' },
    { action: 'Achieved 80% Renewable Energy Target', time: '1 week ago', type: 'milestone' },
    { action: 'Updated Diversity Metrics', time: '2 weeks ago', type: 'data' },
    { action: 'Board Meeting - ESG Review', time: '3 weeks ago', type: 'governance' }
  ];

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
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Company Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPremiumModalOpen(true)}
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 lg:pl-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to Your Company Dashboard
              </h2>
              <p className="text-gray-600">
                Track your organization&apos;s impact metrics and ESG performance.
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {companyMetrics.map((metric, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      metric.trend === 'up' ? 'bg-green-100 text-green-800' :
                      metric.trend === 'down' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{metric.description}</p>
                </div>
              ))}
            </div>

            {/* Impact Areas */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Impact Areas</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {impactAreas.map((area, areaIndex) => (
                  <div key={areaIndex} className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium text-gray-900">{area.category}</h4>
                        <span className={`text-2xl font-bold ${
                          area.score >= 85 ? 'text-green-600' :
                          area.score >= 70 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {area.score}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {area.initiatives.map((initiative, initIndex) => (
                          <div key={initIndex}>
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium text-gray-900">{initiative.name}</p>
                              <span className="text-sm text-gray-600">{initiative.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  initiative.progress >= 85 ? 'bg-green-500' :
                                  initiative.progress >= 70 ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${initiative.progress}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{initiative.target}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activities */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                          activity.type === 'report' ? 'bg-blue-500' :
                          activity.type === 'milestone' ? 'bg-green-500' :
                          activity.type === 'data' ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <span className="text-blue-600">📊</span>
                        <div>
                          <p className="font-medium text-gray-900">Generate ESG Report</p>
                          <p className="text-sm text-gray-500">Create comprehensive impact report</p>
                        </div>
                      </div>
                    </button>
                    
                    <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <span className="text-green-600">📈</span>
                        <div>
                          <p className="font-medium text-gray-900">Update Metrics</p>
                          <p className="text-sm text-gray-500">Add new impact data</p>
                        </div>
                      </div>
                    </button>
                    
                    <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <span className="text-purple-600">👥</span>
                        <div>
                          <p className="font-medium text-gray-900">Team Collaboration</p>
                          <p className="text-sm text-gray-500">Invite team members</p>
                        </div>
                      </div>
                    </button>

                    <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <span className="text-orange-600">⚖️</span>
                        <div>
                          <p className="font-medium text-gray-900">Compliance Check</p>
                          <p className="text-sm text-gray-500">Review regulatory requirements</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Premium Modal */}
      <PremiumModal 
        isOpen={premiumModalOpen} 
        onClose={() => setPremiumModalOpen(false)} 
      />
    </div>
  );
};

export default CompanyDashboardPage;