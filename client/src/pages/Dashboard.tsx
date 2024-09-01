import { Link } from "react-router-dom"


const Dashboard = () => {

	return (<div>
		<h1> Page Дашборд</h1>
		<Link style={{ "background": "red", width: "200px", height: "50px", display: "block", marginBottom: "15px" }}
					to="/dashboard/create-app">Создать
			App</Link>

		<div style={{ display: "flex" }}>
			<Link to="/dashboard/app/8743b52063cd84097a65d1633f5c74f5"
						style={{ "background": "green", width: "200px", marginRight: "15px" }}>
				App 1
			</Link>
			<Link to="/dashboard/app/8743b52063cd84097a65d1633f5c74f5"
						style={{ "background": "green", width: "200px", height: "200px", marginRight: "15px" }}>
				App 2
			</Link>
			<Link to="/dashboard/app/8743b52063cd84097a65d1633f5c74f5"
						style={{ "background": "green", width: "200px", height: "200px", marginRight: "15px" }}>
				App 3
			</Link>
			<Link to="/dashboard/app/8743b52063cd84097a65d1633f5c74f5"
						style={{ "background": "green", width: "200px", height: "200px", marginRight: "15px" }}>
				App 4
			</Link>
		</div>

	</div>)
}

export default Dashboard
