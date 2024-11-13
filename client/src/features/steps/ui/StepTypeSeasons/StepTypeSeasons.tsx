import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ListCards, UILink } from "@/shared/UI"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import { fetchUserSteps, userModel } from "@/entities/model/userSlice.ts"
import { fetchStepsElement } from "@/features/steps/model/steps.reducer.ts"
import { serviceCheckList } from "@/shared/api/transport"
import { usePickActiveCardRadio } from "@/shared/hooks"
import {
	$resetStateStepper,
	EnumNamesSteps,
	getAllInfoCurrentCheckListAPI,
	listResetsStates,
	setPickedCard,
	updateCurrentStepAPI
} from "@/entities/model/stepperSlice.ts"

const StepTypeSeasons = () => {
	const params = useParams()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const stepper = useAppSelector(state => state.stepperF)

	useEffect(() => {
		dispatch(
			getAllInfoCurrentCheckListAPI({
				idApp: params?.idApp,
				idCheckList: params?.idCheckList,
				nameStep: EnumNamesSteps.WEATHER
			})
		)
	}, [])

	const onMoveNextStep = async () => {
		const payload = {
			nameStep: stepper.listSteps?.weather,
			pickValueStep: stepper.pickedCard,
			idApp: params?.idApp,
			idCheckList: params?.idCheckList
		}
		const url = `/dashboard/app/${params.idApp}/check-list/${params.idCheckList}/step-type-of-trip`

		await dispatch(updateCurrentStepAPI(payload))
		await dispatch($resetStateStepper(listResetsStates))
		await navigate(url)
	}

	return (
		<div>
			<UILink to={`/dashboard/app/${params.idApp}/check-list/${params.idCheckList}/step-type-of-trip`}>
				Назад
			</UILink>
			<p>StepTypeSeasons</p>
			Выбран - {stepper.pickedCard}
			<ListCards
				listSteps={stepper.listCards}
				isActiveStep={stepper.pickedCard}
				onChangeStep={({ target: { value } }: any): any => dispatch(setPickedCard(value))}
			/>
			<p>Время года (тепло или холодно)</p>
			{/*<Link*/}
			{/*	to={`/dashboard/app/${params.idApp}/check-list/${params.idCheckList}/step-type-of-trip`}*/}
			{/*	style={{ width: "200px", height: "200px", marginRight: "15px" }}*/}
			{/*	onClick={selectStepOfSeasonHandler}*/}
			{/*>*/}
			{/*	к шагу 5*/}
			{/*</Link>*/}
			<button onClick={onMoveNextStep}>к 5-му шагу</button>
		</div>
	)
}

export default StepTypeSeasons
