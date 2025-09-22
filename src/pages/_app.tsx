import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import { AuthProvider } from '../../context/AuthContext';

/**
 * Root App component wrapped with NextAuth.js SessionProvider and custom AuthProvider
 * 
 * The SessionProvider provides session state to all child components,
 * enabling authentication state management throughout the application.
 * The AuthProvider provides additional custom auth functionality.
 */
export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SessionProvider>
  );
}