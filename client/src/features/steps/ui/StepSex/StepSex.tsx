import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ListCards, UILink } from "@/shared/UI"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import { fetchStepsElement } from "@/features/steps/model/steps.reducer.ts"
import { fetchUserSteps, userModel } from "@/entities/model/userSlice.ts"
import { serviceCheckList } from "@/shared/api/transport"
import { usePickActiveCardRadio } from "@/shared/hooks"

const StepSex = () => {
	const dispatch = useAppDispatch()
	const params = useParams()
	const [currentCheckList, setCurrentCheckList] = useState(null)
	const { data, activeValue } = useAppSelector(state => state.stepper)
	const listData = data.elements_step
	const actualStep = useAppSelector(state => state.user.selectedUser)

	useEffect(() => {
		const fetchData = async () => {
			dispatch(fetchStepsElement({ link: "step-sex" }))
			await getInfoCurrentCheckList()
			await dispatch(fetchUserSteps({ idApp: params.idApp, idCheckList: params.idCheckList }))
		}
		fetchData()
	}, [])

	const getInfoCurrentCheckList = async () => {
		setCurrentCheckList(actualStep)
	}

	const setUserSexValueHandler = async () => {
		const payload = { ...currentCheckList, sex: activeValue.key }

		await serviceCheckList.updateCurrentStep(params?.idApp, params?.idCheckList, payload)
		await dispatch(userModel({ sex: activeValue.key }))
	}

	return (
		<div>
			<p>ШАГ 1- StepSex </p>
			<p>Выбор пола</p>
			<UILink to={"/dashboard/app/8743b52063cd84097a65d1633f5c74f5"}>Назад</UILink>
			<ListCards
				listData={listData}
				defaultValue={activeValue.name}
				usePickActiveCardRadio={usePickActiveCardRadio}
			/>
			Выбран - {activeValue.name}
			<br />
			<br />
			<Link
				to={`/dashboard/app/${params.idApp}/check-list/${params.idCheckList}/step-number-of-days`}
				style={{ width: "200px", height: "200px", marginRight: "15px" }}
				onClick={setUserSexValueHandler}
			>
				На 2-й шаг
			</Link>
		</div>
	)
}

export default StepSex
