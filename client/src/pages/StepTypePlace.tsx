import { Link } from "react-router-dom"

const StepTypePlace = () => {
	return (<div>

		<p>
			StepTypePlace
		</p>
		<p>По стране или заграницу</p>

		<Link to="/dashboard/app/8743b52063cd84097a65d1633f5c74f5/step-type-seasons"
					style={{ width: "200px", height: "200px", marginRight: "15px" }}>
			к 4-му шагу
		</Link>
	</div>)
}

export default StepTypePlace
