import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { NextAuthOptions } from "next-auth"


export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      authorization: {
        params: {
          scope: 'read:user user:email repo',
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // if (user) {
      //   token.userId = user.id
      // }
      if (account) {
        token.accessToken = account.access_token
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token, user }) {
      if (token) {
        session.accessToken = token.accessToken as string || undefined
        session.provider = token.provider as string || undefined
       
        if (session.user) {
          session.user.id = token.userId as string
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}


const handler = NextAuth(authOptions)


export { handler as GET, handler as POST }

