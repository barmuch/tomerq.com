
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./connect"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    
    }) 
  ],
  callbacks: {
    async session({ session, user }) {
      // Menyimpan user ID di sesi
      session.user.id = user.id;
      session.user.email = user.email;
      session.user.image = user.image
      return session;
    }
  }
}