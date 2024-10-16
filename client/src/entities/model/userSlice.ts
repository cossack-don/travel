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

const initialState: UserType = {
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
		userModel: (state, action: PayloadAction<Partial<User>>) => {
			state.selectedUser = {
				...state.selectedUser,
				...action.payload
			}
			console.log(state.selectedUser)
		},
		resetUserModel: (state, action: PayloadAction<Partial<User>>) => {
			state[action.payload.id].selectedUser = {
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

export const { userModel } = slice.actions
export const userSlice = slice.reducer
