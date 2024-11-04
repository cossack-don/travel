import { ReactNode, useState } from "react"
import { UIAvatar, UICol, UIContainer, UIDrawer, UIHeader, UILink, UILogo, UINavigation } from "@/shared/UI"
import style from "./MainDashBoardLayout.module.scss"

import { listNavigation } from "@/shared/UI/UINavigation/listNavigation"

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
const AppLayout = ({ children }: Props) => {
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

			<main className={style.wrapper}>
				<UIContainer listClasses={"row"}>
					<UICol listClasses={"col-sm-3"}>
						<div style={{ position: "fixed", top: "110px" }}>
							<UINavigation listNavigation={listNavigation} />
						</div>
					</UICol>
					<UICol listClasses={"col-sm-9"}>
						<div>{children}</div>
					</UICol>
				</UIContainer>
			</main>

			<UIDrawer isActive={showModal} onClose={setShowModal} />
		</>
	)
}

export default AppLayout
