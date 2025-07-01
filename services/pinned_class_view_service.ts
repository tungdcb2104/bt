import { ClassModel } from "@/models/class_model";
import { classRepository, ClassRepository } from "@/repositories/class_repository";

class PinnedClassViewService {
    private classRepository: ClassRepository;

    constructor(classRepository: ClassRepository) {
        this.classRepository = classRepository;
    }

    async getClasses() {
        try {
            const classes = await classRepository.getPinnedClass()
            return classes
        } catch (error) {
            throw error
        }
    }

    async unpinClass(id: number) {
        try {
            await this.classRepository.unpinClass(id.toString(10));
        } catch (error) {
            throw error
        }
    }
}

export const pinnedClassViewService: PinnedClassViewService = new PinnedClassViewService(classRepository);