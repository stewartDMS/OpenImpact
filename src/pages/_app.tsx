import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';

/**
 * Root App component wrapped with NextAuth.js SessionProvider
 * 
 * The SessionProvider provides session state to all child components,
 * enabling authentication state management throughout the application.
 */
export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}