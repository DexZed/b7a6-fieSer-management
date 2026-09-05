import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './prisma.js';
import { openAPI } from 'better-auth/plugins';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
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
        type: ['ADMIN', 'CUSTOMER', 'TECHNICIAN', 'DISPATCHER'],
        required: true,
        defaultValue: 'CUSTOMER',
      },
      status: {
        type: ['ACTIVE', 'BANNED'],
        required: false,
        defaultValue: 'ACTIVE',
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
