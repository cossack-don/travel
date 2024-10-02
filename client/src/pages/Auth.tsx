import { UILink, UIInput, UIButton, UIContainer, UICol, UIHeadingTypography } from "@/shared/UI"
import { useNavigate } from "react-router-dom"
import styles from "./Auth.module.scss"

const Auth = () => {
	const navigate = useNavigate()

	const onSubmit = e => {
		e.preventDefault()

		navigate("/dashboard")
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
					<form onSubmit={onSubmit}>
						<UIInput placeholder="Логин" />
						<UIInput placeholder="Пароль" />
						<UIButton>Вход</UIButton>
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
