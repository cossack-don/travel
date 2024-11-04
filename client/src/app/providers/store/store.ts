import { configureStore, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit"
import { stepOfDaysSlice } from "@/entities/model/numbersOfDaysSlice.ts"
import { placeSlice } from "@/entities/model/placeSlice.ts"
import { stepOfSeasons } from "@/entities/model/seasonsSlice.ts"
import { stepOfTrip } from "@/entities/model/tripSlice.ts"
import { userSlice } from "@/entities/model/userSlice.ts"
import { stepperReducer } from "@/features/steps/model/steps.reducer.ts"

export const store = configureStore({
	reducer: {
		stepOfDays: stepOfDaysSlice,
		place: placeSlice,
		season: stepOfSeasons,
		trip: stepOfTrip,
		user: userSlice,
		stepper: stepperReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
