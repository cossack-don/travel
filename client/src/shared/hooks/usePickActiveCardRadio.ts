import { ChangeEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import { stepperActions } from "@/features/steps/model/steps.reducer.ts"

export const usePickActiveCardRadio = (defaultValue: string) => {
	const dispatch = useAppDispatch()
	const [value, setValue] = useState(defaultValue)
	const { data } = useAppSelector(state => state.stepper)
	const listData = data.elements_step

	const onChangeRadio = async (e: ChangeEvent<HTMLInputElement>) => {
		if (defaultValue === "") {
			await setValue(e.target.value)
		}
		const filteredActiveValue = listData.find(el => el.name === e.target.value)
		await dispatch(stepperActions.setActiveValue(filteredActiveValue))
	}

	useEffect(() => {
		setValue(defaultValue)
	}, [defaultValue])

	return [value, onChangeRadio]
}
