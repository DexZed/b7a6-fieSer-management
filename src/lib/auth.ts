import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { openAPI } from 'better-auth/plugins';
import { DatabaseService } from '../database/database.service.js';

export const auth = betterAuth({
  database: prismaAdapter(DatabaseService, {
    provider: 'postgresql',
  }),
  baseURL: {
    allowedHosts: ['http://localhost:3000', '*.vercel.app'],
    protocol: process.env.NODE_ENV! === 'development' ? 'http' : 'https',
  },
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: ['student', 'teacher', 'admin'],
        required: true,
        defaultValue: 'student',
        input: true, // Allow role to be set during registration
      },
      imageCldPubId: {
        type: 'string',
        required: false,
        input: true, // Allow imageCldPubId to be set during registration
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60, // 1 minute
    },
  },
  advanced: {
    database: {
      joins: true,
    },
  },
  plugins: [openAPI()],
  trustedOrigins: [
    'http://localhost:3000',
    '*.vercel.app',
    'chrome-extension://',
    'vscode-webview://',
  ],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
