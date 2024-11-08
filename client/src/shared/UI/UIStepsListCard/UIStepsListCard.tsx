import { useEffect, useLayoutEffect } from "react"
import { StepperElement } from "@/features/steps/model/steps.reducer.ts"
import { UICardRadioButton } from "@/shared/UI"
import UIWrapperCardRadioButtons from "@/shared/UI/UIWrapperCardRadioButtons/UIWrapperCardRadioButtons.tsx"

const ListCards = ({ listData, defaultValue, setActiveValue, usePickActiveCardRadio }: any) => {
	// const [value, onChangeRadio] = usePickActiveCardRadio(defaultValue)
	console.log(defaultValue)

	useEffect(() => {
		setActiveValue(defaultValue)
	}, [])

	const cards = listData.map((item: StepperElement) => {
		return (
			<UICardRadioButton
				key={item.key}
				onChange={usePickActiveCardRadio}
				defaultValue={item.name}
				isActive={defaultValue}
			>
				{item.name}
			</UICardRadioButton>
		)
	})

	return (
		<UIWrapperCardRadioButtons style={{ background: "#fff", padding: "35px" }}>
			{cards}
		</UIWrapperCardRadioButtons>
	)
}

export default ListCards
