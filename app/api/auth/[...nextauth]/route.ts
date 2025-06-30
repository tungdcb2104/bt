import NextAuth from "next-auth";
import KeycloakProvider, { type KeycloakProfile } from "next-auth/providers/keycloak";
import type { NextAuthOptions } from "next-auth";
import { OAuthConfig } from "next-auth/providers/oauth";

declare module 'next-auth/jwt' {
  interface JWT {
    accessTokenExpires: number; // Timestamp in milliseconds
    refreshToken?: string; // Optional, as it may not be provided by the provider
    error?: string; // Optional, to handle errors during token refresh
    id_token?: string;
    provider?: string;
  }
}

declare module 'next-auth' {
  interface Session {
    error?: string; // Optional, to handle errors during session
  }
}

async function refreshAccessToken(token: any) {
  try {
    const url = new URL(`${process.env.AUTH_API_URL}/protocol/openid-connect/token`);
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'grant_type': 'refresh_token',
        'client_id': process.env.AUTH_CLIENT_ID!,
        'client_secret': process.env.AUTH_CLIENT_SECRET!,
        'refresh_token': token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();
    
    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token if new one is not provided
      accessTokenExpires: Date.now() + (refreshedTokens.expires_in * 1000), // Convert seconds to milliseconds
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    // If the refresh token fails, we can return the original token or handle the error as needed
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
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
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + (account.expires_at! * 1000), // Convert seconds to milliseconds
          refreshToken: account.refresh_token,
          id_token: account.id_token,
          provider: account.provider,
        };
      }
      
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.error = token.error;
      return session;
    },
  },
  events: {
    signOut: async ({ token }) => {
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
