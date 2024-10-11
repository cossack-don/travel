import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { userModel } from "@/entities/model/userSlice.ts"

interface SexType {
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
		selectSex: (state, action: PayloadAction<SexType[]>) => {
			state = action.payload
		}
	},
	extraReducers: builder => {
		builder.addCase(userModel, (state, action) => {
			console.log({ state })
		})
	}
})

export const { selectSex } = SexSlice.actions
export const sexSlice = SexSlice.reducer
