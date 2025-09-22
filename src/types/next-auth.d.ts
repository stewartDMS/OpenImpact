import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's unique identifier */
      id: string
      /** The user's name */
      name?: string | null
      /** The user's email address */
      email?: string | null
      /** The user's profile image URL */
      image?: string | null
    }
  }

  interface User {
    /** The user's unique identifier */
    id: string
    /** The user's email address */
    email: string
    /** The user's name */
    name?: string
    /** The user's profile image URL */
    image?: string
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** The user's unique identifier */
    sub: string
    /** OAuth access token */
    accessToken?: string
  }
}