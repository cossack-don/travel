import { Link } from "react-router-dom"

const StepTypeOfTrip = () => {
	return (<div>
		<p>
			StepTypeOfTrip
		</p>

		<p>Тип поездки (пляж, горные лыжи, командировка,экскурсия и тд)</p>

		<Link to="/dashboard/app/8743b52063cd84097a65d1633f5c74f5/step-list-of-things"
					style={{ width: "200px", height: "200px", marginRight: "15px" }}>
			к готовому списку
		</Link>
	</div>)
}

export default StepTypeOfTrip
