import { LearningRepository } from "./learning_repository";
import { userService } from "@/services/user_service";

export abstract class StudyRepository extends LearningRepository {
    public abstract study(): Promise<any>;
    public abstract evaluate(id: string): Promise<any>;
}

class StudyRepositoryImpl extends StudyRepository {
    public study(): Promise<any> {
        return this.instance.get('/study');
    }
    public evaluate() : Promise<any> {
        return this.instance.post('/study');
    }
}

export const studyRepository: StudyRepository = new StudyRepositoryImpl();