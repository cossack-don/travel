import { customConfigAxios } from "@/shared/api/axios"
import { toast } from "react-toastify"

const listStatusesErrors = {
	STATUS_CODE_400: 400,
	STATUS_CODE_404: 404,
	STATUS_CODE_500: 500
}

const CUSTOM_CONFIG_AXIOS = customConfigAxios(import.meta.env.VITE_APP_URL || undefined)

export const ADAPTER_API_REQUEST = async config => {
	try {
		const response = await CUSTOM_CONFIG_AXIOS(config)
		await toast.success("🦄 Status: SUCCESS API - Global",{position:'bottom-right'})

		return Promise.resolve({
			kind: "Success",
			...response
		})
	} catch (error) {
		if (error.response.status === listStatusesErrors.STATUS_CODE_400) {
			console.log("STATUS-API-GLOBAL", listStatusesErrors.STATUS_CODE_400)
		}

		if (error.response.status === listStatusesErrors.STATUS_CODE_404) {
			console.log("STATUS-API-GLOBAL", listStatusesErrors.STATUS_CODE_404)
		}

		if (error.response.status >= listStatusesErrors.STATUS_CODE_500) {
			console.log("STATUS-API-GLOBAL", listStatusesErrors.STATUS_CODE_500)
		}

		toast.error("🦄 Status: ERROR-API - Global")
		return Promise.reject(error)
	}
}
