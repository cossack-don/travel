import { Link } from "react-router-dom"
import { UICard } from "@/shared/UI"

const Dashboard = () => {

	return (<div>
		<h1> Page Дашборд</h1>

		<Link style={{ "background": "red", width: "200px", height: "50px", display: "block", marginBottom: "15px" }}
					to="/dashboard/create-app">Создать
			App</Link>

		<div style={{ display: "flex" }}>
			<UICard header={<div>header</div>} footer={<div>footer</div>} listClasses="mr-15" isLink to={'/dashboard/app/8743b52063cd84097a65d1633f5c74f5'}>
				body
			</UICard>
			<UICard isLink listClasses="mr-15" to={'/dashboard/app/8743b52063cd84097a65d1633f5c74f5'}>
				App 2
			</UICard>
			<UICard isLink listClasses="mr-15" to={'/dashboard/app/8743b52063cd84097a65d1633f5c74f5'}>
				App 3
			</UICard>
			<UICard isLink to={'/dashboard/app/8743b52063cd84097a65d1633f5c74f5'}>
				App 4
			</UICard>

		</div>

	</div>)
}

export default Dashboard
