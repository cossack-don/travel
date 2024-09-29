import {  useEffect } from "react"
import { UILink } from "@/shared/UI"
import styles from "./UINavigation.module.scss"
import { useLocation, useParams } from "react-router-dom"

// interface Props {
// 	listNavigation?: any
// }

const UINavigation = () => {
	const params = useParams()

	const list = [
		{
			id: 1,
			title: "Обзор",
			url: "/",
			icon: "name",
			isActive: false
		},
		{
			id: 2,
			title: "title2",
			url: "url2",
			icon: "name",
			isActive: false,
			children: [
				{
					id: 1,
					title: "title",
					url: "url",
					icon: "name"
				},
				{
					id: 2,
					title: "title",
					url: "url",
					icon: "name"
				}
			]
		},
		{
			id: 3,
			title: "Настройки",
			url: "settings",
			icon: "name",
			isActive: false
		}
	] as any

	const location = useLocation().pathname

	useEffect(() => {
		console.log(location, 33333)
	}, [])
	const ListNavigation = () => {
		return list.map((item: any): any => {
			// pathname === item.url ? styles.active : styles.link
			return (
				<li key={item.id} className={`${styles.card} ${location.includes(item.url) ? styles.isActive : ""}`}>
					<UILink to={`/dashboard/app/${params.id}/${item.url}`}>{item.title}</UILink>
				</li>
			)
		})
	}

	return (
		<nav className={styles.wrapper}>
			<ul>
				<ListNavigation />
			</ul>
		</nav>
	)
}

export default UINavigation
