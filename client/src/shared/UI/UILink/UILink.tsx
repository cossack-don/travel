import { ReactNode } from "react"
import styles from "@/shared/UI/UILink/UILink.module.scss"
import { Link } from "react-router-dom"

interface Props {
	children: ReactNode
	to?:string
}

const UILink = ({ children,to }: Props) => {

	return (
		<Link to={to} className={styles.wrapper}>{children}</Link>
	)
}

export default UILink
