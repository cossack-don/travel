import { Methods, getBaseURL, ADAPTER_API_REQUEST } from "@/shared/api/axios"

export const serviceApp = {
	getAll: () => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL("/apps/get_list"),
			method: Methods.GET
		})
	},
	deleteById: (id: string | number) => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL(`/apps/${id}/delete`),
			method: Methods.DELETE
		})
	},
	getById: (id: string) => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL(`/apps/${id}`),
			method: Methods.GET
		})
	},
	create: ({ name, description }: { name: string; description: string }) => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL("/apps/create"),
			method: Methods.POST,
			data: {
				name,
				description
			}
		})
	}
}

const res = serviceApp.getAll().then(res => {
	console.log(res)
})

console.log(res)
