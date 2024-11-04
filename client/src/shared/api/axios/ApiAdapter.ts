import { customConfigAxios } from "@/shared/api/axios"
import { toast } from "react-toastify"

const listStatusesErrors = {
	STATUS_CODE_400: 400,
	STATUS_CODE_401: 401,
	STATUS_CODE_403: 403,
	STATUS_CODE_404: 404,
	STATUS_CODE_422: 422,
	STATUS_CODE_500: 500,
	STATUS_ERROR_NETWORK: "ERR_NETWORK"
}

const CUSTOM_CONFIG_AXIOS = customConfigAxios(import.meta.env.VITE_APP_URL || undefined)

export const ADAPTER_API_REQUEST = async config => {
	try {
		const response = await CUSTOM_CONFIG_AXIOS(config)
		// await toast.success("🦄 Status: SUCCESS API - Global", { position: "bottom-right" })

		return Promise.resolve({
			kind: "Success",
			...response
		})
	} catch (error: Error) {
		switch (error.response?.status) {
			case listStatusesErrors.STATUS_CODE_400:
				toast.error(`🦄 Status: ${listStatusesErrors.STATUS_CODE_400} ERROR-API - Global`)
				break
			case listStatusesErrors.STATUS_CODE_401:
				toast.error(`🦄 Status: ${listStatusesErrors.STATUS_CODE_401} ERROR-API - Global`)
				break
			case listStatusesErrors.STATUS_CODE_403:
				toast.error(`🦄 Status: ${listStatusesErrors.STATUS_CODE_403} ERROR-API - Global`)
				break
			case listStatusesErrors.STATUS_CODE_404:
				toast.error(`🦄 Status: ${listStatusesErrors.STATUS_CODE_404} ERROR-API - Global`)
				break
			case listStatusesErrors.STATUS_CODE_500:
				toast.error(`🦄 Status: ${listStatusesErrors.STATUS_CODE_500} ERROR-API - Global`)
				break
			default:
				if (error.code === listStatusesErrors.STATUS_ERROR_NETWORK) {
					toast.error(`🦄 Status: ${listStatusesErrors.STATUS_ERROR_NETWORK} ERROR-API - Global`)
				} else {
					toast.error(`🦄 Status: UNKNOW ERROR-API - Global`)
				}
				break
		}

		return Promise.reject(error)
	}
}
