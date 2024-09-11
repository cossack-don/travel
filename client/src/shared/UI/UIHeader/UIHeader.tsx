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
				<div className="col-xs-2">
					<div className="box">{leftElement}</div>
				</div>

				<div className="col-xs-8">
					<div className="box">
						<div className="row center-xs">
							<div className="col-xs-12">
								<div className="box">{centerElement}</div>
							</div>
						</div>
					</div>
				</div>

				<div className="col-xs-2">
					<div className="box">
						<div className="row end-xs">
							<div className="col-xs-6">
								<div className="box">{rightElement}</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	)
}

export default UIHeader
