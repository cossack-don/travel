import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ListCards } from "@/shared/UI"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import { fetchUserSteps, userModel } from "@/entities/model/userSlice.ts"
import { fetchStepsElement } from "@/features/steps/model/steps.reducer.ts"
import { serviceCheckList } from "@/shared/api/transport"
import { usePickActiveCardRadio } from "@/shared/hooks"

const StepTypeSeasons = () => {
	const params = useParams()
	const dispatch = useAppDispatch()
	const { data, activeValue } = useAppSelector(state => state.stepper)
	const dataCards = data.elements_step
	const [currentCheckList, setCurrentCheckList] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			dispatch(fetchStepsElement({ link: "step-weather" }))
			await getInfoCurrentCheckList()
			await dispatch(fetchUserSteps({ idApp: params.idApp, idCheckList: params.idCheckList }))
		}
		fetchData()
	}, [])

	const getInfoCurrentCheckList = async () => {
		setCurrentCheckList(currentCheckList)
	}

	const selectStepOfSeasonHandler = async () => {
		const payload = { ...currentCheckList, weather: activeValue.key }
		dispatch(userModel(payload))
		await serviceCheckList.updateCurrentStep(params?.idApp, params?.idCheckList, payload)
	}

	return (
		<div>
			<p>StepTypeSeasons</p>
			Выбран - {activeValue.name}
			<ListCards
				listData={dataCards}
				defaultValue={activeValue.name}
				usePickActiveCardRadio={usePickActiveCardRadio}
			/>
			<p>Время года (тепло или холодно)</p>
			<Link
				to={`/dashboard/app/${params.idApp}/check-list/${params.idCheckList}/step-type-of-trip`}
				style={{ width: "200px", height: "200px", marginRight: "15px" }}
				onClick={selectStepOfSeasonHandler}
			>
				к шагу 5
			</Link>
		</div>
	)
}

export default StepTypeSeasons
