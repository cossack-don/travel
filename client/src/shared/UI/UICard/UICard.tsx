import style from "./UICard.module.scss"
import { ReactNode } from "react"
import { Link } from "react-router-dom"
import UIHeadingTypography from "../UIHeadingTypography/UIHeadingTypography"

type Props = {
	header?: ReactNode
	children?: ReactNode
	footer?: ReactNode
	isLink?: false
	to?: any
	listClasses?: any
	listStyles?: any
}

const UICard = ({ header, children, footer, to, listClasses, listStyles }: Props) => {
	return (
		<>
			{to && (
				<Link className={`eventHover ${style.wrapper} ${listClasses}`} style={listStyles} to={to}>
					<UIHeadingTypography>{header}</UIHeadingTypography>
					{children}
					{footer}
				</Link>
			)}
			{!to && (
				<div className={`${style.wrapper} ${listClasses}`} style={listStyles}>
					<UIHeadingTypography bold="medium">{header}</UIHeadingTypography>
					{children}
					{footer}
				</div>
			)}
		</>
	)
}

export default UICard
