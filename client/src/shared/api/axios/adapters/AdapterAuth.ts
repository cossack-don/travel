export const AdapterAuth = () => {
	interface IAuth {
		accessToken: string
		tokenType: string //TODO Сделать правильно чтобы приходил тип авторизации
	}

	const typeAuth = "Bearer"
	const authModel: IAuth = Object.freeze(JSON.parse(<string>localStorage.getItem("auth")))
	const token: string = authModel?.accessToken ? `${typeAuth} ${authModel?.accessToken}` : null

	return token
}
