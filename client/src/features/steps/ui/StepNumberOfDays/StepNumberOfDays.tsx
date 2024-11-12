import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ListCards } from "@/shared/UI"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import { fetchStepsElement } from "@/features/steps/model/steps.reducer.ts"
import { fetchUserSteps, userModel } from "@/entities/model/userSlice.ts"
import { usePickActiveCardRadio } from "@/shared/hooks"
import { serviceCheckList } from "@/shared/api/transport"
import { getCurrentCheckListAPI, getListStepsAPI, setCurrentStep } from "@/entities/model/stepperSlice.ts"

const StepNumberOfDays = () => {
	const params = useParams()
	const dispatch = useAppDispatch()
	const { data, activeValue } = useAppSelector(state => state.stepper)
	const dataCards = data.elements_step
	const [currentCheckList, setCurrentCheckList] = useState(null)
	const actualStep = useAppSelector(state => state.user.selectedUser)
	const stepper = useAppSelector(state => state.stepperF)

	//v2
	useEffect(() => {
		dispatch(getListStepsAPI({ link: "step-days" }))
		dispatch(getCurrentCheckListAPI({ idApp: params?.idApp, idCheckList: params?.idCheckList }))
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
		const payload = { ...currentCheckList, days: activeValue.key }
		dispatch(userModel(payload))
		await serviceCheckList.updateCurrentStep(params?.idApp, params?.idCheckList, payload)
	}

	return (
		<div>
			<p>StepNumberOfDays</p>
			<p>На сколько дней</p>
			Выбран - {activeValue.name}
			<ListCards
				listSteps={stepper.listSteps}
				isActiveStep={stepper.currentStep}
				onChangeStep={({ target: { value } }: any): any => dispatch(setCurrentStep(value))}
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
