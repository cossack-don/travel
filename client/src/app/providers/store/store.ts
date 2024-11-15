import { configureStore, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit"
import { stepOfTrip } from "@/entities/model/tripSlice.ts"
import { stepperSlice } from "@/entities/model/stepperSlice.ts"
import { userSlice } from "@/entities/model/userSlice.ts"
import { stepperReducer } from "@/features/steps/model/steps.reducer.ts"
import { infoEvent } from "@/features/infoEvent/infoEventSlice.ts"

export const store = configureStore({
	reducer: {
		trip: stepOfTrip,
		user: userSlice,
		stepper: stepperReducer,
		infoEvent: infoEvent,
		stepperF: stepperSlice
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
