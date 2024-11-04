import { useNavigate, useParams } from "react-router-dom"
import { UIButton, UICol, UIContainer, UIHeadingTypography, UINavigation } from "@/shared/UI"
import { listNavigation } from "@/shared/UI/UINavigation/listNavigation"
import { serviceApp } from "@/shared/api/transport"
import { useState } from "react"
import { toast } from "react-toastify"

const SettingApp = () => {
	const params = useParams()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)

	const onDeleteAppById = async (id: number) => {
		try {
			setIsLoading(true)
			await serviceApp.deleteById(id)
			await navigate("/dashboard")
			await toast.success("🦄 Status: Событие успешно удалено", { position: "bottom-right" })
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<UIContainer listClasses={"row"}>
			<UICol listClasses={"col-sm-12"}>
				<UIContainer listClasses={"row"}>
					<UICol listClasses={"col-md-12"}>
						<UIHeadingTypography as="h2">Настройки приложения</UIHeadingTypography>
					</UICol>

					<UICol listClasses={"col-md-12"}>
						<UIButton isLoading={isLoading} type="danger" onClick={() => onDeleteAppById(params.id)}>
							Удалить приложение
						</UIButton>
					</UICol>
				</UIContainer>
			</UICol>
		</UIContainer>
	)
}

export default SettingApp
