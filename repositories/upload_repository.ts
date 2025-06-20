import { LearningRepository } from "./learning_repository";
import { userService } from "@/services/user_service";

export abstract class UploadRepository extends LearningRepository {
    public abstract uploadImage(file: File): Promise<any>;
    public abstract getImage(id: string): Promise<any>;
}

class UploadRepositoryImpl extends UploadRepository {
    public uploadImage(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    public getImage(id: String) : Promise<any> {
        throw new Error("Method not implemented.");
    }
}

export const uploadRepository: UploadRepository = new UploadRepositoryImpl();