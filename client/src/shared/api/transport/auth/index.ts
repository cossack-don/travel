import { AdapterApi, Methods, getBaseURL, BuilderErrors, listStatusesErrors } from "@/shared/api/axios"
import { toast } from "react-toastify"

export interface IAuth {
	username: string
	password: string
}

export const serviceAuth = {
	login: async (payload: IAuth) => {
		try {
			console.log(payload)
			const { data } = await AdapterApi(
				{
					url: getBaseURL("/login"),
					method: Methods.POST,
					headers: { "Content-Type": "multipart/form-data" },
					data: payload
				},
				undefined,
				true
			)

			if (data?.accessToken === null || data === null) {
				window.location.assign("/")
			} else {
				const auth = {
					accessToken: data.accessToken,
					tokenType: data.tokenType
				}

				localStorage.setItem("auth", JSON.stringify(auth))
				toast.success("Вы успешно авторизовались")
			}
		} catch (error) {
			BuilderErrors.addCurrentStatusError(error.response?.status)
				.addError404("Ошибка сервера")
				.addError400("Пароль неверный")
			return Promise.reject(error)
		}
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

		AdapterApi({
			url: getBaseURL("/logout"),
			method: Methods.POST
		})

		localStorage.removeItem("auth")

		if (localStorage.getItem("auth") === null) window.location.assign("/")
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
