import { createElement, ReactNode } from "react"
import { listBoldTypography } from "@/shared/UI/shared/BoldTypography/BoldTypography"
import styleBoldTypography from "@/shared/UI/shared/BoldTypography/BoldTypography.module.scss"

interface Props {
	children: ReactNode
	as?: string
	bold?: string
}

const listHeading = {
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	h5: "h5",
	h6: "h6"
}

const UIHeadingTypography = ({ children, as = listHeading.h3, bold = listBoldTypography.regular }: Props) => {
	return createElement(as as string, { className: `${as} ${styleBoldTypography[bold]}` }, children)
}

export default UIHeadingTypography
