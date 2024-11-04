import { Link } from "react-router-dom"
import { ChangeEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import { userModel } from "@/entities/model/userSlice.ts"
import { fetchStepsElement } from "@/features/steps/model/steps.reducer.ts"
import { ListCards } from "@/shared/UI"

const StepTypePlace = () => {
	const dataCards = useAppSelector(state => state.stepper)

	useEffect(() => {
		dispatch(fetchStepsElement({ link: "step-destination" }))
	}, [])

	const usePickActiveCardRadio = (defaultValue: string) => {
		const [value, setValue] = useState(defaultValue)

		const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
			setValue(e.target.value)
		}
		return [value, onChangeRadio]
	}
	const [isActiveValue, setActiveValue] = useState("country")
	const dispatch = useAppDispatch()

	const selectPlaceHandler = () => {
		dispatch(userModel({ place: isActiveValue }))
	}

	return (
		<div>
			<p>StepTypePlace</p>
			<p>По стране или заграницу</p>
			Выбран - {isActiveValue}
			<ListCards
				setActiveValue={setActiveValue}
				listData={dataCards}
				defaultValue={isActiveValue}
				usePickActiveCardRadio={usePickActiveCardRadio}
			/>
			<Link
				to="/dashboard/app/8743b52063cd84097a65d1633f5c74f5/check-list/:id/step-type-seasons"
				style={{ width: "200px", height: "200px", marginRight: "15px" }}
				onClick={selectPlaceHandler}
			>
				к 4-му шагу
			</Link>
		</div>
	)
}

export default StepTypePlace
