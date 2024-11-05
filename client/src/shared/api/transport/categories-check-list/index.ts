import { Methods, getBaseURL, ADAPTER_API_REQUEST } from "@/shared/api/axios"

export const serviceCategoriesCheckList = {
	getAll: () => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL("/categories"),
			method: Methods.GET
		})
	}
	// create: ({ name, description }: { name: string; description: string }) => {
	// 	return ADAPTER_API_REQUEST({
	// 		url: getBaseURL("/categories"),
	// 		method: Methods.POST,
	// 		data: {
	// 			name,
	// 			description
	// 		}
	// 	})
	// }
}
