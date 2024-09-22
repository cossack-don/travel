import { useNavigate } from "react-router-dom"
import {
	UICard,
	UIButton,
	UILink,
	UIContainer,
	UIParagraphTypography,
	UIHeadingTypography,
	UICol
} from "@/shared/UI"
import { serviceApp } from "@/shared/api/transport"
import { useEffect, useState } from "react"
// import { getRandomColor } from "@/shared/helpers"
import { useBadResponse } from "@/shared/hooks"

const ListApps = () => {
	const [apps, setApps] = useState([])
	const [isBadRequest, setBadRequest] = useBadResponse()

	const apiGetListApps = async () => {
		try {
			setBadRequest(false)
			const { data } = await serviceApp.getAll()
			const lastFourElements = data.slice(-4)

			setApps(lastFourElements)
		} catch {
			setBadRequest(true)
		}
	}

	// const colorsArray = ["#eff9ff", "#ffd1ca", "#feeaf0", "#dcffe1", "#f0f9ff"]

	useEffect(() => {
		apiGetListApps()
	}, [])

	const handlerDeleteApp = async (id: string) => {
		await serviceApp.deleteById(id)
		await apiGetListApps()
	}

	return (
		<UIContainer listClasses="row between-xs">
			{isBadRequest && <div>Бекенд упал - заглушка</div>}
			{apps.map(item => {
				return (
					<UICol key={item.id} listClasses="col-xs-3">
						<UICard
							// listStyles={{ background: getRandomColor(colorsArray) }}
							header={`App: ${item.name}`}
							footer={
								<div style={{ display: "flex", justifyContent: "space-between" }}>
									<button onClick={() => handlerDeleteApp(item?.id)}>DEL App</button>
									<UILink color="blue" to={`/dashboard/app/${item.id}`}>
										Открыть
									</UILink>
								</div>
							}
							listClasses="mr-15 mb-15"
						>
							<UIParagraphTypography>
								Описание: <br />
								{item.description}
							</UIParagraphTypography>
							ID - {item.id}
						</UICard>
					</UICol>
				)
			})}
		</UIContainer>
	)
}

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
				<ListApps />
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
