import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Season {
	id: number
	value: string
	text: string
}

interface StepOfSeason {
	stepOfSeason: Season[] | null
}

const initialState: Season[] = [
	{
		id: 1,
		value: "cold",
		text: "Холодно"
	},
	{
		id: 2,
		value: "warm",
		text: "Тепло"
	}
]

const slice = createSlice({
	name: "step of Seasons",
	initialState,
	reducers: {
		stepOfSeasons: (state, action: PayloadAction<StepOfSeason>) => {
			state = action.payload
		}
	}
})

export const { stepOfSeasonAction } = slice.actions
export const stepOfSeasons = slice.reducer
