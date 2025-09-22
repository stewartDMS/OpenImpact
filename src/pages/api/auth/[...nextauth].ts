import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"

/**
 * NextAuth.js v4 configuration for OpenImpact application
 * 
 * Configures authentication providers:
 * - GitHub OAuth (for developer/tech users)
 * - Google OAuth (for general users)
 * - Email (passwordless magic link authentication) - requires database
 * 
 * Environment variables required:
 * - GITHUB_ID, GITHUB_SECRET
 * - GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET  
 * - EMAIL_SERVER_HOST, EMAIL_SERVER_PORT, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD
 * - EMAIL_FROM
 * - NEXTAUTH_URL, NEXTAUTH_SECRET
 */

const authOptions: NextAuthOptions = {
  providers: [
    // GitHub OAuth Provider
    GithubProvider({
      clientId: process.env.GITHUB_ID || "demo_github_id",
      clientSecret: process.env.GITHUB_SECRET || "demo_github_secret",
    }),
    
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "demo_google_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "demo_google_secret",
    }),
    
    // Email Provider (Magic Links) - Only enable if properly configured
    ...(process.env.EMAIL_SERVER_HOST && process.env.EMAIL_SERVER_USER ? [
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: Number(process.env.EMAIL_SERVER_PORT) || 587,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM || "noreply@openimpact.org",
      })
    ] : []),
  ],
  
  // Customize pages for better integration with the app theme
  pages: {
    signIn: '/auth', // Use our custom auth page
  },
  
  // Callbacks for customizing session and JWT
  callbacks: {
    // The session callback is called whenever a session is checked
    async session({ session, token }) {
      // Add custom properties to session if needed
      if (session.user && token.sub) {
        // Add user ID from token to session
        session.user.id = token.sub
      }
      return session
    },
    
    // The JWT callback is called whenever a JWT is created, updated, or accessed
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account?.access_token) {
        token.accessToken = account.access_token
      }
      
      // Persist user id to token on initial sign in
      if (user) {
        token.sub = user.id
      }
      
      return token
    },
  },
  
  // Configure session strategy
  session: {
    strategy: "jwt",
  },
  
  // Enable debug messages in development
  debug: process.env.NODE_ENV === "development",
}

export default NextAuth(authOptions)