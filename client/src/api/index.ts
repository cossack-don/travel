import axios, { AxiosResponse,InternalAxiosRequestConfig } from "axios";

export interface ApiResponse extends AxiosResponse {
    kind:string
}

//TODO Доделать
export const customConfigAxios = ()=>{
    const api = axios.create({
        baseURL: "https://jsonplaceholder.typicode.com/posts",
        withCredentials:false
    });

    api.interceptors.request.use(
         (response):Promise<axios.InternalAxiosRequestConfig> => {
            return Promise.resolve({
                kind:'Success',
                ...response
            })
        },
         (error):Promise<ApiResponse> => {
            // Handle the error
            return Promise.reject({
                kind:"bad response",...error
            });
        }
    );

    return api
}



