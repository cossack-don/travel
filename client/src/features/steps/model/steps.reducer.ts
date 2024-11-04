import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { stepperApi } from "@/features/steps/api/stepperApi.ts"
import axios from "axios"

export interface StepperElement {
	name: string
	key: string
}

export interface StepperElements {
	elements_step: StepperElement[]
}

export const initialState: StepperElement[] = []

export const slice = createSlice({
	name: "app/steps",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchStepsElement.fulfilled, (_, action: PayloadAction<StepperElements>) => {
			return action.payload.elements_step
		})
	}
})

export const stepperReducer = slice.reducer
export const stepperActions = slice.actions

export const fetchStepsElement = createAsyncThunk(
	"app/steps/stepperElements",
	async (arg: { link: string }, thunkAPI) => {
		const { rejectWithValue } = thunkAPI
		const { link } = arg
		try {
			const response = await stepperApi.getStepsElement(link)
			const { data } = response

			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(null)
			} else {
				throw new Error(error as string)
			}
		}
	}
)
