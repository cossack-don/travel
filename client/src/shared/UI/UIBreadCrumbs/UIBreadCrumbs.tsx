import { useLocation } from "react-router-dom"
import { UILink } from "@/shared/UI"
import styles from "./UIBreadCrumbs.module.scss"
import { ReactNode } from "react"

const BreadcrumbItem = ({ to, children }) => {
	return (
		<span className={styles.crumbItem}>
			<UILink to={to}>{children}</UILink>
		</span>
	)
}

const UIBreadCrumbs = (): ReactNode => {
	const location = useLocation()
	const pathnames = location.pathname.split("/").filter(Boolean)

	return (
		<div className={styles.wrapper}>
			{pathnames.map((pathname, index) => {
				const href = `/${pathnames.slice(0, index + 1).join("/")}`
				const isLast = index === pathnames.length - 1

				if (isLast) {
					return (
						<span key={href}>
							{pathname.length > 12 ? (
								<span className={styles.crumbItemActive}>{pathname.slice(0, 11)}...</span>
							) : (
								<span className={styles.crumbItemActive}>{pathname}</span>
							)}
						</span>
					)
				}

				return (
					<BreadcrumbItem key={href} to={href}>
						{pathname.length > 12 ? `${pathname.slice(0, 11)}.../` : <span>{pathname}/</span>}
					</BreadcrumbItem>
				)
			})}
		</div>
	)
}

export default UIBreadCrumbs
