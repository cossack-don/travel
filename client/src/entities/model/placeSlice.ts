import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Place {
	id: number
	value: string
	text: string
}

const initialState: Place[] = [
	{
		id: 1,
		value: "country",
		text: "По стране"
	},
	{
		id: 2,
		value: "abroad",
		text: "За границу"
	}
]

const slice = createSlice({
	name: "place",
	initialState,
	reducers: {
		stepOfPlace: (state, action: PayloadAction<Place>) => {
			state[action.payload.id] = action.payload
		}
	}
})

export const { stepOfPlace } = slice.actions
export const placeSlice = slice.reducer
