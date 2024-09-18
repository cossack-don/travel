import axios, { AxiosResponse } from "axios"

export interface ApiResponse extends AxiosResponse {
	kind: string
}

export const customConfigAxios = baseURL => {

	const api = axios.create({
		baseURL: baseURL,
		withCredentials: false,
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
