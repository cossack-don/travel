import { Link } from "react-router-dom"
import { ChangeEvent, useEffect, useState } from "react"
import { UICardRadioButton, UIWrapperCardRadioButtons } from "@/shared/UI"
import { StepOfDaysType } from "@/entities/model/numbersOfDaysSlice.ts"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import { userModel } from "@/entities/model/userSlice.ts"

const StepNumberOfDays = () => {
	const dispatch = useAppDispatch()
	const dataCards = useAppSelector(state => state.stepOfDays)

	const usePickActiveCardRadio = (defaultValue: string) => {
		const [value, setValue] = useState(defaultValue)

		const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
			setValue(e.target.value)
		}
		return [value, onChangeRadio]
	}
	const [isActiveValue, setActiveValue] = useState(1)
	// const dataCards = [
	// 	{
	// 		id: 1,
	// 		value: "1",
	// 		text: "1 день"
	// 	},
	// 	{
	// 		id: 2,
	// 		value: "3",
	// 		text: "3 дня"
	// 	},
	// 	{
	// 		id: 3,
	// 		value: "5",
	// 		text: "5 дней"
	// 	},
	// 	{
	// 		id: 4,
	// 		value: "7",
	// 		text: "7 дней"
	// 	},
	// 	{
	// 		id: 5,
	// 		value: "14",
	// 		text: "14 дней"
	// 	}
	// ]

	const ListCards = ({ listData, defaultValue, setActiveValue }: any) => {
		const [value, onChangeRadio] = usePickActiveCardRadio(defaultValue)

		useEffect(() => {
			setActiveValue(value)
		}, [value])

		const cards = listData.stepOfDays.map((item: StepOfDaysType) => {
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

	const setUserDaysHandler = () => {
		dispatch(userModel({ days: isActiveValue }))
	}

	return (
		<div>
			<p>StepNumberOfDays</p>
			<p>На сколько дней</p>
			Выбран - {isActiveValue}
			<ListCards setActiveValue={setActiveValue} listData={dataCards} defaultValue={isActiveValue} />
			<Link
				to="/dashboard/app/8743b52063cd84097a65d1633f5c74f5/check-list/:id/step-type-place"
				style={{ width: "200px", height: "200px", marginRight: "15px" }}
				onClick={setUserDaysHandler}
			>
				к 3-му шагу
			</Link>
		</div>
	)
}

export default StepNumberOfDays
