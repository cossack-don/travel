import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import { fetchUserSteps, userModel } from "@/entities/model/userSlice.ts"
import { fetchStepsElement } from "@/features/steps/model/steps.reducer.ts"
import { ListCards, UILink } from "@/shared/UI"
import { usePickActiveCardRadio } from "@/shared/hooks"
import { serviceCheckList } from "@/shared/api/transport"
import {
	$resetStateStepper,
	EnumNamesSteps,
	getAllInfoCurrentCheckListAPI,
	listResetsStates,
	setPickedCard,
	updateCurrentStepAPI
} from "@/entities/model/stepperSlice.ts"

const StepTypePlace = () => {
	const params = useParams()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const stepper = useAppSelector(state => state.stepperF)

	useEffect(() => {
		dispatch(
			getAllInfoCurrentCheckListAPI({
				idApp: params?.idApp,
				idCheckList: params?.idCheckList,
				nameStep: EnumNamesSteps.DESTINATION
			})
		)
	}, [])

	const onMoveNextStep = async () => {
		const payload = {
			nameStep: EnumNamesSteps.DESTINATION,
			pickValueStep: stepper.pickedCard,
			idApp: params?.idApp,
			idCheckList: params?.idCheckList
		}
		const url = `/dashboard/app/${params.idApp}/check-list/${params.idCheckList}/step-type-seasons`

		await dispatch(updateCurrentStepAPI(payload))
		await dispatch($resetStateStepper(listResetsStates))
		await navigate(url)
	}

	return (
		<div>
			<UILink to={`/dashboard/app/${params.idApp}/check-list/${params.idCheckList}/step-number-of-days`}>
				Назад
			</UILink>
			<p>StepTypePlace</p>
			<p>По стране или заграницу</p>
			Выбран - {stepper.pickedCard}
			<ListCards
				listSteps={stepper.listCards}
				isActiveStep={stepper.pickedCard}
				onChangeStep={({ target: { value } }: any): any => dispatch(setPickedCard(value))}
			/>
			{/*<Link*/}
			{/*	to={`/dashboard/app/${params.idApp}/check-list/${params.idCheckList}/step-type-seasons`}*/}
			{/*	style={{ width: "200px", height: "200px", marginRight: "15px" }}*/}
			{/*	onClick={selectPlaceHandler}*/}
			{/*>*/}
			{/*	к 4-му шагу*/}
			{/*</Link>*/}
			<button onClick={onMoveNextStep}>к 4-му шагу</button>
		</div>
	)
}

export default StepTypePlace
