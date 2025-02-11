import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/utils/connect";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma), // Gunakan Prisma Adapter
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials;

          // Cari user berdasarkan email
          const user = await prisma.user.findUnique({ where: { email } });

          if (!user) {
            throw new Error("Email atau password salah");
          }

          // Bandingkan password yang diinput dengan yang ada di database
          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            throw new Error("Email atau password salah");
          }

          // Kembalikan data user jika login berhasil
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          };
        } catch (error) {
          console.error("Login error:", error);
          throw new Error("Email atau password salah");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login", // Gunakan halaman login custom
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.image = user.image || "/user-icon.png"; // Jika tidak ada foto, gunakan default
        token.role = user.role || "user"; // Default role jika tidak ada
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl; // Redirect ke halaman utama setelah login
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
