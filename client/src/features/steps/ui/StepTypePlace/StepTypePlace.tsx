import { Link, useParams } from "react-router-dom"
import { ChangeEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import { fetchUserSteps, userModel } from "@/entities/model/userSlice.ts"
import { fetchStepsElement } from "@/features/steps/model/steps.reducer.ts"
import { ListCards } from "@/shared/UI"
import { usePickActiveCardRadio } from "@/shared/hooks"
import { serviceCheckList } from "@/shared/api/transport"

const StepTypePlace = () => {
	const params = useParams()
	const { data, activeValue } = useAppSelector(state => state.stepper)
	const dataCards = data.elements_step
	const dispatch = useAppDispatch()
	const [currentCheckList, setCurrentCheckList] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			dispatch(fetchStepsElement({ link: "step-destination" }))
			await getInfoCurrentCheckList()
			await dispatch(fetchUserSteps({ idApp: params.idApp, idCheckList: params.idCheckList }))
		}
		fetchData()
	}, [])

	const getInfoCurrentCheckList = async () => {
		setCurrentCheckList(currentCheckList)
	}

	const selectPlaceHandler = async () => {
		const payload = { ...currentCheckList, destination: activeValue.key }
		dispatch(userModel(payload))
		await serviceCheckList.updateCurrentStep(params?.idApp, params?.idCheckList, payload)
	}

	return (
		<div>
			<p>StepTypePlace</p>
			<p>По стране или заграницу</p>
			Выбран - {activeValue.name}
			<ListCards
				listData={dataCards}
				defaultValue={activeValue.name}
				usePickActiveCardRadio={usePickActiveCardRadio}
			/>
			<Link
				to={`/dashboard/app/${params.idApp}/check-list/${params.idCheckList}/step-type-seasons`}
				style={{ width: "200px", height: "200px", marginRight: "15px" }}
				onClick={selectPlaceHandler}
			>
				к 4-му шагу
			</Link>
		</div>
	)
}

export default StepTypePlace
