import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface IInfoEvent {
	id: string
	name: string
	description: string
	itemsCheckList: [] | any
}

export interface infoEventState {
	data: IInfoEvent | null
}

const initialState: infoEventState = {
	data: null
}

export const infoEventSlice = createSlice({
	name: "infoEvent",
	initialState,
	reducers: {
		updateStateInfoEvent: (state, action: PayloadAction<IInfoEvent>) => {
			state.data = action.payload
			// console.log(state.data)
		}
	}
})

export const { updateStateInfoEvent } = infoEventSlice.actions
export const infoEvent = infoEventSlice.reducer
