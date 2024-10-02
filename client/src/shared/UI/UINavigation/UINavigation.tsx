import styles from "./UINavigation.module.scss"
import { useParams, NavLink } from "react-router-dom"

interface Props {
	listNavigation?: any
}

export const ListNavigation = ({ list, params }: any) => {
	return list?.map((item: any): any => {
		return (
			<li key={item.id} className={`${styles.card}`}>
				<NavLink
					end
					to={`/dashboard/app/${params?.id}/${item.url}`}
					className={({ isActive, isPending }) => (isPending ? "" : isActive ? styles.isActive : "")}
				>
					{item.title}
				</NavLink>
			</li>
		)
	})
}

const UINavigation = ({ listNavigation = [] }: Props) => {
	const params = useParams()

	return (
		<nav className={styles.wrapper}>
			<ul id="sidebar">
				<ListNavigation list={listNavigation} params={params} />
			</ul>
		</nav>
	)
}

export default UINavigation
