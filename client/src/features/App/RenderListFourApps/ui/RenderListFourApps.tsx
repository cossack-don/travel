import { ListApps } from "@/entities/App"
import { useEffect, useState } from "react"
import { serviceApp } from "@/shared/api/transport"
import { useBadResponse } from "@/shared/hooks"
import { UIButton, UICol, UIContainer, UILink } from "@/shared/UI"
import { useNavigate } from "react-router-dom"
import NotFoundEvents from "@/features/BannerInfo/RenderBannerInfo/ui/NotFoundEvents.tsx"

const RenderListFourApps = () => {
	const [apps, setApps] = useState([])
	const [isBadRequest, setBadRequest] = useBadResponse()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(true)

	const apiGetListApps = async () => {
		try {
			setBadRequest(false)
			const { data } = await serviceApp.getAll()
			const lastFourElements = data.data.slice(-4)

			setApps(lastFourElements)
		} catch {
			setBadRequest(true)
		} finally {
			setIsLoading(false)
		}
	}
	useEffect(() => {
		apiGetListApps()
	}, [])

	return (
		<>
			{apps.length !== 0 && !isLoading && (
				<UIContainer listClasses={"row"}>
					<UICol listClasses={"col-lg-12 col-md-12 col-sm-12 mt-25"}>
						<UIButton onClick={() => navigate("/dashboard/create-app")}>Создать событие</UIButton>
					</UICol>

					<UICol listClasses={"col-lg-12 col-md-12 mt-25"}>
						<ListApps apps={apps} isBadRequest={isBadRequest} />
					</UICol>

					<UICol listClasses={"col-lg-12 col-md-12 col-sm-12"}>
						<UILink to={"/dashboard/apps"}>Смотреть все события</UILink>
					</UICol>
				</UIContainer>
			)}

			{apps.length === 0 && !isLoading && (
				<UIContainer listClasses={"row mt-25"}>
					<UICol listClasses={"col-lg-12 col-md-12 col-sm-12 mb-25"}>
						<UIButton onClick={() => navigate("/dashboard/create-app")}>Создать событие</UIButton>
					</UICol>

					<UICol listClasses={"col-lg-12 col-md-12 col-sm-12"}>
						<NotFoundEvents />
					</UICol>
				</UIContainer>
			)}
		</>
	)
}

export default RenderListFourApps
