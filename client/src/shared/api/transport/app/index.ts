import { Methods,getBaseURL,ADAPTER_API_REQUEST } from "@/shared/api/axios"

export const serviceApp = {
	getAll: () => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL("/apps/get_list"),
			method: Methods.GET
		})
	},
	deleteById: (id:string) => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL("/apps/delete"),
			method: Methods.DELETE,
			params:{id}
		})
	},
	getById:(id:string) => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL(`/apps/${id}`),
			method: Methods.GET,
		})
	},
	create:(payload:any) => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL('/apps/create'),
			method: Methods.POST,
			data:{
				"name": "Название приложения",
				"description": "Описание"
			}
		})
	}
}



