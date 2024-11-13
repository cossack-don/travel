import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { ListCards } from "@/shared/UI"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import {
	$resetStateStepper,
	EnumNamesSteps,
	getAllInfoCurrentCheckListAPI,
	listResetsStates,
	setPickedCard,
	updateCurrentStepAPI
} from "@/entities/model/stepperSlice.ts"

const StepTypeOfTrip = () => {
	const params = useParams()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const stepper = useAppSelector(state => state.stepperF)

	useEffect(() => {
		dispatch(
			getAllInfoCurrentCheckListAPI({
				idApp: params?.idApp,
				idCheckList: params?.idCheckList,
				nameStep: EnumNamesSteps.TRIP_TYPE
			})
		)
	}, [])

	const onMoveNextStep = async () => {
		const payload = {
			nameStep: EnumNamesSteps.TRIP_TYPE,
			pickValueStep: stepper.pickedCard,
			idApp: params?.idApp,
			idCheckList: params?.idCheckList
		}
		const url = `/dashboard/app/${params.idApp}/check-list/${params.idCheckList}/step-list-of-things`

		await dispatch(updateCurrentStepAPI(payload))
		await dispatch($resetStateStepper(listResetsStates))
		await navigate(url)
	}

	console.log(stepper?.listCards)

	return (
		<div>
			<p>StepTypeOfTrip</p>
			<p>Тип поездки (пляж, горные лыжи, командировка,экскурсия и тд)</p>
			Выбран - {stepper.pickedCard}
			<ListCards
				listSteps={stepper.listCards}
				isActiveStep={stepper.pickedCard}
				onChangeStep={({ target: { value } }: any): any => dispatch(setPickedCard(value))}
			/>
			{/*<Link*/}
			{/*	to={`/dashboard/app/${params.idApp}/check-list/${params.idCheckList}/step-list-of-things`}*/}
			{/*	style={{ width: "200px", height: "200px", marginRight: "15px" }}*/}
			{/*	onClick={selectStepOfTripHandler}*/}
			{/*>*/}
			{/*	к готовому списку*/}
			{/*</Link>*/}
			<button onClick={onMoveNextStep}>к готовому списку</button>
		</div>
	)
}

export default StepTypeOfTrip
