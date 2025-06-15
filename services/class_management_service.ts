import { ClassModel } from "@/models/class_model";
import { ClassRequestModel } from "@/models/class_request_model";
import { classRepository, ClassRepository } from "@/repositories/class_repository";

class ClassManagementService {
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

    async getAllClasses(): Promise<Array<ClassModel>> {
        try {
            const listClasses = await this.classRepository.getClasses();
            return listClasses;
        } catch (error) {
            // console.error("Failed to fetch classes:", error);
            throw error;
        }
    }

    async updateClass(id: string, classData: ClassRequestModel): Promise<ClassModel> {
        try {
            const updatedClass = await this.classRepository.updateClass(id, classData);
            return updatedClass;
        } catch (error) {
            // console.error(`Failed to update class with id ${id}:`, error);
            throw error;
        }
    }

    async deleteClass(id: string): Promise<void> {
        try {
            await this.classRepository.deleteClass(id);
        } catch (error) {
            // console.error(`Failed to delete class with id ${id}:`, error);
            throw error;
        }
    }
}

export const classManagementService: ClassManagementService = new ClassManagementService(classRepository);