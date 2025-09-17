import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import type { NextAuthOptions } from 'next-auth'

const providers: NextAuthOptions['providers'] = []

// Add GitHub provider if configured
if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  )
}

// Add Google provider if configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  )
}

// Note: Email provider requires a database adapter and is excluded for this basic setup
// To add email authentication, you would need to configure a database adapter

export const authOptions: NextAuthOptions = {
  providers,
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    async session({ session, token }) {
      // Add custom properties to session if needed
      return session
    },
    async jwt({ token, account, profile }) {
      // Add custom properties to token if needed
      return token
    },
  },
}

export default NextAuth(authOptions)