import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = ({ isOpen, onClose }) => {
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Company Profile', href: '/company-profile', icon: '🏢' },
    { name: 'Company Dashboard', href: '/company-dashboard', icon: '📈' },
    { name: 'Analytics', href: '/analytics', icon: '📋' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <span className="text-xl font-semibold text-gray-800">Menu</span>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="mt-8">
          <div className="px-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-3 py-3 mb-2 text-sm font-medium rounded-lg transition-colors
                  ${router.pathname === item.href
                    ? 'bg-primary-100 text-primary-700 border-r-4 border-primary-600'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;