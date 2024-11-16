import axios from "axios"

export const createCustomAxios = (baseURL: string) => {
	return axios.create({
		baseURL: baseURL,
		withCredentials: false
	})
}
