import NextAuth from "next-auth";
import KeycloakProvider, { type KeycloakProfile } from "next-auth/providers/keycloak";
import type { NextAuthOptions } from "next-auth";
import { type JWT } from "next-auth/jwt";
import { OAuthConfig } from "next-auth/providers/oauth";

declare module 'next-auth/jwt' {
  interface JWT {
    id_token?: string;
    provider?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.AUTH_CLIENT_ID!,
      clientSecret: process.env.AUTH_CLIENT_SECRET!,
      issuer: process.env.AUTH_API_URL!
    }),
  ],
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id_token = account.id_token;
        token.provider = account.provider || "keycloak";
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  events: {
    signOut: async ({session, token }: {session: any, token: any }) => {
      if (token.provider === "keycloak") {
        const issuerUrl = (authOptions.providers.find(p => p.id === "keycloak") as OAuthConfig<KeycloakProfile>).options!.issuer!
        const logOutUrl = new URL(`${issuerUrl}/protocol/openid-connect/logout`)
        logOutUrl.searchParams.set("id_token_hint", token.id_token!)
        await fetch(logOutUrl);
      }
    },
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
