import { ReactNode } from "react"
import { UIHeader } from "@/shared/UI"
import { Link } from "react-router-dom"

type Props = {
	children: ReactNode;
}

const MainDashboardLayout = ({ children }: Props) => {
	return (
		<div style={{background:'var(--gray)'}}>
			<div style={{ "background": "pink" }}>header
				<Link to="/dashboard"
							style={{ "color": "green", width: "200px", height: "200px", marginRight: "15px" }}>
					Dashboard
				</Link>
				<Link to="/dashboard/create-app"
							style={{ "color": "green", width: "200px", height: "200px", marginRight: "15px" }}>
					Create-App
				</Link>

				<Link to="/"
							style={{ "color": "green", width: "200px", height: "200px", marginRight: "15px" }}>
					Выйти
				</Link>
			</div>
			{children}
		</div>
	)
}

export default MainDashboardLayout
