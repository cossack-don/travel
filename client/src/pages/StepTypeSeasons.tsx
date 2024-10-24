import { Link } from "react-router-dom"
import { ChangeEvent, useEffect, useState } from "react"
import { UICardRadioButton, UIWrapperCardRadioButtons } from "@/shared/UI"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import { Season } from "@/entities/model/seasonsSlice.ts"
import { userModel } from "@/entities/model/userSlice.ts"

const StepTypeSeasons = () => {
	const dispatch = useAppDispatch()
	const usePickActiveCardRadio = (defaultValue: string) => {
		const [value, setValue] = useState(defaultValue)

		const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
			setValue(e.target.value)
		}
		return [value, onChangeRadio]
	}
	const [isActiveValue, setActiveValue] = useState("cold")
	const dataCards = useAppSelector(state => state.season)
	// const dataCards = [
	// 	{
	// 		id: 1,
	// 		value: "cold",
	// 		text: "Холодно"
	// 	},
	// 	{
	// 		id: 2,
	// 		value: "warm",
	// 		text: "Тепло"
	// 	}
	// ]

	const ListCards = ({ listData, defaultValue, setActiveValue }: any) => {
		const [value, onChangeRadio] = usePickActiveCardRadio(defaultValue)

		useEffect(() => {
			setActiveValue(value)
		}, [value])

		const cards = listData.map((item: Season) => {
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

	const onSelectSeasonHandler = () => {
		dispatch(userModel({ season: isActiveValue }))
	}

	return (
		<div>
			<p>StepTypeSeasons</p>
			Выбран - {isActiveValue}
			<ListCards setActiveValue={setActiveValue} listData={dataCards} defaultValue={isActiveValue} />
			<p>Время года (тепло или холодно)</p>
			<Link
				to="/dashboard/app/8743b52063cd84097a65d1633f5c74f5/check-list/:id/step-type-of-trip"
				style={{ width: "200px", height: "200px", marginRight: "15px" }}
				onClick={onSelectSeasonHandler}
			>
				к шагу 5
			</Link>
		</div>
	)
}

export default StepTypeSeasons
