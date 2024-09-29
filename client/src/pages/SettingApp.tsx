import { useParams } from "react-router-dom"
import { UIButton, UICol, UIContainer, UIHeadingTypography, UINavigation } from "@/shared/UI"

const SettingApp = () => {
	const params = useParams()

	const onDeleteAppById = async (id: number) => {
		// await serviceApp.deleteById(id)
		// await apiGetListApps()
		console.log(id)
	}

	return (
		<UIContainer>
			<UICol listClasses={"col-sm-3"}>
				<UIContainer listClasses={"row"}>
					<UICol listClasses={"col-sm-12"}>
						<div>
							<UINavigation />
						</div>
					</UICol>
				</UIContainer>
			</UICol>

			<UICol listClasses={"col-sm-9"}>
				<UIContainer listClasses={"row"}>
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
