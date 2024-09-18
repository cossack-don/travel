import { ADAPTER_API_REQUEST } from "@/shared/api/ApiAdapter"
import { Methods } from "@/shared/api/Methods"

//
export const serviceApp = {
	getAll: (payload: any) => {
		return ADAPTER_API_REQUEST({
			url: "1",
			methods: Methods.GET
			// params
			// data
		})
	}
}
