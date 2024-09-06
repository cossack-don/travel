import { useNavigate } from "react-router-dom"
import styles from "./UIHeader.module.scss"
import { UIButton } from "@/shared/UI"

const UIHeader = () => {

	const navigate = useNavigate()

	return (
		<>

			<div className={`row between-xs ${styles.header}`}>
				<div className="col-xs-6">
					<div className="box">
						LOGO
					</div>
				</div>
				<div className="col-xs-6">
					<div className="box">
						<div className="row end-xs">
							<div className="col-xs-6">
								<div className="box">
									<UIButton onClick={() => navigate("/dashboard")} >Вход</UIButton>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>)
}

export default UIHeader
