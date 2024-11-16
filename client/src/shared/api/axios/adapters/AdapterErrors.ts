import { toast } from "react-toastify"
import { listStatusesErrors } from "../utils"

export const AdapterErrors = (error: any) => {
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
}
