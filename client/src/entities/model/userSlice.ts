import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface User {
	id?: number | null
	name?: string | null
	sex?: string | null
	days?: number | null
	place?: string | null
	season?: string | null
	typeOfTrip?: string | null
}

interface UserType {
	selectedUser: User | null
}

let initialState: UserType = {
	selectedUser: {
		id: null,
		name: null,
		sex: null,
		days: null,
		place: null,
		season: null,
		typeOfTrip: null
	}
}

const slice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userModel: (state, action: PayloadAction<User>) => {
			state.selectedUser = {
				...state.selectedUser,
				...action.payload
			}
		},
		resetUserModel: state => {
			state.selectedUser = {
				id: null,
				name: null,
				sex: null,
				days: null,
				place: null,
				season: null,
				typeOfTrip: null
			}
		}
	}
})

export const userSlice = slice.reducer
export const { userModel } = slice.actions
