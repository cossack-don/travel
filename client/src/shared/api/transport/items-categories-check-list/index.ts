import { Methods, getBaseURL, ADAPTER_API_REQUEST } from "@/shared/api/axios"

export const serviceItemsCategoriesCheckList = {
	getAll: () => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL("/types_of_clothes"),
			method: Methods.GET
		})
	}
}
