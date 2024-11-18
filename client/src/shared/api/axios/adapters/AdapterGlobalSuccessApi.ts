import { toast } from "react-toastify"

export const AdapterGlobalSuccessApi = (isGlobalToastWithSuccessResponse: boolean) => {
	if (isGlobalToastWithSuccessResponse) {
		toast.success("🦄 Status: SUCCESS API - Global", { position: "bottom-right" })
	}
}
