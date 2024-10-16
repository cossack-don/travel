import { createElement, ReactNode } from "react"
import { listBoldTypography } from "@/shared/UI/shared/BoldTypography/BoldTypography"
import styleBoldTypography from "@/shared/UI/shared/BoldTypography/BoldTypography.module.scss"

interface Props {
	children: ReactNode
	as?: string
	bold?: string
}

const listParagraph = {
	p: "p",
	span: "span",
	div: "div"
}

const UIParagraphTypography = ({
	children,
	as = listParagraph.p,
	bold = listBoldTypography.regular
}: Props) => {
	return createElement(as as string, { className: `${as} ${styleBoldTypography[bold]}` }, children)
}

export default UIParagraphTypography
