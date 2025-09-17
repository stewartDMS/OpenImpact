import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Demo Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "demo" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Demo authentication - username: "demo", password: "password"
        if (credentials?.username === "demo" && credentials?.password === "password") {
          return {
            id: "1",
            name: "Demo User",
            email: "demo@openimpact.dev",
            image: null,
          }
        }
        return null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})