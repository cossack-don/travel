import { Link, useNavigate } from "react-router-dom"
import { UICard, UIButton } from "@/shared/UI"
import { serviceApp } from "@/shared/api/transport"
import { useEffect, useState } from "react"
import { getRandomColor } from "@/shared/helpers"
import { useBadResponse } from "@/shared/hooks"

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

	const colorsArray = ["#eff9ff", "#ffd1ca", "#feeaf0", "#dcffe1", "#f0f9ff"]

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
							listStyles={{ background: getRandomColor(colorsArray) }}
							header={
								<div>
									<p>Название - {item.name}</p>

									<button onClick={() => handlerDeleteApp(item?.id)}>DELETE Card</button>
								</div>
							}
							footer={<div>Footer - ID - {item.id}</div>}
							listClasses="mr-15 mb-15"
						>
							<p>Описание - {item.description}</p>

							<Link to={`/dashboard/app/${item.id}`}>Перейти</Link>
						</UICard>
					</div>
				)
			})}
		</div>
	)
}
const Dashboard = () => {
	const navigate = useNavigate()
	return (
		<div>
			<h1> Page Дашборд</h1>

			<div style={{ width: "1400px", margin: "0 auto" }}>
				<div className="row mb-15">
					<div className="col-xs-12">
						<UIButton onClick={() => navigate("/dashboard/create-app")}>Создать App</UIButton>
					</div>
				</div>

				<ListApps />
			</div>
		</div>
	)
}

export default Dashboard
