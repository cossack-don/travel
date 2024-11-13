import { StepperElement } from "@/features/steps/model/steps.reducer.ts"
import { UICardRadioButton } from "@/shared/UI"
import UIWrapperCardRadioButtons from "@/shared/UI/UIWrapperCardRadioButtons/UIWrapperCardRadioButtons.tsx"

const ListCards = ({ listSteps, isActiveStep, onChangeStep }: any) => {
	console.log(isActiveStep)

	const cards = listSteps?.map((item: StepperElement) => {
		return (
			<UICardRadioButton
				key={item.key}
				onChange={onChangeStep}
				defaultValue={item.key}
				isActive={isActiveStep}
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
