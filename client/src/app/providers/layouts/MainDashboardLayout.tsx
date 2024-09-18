import { ReactNode } from "react"
import { UIButton, UIHeader, UILogo, UIFooter, UILink } from "@/shared/UI"
import { useNavigate } from "react-router-dom"
import style from "./MainDashBoardLayout.module.scss"

type Props = {
	children: ReactNode
}

const list = [
	{
		id: 1,
		name: "Дашборд",
		url: "/dashboard"
	},
	{
		id: 2,
		name: "Создать App",
		url: "/dashboard/create-app"
	}
]

const ListLinks = () => {
	return (
		<ul style={{ display: "flex", alignItems: "center" }}>
			{list.map(item => {
				return (
					<li style={{ marginRight: "15px" }} key={item.id}>
						<UILink to={item.url}>{item.name}</UILink>
					</li>
				)
			})}
		</ul>
	)
}
const MainDashboardLayout = ({ children }: Props) => {
	const navigate = useNavigate()
	return (
		<>
			<UIHeader
				leftElement={<UILogo>LOGO</UILogo>}
				centerElement={<ListLinks />}
				rightElement={<UIButton onClick={() => navigate("/")}>Выход</UIButton>}
			/>

			<main className={style.wrapper}>{children}</main>
			<UIFooter>Footer</UIFooter>
		</>
	)
}

export default MainDashboardLayout
