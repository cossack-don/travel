import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	id: 1,
	name: "Arkady Parovozov",
	sex: "man",
	days: 1,
	place: "country",
	season: "cold",
	typeOfTrip: "business trip"
}

const slice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userModel: () => {}
	}
})

export const { userModel } = slice.actions
export default slice.reducer
