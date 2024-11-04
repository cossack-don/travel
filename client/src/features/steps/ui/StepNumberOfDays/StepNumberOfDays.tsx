import { Link } from "react-router-dom"
import { ChangeEvent, useEffect, useState } from "react"
import { ListCards } from "@/shared/UI"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import { fetchStepsElement } from "@/features/steps/model/steps.reducer.ts"
import { userModel } from "@/entities/model/userSlice.ts"

const StepNumberOfDays = () => {
	const dispatch = useAppDispatch()
	const dataCards = useAppSelector(state => state.stepper)

	useEffect(() => {
		dispatch(fetchStepsElement({ link: "step-days" }))
	}, [])

	const usePickActiveCardRadio = (defaultValue: string) => {
		const [value, setValue] = useState(defaultValue)

		const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
			setValue(e.target.value)
		}
		return [value, onChangeRadio]
	}
	const [isActiveValue, setActiveValue] = useState(1)

	const setUserDaysHandler = () => {
		dispatch(userModel({ days: isActiveValue }))
	}

	return (
		<div>
			<p>StepNumberOfDays</p>
			<p>На сколько дней</p>
			Выбран - {isActiveValue}
			<ListCards
				setActiveValue={setActiveValue}
				listData={dataCards}
				defaultValue={isActiveValue}
				usePickActiveCardRadio={usePickActiveCardRadio}
			/>
			<Link
				to="/dashboard/app/8743b52063cd84097a65d1633f5c74f5/check-list/:id/step-type-place"
				style={{ width: "200px", height: "200px", marginRight: "15px" }}
				onClick={setUserDaysHandler}
			>
				к 3-му шагу
			</Link>
		</div>
	)
}

export default StepNumberOfDays
