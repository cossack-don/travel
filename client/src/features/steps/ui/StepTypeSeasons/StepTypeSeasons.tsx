import { Link, useParams } from "react-router-dom"
import { ChangeEvent, useEffect, useState } from "react"
import { ListCards } from "@/shared/UI"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import { userModel } from "@/entities/model/userSlice.ts"
import { fetchStepsElement } from "@/features/steps/model/steps.reducer.ts"

const StepTypeSeasons = () => {
	const params = useParams()
	const dispatch = useAppDispatch()
	const dataCards = useAppSelector(state => state.stepper)

	useEffect(() => {
		dispatch(fetchStepsElement({ link: "step-weather" }))
	}, [])

	const usePickActiveCardRadio = (defaultValue: string) => {
		const [value, setValue] = useState(defaultValue)

		const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
			setValue(e.target.value)
		}
		return [value, onChangeRadio]
	}
	const [isActiveValue, setActiveValue] = useState("cold")

	const onSelectSeasonHandler = () => {
		dispatch(userModel({ season: isActiveValue }))
	}

	return (
		<div>
			<p>StepTypeSeasons</p>
			Выбран - {isActiveValue}
			<ListCards
				setActiveValue={setActiveValue}
				listData={dataCards}
				defaultValue={isActiveValue}
				usePickActiveCardRadio={usePickActiveCardRadio}
			/>
			<p>Время года (тепло или холодно)</p>
			<Link
				to={`/dashboard/app/${params.idApp}/check-list/${params.idCheckList}/step-type-of-trip`}
				style={{ width: "200px", height: "200px", marginRight: "15px" }}
				onClick={onSelectSeasonHandler}
			>
				к шагу 5
			</Link>
		</div>
	)
}

export default StepTypeSeasons
