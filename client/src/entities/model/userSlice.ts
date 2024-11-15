import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { serviceCheckList } from "@/shared/api/transport"

export interface User {
	id?: number | null
	name?: string | null
	sex?: string | null
	days?: number | null
	destination?: string | null
	weather?: string | null
	trip_type?: string | null
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
		destination: null,
		weather: null,
		trip_type: null
	}
}

type FetchUserArgs = {
	idApp: number | string
	idCheckList: number | string
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
	},
	extraReducers: builder => {
		builder.addCase(fetchUserSteps.fulfilled, (state, action) => {
			state.selectedUser = action.payload.data.steps[0]
		})
	}
})

export const userSlice = slice.reducer
export const { userModel } = slice.actions

export const fetchUserSteps = createAsyncThunk<FetchUserArgs, { idApp: string; idCheckList: string }>(
	"user/fetch",
	async (args, thunkAPI) => {
		const { idApp, idCheckList } = args
		const { rejectWithValue } = thunkAPI
		try {
			const { data } = await serviceCheckList.getById(idApp, idCheckList)
			return { data }
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(null)
			} else {
				throw new Error(error as string)
			}
		}
	}
)
