import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import NavBar from '../NavBar';
import Sidebar from '../Sidebar';

const UserDashboardPage = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const stats = [
    { label: 'Impact Score', value: '85', change: '+12%', trend: 'up' },
    { label: 'Projects Tracked', value: '23', change: '+3', trend: 'up' },
    { label: 'CO2 Reduced', value: '2.4T', change: '+0.5T', trend: 'up' },
    { label: 'Community Reach', value: '1.2K', change: '+150', trend: 'up' },
  ];

  const recentActivity = [
    { id: 1, action: 'Added new sustainability project', time: '2 hours ago', type: 'project' },
    { id: 2, action: 'Updated carbon footprint data', time: '1 day ago', type: 'data' },
    { id: 3, action: 'Shared impact report', time: '3 days ago', type: 'report' },
    { id: 4, action: 'Joined community discussion', time: '1 week ago', type: 'community' },
  ];

  const upcomingTasks = [
    { id: 1, task: 'Review quarterly impact report', due: 'Tomorrow', priority: 'high' },
    { id: 2, task: 'Update team sustainability goals', due: 'This week', priority: 'medium' },
    { id: 3, task: 'Schedule stakeholder presentation', due: 'Next week', priority: 'low' },
  ];

  const getActivityIcon = (type) => {
    const icons = {
      project: '📊',
      data: '📈',
      report: '📄',
      community: '👥'
    };
    return icons[type] || '📌';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-red-600 bg-red-50',
      medium: 'text-yellow-600 bg-yellow-50',
      low: 'text-green-600 bg-green-50'
    };
    return colors[priority] || colors.medium;
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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="text-gray-600 mt-2">
                Here&apos;s your impact dashboard overview for today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3">
                        <span className="text-lg">{getActivityIcon(activity.type)}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 text-sm text-blue-600 hover:text-blue-500 font-medium">
                    View all activity
                  </button>
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {upcomingTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{task.task}</p>
                          <p className="text-xs text-gray-500">{task.due}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 text-sm text-blue-600 hover:text-blue-500 font-medium">
                    View all tasks
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <span className="text-2xl mb-2 block">📊</span>
                  <h3 className="font-medium text-gray-900">Add New Project</h3>
                  <p className="text-sm text-gray-600">Track a new impact initiative</p>
                </button>
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <span className="text-2xl mb-2 block">📈</span>
                  <h3 className="font-medium text-gray-900">Update Data</h3>
                  <p className="text-sm text-gray-600">Add recent impact measurements</p>
                </button>
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <span className="text-2xl mb-2 block">📄</span>
                  <h3 className="font-medium text-gray-900">Generate Report</h3>
                  <p className="text-sm text-gray-600">Create impact summary report</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;