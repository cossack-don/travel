import { AdapterApi, Methods, getBaseURL } from "@/shared/api/axios"

export const serviceApp = {
	getAll: () => {
		return AdapterApi({
			url: getBaseURL("/apps/get_list"),
			method: Methods.GET
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
