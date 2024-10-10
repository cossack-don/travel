import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface StateType {
	id: number
	name: string
	sex: string
	days: number
	place: string
	season: string
	typeOfTrip: string
}

interface UserType {
	SelectedUser: StateType | null
}

const initialState: UserType = {
	SelectedUser: null
}

const slice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userModel: (state, action: PayloadAction<UserType>) => {
			state.SelectedUser = action.payload
		}
	}
})

export const { userModel } = slice.actions
export const userSlice = slice.reducer
