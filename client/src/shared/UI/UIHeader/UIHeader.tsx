import styles from "./UIHeader.module.scss"
import { ReactNode } from "react"
import { UIContainer, UICol } from "@/shared/UI"

interface Props {
	leftElement: ReactNode
	centerElement?: ReactNode
	rightElement: ReactNode
}

const UIHeader = ({ leftElement, centerElement, rightElement }: Props) => {
	return (
		<>
			<UIContainer as="header" listClasses={`row between-xs middle-xs ${styles.header}`}>
				<UICol listClasses={"col-xs-3"}>
					<div>{leftElement}</div>
				</UICol>

				<UICol listClasses={"col-xs-6"}>
					<div>{centerElement}</div>
				</UICol>

				<UICol className="col-xs-3">
					<div>{rightElement}</div>
				</UICol>
			</UIContainer>
		</>
	)
}

export default UIHeader
