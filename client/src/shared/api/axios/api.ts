import axios from "axios"

export const instance = axios.create({
	baseURL: "http://127.0.0.1:8000",
	withCredentials: false,
	params: {
		limit: 100
	}
})

export const getChecklist = {
	getList: () => {
		return instance.get("/api/v1/apps/get_list")
	},
	updateList: (data: any) => {
		return instance.post("/api/v1/apps/create", data)
	}
}
