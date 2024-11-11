import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ListCards } from "@/shared/UI"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import { fetchUserSteps, userModel } from "@/entities/model/userSlice.ts"
import { fetchStepsElement } from "@/features/steps/model/steps.reducer.ts"
import { usePickActiveCardRadio } from "@/shared/hooks"
import { serviceCheckList } from "@/shared/api/transport"

const StepTypeOfTrip = () => {
	const params = useParams()
	const dispatch = useAppDispatch()
	const { data, activeValue } = useAppSelector(state => state.stepper)
	const dataCards = data.elements_step
	const [currentCheckList, setCurrentCheckList] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			dispatch(fetchStepsElement({ link: "step-trip" }))
			await getInfoCurrentCheckList()
			await dispatch(fetchUserSteps({ idApp: params.idApp, idCheckList: params.idCheckList }))
		}
		fetchData()
	}, [])

	const getInfoCurrentCheckList = async () => {
		setCurrentCheckList(currentCheckList)
	}

	const selectStepOfTripHandler = async () => {
		const payload = { ...currentCheckList, trip_type: activeValue.key }
		dispatch(userModel(payload))
		await serviceCheckList.updateCurrentStep(params?.idApp, params?.idCheckList, payload)
	}

	return (
		<div>
			<p>StepTypeOfTrip</p>
			<p>Тип поездки (пляж, горные лыжи, командировка,экскурсия и тд)</p>
			Выбран - {activeValue.name}
			<ListCards
				listData={dataCards}
				defaultValue={activeValue.name}
				usePickActiveCardRadio={usePickActiveCardRadio}
			/>
			<Link
				to={`/dashboard/app/${params.idApp}/check-list/${params.idCheckList}/step-list-of-things`}
				style={{ width: "200px", height: "200px", marginRight: "15px" }}
				onClick={selectStepOfTripHandler}
			>
				к готовому списку
			</Link>
		</div>
	)
}

export default StepTypeOfTrip
