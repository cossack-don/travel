import { AdapterApi, Methods, getBaseURL } from "@/shared/api/axios"

export const serviceAuth = {
	login: () => {
		// Логинимся
		return AdapterApi({
			url: getBaseURL("/login"),
			method: Methods.POST,
			headers: { "Content-Type": "multipart/form-data" },
			data: {
				username: "unforgivableshud@forcify.store",
				password: "123456"
			}
		})
	},
	registration: () => {
		// Регистрируем пользователя
		return AdapterApi({
			url: getBaseURL("/register"),
			method: Methods.POST,
			headers: { "Content-Type": "multipart/form-data" },
			data: {
				username: "unforgivableshud@forcify.store",
				password: "123456"
			}
		})
	},
	logout: () => {
		// Выходим из приложения
		return AdapterApi({
			url: getBaseURL("/logout"),
			method: Methods.POST
		})
	},
	resetPassword: () => {
		// Сброс пароля
		return AdapterApi({
			url: getBaseURL("/reset-password"),
			method: Methods.POST
		})
	},
	profile: () => {
		// Инфа о текущем пользователе
		return AdapterApi({
			url: getBaseURL("/users/me"),
			method: Methods.GET
		})
	},

	// TODO =======
	requestVerifyToken: () => {
		return AdapterApi({
			url: getBaseURL("/request-verify-token"),
			method: Methods.POST
		})
	},
	verify: () => {
		return AdapterApi({
			url: getBaseURL("/verify"),
			method: Methods.POST
		})
	},
	forgotPassword: () => {
		return AdapterApi({
			url: getBaseURL("/forgot-password"),
			method: Methods.POST
		})
	}
}
