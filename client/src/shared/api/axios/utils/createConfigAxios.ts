import { createCustomAxios, createInterceptorsResponse } from "../utils"

export const createConfigAxios = (baseURL: string) => {
	createInterceptorsResponse(baseURL)
	return createCustomAxios(baseURL)
}

export const CONFIG_AXIOS = createConfigAxios(import.meta.env.VITE_APP_URL || undefined)
