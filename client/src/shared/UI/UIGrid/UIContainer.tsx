import { createElement, ReactNode } from "react"

type TypeListTags = "header" | "footer" | "div" | "section"

interface IProps {
	children: ReactNode
	listClasses?: string
	as?: TypeListTags
}
const UIContainer = ({ children, listClasses = "row", as = "div" }: IProps) => {
	return createElement(
		as as string,
		{
			className: `${listClasses}`
		},
		children
	)
}

export default UIContainer
