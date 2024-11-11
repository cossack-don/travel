import { StepperElement } from "@/features/steps/model/steps.reducer.ts"
import { UICardRadioButton } from "@/shared/UI"
import UIWrapperCardRadioButtons from "@/shared/UI/UIWrapperCardRadioButtons/UIWrapperCardRadioButtons.tsx"

const ListCards = ({ listData, defaultValue, usePickActiveCardRadio }: any) => {
	const [value, onChangeRadio] = usePickActiveCardRadio(defaultValue)

	const cards = listData.map((item: StepperElement) => {
		return (
			<UICardRadioButton key={item.key} onChange={onChangeRadio} defaultValue={item.name} isActive={value}>
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
