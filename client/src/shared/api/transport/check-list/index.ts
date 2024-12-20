import { Methods, AdapterApi, getBaseURL } from "@/shared/api/axios"

export const serviceCheckList = {
	getAll: (idApp: number | string) => {
		return AdapterApi({
			url: getBaseURL(`/apps/${idApp}/check_list/`),
			method: Methods.GET
		})
	},
	deleteById: (idApp: number | string, idCheckList: number | string) => {
		return AdapterApi({
			url: getBaseURL(`/apps/${idApp}/check_list/${idCheckList}/delete`),
			method: Methods.DELETE
		})
	},
	create: (idApp: number | string, payload: any) => {
		return AdapterApi({
			url: getBaseURL(`/apps/${idApp}/check_list/create`),
			method: Methods.POST,
			params: {
				name: payload?.name,
				description: payload?.description
			}
		})
	},
	getById: (idApp: string | undefined, idCheckList: string | undefined) => {
		return AdapterApi({
			url: getBaseURL(`/apps/${idApp}/check_list/${idCheckList}`),
			method: Methods.GET
		})
	},
	changeFieldsEntity: (
		idApp: number | string,
		idCheckList: number | string
		// payload: any
	) => {
		return AdapterApi({
			url: getBaseURL(`/apps/${idApp}/check_list/${idCheckList}`),
			method: Methods.PUT
			// data or params pauload = {name:name,description:description}
		})
	},
	updateCurrentStep: (idApp: number | string, idCheckList: number | string, payload: any) => {
		return AdapterApi({
			url: getBaseURL(`/apps/${idApp}/check_list/${idCheckList}/`),
			method: Methods.PATCH,
			data: {
				sex: payload.sex,
				days: payload.days,
				destination: payload.destination,
				weather: payload.weather,
				trip_type: payload.trip_type
			}
		})
	},
	getListCards: (nameStep: string) => {
		return AdapterApi({
			url: getBaseURL(`/apps/check_list/list-cards/${nameStep}`),
			method: Methods.GET
		})
	},
	getListSteps: () => {
		return AdapterApi({
			url: getBaseURL(`/apps/check_list/list-steps`),
			method: Methods.GET
		})
	}
}
