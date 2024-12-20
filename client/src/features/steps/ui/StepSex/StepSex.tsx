import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { ListCards, UIBreadCrumbs } from "@/shared/UI"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import {
	updateCurrentStepAPI,
	setPickedCard,
	$resetStateStepper,
	EnumNamesSteps,
	listResetsStates,
	chainApiStepper
} from "@/entities/model/stepperSlice.ts"

const StepSex = () => {
	const params = useParams()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const stepper = useAppSelector(state => state.stepperF)

	useEffect(() => {
		dispatch(
			chainApiStepper({
				idApp: params?.idApp,
				idCheckList: params?.idCheckList,
				nameStep: EnumNamesSteps.SEX
			})
		)
	}, [])

	const onMoveNextStep = async () => {
		const payload = {
			nameStep: EnumNamesSteps.SEX,
			pickValueStep: stepper.pickedCard,
			idApp: params?.idApp,
			idCheckList: params?.idCheckList
		}
		// TODO доделать позже, посмотреть глобал адаптер почему проблема с error in catch
		// TODO цель - если ошибка на след шаг не переходить
		const url = `/dashboard/app/${params.idApp}/check-list/${params.idCheckList}/step-number-of-days`

		await dispatch(updateCurrentStepAPI(payload))
		await dispatch($resetStateStepper(listResetsStates))
		await navigate(url)
	}

	return (
		<div>
			<UIBreadCrumbs />
			<ListCards
				listSteps={stepper.listCards}
				isActiveStep={stepper.pickedCard}
				onChangeStep={({ target: { value } }: any): any => dispatch(setPickedCard(value))}
			/>

			<button onClick={onMoveNextStep}>Перейти на 2-й шаг</button>
		</div>
	)
}

export default StepSex
