import { Link } from "react-router-dom"
import { UICardRadioButton, UIWrapperCardRadioButtons } from "@/shared/UI"
import { useEffect, useState } from "react"

const StepTypePlace = () => {
	const usePickActiveCardRadio = (defaultValue: string) => {
		const [value, setValue] = useState(defaultValue)

		const onChangeRadio = e => {
			setValue(e.target.value)
		}
		return [value, onChangeRadio]
	}
	const [isActiveValue, setActiveValue] = useState("country")
	const dataCards = [
		{
			id: 1,
			value: "country",
			text: "По стране"
		},
		{
			id: 2,
			value: "abroad",
			text: "За граница"
		}
	]

	const ListCards = ({ listData, defaultValue, setActiveValue }: any) => {
		const [value, onChangeRadio] = usePickActiveCardRadio(defaultValue)

		useEffect(() => {
			setActiveValue(value)
		}, [value])

		const cards = listData.map(item => {
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

	return (
		<div>
			<p>StepTypePlace</p>
			<p>По стране или заграницу</p>
			Выбран - {isActiveValue}
			<ListCards setActiveValue={setActiveValue} listData={dataCards} defaultValue={isActiveValue} />
			<Link
				to="/dashboard/app/8743b52063cd84097a65d1633f5c74f5/check-list/:id/step-type-seasons"
				style={{ width: "200px", height: "200px", marginRight: "15px" }}
			>
				к 4-му шагу
			</Link>
		</div>
	)
}

export default StepTypePlace
