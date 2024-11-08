import { Link } from "react-router-dom"
import { useEffect } from "react"
import { ListCards } from "@/shared/UI"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import { fetchStepsElement } from "@/features/steps/model/steps.reducer.ts"
import { userModel } from "@/entities/model/userSlice.ts"
import { usePickActiveCardRadio } from "@/shared/hooks"

const StepNumberOfDays = () => {
	const dispatch = useAppDispatch()
	const { data, activeValue } = useAppSelector(state => state.stepper)
	const dataCards = data.elements_step
	const userData = useAppSelector(state => state.user)

	console.log(userData)

	useEffect(() => {
		dispatch(fetchStepsElement({ link: "step-days" }))
	}, [])

	const setUserDaysHandler = () => {
		dispatch(userModel({ days: activeValue.key }))
	}

	return (
		<div>
			<p>StepNumberOfDays</p>
			<p>На сколько дней</p>
			Выбран - {activeValue.name}
			<ListCards
				listData={dataCards}
				defaultValue={activeValue.name}
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
