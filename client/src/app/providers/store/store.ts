import { configureStore } from "@reduxjs/toolkit"
import { sexReducer } from "@/entities/model/sexSlice.ts"

export const store = configureStore({
	reducer: {
		sexSelect: sexReducer
	}
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
