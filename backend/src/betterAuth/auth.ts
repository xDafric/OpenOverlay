import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/db.js";
import {
  account,
  invitation,
  member,
  session,
  user,
  verification,
  workspace,
} from "../modules/auth/auth.schema.js";
import { env } from "@/config/config.js";
import {
  admin as adminPlugin,
  createAuthMiddleware,
  organization,
} from "better-auth/plugins";
import { Mail } from "@/utils/mail.js";
import { ac, roles } from "./permissions.js";
import { userService } from "@/modules/user/user.service.js";

const mailService = new Mail();

export const auth = betterAuth({
  trustedOrigins: [env.url],
  baseURL: env.local ? "http://localhost:3000" : env.url,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: user,
      account: account,
      session: session,
      verification: verification,
      member: member,
      workspace: workspace,
      invitation: invitation,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      mailService.sendMail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
        html: `<p>Click this <a href="${url}">Link</a> to verify your email</p>`,
      });
    },
    afterEmailVerification: async (user, request) => {
      console.log(`${user.email} has been successfully verified!`);
      userService.setRole(user.id, "verifiedUser");
    },
    sendOnSignUp: true,
  },
  socialProviders: {
    google: {
      clientId: env.authProvicers.google.clientId,
      clientSecret: env.authProvicers.google.clientSecret,
    },
  },
  plugins: [
    adminPlugin({
      ac,
      roles: {
        user: roles.user,
        verifiedUser: roles.verifiedUser,
        admin: roles.admin,
      },
      defaultRole: "user",
    }),
    organization({
      organizationLimit: 1,
      requireEmailVerificationOnInvitation: true,
      dynamicAccessControl: {
        enabled: true,
      },
      ac,
      schema: {
        organization: {
          modelName: "workspace",
        },
      },
    }),
  ],
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      //set verifiedUser role for social login
      if (ctx.path === "/callback/:id") {
        if (
          ctx.context.newSession &&
          ctx.context.newSession.user.role == "user" &&
          ctx.context.newSession.user.emailVerified
        ) {
          userService.setRole(ctx.context.newSession.user.id, "verifiedUser");
        }
      }
      return;
    }),
  },
});
