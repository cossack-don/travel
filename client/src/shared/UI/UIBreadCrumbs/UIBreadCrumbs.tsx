import { useLocation } from "react-router-dom"
import { UILink } from "@/shared/UI"
import styles from "./UIBreadCrumbs.module.scss"
import { ReactNode } from "react"

const BreadcrumbItem = ({ to, children }) => {
	return (
		<span className="breadcrumb-item">
			<UILink to={to}>{children}</UILink>
		</span>
	)
}

const UIBreadCrumbs = (): ReactNode => {
	const location = useLocation()
	const pathNames = location.pathname.split("/").filter(el => el !== "")

	return (
		<div className={styles.wrapper}>
			{pathNames.map((pathname, index) => {
				const isLast = index === pathNames.length - 1
				return isLast ? (
					<span>{decodeURIComponent(pathname.length < 15 ? pathname : `${pathname.slice(0, 14)}...`)}</span>
				) : (
					<BreadcrumbItem>
						<span className={styles.crumbItem}>
							{decodeURIComponent(pathname.length < 15 ? pathname : `${pathname.slice(0, 15)}...`)} &gt;
						</span>
					</BreadcrumbItem>
				)
			})}
		</div>
	)
}

export default UIBreadCrumbs
