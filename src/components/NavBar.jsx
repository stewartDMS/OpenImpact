import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">Open Impact</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-gray-700">Welcome, {session.user?.name || session.user?.email}</span>
                <Link 
                  href="/dashboard" 
                  className="text-primary-600 hover:text-primary-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                href="/auth" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;