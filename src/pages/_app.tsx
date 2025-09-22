import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, AuthProvider } from '../context';
import '../styles/globals.css';

/**
 * Root App component wrapped with NextAuth.js SessionProvider and custom context providers
 * 
 * The SessionProvider provides session state to all child components,
 * enabling authentication state management throughout the application.
 * Additional context providers for theme and auth state management.
 */
export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}