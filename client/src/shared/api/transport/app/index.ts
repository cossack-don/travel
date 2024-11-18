import { AdapterApi, Methods, getBaseURL } from "@/shared/api/axios"

export const serviceApp = {
	getAll: () => {
		return AdapterApi({
			url: getBaseURL("/apps/get_list"),
			method: Methods.GET
			// timeout: 100,
			// signal: AbortSignal.timeout(100),
			// validateStatus: function (status) {
			// 	console.log(status, 1)
			// 	return status >= 200 && status < 300 // default
			// }
			// transformResponse: [
			// 	function (data) {
			// 		// Do whatever you want to transform the data
			// 		console.log(typeof data)
			// 		return data
			// 	}
			// ]
		})
	},
	deleteById: (id: string | number) => {
		return AdapterApi({
			url: getBaseURL(`/apps/${id}/delete`),
			method: Methods.DELETE
		})
	},
	getById: (id: string) => {
		return AdapterApi({
			url: getBaseURL(`/apps/${id}`),
			method: Methods.GET
		})
	},
	create: ({ name, description }: { name: string; description: string }) => {
		return AdapterApi({
			url: getBaseURL("/apps/create"),
			method: Methods.POST,
			data: {
				name,
				description
			}
		})
	}
}
