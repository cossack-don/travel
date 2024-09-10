import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface IStep {
	name: string
	status: boolean
}

export interface ISteps {
	[index: string]: IStep
}

const initialState: ISteps = {
	GENDER: {
		name: "GENDER",
		status: false
	},
	PERIOD: {
		name: "PERIOD",
		status: false
	},
	SEASON: {
		name: "SEASON",
		status: false
	},
	TYPE_TRIP: {
		name: "TYPE_TRIP",
		status: false
	},
	LIST_THINGS: {
		name: "LIST_THINGS",
		status: false
	}
}

export const steps = createSlice({
	name: "stepper",
	initialState,
	reducers: {
		changeStatusStep: (state, action: PayloadAction<string>) => {
			state[action.payload].status = true
		}
	}
})

export const { changeStatusStep } = steps.actions

export default steps.reducer
