import { UIContainer, UIHeadingTypography, UICol } from "@/shared/UI"

import { RenderListFourApps } from "@/features/App/RenderListFourApps"
import { RenderBannerInfo } from "@/features/BannerInfo/RenderBannerInfo"

const Dashboard = () => {
	return (
		<UIContainer listClasses={"row"}>
			<UICol listClasses={"col-lg-12 col-md-12 mb-25"}>
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
				<RenderListFourApps />
			</UICol>
		</UIContainer>
	)
}

export default Dashboard
