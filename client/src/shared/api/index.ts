import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"

export interface ApiResponse extends AxiosResponse {
	kind: string
}

export const customConfigAxios = URL => {
	const api = axios.create({
		baseURL: URL,
		withCredentials: false
	})

	api.interceptors.response.use(
		(response): Promise<AxiosResponse> => {
			return Promise.resolve({
				kind: "Success",
				...response
			})
		},
		(error): Promise<ApiResponse> => {
			// Handle the error
			return Promise.reject({
				kind: "bad response",
				...error
			})
		}
	)

	return api
}
