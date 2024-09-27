import styles from "./UIHeader.module.scss"
import { ReactNode } from "react"

interface Props {
	leftElement: ReactNode
	centerElement?: ReactNode
	rightElement: ReactNode
}

const UIHeader = ({ leftElement, centerElement, rightElement }: Props) => {
	return (
		<>
			<header className={`row between-xs middle-xs ${styles.header}`}>
				<div className="col-xs-3">
					<div>{leftElement}</div>
				</div>

				<div className="col-xs-6">
					<div className="row center-xs">
						<div className="col-xs-12">
							<div>{centerElement}</div>
						</div>
					</div>
				</div>

				<div className="col-xs-3">
					<div className="row end-xs">
						<div className="col-xs-6">
							<div>{rightElement}</div>
						</div>
					</div>
				</div>
			</header>
		</>
	)
}

export default UIHeader
