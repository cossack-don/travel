import { configureStore } from "@reduxjs/toolkit"
import { sexSlice } from "@/entities/model/sexSlice.ts"
import { stepOfDaysSlice } from "@/entities/model/stepNumbersOfDaysSlice.ts"
import { placeSlice } from "@/entities/model/placeSlice.ts"
import { stepOfSeasons } from "@/entities/model/seasonsSlice.ts"
import { stepOfTrip } from "@/entities/model/tripSlice.ts"

export const store = configureStore({
	reducer: {
		sex: sexSlice,
		stepOfDays: stepOfDaysSlice,
		place: placeSlice,
		season: stepOfSeasons,
		trip: stepOfTrip
	}
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
