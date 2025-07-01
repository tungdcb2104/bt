import { ClassModel } from "@/models/class_model";
import { ClassRequestModel } from "@/models/class_request_model";
import { classRepository, ClassRepository } from "@/repositories/class_repository";

class CreateClassService {
    private classRepository: ClassRepository;

    constructor(classRepository: ClassRepository) {
        this.classRepository = classRepository;
    }

    async createClass(classData: ClassRequestModel): Promise<ClassModel> { 
        try {
            const newClass = await this.classRepository.createClass(classData);
            console.log("Class created successfully:", newClass);
            return newClass;
        } catch (error) {
            // console.error("Failed to create class:", error);
            throw error;
        }
    }
}

export const createClassService: CreateClassService = new CreateClassService(classRepository);