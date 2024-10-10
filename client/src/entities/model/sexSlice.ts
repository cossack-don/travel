import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SexType {
	id: number
	value: string
	text: string
}

interface UserState {
	selectedSex: SexType | null
}

type Sex = SexType[]

const initialState: Sex = [
	{ id: 1, value: "man", text: "Мужчина" },
	{ id: 2, value: "woman", text: "Женщина" }
]

const SexSlice = createSlice({
	name: "sex",
	initialState,
	reducers: {
		selectSex: (state, action: PayloadAction<UserState>) => {
			state.selectedSex = action.payload
		}
	}
})

export const { selectSexAction } = SexSlice.actions
export const sexSlice = SexSlice.reducer
