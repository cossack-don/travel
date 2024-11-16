import { Methods, getBaseURL, AdapterApi } from "@/shared/api/axios"

export const serviceItemsCategoriesCheckList = {
	getAll: () => {
		return AdapterApi({
			url: getBaseURL("/types_of_clothes"),
			method: Methods.GET
		})
	}
}
