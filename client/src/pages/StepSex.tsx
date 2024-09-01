import { Link } from "react-router-dom"

const StepSex = () => {
	return (<div>
		<p>ШАГ 1- StepSex </p>
		<p>Выбор пола</p>

		<Link to="/dashboard/app/8743b52063cd84097a65d1633f5c74f5/step-number-of-days"
					style={{ width: "200px", height: "200px", marginRight: "15px" }}>
			На 2-й шаг
		</Link>
	</div>)
}

export default StepSex
