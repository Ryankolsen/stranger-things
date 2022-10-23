import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers

  adapter: PrismaAdapter(prisma),

  //TODO fix ts ignore if possible
  providers: [
    DiscordProvider({
      // @ts-ignore
      clientId: process.env.DISCORD_CLIENT_ID,
      //@ts-ignore
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
