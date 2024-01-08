import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";

import { db } from "@/lib/db";

export const authOptions = {
  // Enable JSON Web Tokens since we will not store sessions in our DB
  session: {
    strategy: "jwt",
  },
  // Here we add our login providers - this is where you could add Google or Github SSO as well
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    CredentialsProvider({
      name: "credentials",
      // The credentials object is what's used to generate Next Auths default login page - We will not use it however.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Authorize callback is ran upon calling the signin function
      authorize: async (credentials) => {
        const user = await db.user.findUnique({
          where: { email: credentials.email },
          include: {
            socialMedia: true,
          },
        });

        if (!user) {
          throw new Error("No user with a matching email was found.");
        }

        const pwValid = await compare(credentials.password, user.password);

        if (!pwValid) {
          throw new Error("Your password is invalid");
        }

        const {
          password,
          accounts,
          sessions,
          places,
          Comment,
          Post,
          ...restOfUser
        } = user;
        return restOfUser;
      },
    }),
  ],
  // All of this is just to add user information to be accessible for our app in the token/session
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...session, ...session.user };
      }
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          ...session.user,
          ...token.user,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  adapter: PrismaAdapter(db),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
