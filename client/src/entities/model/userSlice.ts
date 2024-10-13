import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface StateType {
	id?: number
	name?: string
	sex?: string
	days?: number
	place?: string
	season?: string
	typeOfTrip?: string
}

interface UserType {
	selectedUser: StateType | null
}

const initialState: UserType = {
	selectedUser: {}
}

const slice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userModel: (state, action: PayloadAction<Partial<StateType>>) => {
			state.selectedUser = {
				...state.selectedUser,
				...action.payload
			}
			console.log(state.selectedUser)
		}
	}
})

export const { userModel } = slice.actions
export const userSlice = slice.reducer
