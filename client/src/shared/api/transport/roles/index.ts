import { AdapterApi, getBaseURL, Methods } from "@/shared/api/axios"

export const serviceRoles = {
	getRoles: () => {
		return AdapterApi({
			url: getBaseURL("/roles"),
			method: Methods.GET
		})
	},
	postRoles: () => {
		return AdapterApi({
			url: getBaseURL("/roles"),
			method: Methods.POST
		})
	},
	updateRoles: () => {
		return AdapterApi({
			url: getBaseURL("/roles"),
			method: Methods.PUT
		})
	},
	deleteRoles: () => {
		return AdapterApi({
			url: getBaseURL("/role"),
			method: Methods.DELETE
		})
	}
}
