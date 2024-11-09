import { ReactNode } from "react"
import { UICol, UIContainer, UINavigation } from "@/shared/UI"
import { listNavigation } from "@/shared/UI/UINavigation/listNavigation.ts"

interface Props {
	header?: boolean
	afterHeader?: boolean
	leftNav?: boolean
	children?: ReactNode
	rightNav?: boolean
	footer?: boolean
}
const Layout = ({ header, afterHeader, leftNav, children, rightNav, footer }: Props) => {
	return (
		<>
			{header && <header>header</header>}
			{afterHeader && <nav>header</nav>}

			{leftNav && <aside>header</aside>}

			<UIContainer listClasses={"row"}>
				<UICol listClasses={"col-sm-12"}>{children && <main>{children}</main>}</UICol>
			</UIContainer>

			{rightNav && <aside>header</aside>}
			{footer && <footer>header</footer>}
		</>
	)
}

export default Layout
