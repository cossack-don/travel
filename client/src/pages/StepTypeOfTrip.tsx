import { Link } from "react-router-dom"
import { ChangeEvent, useEffect, useState } from "react"
import { UICardRadioButton, UIWrapperCardRadioButtons } from "@/shared/UI"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import { userModel } from "@/entities/model/userSlice.ts"
import { Trip } from "@/entities/model/tripSlice.ts"

const StepTypeOfTrip = () => {
	const usePickActiveCardRadio = (defaultValue: string) => {
		const [value, setValue] = useState(defaultValue)

		const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
			setValue(e.target.value)
		}
		return [value, onChangeRadio]
	}
	const [isActiveValue, setActiveValue] = useState("alpineSkiing")
	const dataCards = useAppSelector(state => state.trip)
	const dispatch = useAppDispatch()
	// const dataCards = [
	// 	{
	// 		id: 1,
	// 		value: "alpineSkiing",
	// 		text: "Горные лыжи"
	// 	},
	// 	{
	// 		id: 2,
	// 		value: "beach",
	// 		text: "Пляж"
	// 	},
	// 	{
	// 		id: 3,
	// 		value: "businessTrips",
	// 		text: "Командировки"
	// 	},
	// 	{
	// 		id: 4,
	// 		value: "campingTrip",
	// 		text: "Поход с палатками"
	// 	},
	// 	{
	// 		id: 5,
	// 		value: "excursion",
	// 		text: "Экскурсия"
	// 	}
	// ]

	const ListCards = ({ listData, defaultValue, setActiveValue }: any) => {
		const [value, onChangeRadio] = usePickActiveCardRadio(defaultValue)

		useEffect(() => {
			setActiveValue(value)
		}, [value])

		const cards = listData.map((item: Trip) => {
			return (
				<UICardRadioButton key={item.id} onChange={onChangeRadio} defaultValue={item.value} isActive={value}>
					{item.text}
				</UICardRadioButton>
			)
		})

		return (
			<UIWrapperCardRadioButtons style={{ background: "#fff", padding: "35px" }}>
				{cards}
			</UIWrapperCardRadioButtons>
		)
	}

	const selectTripHandler = () => {
		dispatch(userModel({ typeOfTrip: isActiveValue }))
	}

	return (
		<div>
			<p>StepTypeOfTrip</p>
			<p>Тип поездки (пляж, горные лыжи, командировка,экскурсия и тд)</p>
			Выбран - {isActiveValue}
			<ListCards setActiveValue={setActiveValue} listData={dataCards} defaultValue={isActiveValue} />
			<Link
				to="/dashboard/app/8743b52063cd84097a65d1633f5c74f5/check-list/:id/step-list-of-things"
				style={{ width: "200px", height: "200px", marginRight: "15px" }}
				onClick={selectTripHandler}
			>
				к готовому списку
			</Link>
		</div>
	)
}

export default StepTypeOfTrip
