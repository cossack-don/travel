import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useCallback } from "react"
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
	getListCards,
	getListSteps,
	listResetsStates,
	setPickedCard,
	updateCurrentStepAPI
} from "@/entities/model/stepperSlice.ts"

const StepTypeSeasons = () => {
	const params = useParams()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const stepper = useAppSelector(state => state.stepperF)
	const listSteps = useAppSelector(state => state.stepperF.listSteps)

	const f = async () => {
		const { payload } = await dispatch(getListSteps())
		console.log(listSteps, payload)
		await dispatch(getListCards({ step: payload.weather }))
	}
	useEffect(() => {
		f()
		// Запускаем запрос на получение пользователя с ID=123
	}, [])

	// После успешного получения пользователя запускаем запрос для получения постов
	// useEffect(() => {
	// 	if (listSteps) {
	// 		const { weather } = listSteps
	// 		console.log(weather, 3333)
	// 		// dispatch(getListSteps(weather))
	// 	}
	// }, [listSteps])

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
