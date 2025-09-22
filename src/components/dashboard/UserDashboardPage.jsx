import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Sidebar from '../Sidebar';
import PremiumModal from '../PremiumModal';

const UserDashboardPage = () => {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);

  const dashboardCards = [
    {
      title: 'Impact Score',
      value: '78/100',
      change: '+12%',
      trend: 'up',
      description: 'Overall environmental and social impact rating'
    },
    {
      title: 'Data Sources',
      value: '5',
      change: '+2',
      trend: 'up',
      description: 'Connected data sources for analysis'
    },
    {
      title: 'Reports Generated',
      value: '23',
      change: '+8',
      trend: 'up',
      description: 'Custom impact reports created this month'
    },
    {
      title: 'Benchmarks',
      value: '15',
      change: '0',
      trend: 'neutral',
      description: 'Industry comparisons available'
    }
  ];

  const recentActivity = [
    { action: 'Generated ESG Report', time: '2 hours ago', type: 'report' },
    { action: 'Updated Company Profile', time: '1 day ago', type: 'profile' },
    { action: 'Added World Bank Data Source', time: '3 days ago', type: 'data' },
    { action: 'Compared with Industry Peers', time: '1 week ago', type: 'benchmark' }
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
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Dashboard</h1>
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
                Welcome back, {session?.user?.name || 'User'}!
              </h2>
              <p className="text-gray-600">
                Here&apos;s an overview of your impact analysis and recent activity.
              </p>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {dashboardCards.map((card, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      card.trend === 'up' ? 'bg-green-100 text-green-800' :
                      card.trend === 'down' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {card.change}
                    </span>
                  </div>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{card.description}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`flex-shrink-0 w-2 h-2 rounded-full ${
                          activity.type === 'report' ? 'bg-blue-500' :
                          activity.type === 'profile' ? 'bg-green-500' :
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
                          <p className="font-medium text-gray-900">Generate New Report</p>
                          <p className="text-sm text-gray-500">Create a custom impact analysis</p>
                        </div>
                      </div>
                    </button>
                    
                    <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <span className="text-green-600">🌐</span>
                        <div>
                          <p className="font-medium text-gray-900">Connect Data Source</p>
                          <p className="text-sm text-gray-500">Add new data integration</p>
                        </div>
                      </div>
                    </button>
                    
                    <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <span className="text-purple-600">📈</span>
                        <div>
                          <p className="font-medium text-gray-900">View Benchmarks</p>
                          <p className="text-sm text-gray-500">Compare with industry peers</p>
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

export default UserDashboardPage;