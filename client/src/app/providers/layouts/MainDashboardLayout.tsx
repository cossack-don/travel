import { ReactNode, useState } from "react"
import { UILogo, UIHeader, UIFooter, UILink, UIDrawer, UIAvatar } from "@/shared/UI"
import style from "./MainDashBoardLayout.module.scss"

type Props = {
	children: ReactNode
}

const list = [
	{
		id: 1,
		name: "Создать событие",
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
						<UILogo style={{ marginRight: "35px", width: "50px", height: "50px" }}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								version="1.1"
								x="0px"
								y="0px"
								viewBox="0 0 64 64"
								style={{ enableBackground: "new 0 0 64 64;" }}
								xml:space="preserve"
							>
								<g id="national-event">
									<path
										style={{ fill: "#D9EBFF" }}
										d="M1.817,22.864v30.802c0,0.998,0.808,1.815,1.815,1.815h56.74c0.998,0,1.815-0.817,1.815-1.815   V22.864H1.817z"
									/>
									<path
										style={{ fill: "#0074FF" }}
										d="M19.259,43.559h-6.177v-9.448h6.132v1.324h-4.49v2.608h3.88v1.298h-3.88v2.907h4.536V43.559z    M24.729,43.559l3.4-9.448h-1.804l-2.401,7.391l-2.375-7.391h-1.797l3.387,9.448H24.729z M35.37,42.248h-4.536v-2.907h3.88v-1.298   h-3.88v-2.608h4.49v-1.324h-6.132v9.448h6.177V42.248z M38.348,36.856l4.211,6.703h1.641v-9.448h-1.629v6.729l-4.224-6.729h-1.642   v9.448h1.642V36.856z M48.204,43.559h1.629v-8.124h2.946v-1.324h-7.494v1.324h2.92V43.559z M32.908,6.705h-1.815v8.145h1.815V6.705   z M23.832,6.705h-1.815v8.145h1.815V6.705z M14.757,6.705h-1.815v8.145h1.815V6.705z M51.059,6.705h-1.815v8.145h1.815V6.705z    M20.202,9.247h-3.63v1.815h3.63V9.247z M29.277,9.247h-3.63v1.815h3.63V9.247z M47.428,9.247h-3.63v1.815h3.63V9.247z M64,12.878   v40.787c0,2.002-1.629,3.63-3.63,3.63H3.63c-2.002,0-3.63-1.628-3.63-3.63V12.878c0-2.002,1.629-3.63,3.63-3.63h7.496v1.815H3.63   c-1.001,0-1.815,0.814-1.815,1.815v8.168h60.37v-8.168c0-1.001-0.814-1.815-1.815-1.815h-7.496V9.247h7.496   C62.371,9.247,64,10.876,64,12.878z M62.185,22.861H1.815v30.804c0,1.001,0.814,1.815,1.815,1.815h56.74   c1.001,0,1.815-0.814,1.815-1.815V22.861z M38.353,9.247h-3.63v1.815h3.63V9.247z M41.983,6.705h-1.815v8.145h1.815V6.705z"
									/>
								</g>
								<g id="Layer_1"></g>
							</svg>
						</UILogo>
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
