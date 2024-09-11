import { Link } from "react-router-dom"

const StepNumberOfDays = () => {
	return (
		<div>
			<p>StepNumberOfDays</p>
			<p>На сколько дней</p>

			<Link
				to="/dashboard/app/8743b52063cd84097a65d1633f5c74f5/step-type-place"
				style={{ width: "200px", height: "200px", marginRight: "15px" }}
			>
				к 3-му шагу
			</Link>
		</div>
	)
}

export default StepNumberOfDays
