import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../context/AuthContext';
import NavBar from '../components/NavBar';
import '../styles/globals.css';

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}) {
  // Pages that don't need the navbar
  const noNavbarPages = ['/auth'];
  const router = typeof window !== 'undefined' ? require('next/router').useRouter() : null;
  const currentPath = router?.pathname || '';
  const showNavBar = !noNavbarPages.includes(currentPath);

  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          {showNavBar && <NavBar />}
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </SessionProvider>
  );
}