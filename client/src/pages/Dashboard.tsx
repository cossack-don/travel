import { Link, useNavigate } from "react-router-dom"
import { UICard, UIButton } from "@/shared/UI"
import { mockListApps } from "@/shared/mockData/mockApp"

const ListApps = () => {
	return (
		<div className="row between-xs">
			{mockListApps.map(item => {
				return (
					<div className="col-xs-3">
						<UICard
							key={item.id}
							header={
								<div>
									ID - {item.id}, {item.title}
								</div>
							}
							footer={<div>footer</div>}
							listClasses="mr-15"
							isLink
							to={`/dashboard/app/${item.hashApp}`}
						>
							{item.description}
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
