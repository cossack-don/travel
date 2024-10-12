import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface StateType {
	id?: number
	name?: string
	sex?: string | null
	days?: number
	place?: string
	season?: string
	typeOfTrip?: string
}

interface UserType {
	SelectedUser: StateType | null
}

const initialState: UserType = {
	SelectedUser: {}
}

const slice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userModel: (state, action: PayloadAction<StateType>) => {
			state.SelectedUser = action.payload
			console.log(state.SelectedUser)
		}
	}
})

export const { userModel } = slice.actions
export const userSlice = slice.reducer
