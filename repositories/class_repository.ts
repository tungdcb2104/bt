import { ClassModel } from "@/models/class_model";
import { LearningRepository } from "./learning_repository";
import { ClassRequestModel } from "@/models/class_request_model";

export abstract class ClassRepository extends LearningRepository {
    public abstract getClasses(name?: string, categories?: string): Promise<ClassModel[]>;
    public abstract getClassById(id: string): Promise<ClassModel>;
    public abstract createClass(data: ClassRequestModel): Promise<ClassModel>;
    public abstract updateClass(id: string, data: ClassRequestModel): Promise<ClassModel>;
    public abstract deleteClass(id: string): Promise<void>;
    public abstract getLearningClasses(): Promise<any>;
    public abstract registerClass(id: string): Promise<any>;
    public abstract unregisterClass(id: string): Promise<any>;
}

class ClassRepositoryImpl extends ClassRepository {
    public async getClasses(name?: string , categories?: string): Promise<Array<ClassModel>> {
        const response = this.instance.get('/clazz', {
            params: {
                name: name,
                categories: categories
            }
        });
        return response.then(res => res.data);
    }

    public async getClassById(id: string): Promise<ClassModel> {
        const response = this.instance.get(`/clazz/${id}`);
        return response.then(res => res.data);
    }

    public async createClass(data: ClassRequestModel): Promise<ClassModel> {
        const response = this.instance.post('/clazz', data);
        return response.then(res => res.data);
    }

    public async updateClass(id: string, data: ClassRequestModel): Promise<ClassModel> {
        const response = this.instance.put(`/clazz/${id}`, data);
        return response.then(res => res.data);
    }

    public async deleteClass(id: string): Promise<void> {
        return this.instance.delete(`/clazz/${id}`);
    }

    public async getLearningClasses(): Promise<any> {
        return this.instance.get('/clazz/learning-classes');
    }

    public async registerClass(id: string): Promise<any> {
        return this.instance.post(`/clazz/${id}/register`);
    }

    public async unregisterClass(id: string): Promise<any> {
        return this.instance.post(`/clazz/${id}/register`);
    }
    
}

export const classRepository: ClassRepository = new ClassRepositoryImpl();