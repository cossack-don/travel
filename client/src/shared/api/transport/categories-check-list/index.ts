import { Methods, AdapterApi, getBaseURL } from "@/shared/api/axios"

export const serviceCategoriesCheckList = {
	getAll: () => {
		return AdapterApi({
			url: getBaseURL("/categories"),
			method: Methods.GET
		})
	}
	// create: ({ name, description }: { name: string; description: string }) => {
	// 	return AdapterApi({
	// 		url: getBaseURL("/categories"),
	// 		method: Methods.POST,
	// 		data: {
	// 			name,
	// 			description
	// 		}
	// 	})
	// }
}
