import { useParams } from "react-router-dom"
import { UIButton, UICol, UIContainer, UIHeadingTypography, UINavigation } from "@/shared/UI"
import {listNavigation} from "@/shared/UI/UINavigation/listNavigation";

const SettingApp = () => {
	const params = useParams()

	const onDeleteAppById = async (id: number) => {
		// await serviceApp.deleteById(id)
		// await apiGetListApps()
		console.log(id)
	}

	return (
		<UIContainer listClasses={'row'}>
			<UICol listClasses={"col-sm-3"}>
				<div>
					<UINavigation listNavigation={listNavigation} />
				</div>
			</UICol>

			<UICol listClasses={"col-sm-9"}>
				<UIContainer listClasses={"row"}>
					<UICol listClasses={"col-md-12"}>
						<UIHeadingTypography as='h2'>Настройки приложения</UIHeadingTypography>
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
