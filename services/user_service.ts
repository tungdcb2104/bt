import { Session } from "next-auth";
import { authRepository, AuthRepository } from "@/repositories/auth_repository";

export type UserServiceCallback = () => void;

class UserService {
    private authRepository: AuthRepository

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

  private listeners: Set<UserServiceCallback> = new Set();

  async login(): Promise<void> {
    await this.authRepository.signIn();
  }

  async logout(): Promise<void> {
    await this.authRepository.signOut();
    this.notifyListeners();
  }

  async getSession(): Promise<Session | null> {
    return await this.authRepository.getSession();
  }

  addListener(callback: UserServiceCallback): void {
    this.listeners.add(callback);
  }

  removeListener(callback: UserServiceCallback): void {
    this.listeners.delete(callback);
  }

  notifyListeners(): void {
    this.listeners.forEach(cb => cb());
  }
}

export const userService = new UserService(authRepository);
