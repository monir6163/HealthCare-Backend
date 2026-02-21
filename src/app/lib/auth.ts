import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import { envConfig } from "../../config/env";
import { Role, UserStatus } from "../../generated/prisma/enums";
import { sendEmail } from "./mailService";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: envConfig.BETTER_AUTH_URL!,
  secret: envConfig.BETTER_AUTH_SECRET!,
  trustedOrigins: [envConfig.FRONTEND_URL!],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
  },

  // email verification can be enabled like this
  emailVerification: {
    sendOnSignIn: true,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },

  plugins: [
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          const user = await prisma.user.findUnique({
            where: { email },
          });
          if (user) {
            await sendEmail(
              email,
              "Verify your email",
              "otp",
              {
                name: user.name,
                otp,
              },
              [],
            );
          }
        }
      },
      expiresIn: 2 * 60, // 2 minutes
    }),
  ],

  // additional fields can be added to the user model like this
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: Role.PATIENT,
      },
      status: {
        type: "string",
        required: true,
        defaultValue: UserStatus.ACTIVE,
      },
      needPasswordChange: {
        type: "boolean",
        required: true,
        defaultValue: false,
      },
      isDeleted: {
        type: "boolean",
        required: true,
        defaultValue: false,
      },
      deletedAt: {
        type: "date",
        required: false,
        defaultValue: null,
      },
    },
  },
});
