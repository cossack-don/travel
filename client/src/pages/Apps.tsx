import { useEffect, useState } from "react"
import { useBadResponse } from "@/shared/hooks"
import { serviceApp } from "@/shared/api/transport"
import { UICard, UILink } from "@/shared/UI"
import UIParagraphTypography from "../shared/UI/UIParagraphTypography/UIParagraphTypography"
import UIHeadingTypography from "../shared/UI/UIHeadingTypography/UIHeadingTypography"

const ListApps = () => {
	const [apps, setApps] = useState([])
	const [isBadRequest, setBadRequest] = useBadResponse()

	const apiGetListApps = async () => {
		try {
			setBadRequest(false)
			const { data } = await serviceApp.getAll()

			setApps(data)
		} catch {
			setBadRequest(true)
		}
	}

	useEffect(() => {
		apiGetListApps()
	}, [])

	const handlerDeleteApp = async (id: string) => {
		await serviceApp.deleteById(id)
		await apiGetListApps()
	}

	return (
		<div className="row between-xs">
			{isBadRequest && <div>Бекенд упал - заглушка</div>}
			{apps.map(item => {
				return (
					<div key={item.id} className="col-xs-3">
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
					</div>
				)
			})}
		</div>
	)
}

const Apps = () => {
	return (
		<div>
			<UIHeadingTypography>Все приложения</UIHeadingTypography>
			<ListApps />
		</div>
	)
}

export default Apps
