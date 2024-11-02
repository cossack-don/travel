import { configureStore } from "@reduxjs/toolkit"
import { sexSlice } from "@/entities/model/sexSlice.ts"
import { stepOfDaysSlice } from "@/entities/model/numbersOfDaysSlice.ts"
import { placeSlice } from "@/entities/model/placeSlice.ts"
import { stepOfSeasons } from "@/entities/model/seasonsSlice.ts"
import { stepOfTrip } from "@/entities/model/tripSlice.ts"
import { userSlice } from "@/entities/model/userSlice.ts"
import { infoEvent } from "@/features/infoEvent/infoEventSlice.ts"

export const store = configureStore({
	reducer: {
		sex: sexSlice,
		stepOfDays: stepOfDaysSlice,
		place: placeSlice,
		season: stepOfSeasons,
		trip: stepOfTrip,
		user: userSlice,
		infoEvent: infoEvent
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
