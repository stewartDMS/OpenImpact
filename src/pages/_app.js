import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../context/AuthContext';
import NavBar from '../components/NavBar';
import { useRouter } from 'next/router';
import '../styles/globals.css';

function AppContent({ Component, pageProps }) {
  const router = useRouter();
  // Pages that don't need the navbar
  const noNavbarPages = ['/auth'];
  const showNavBar = !noNavbarPages.includes(router.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavBar && <NavBar />}
      <Component {...pageProps} />
    </div>
  );
}

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </AuthProvider>
    </SessionProvider>
  );
}