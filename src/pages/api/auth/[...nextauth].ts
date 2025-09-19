import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

/**
 * NextAuth.js v5 configuration for OpenImpact application
 * 
 * Configures authentication providers:
 * - GitHub OAuth (for developer/tech users)
 * - Google OAuth (for general users)
 * 
 * Note: Email provider removed as it requires a database adapter in v5
 * 
 * Environment variables required:
 * - AUTH_GITHUB_ID, AUTH_GITHUB_SECRET (or GITHUB_ID, GITHUB_SECRET for backward compatibility)
 * - AUTH_GOOGLE_CLIENT_ID, AUTH_GOOGLE_CLIENT_SECRET (or GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
 * - NEXTAUTH_URL, NEXTAUTH_SECRET
 */
const handler = NextAuth({
  providers: [
    // GitHub OAuth Provider
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID || process.env.GITHUB_ID || "demo_github_id",
      clientSecret: process.env.AUTH_GITHUB_SECRET || process.env.GITHUB_SECRET || "demo_github_secret",
    }),
    
    // Google OAuth Provider
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || "demo_google_id",
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET || "demo_google_secret",
    }),
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
        (session.user as any).id = token.sub
      }
      return session
    },
    
    // The JWT callback is called whenever a JWT is created, updated, or accessed
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
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
})

export { handler as GET, handler as POST }
export default handler