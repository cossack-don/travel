import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type StepOfDaysType = {
	id: number
	value: string
	text: string
}

interface StepOfDays {
	stepOfDays: StepOfDaysType[]
}

const initialState: StepOfDays = {
	stepOfDays: [
		{
			id: 1,
			value: "1",
			text: "1 день"
		},
		{
			id: 2,
			value: "3",
			text: "3 дня"
		},
		{
			id: 3,
			value: "5",
			text: "5 дней"
		},
		{
			id: 4,
			value: "7",
			text: "7 дней"
		},
		{
			id: 5,
			value: "14",
			text: "14 дней"
		}
	]
}

const slice = createSlice({
	name: "stepOfDays",
	initialState,
	reducers: {
		stepOfDays: (state, action: PayloadAction<StepOfDaysType>) => {
			state.stepOfDays.push(action.payload)
		}
	}
})

export const { stepOfDays } = slice.actions
export default slice.reducer
