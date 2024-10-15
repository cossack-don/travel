import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface User {
	id?: number
	name?: string
	sex?: string
	days?: number
	place?: string
	season?: string
	typeOfTrip?: string
}

interface UserType {
	selectedUser: User | null
}

const initialState: UserType = {
	selectedUser: {}
}

const slice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userModel: (state, action: PayloadAction<Partial<User>>) => {
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
