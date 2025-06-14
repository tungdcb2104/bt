import { signIn, signOut, getSession } from 'next-auth/react';

export interface AuthRepository {
    signIn(): Promise<void>;
    signOut(): Promise<void>;
    getSession(): Promise<any>;
}

class AuthRepositoryImpl implements AuthRepository {
    constructor() {
        this.getSession();
    }

    async signIn(): Promise<void> {
        await signIn('keycloak'); // Redirect flow
    }

    async signOut(): Promise<void> {
        await signOut(); // redirect đến logout của Keycloak nếu cấu hình
    }

    async getSession(): Promise<any> {
        return await getSession();
    }
}

export const authRepository: AuthRepository = new AuthRepositoryImpl();
