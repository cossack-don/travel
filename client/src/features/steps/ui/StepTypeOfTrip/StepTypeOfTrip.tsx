import { Link, useParams } from "react-router-dom"
import { ChangeEvent, useEffect, useState } from "react"
import { ListCards } from "@/shared/UI"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import { userModel } from "@/entities/model/userSlice.ts"
import { fetchStepsElement } from "@/features/steps/model/steps.reducer.ts"

const StepTypeOfTrip = () => {
	const params = useParams()
	const dataCards = useAppSelector(state => state.stepper)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchStepsElement({ link: "step-trip" }))
	}, [])

	const usePickActiveCardRadio = (defaultValue: string) => {
		const [value, setValue] = useState(defaultValue)

		const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
			setValue(e.target.value)
		}
		return [value, onChangeRadio]
	}
	const [isActiveValue, setActiveValue] = useState("alpineSkiing")

	const selectTripHandler = () => {
		dispatch(userModel({ typeOfTrip: isActiveValue }))
	}

	return (
		<div>
			<p>StepTypeOfTrip</p>
			<p>Тип поездки (пляж, горные лыжи, командировка,экскурсия и тд)</p>
			Выбран - {isActiveValue}
			<ListCards
				setActiveValue={setActiveValue}
				listData={dataCards}
				defaultValue={isActiveValue}
				usePickActiveCardRadio={usePickActiveCardRadio}
			/>
			<Link
				to={`/dashboard/app/${params.idApp}/check-list/${params.idCheckList}/step-list-of-things`}
				style={{ width: "200px", height: "200px", marginRight: "15px" }}
				onClick={selectTripHandler}
			>
				к готовому списку
			</Link>
		</div>
	)
}

export default StepTypeOfTrip
