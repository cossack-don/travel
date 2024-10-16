import { UILink, UIInput, UIButton, UIContainer, UICol, UIHeadingTypography } from "@/shared/UI"
import { useNavigate } from "react-router-dom"

const Registration = () => {
	const navigate = useNavigate()

	const onSubmit = e => {
		e.preventDefault()

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
					<form onSubmit={onSubmit}>
						<UIInput placeholder="Логин" />
						<UIInput placeholder="Пароль" />
						<UIButton>Вход</UIButton>
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
