import { CONFIG_AXIOS } from "../utils"
import { AdapterCase, AdapterErrors, AdapterGlobalSuccessApi } from "../adapters"
import { AxiosRequestConfig } from "axios"

export const AdapterApi = async (
	config: AxiosRequestConfig,
	isGenerateCamelCaste?: boolean,
	isCustomErrors: boolean = false,
	isGlobalToastWithSuccessResponse: boolean = false
) => {
	try {
		const response = await CONFIG_AXIOS(config)
		AdapterGlobalSuccessApi(isGlobalToastWithSuccessResponse)

		return AdapterCase(isGenerateCamelCaste, response)
	} catch (error: any) {
		if (!isCustomErrors) AdapterErrors(error)

		return Promise.reject(error)
	}
}
