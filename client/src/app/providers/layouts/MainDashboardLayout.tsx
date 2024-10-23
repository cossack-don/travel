import { ReactNode, useState } from "react"
import { UILogo, UIHeader, UIFooter, UILink, UIDrawer, UIAvatar } from "@/shared/UI"
import style from "./MainDashBoardLayout.module.scss"

type Props = {
	children: ReactNode
}

const list = [
	{
		id: 1,
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
	const [showModal, setShowModal] = useState(false)

	return (
		<>
			<UIHeader
				leftElement={
					<div style={{ display: "flex" }}>
						<UILogo style={{ marginRight: "35px" }}>LOGO</UILogo>
						<ListLinks />
					</div>
				}
				rightElement={<UIAvatar onClick={() => setShowModal(!showModal)} />}
			/>

			<main className={style.wrapper}>{children}</main>
			<UIFooter>Footer</UIFooter>

			<UIDrawer isActive={showModal} onClose={setShowModal} />
		</>
	)
}

export default MainDashboardLayout
