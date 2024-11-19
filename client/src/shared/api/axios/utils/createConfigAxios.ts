import axios, { AxiosResponse } from "axios"
import { AdapterAuth } from "../adapters"

export interface ApiResponse extends AxiosResponse {
	kind: string
}

export const createConfigAxios = (baseURL: string) => {
	const config = {
		baseURL: baseURL,
		withCredentials: false,
		timeout: 3000,
		headers: {
			"Content-Type": "application/json"
		}
	}

	const api = axios.create(config)

	api.interceptors.request.use(
		function (config) {
			config.headers.Authorization = AdapterAuth()
			return config
		},
		function (error) {
			return Promise.reject({
				kind: "Error request",
				...error
			})
		}
	)

	api.interceptors.response.use(
		(response): Promise<AxiosResponse> => {
			return Promise.resolve({
				kind: "Response success",
				...response
			})
		},
		(error): Promise<ApiResponse> => {
			return Promise.reject({
				kind: "Error response",
				...error
			})
		}
	)

	return api
}

export const CONFIG_AXIOS = createConfigAxios(import.meta.env.VITE_APP_URL || undefined)
