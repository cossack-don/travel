import { useParams } from "react-router-dom"
import { UIButton, UICol, UIContainer, UIHeadingTypography } from "@/shared/UI"

const SettingApp = () => {
	const params = useParams()

	const onDeleteAppById = async (id: number) => {
		// await serviceApp.deleteById(id)
		// await apiGetListApps()
		console.log(id)
	}

	return (
		<UIContainer>
			<UICol listClasses={"col-md-4"}>
				<UIContainer>
					<UICol>navigation</UICol>
				</UIContainer>
			</UICol>

			<UICol listClasses={"col-md-8"}>
				<UIContainer>
					<UICol listClasses={"col-md-12"}>
						<UIHeadingTypography>Настройки приложения</UIHeadingTypography>
					</UICol>

					<UICol listClasses={"col-md-12"}>
						ID: {params.id} <br />
						<UIButton isLoading={true} type="danger" onClick={() => onDeleteAppById(params.id)}>
							Удалить приложение
						</UIButton>
					</UICol>
				</UIContainer>
			</UICol>
		</UIContainer>
	)
}

export default SettingApp
