import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ListCards, UILink } from "@/shared/UI"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import { serviceCheckList } from "@/shared/api/transport"
import {
	EnumNamesSteps,
	getAllInfoCurrentCheckListAPI,
	setPickedCard
} from "@/entities/model/stepperSlice.ts"

const StepNumberOfDays = () => {
	const params = useParams()
	const dispatch = useAppDispatch()
	const [currentCheckList, setCurrentCheckList] = useState(null)
	const actualStep = useAppSelector(state => state.user.selectedUser)
	const stepper = useAppSelector(state => state.stepperF)

	//v2
	useEffect(() => {
		dispatch(
			getAllInfoCurrentCheckListAPI({
				idApp: params?.idApp,
				idCheckList: params?.idCheckList,
				nameStep: EnumNamesSteps.DAYS
			})
		)
	}, [])

	//v1
	// console.log(stepper.stepsLifeCycle)
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		await dispatch(fetchStepsElement({ link: "step-days" }))
	// 		await getInfoCurrentCheckList()
	// 		await dispatch(fetchUserSteps({ idApp: params.idApp, idCheckList: params.idCheckList }))
	// 	}
	// 	fetchData()
	// }, [])

	const getInfoCurrentCheckList = async () => {
		setCurrentCheckList(actualStep)
	}

	const setUserDaysHandler = async () => {
		// const payload = { ...currentCheckList, days: activeValue.key }
		// dispatch(userModel(payload))
		// await serviceCheckList.updateCurrentStep(params?.idApp, params?.idCheckList, payload)
	}

	return (
		<div>
			<UILink to={`/dashboard/app/${params.idApp}/check-list/${params.idCheckList}/step-sex`}>
				На шаг Назад
			</UILink>
			<p>StepNumberOfDays</p>
			<p>На сколько дней</p>
			<ListCards
				listSteps={stepper.listCards}
				isActiveStep={stepper.pickedCard}
				onChangeStep={({ target: { value } }: any): any => dispatch(setPickedCard(Number(value)))}
			/>
			<Link
				to={`/dashboard/app/${params.idApp}/check-list/${params.idCheckList}/step-type-place`}
				style={{ width: "200px", height: "200px", marginRight: "15px" }}
				onClick={setUserDaysHandler}
			>
				к 3-му шагу
			</Link>
		</div>
	)
}

export default StepNumberOfDays
