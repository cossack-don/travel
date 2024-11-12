import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { ListCards, UILink } from "@/shared/UI"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import {
	getListStepsAPI,
	updateCurrentStepAPI,
	getCurrentCheckListAPI,
	setCurrentStep,
	$resetStateStepper,
	EnumNamesSteps
} from "@/entities/model/stepperSlice.ts"

const StepSex = () => {
	const params = useParams()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const stepper = useAppSelector(state => state.stepperF)

	useEffect(() => {
		dispatch(getListStepsAPI({ link: "step-sex" }))
		dispatch(getCurrentCheckListAPI({ idApp: params?.idApp, idCheckList: params?.idCheckList }))
	}, [])

	const onMoveNextStep = async () => {
		const payload = {
			nameStep: EnumNamesSteps.SEX,
			pickValueStep: stepper.currentStep,
			idApp: params?.idApp,
			idCheckList: params?.idCheckList
		}
		// TODO доделать позже, посмотреть глобал адаптер почему проблема с error in catch
		// TODO цель - если ошибка на след шаг не переходить
		const url = `/dashboard/app/${params.idApp}/check-list/${params.idCheckList}/step-number-of-days`

		await dispatch(updateCurrentStepAPI(payload))
		await dispatch($resetStateStepper())
		await navigate(url)
	}

	return (
		<div>
			<p>ШАГ 1- StepSex </p>
			<p>Выбор пола</p>
			<UILink to={`/dashboard/app/${params.idApp}`}>Назад</UILink>
			<ListCards
				listSteps={stepper.listSteps}
				isActiveStep={stepper.currentStep}
				onChangeStep={({ target: { value } }: any): any => dispatch(setCurrentStep(value))}
			/>

			<button onClick={onMoveNextStep}>Перейти на 2-й шаг</button>
		</div>
	)
}

export default StepSex
