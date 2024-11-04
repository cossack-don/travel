import { ADAPTER_API_REQUEST, getBaseURL, Methods } from "@/shared/api/axios"

export const stepperApi = {
	getStepsElement: (link: string) => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL(`/apps/current/check_list/current/${link}`),
			method: Methods.GET
		})
	}
}
