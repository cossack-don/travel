import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { ListCards, UILink } from "@/shared/UI"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import {
	$resetStateStepper,
	chainApiStepper,
	EnumNamesSteps,
	listResetsStates,
	setPickedCard,
	updateCurrentStepAPI
} from "@/entities/model/stepperSlice.ts"
import UIBreadCrumbs from "../../../../shared/UI/UIBreadCrumbs/UIBreadCrumbs.tsx"

const StepTypeOfTrip = () => {
	const params = useParams()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const stepper = useAppSelector(state => state.stepperF)

	useEffect(() => {
		dispatch(
			chainApiStepper({
				idApp: params?.idApp,
				idCheckList: params?.idCheckList,
				nameStep: EnumNamesSteps.TRIP_TYPE
			})
		)
	}, [])

	const onMoveNextStep = async () => {
		const payload = {
			nameStep: stepper.listSteps?.trip_type,
			pickValueStep: stepper.pickedCard,
			idApp: params?.idApp,
			idCheckList: params?.idCheckList
		}
		const url = `/dashboard/app/${params.idApp}/check-list/${params.idCheckList}/step-list-of-things`

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

			<button onClick={onMoveNextStep}>к готовому списку</button>
		</div>
	)
}

export default StepTypeOfTrip
