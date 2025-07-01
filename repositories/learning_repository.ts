import { access } from "fs";
import { BaseRepository } from "./base_repository";
import { getSession, signIn, signOut } from "next-auth/react";

export abstract class LearningRepository extends BaseRepository {
  constructor() {
    super(process.env.NEXT_PUBLIC_LEARNING_API_URL);
    this.initRequestInterceptor();
    this.initResponseInterceptor();
  }

  protected initRequestInterceptor(): void {
    this.instance.interceptors.request.use(async (config) => {
      const session = await getSession();
      const token = session?.accessToken;

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    });
  }

  protected initResponseInterceptor(): void {
    console.log('Init response interceptor')
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const session = await getSession();

          // 👇 Nếu token đã refresh nhưng bị lỗi → đừng retry
          if (session?.error === "RefreshAccessTokenError") {
            console.warn("Cannot refresh token. Signing out.");
            await signOut({ callbackUrl: "/" });
            return Promise.reject(error);
          }

          if (session?.accessToken) {
            originalRequest.headers["Authorization"] = `Bearer ${session.accessToken}`;
            return this.instance(originalRequest);
          }

          await signOut({ callbackUrl: "/" });
        }

        return Promise.reject(error);
      }
    );
  }
}
