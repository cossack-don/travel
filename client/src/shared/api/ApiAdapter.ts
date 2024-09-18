import { customConfigAxios } from "@/shared/api/index.ts"

const listStatusesErrors = {
	STATUS_CODE_400:400,
	STATUS_CODE_404:404,
	STATUS_CODE_500:500
}
export const ADAPTER_API_REQUEST = async (config,isGenerateCamelCase = false) => {
	try {
		const response = await customConfigAxios(config)

		if(isGenerateCamelCase) {
			// code
			// return Promise.resolve({
			// 	kind: "success",
			// 	...response
			// })
		}

		if(!isGenerateCamelCase) {
			return Promise.resolve({
				kind: "success",
				...response
			})
		}

	} catch (error) {

		if(error.response.status === listStatusesErrors.STATUS_CODE_400) {
			console.log('STATUS-API-GLOBAL',listStatusesErrors.STATUS_CODE_400)
		}

		if(error.response.status === listStatusesErrors.STATUS_CODE_404) {
			console.log('STATUS-API-GLOBAL',listStatusesErrors.STATUS_CODE_404)
		}

		if(error.response.status >= listStatusesErrors.STATUS_CODE_500) {
			console.log('STATUS-API-GLOBAL',listStatusesErrors.STATUS_CODE_500)
		}

		return Promise.reject(error)
	}
}
