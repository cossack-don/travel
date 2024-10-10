import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Trip {
	id: number
	value: string
	text: string
}

interface StepOfTrip {
	stepOfTrip: Trip[] | null
}

const initialState: Trip[] = [
	{
		id: 1,
		value: "alpineSkiing",
		text: "Горные лыжи"
	},
	{
		id: 2,
		value: "beach",
		text: "Пляж"
	},
	{
		id: 3,
		value: "businessTrips",
		text: "Командировки"
	},
	{
		id: 4,
		value: "campingTrip",
		text: "Поход с палатками"
	},
	{
		id: 5,
		value: "excursion",
		text: "Экскурсия"
	}
]

const slice = createSlice({
	name: "step of Trip",
	initialState,
	reducers: {
		stepOfTrip: (state, action: PayloadAction<StepOfTrip>) => {
			state = action.payload
		}
	}
})

export const tripAction = slice.actions
export const stepOfTrip = slice.reducer
