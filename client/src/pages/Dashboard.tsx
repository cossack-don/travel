import { useNavigate } from "react-router-dom"
import {
	UIButton,
	UILink,
	UIContainer,
	UIParagraphTypography,
	UIHeadingTypography,
	UICol
} from "@/shared/UI"

import { RenderListApps } from "@/features/App/RenderListApps"

const BlockInformation = () => {
	return (
		<div
			style={{
				borderRadius: "var(--border-radius-16)",
				// margin: "0 auto",
				background: "var(--blue)",
				color: "white",
				padding: "30px"
			}}
		>
			<UIHeadingTypography>Инструкция по функционалу</UIHeadingTypography>
			<UIParagraphTypography>описание</UIParagraphTypography>
		</div>
	)
}
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
						<BlockInformation />
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
