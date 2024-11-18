import { UILink, UIInput, UIButton, UIContainer, UICol, UIHeadingTypography } from "@/shared/UI"
import { useNavigate } from "react-router-dom"
import styles from "./Auth.module.scss"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { serviceApp, serviceAuth } from "@/shared/api/transport"

const Auth = () => {
	const navigate = useNavigate()

	const schema = z.object({
		login: z.string().min(3, "Логин обязателен! Минимум 3 символа"),
		password: z.string().min(6, "Пароль должен содержать минимум 6 символов")
	})

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(schema)
	})

	const onSubmit = (data: any) => {
		console.log("Данные для регистрации:", data)

		navigate("/dashboard")
	}

	const testAuth = async () => {
		const { data } = await serviceAuth.login()

		const auth = {
			accessToken: data.accessToken,
			tokenType: data.tokenType
		}

		//проверка нужна
		localStorage.setItem("auth", JSON.stringify(auth))
		console.log(JSON.parse(localStorage.getItem("auth")))
		// console.log("AUTH", auth)
		await serviceApp.getAll()
	}
	return (
		<UIContainer listClasses={`row center-sm ${styles.wrapper}`}>
			<button onClick={testAuth}>Test Auth</button>
			<UICol listClasses={"col-sm-12"}>
				<div>
					<UIHeadingTypography>Авторизация</UIHeadingTypography>
				</div>
			</UICol>
			<UICol listClasses={"col-sm-4"}>
				<div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<UIInput placeholder="Логин" validation={register("login", { minLength: 3 })} />
						{errors.login ? <p style={{ color: "red" }}>{errors.login.message as string}</p> : null}
						<UIInput type="password" placeholder="Пароль" validation={register("password")} />
						{errors.password ? <p style={{ color: "red" }}>{errors.password.message as string}</p> : null}
						<UIButton type="submit">Вход</UIButton>
					</form>
				</div>
			</UICol>
			<UICol listClasses={"col-sm-12"}>
				<div>
					<UILink to={"/registration"}>Регистрация</UILink>
					<UILink to={"/reset-password"}>Сброс пароля</UILink>
				</div>
			</UICol>
		</UIContainer>
	)
}

export default Auth
