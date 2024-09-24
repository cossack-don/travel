import { useNavigate } from "react-router-dom"
import { UIButton, UILink, UIContainer, UIHeadingTypography, UICol } from "@/shared/UI"

import { RenderListApps } from "@/features/App/RenderListApps"
import { RenderBannerInfo } from "@/features/BannerInfo/RenderBannerInfo"

const Dashboard = () => {
	const navigate = useNavigate()
	return (
		<UIContainer listClasses={"row"}>
			<UICol listClasses={"col-lg-12 col-md-12"}>
				<UIContainer listClasses={"row"}>
					<UICol listClasses={"col-lg-12 col-md-12"}>
						<UIHeadingTypography as="h2">Дашборд</UIHeadingTypography>
					</UICol>
				</UIContainer>
			</UICol>

			<UICol listClasses={"col-lg-12 col-md-12"}>
				<UIContainer listClasses={"row"}>
					<UICol listClasses={"col-lg-12 col-md-12 col-sm-12"}>
						<RenderBannerInfo />
					</UICol>
				</UIContainer>
			</UICol>

			<UICol listClasses={"col-lg-12 col-md-12"}>
				<UIContainer listClasses={"row"}>
					<UICol listClasses={"col-lg-12 col-md-12 col-sm-12"}>
						<UIButton onClick={() => navigate("/dashboard/create-app")}>Создать App</UIButton>
					</UICol>
				</UIContainer>
			</UICol>

			<UICol listClasses={"col-lg-12 col-md-12"}>
				<RenderListApps />
			</UICol>

			<UICol listClasses={"col-lg-12 col-md-12"}>
				<UIContainer listClasses={"row"}>
					<UICol listClasses={"col-lg-12 col-md-12 col-sm-12"}>
						<UILink to={"/dashboard/apps"}>Смотреть все Apps</UILink>
					</UICol>
				</UIContainer>
			</UICol>
		</UIContainer>
	)
}

export default Dashboard
