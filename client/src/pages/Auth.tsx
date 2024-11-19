import { UILink, UIInput, UIButton, UIContainer, UICol, UIHeadingTypography } from "@/shared/UI"
import { useNavigate } from "react-router-dom"
import styles from "./Auth.module.scss"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { IAuth, serviceAuth } from "@/shared/api/transport"
import { useEffect, useState } from "react"
import { useOnMountedValidateAuth } from "@/shared/hooks"

const mockUser = {
	username: "test@yandex.ru",
	password: "123456"
}

const Auth = () => {
	const [userName, setUserName] = useState(mockUser.username)
	const [password, setPassword] = useState(mockUser.password)
	const navigate = useNavigate()

	useOnMountedValidateAuth()

	const schema = z.object({
		username: z.string().min(3, "Логин обязателен! Минимум 3 символа"),
		password: z.string().min(3, "Пароль должен содержать минимум 3 символов")
	})

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(schema)
	})

	const onSubmit = async (data: IAuth) => {
		await serviceAuth.login(data)
		await navigate("/dashboard")
	}

	return (
		<UIContainer listClasses={`row center-sm ${styles.wrapper}`}>
			<UICol listClasses={"col-sm-12"}>
				<div>
					<UIHeadingTypography>Авторизация</UIHeadingTypography>
				</div>
			</UICol>
			<UICol listClasses={"col-sm-4"}>
				<div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<UIInput
							label={"Логин"}
							onInput={e => setUserName(e.target.value)}
							value={userName}
							placeholder="Логин"
							validation={register("username", { minLength: 3 })}
						/>
						{errors.username ? <p style={{ color: "red" }}>{errors.username.message as string}</p> : null}
						<UIInput
							label={"Пароль"}
							onInput={e => setPassword(e.target.value)}
							value={password}
							type="password"
							placeholder="Пароль"
							validation={register("password")}
						/>
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
