import { UILink, UIInput, UIButton, UIContainer, UICol, UIHeadingTypography } from "@/shared/UI"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const Registration = () => {
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

	return (
		<UIContainer listClasses="row center-sm">
			<UICol listClasses={"col-sm-12"}>
				<div>
					<UIHeadingTypography>Регистрация</UIHeadingTypography>
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
					<UILink to={"/auth"}>Авторизация</UILink>
					<UILink to={"/reset-password"}>Сброс пароля</UILink>
				</div>
			</UICol>
		</UIContainer>
	)
}

export default Registration
