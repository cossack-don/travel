import { Link } from "react-router-dom"

const StepTypeSeasons = () => {
	return (
		<div>
			<p>StepTypeSeasons</p>

			<p>Время года (тепло или холодно)</p>
			<Link
				to="/dashboard/app/8743b52063cd84097a65d1633f5c74f5/step-type-of-trip"
				style={{ width: "200px", height: "200px", marginRight: "15px" }}
			>
				к шагу 5
			</Link>
		</div>
	)
}

export default StepTypeSeasons
