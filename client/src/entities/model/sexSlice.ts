import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface SexType {
	id: number
	value: string
	text: string
}

const initialState: SexType[] = [
	{ id: 1, value: "man", text: "Мужчина" },
	{ id: 2, value: "woman", text: "Женщина" }
]

const SexSlice = createSlice({
	name: "sex",
	initialState,
	reducers: {
		selectSex: (state, action: PayloadAction<SexType>) => {
			state[action.payload.id] = action.payload
		}
	}
})

export const { selectSex } = SexSlice.actions
export const sexSlice = SexSlice.reducer
