import axios, { AxiosInstance } from 'axios';

export abstract class BaseRepository {
    protected readonly instance: AxiosInstance;

    constructor(baseUrl: string | undefined) {
        console.log("BaseRepository initialized with baseUrl:", baseUrl);
        this.instance = axios.create({
            baseURL: baseUrl,
            withCredentials: true
        });
        this.initRequestInterceptor();
        this.initResponseInterceptor();
    }

    protected initRequestInterceptor() {};

    protected initResponseInterceptor() {};
}