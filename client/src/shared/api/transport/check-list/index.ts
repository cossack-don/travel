import { Methods, getBaseURL, ADAPTER_API_REQUEST } from "@/shared/api/axios"

export const serviceCheckList = {
	getAll: (idApp: number | string) => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL(`/apps/${idApp}/check_list/`),
			method: Methods.GET
		})
	},
	deleteById: (idApp: number | string, idCheckList: number | string) => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL(`/apps/${idApp}/check_list/${idCheckList}/delete`),
			method: Methods.DELETE
		})
	},
	create: (
		idApp: number | string
		// payload: any
	) => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL(`/apps/${idApp}/check_list/create`),
			method: Methods.POST
			// data or params pauload = {name:name,description:description}
		})
	},
	getById: (idApp: number | string, idCheckList: number | string) => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL(`/apps/${idApp}/check_list/${idCheckList}`),
			method: Methods.GET
			// data or params pauload = {name:name,description:description}
		})
	},
	changeFieldsEntity: (
		idApp: number | string,
		idCheckList: number | string
		// payload: any
	) => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL(`/apps/${idApp}/check_list/${idCheckList}`),
			method: Methods.PUT
			// data or params pauload = {name:name,description:description}
		})
	},
	getAppId: (app_id: string) => {
		return ADAPTER_API_REQUEST({
			url: getBaseURL(`/apps/${app_id}`),
			method: Methods.GET
		})
	}
}
