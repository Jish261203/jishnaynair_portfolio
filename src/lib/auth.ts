import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import env from "@/config/env";
import { customSession } from "better-auth/plugins";

const baseUrl = env.BETTER_AUTH_URL;

export const auth = betterAuth({
  baseURL: baseUrl,
  secret: process.env.BETTER_AUTH_SECRET!, // generate with CLI: npx @better-auth/cli secret
  trustedOrigins: [baseUrl],

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
    expiresIn: 30 * 24 * 60 * 60, // 30 days in seconds
    rolling: true, // extend on activity
  },

  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },

  plugins: [
    customSession(async ({ user, session }) => {
      // Check if email is author email and update role if needed
      const authorEmail = "jish261203@gmail.com";
      const isAuthorEmail = user.email === authorEmail;

      let role = "GUEST" as "AUTHOR" | "GUEST";

      // If the email matches author email, set them as AUTHOR
      if (isAuthorEmail) {
        await prisma.user.update({
          where: { id: session.userId },
          data: { role: "AUTHOR" },
        });
        role = "AUTHOR";
      } else {
        // Otherwise get their current role
        const userRole = await prisma.user.findUnique({
          where: { id: session.userId },
          select: { role: true },
        });
        role = (userRole?.role ?? "GUEST") as "AUTHOR" | "GUEST";
      }

      return {
        role: role,
        user: user,
        session,
      };
    }),
  ],
});
