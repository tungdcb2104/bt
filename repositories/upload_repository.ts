import { LearningRepository } from "./learning_repository";

export abstract class UploadRepository extends LearningRepository {
    public abstract uploadImage(file: File): Promise<string>;
    public abstract getImage(fileName: string): Promise<File | null>;
}

class UploadRepositoryImpl extends UploadRepository {
    public async uploadImage(file: File): Promise<string> {
        const formData = new FormData();
        formData.append('file', file);
        const res = await this.instance.post('/upload/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const data = res.data;
        const pattern = /File uploaded successfully, url: uploads\\(.*)/;
        const match = data.match(pattern);
        if (match && match[1]) {
            return match[1];
        } else {
            throw new Error("Failed to parse upload response");
        }
    }

    public async getImage(fileName: string): Promise<File | null> {
        try {
            const res = await this.instance.get(`/upload/image/${fileName}`, {
                responseType: 'blob'
            });
            
            const blob = new Blob([res.data], { type: res.headers['content-type'] });
            return new File([blob], fileName, { type: res.headers['content-type'] });
        } catch (error) {
            console.error(`Failed to fetch image ${fileName}:`, error);
            return null;
        }
    }
}

export const uploadRepository: UploadRepository = new UploadRepositoryImpl();