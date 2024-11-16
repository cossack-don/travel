import { createCustomAxios } from "../utils"
import { AxiosResponse } from "axios"

export interface ApiResponse extends AxiosResponse {
	kind: string
}
export const createInterceptorsResponse = (baseURL: string) => {
	createCustomAxios(baseURL).interceptors.response.use(
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
}
