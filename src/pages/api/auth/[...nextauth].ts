import NextAuth, { NextAuthOptions, User } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

// In-memory user store for development - replace with database in production
const users: Array<{
  id: string
  email: string
  name: string
  password?: string
  image?: string
}> = []

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        name: { label: 'Name', type: 'text', optional: true },
        isSignUp: { label: 'Is Sign Up', type: 'text', optional: true }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        const isSignUp = credentials.isSignUp === 'true'
        const existingUser = users.find(user => user.email === credentials.email)

        if (isSignUp) {
          // Handle sign up
          if (existingUser) {
            throw new Error('User already exists with this email')
          }

          if (!credentials.name) {
            throw new Error('Name is required for sign up')
          }

          const hashedPassword = await bcrypt.hash(credentials.password, 12)
          const newUser = {
            id: Date.now().toString(),
            email: credentials.email,
            name: credentials.name,
            password: hashedPassword,
          }

          users.push(newUser)

          return {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
          }
        } else {
          // Handle sign in
          if (!existingUser) {
            throw new Error('No account found with this email')
          }

          if (!existingUser.password) {
            throw new Error('Please sign in with Google or create a password account')
          }

          const isValidPassword = await bcrypt.compare(credentials.password, existingUser.password)
          if (!isValidPassword) {
            throw new Error('Invalid password')
          }

          return {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
          }
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle Google OAuth sign-ins
      if (account?.provider === 'google') {
        const existingUser = users.find(u => u.email === user.email)
        if (!existingUser && user.email && user.name) {
          // Create new user for Google sign-in
          users.push({
            id: Date.now().toString(),
            email: user.email,
            name: user.name,
            image: user.image || undefined,
          })
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
  session: {
    strategy: 'jwt',
  },
}

export default NextAuth(authOptions)