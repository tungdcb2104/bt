import { BaseRepository } from "./base_repository";
import { getSession, signOut } from "next-auth/react";

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
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  });
}

protected initResponseInterceptor(): void {
  this.instance.interceptors.response.use(
    response => response,
    async (error) => {
      if (error.response?.status === 401) {
        await signOut({ callbackUrl: "/" });
        return;
      }

      return Promise.reject(error);
    }
  );
}
}