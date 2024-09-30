import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SexType {
	id: number
	sex: string
	text: string
}

interface UserState {
	selectedSex: SexType | null
}

const initialState: UserState = {
	selectedSex: null
}

const slice = createSlice({
	name: "sex",
	initialState,
	reducers: {
		selectSex: (state, action: PayloadAction<SexType>) => {
			state.selectedSex = action.payload
		}
	}
})

export const { selectedSex } = slice.actions
export default slice.reducer
