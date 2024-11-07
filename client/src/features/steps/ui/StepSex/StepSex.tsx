import { Link, useParams, useLocation } from "react-router-dom"
import { ChangeEvent, useEffect, useState } from "react"
import { ListCards, UILink } from "@/shared/UI"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import { fetchStepsElement } from "@/features/steps/model/steps.reducer.ts"
import { userModel } from "@/entities/model/userSlice.ts"
import { serviceCheckList } from "@/shared/api/transport"

const StepSex = () => {
	const dispatch = useAppDispatch()
	const params = useParams()
	const [currentCheckList, setCurrentCheckList] = useState(null)

	useEffect(() => {
		dispatch(fetchStepsElement({ link: "step-sex" }))
		getInfoCurrentCheckList()
	}, [])

	const dataCards = useAppSelector(state => state.stepper)
	const [isActiveValue, setActiveValue] = useState(dataCards[0]?.name)

	useEffect(() => {
		if (dataCards.length > 0) {
			setActiveValue(dataCards[0]?.name)
		}
	}, [dataCards, isActiveValue])

	console.log({ isActiveValue })

	const getInfoCurrentCheckList = async () => {
		const { data } = await serviceCheckList.getById(params?.idApp, params.idCheckList)
		setCurrentCheckList(data)
		console.log(currentCheckList, "test")
	}

	const usePickActiveCardRadio = (defaultValue: string) => {
		const [value, setValue] = useState(defaultValue)

		const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
			setValue(e.target.value)
		}
		return [value, onChangeRadio]
	}

	const setUserSexValueHandler = async () => {
		const payload = {
			sex: isActiveValue,
			days: undefined,
			destination: undefined,
			weather: undefined,
			trip_type: undefined
		}

		await serviceCheckList.updateCurrentStep(params?.idApp, params?.idCheckList, payload)
		await dispatch(userModel({ sex: isActiveValue }))
	}

	return (
		<div>
			<p>ШАГ 1- StepSex </p>
			<p>Выбор пола</p>
			<UILink to={"/dashboard/app/8743b52063cd84097a65d1633f5c74f5"}>Назад</UILink>
			<ListCards
				setActiveValue={setActiveValue}
				listData={dataCards}
				defaultValue={isActiveValue}
				usePickActiveCardRadio={usePickActiveCardRadio}
			/>
			Выбран - {isActiveValue}
			<br />
			<br />
			<Link
				to="/dashboard/app/8743b52063cd84097a65d1633f5c74f5/check-list/:id/step-number-of-days"
				style={{ width: "200px", height: "200px", marginRight: "15px" }}
				onClick={setUserSexValueHandler}
			>
				На 2-й шаг
			</Link>
		</div>
	)
}

export default StepSex
