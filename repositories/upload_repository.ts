import { LearningRepository } from "./learning_repository";

export abstract class UploadRepository extends LearningRepository {
    public abstract uploadImage(file: File): Promise<any>;
    public abstract getImage(id: string): Promise<any>;
}

class UploadRepositoryImpl extends UploadRepository {
    public uploadImage(file: File): Promise<any> { 
        throw new Error("Method not implemented.");
    }
    public getImage(id: String) : Promise<any> {
        throw new Error("Method not implemented.");
    }
}

export const uploadRepository: UploadRepository = new UploadRepositoryImpl();