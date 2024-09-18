import style from "./UICard.module.scss"
import { ReactNode } from "react"
import { Link } from "react-router-dom"

type Props = {
	header?: ReactNode
	children?: ReactNode
	footer?: ReactNode
	isLink?: false
	to?: any
	listClasses?: any
}

const UICard = ({ header, children, footer, to, listClasses }: Props) => {
	return (
		<>
			{to && (
				<Link className={`eventHover ${style.wrapper} ${listClasses}`} to={to}>
					{header}
					{children}
					{footer}
				</Link>
			)}
			{!to && (
				<div className={style.wrapper}>
					{header}
					{children}
					{footer}
				</div>
			)}
		</>
	)
}

export default UICard
