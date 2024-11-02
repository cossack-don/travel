import { ReactNode, useEffect, useState } from "react"
import {
	UIHeader,
	UIAfterHeader,
	UILink,
	UIDrawer,
	UIAvatar,
	UICol,
	UIContainer,
	UINavigation,
	UILogo
} from "@/shared/UI"
import style from "./MainDashBoardLayout.module.scss"

import { listNavigation } from "@/shared/UI/UINavigation/listNavigation"
import { serviceApp } from "@/shared/api/transport"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { infoEventSlice, updateStateInfoEvent } from "@/features/infoEvent/infoEventSlice.ts"
import { RootState } from "@/app/providers/store/store.ts"
import { increment } from "@/features/counter/counterSlice.ts"
import Layout from "@/app/providers/layouts/Layout.tsx"

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

const AppLayout = ({ children }: Props) => {
	const [showModal, setShowModal] = useState(false)
	const params = useParams()

	const infoEvent = useSelector((state: RootState) => state.infoEvent.data)
	const dispatch = useDispatch()

	const apiGetByIdApp = async () => {
		const { data } = await serviceApp.getById(params.id)
		// console.log(data, 3)
		await dispatch(updateStateInfoEvent(data))
	}

	useEffect(() => {
		apiGetByIdApp()
	}, [])

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
			<UIAfterHeader />

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
