import { useEffect, useState } from "react"
import { useBadResponse } from "@/shared/hooks"
import { serviceApp } from "@/shared/api/transport"
import { UICard, UICol, UIContainer, UILink, UIParagraphTypography } from "@/shared/UI"

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

export default ListApps
