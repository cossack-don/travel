import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Season {
	id: number
	value: string
	text: string
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
		stepOfSeasons: (state, action: PayloadAction<Season>) => {
			state[action.payload.id] = action.payload
		}
	}
})

// export const { stepOfSeasonAction } = slice.actions
export const stepOfSeasons = slice.reducer
