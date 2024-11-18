import { CONFIG_AXIOS } from "../utils"
import { AdapterCase, AdapterErrors, AdapterGlobalSuccessApi } from "../adapters"
import { AxiosRequestConfig } from "axios"

export const AdapterApi = async (
	config: AxiosRequestConfig,
	isGenerateCamelCaste: boolean | undefined = true, // если хотим пропустить данный параметр = undefined
	isCustomErrors: boolean | undefined = false, //  если хотим пропустить данный параметр = undefined
	isGlobalToastWithSuccessResponse: boolean | undefined = false //  если хотим пропустить данный параметр = undefined
) => {
	try {
		const response = await CONFIG_AXIOS(config)
		AdapterGlobalSuccessApi(isGlobalToastWithSuccessResponse)
		console.log(response, 11)
		return AdapterCase(isGenerateCamelCaste, response)
	} catch (error: unknown) {
		if (!isCustomErrors) AdapterErrors(error)

		return Promise.reject(error)
	}
}
