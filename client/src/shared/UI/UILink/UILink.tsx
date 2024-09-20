import { ReactNode } from "react"
import styles from "./UILink.module.scss"
import { Link } from "react-router-dom"

interface Props {
	children: ReactNode
	to?: string
	color?: string
}

const typeColors = {
	blue: "blue",
	green: "green"
}

const UILink = ({ children, to, color }: Props) => {
	return (
		<Link to={to} className={`${styles.wrapper} ${styles[typeColors[color]]}`}>
			{children}
		</Link>
	)
}

export default UILink
