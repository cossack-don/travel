import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { stepperApi } from "@/features/steps/api/stepperApi.ts"
import axios from "axios"

export interface StepperElement {
	name: string
	key: string
}

export interface StepperElements {
	data: {
		elements_step: StepperElement[]
	}
	activeValue: StepperElement
}

export const initialState: StepperElements = {
	data: {
		elements_step: []
	},
	activeValue: {
		key: "",
		name: ""
	}
}

export const slice = createSlice({
	name: "app/steps",
	initialState,
	reducers: {
		setActiveValue: (state, action: PayloadAction<StepperElement>) => {
			state.activeValue = action.payload
			
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchStepsElement.fulfilled, (state, action: PayloadAction<StepperElements>) => {
			state.data.elements_step = action.payload.data.elements_step
		})
	}
})

export const stepperReducer = slice.reducer
export const stepperActions = slice.actions

export const fetchStepsElement = createAsyncThunk(
	"app/steps/stepperElements",
	async (arg: { link: string }, thunkAPI) => {
		const { rejectWithValue, dispatch } = thunkAPI
		const { link } = arg
		try {
			const { data } = await stepperApi.getStepsElement(link)
			dispatch(stepperActions.setActiveValue(data.elements_step[0]))
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
