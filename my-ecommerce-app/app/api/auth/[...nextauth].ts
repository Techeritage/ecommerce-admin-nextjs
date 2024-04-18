import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import dotenv from "dotenv";
dotenv.config();

// Type definitions for environment variables (optional)
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
    }
  }
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);