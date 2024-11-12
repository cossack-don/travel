import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { serviceCheckList } from "@/shared/api/transport"
import { toast } from "react-toastify"

export enum EnumNamesSteps {
	SEX = "sex",
	DAYS = "days",
	DESTINATION = "destination",
	WEATHER = "weather",
	TRIP_TYPE = "trip_type"
}

export interface IStep {
	key: string
	name: string
}

export interface IStepper {
	listSteps: IStep[]
	stepsLifeCycle: {
		sex?: string | null | undefined
		days?: number | null | undefined
		destination?: string | null | undefined
		weather?: string | null | undefined
		trip_type?: string | null | undefined
	}
	currentStep: string | null | undefined
}

const initialState: IStepper = {
	listSteps: [],
	stepsLifeCycle: {
		sex: undefined,
		days: undefined,
		destination: undefined,
		weather: undefined,
		trip_type: undefined
	},
	currentStep: null
}

const slice = createSlice({
	name: "stepper",
	initialState,
	reducers: {
		setSteps: (state, action: PayloadAction<any>) => {
			state.stepsLifeCycle = action.payload
		},
		setListSteps: (state, action: PayloadAction<any>) => {
			state.listSteps = action.payload
		},
		setCurrentStep: (state, action: PayloadAction<any>) => {
			state.currentStep = action.payload
		},
		$resetStateStepper: state => {
			state.currentStep = null
			state.stepsLifeCycle = {
				sex: undefined,
				days: undefined,
				destination: undefined,
				weather: undefined,
				trip_type: undefined
			}
			state.listSteps = []
		}
	}
	// extraReducers: builder => {
	// 	builder.addCase(updateCurrentStepAPI.fulfilled, (state, action) => {
	// 		// state.selectedUser = action.payload.data.steps[0]
	// 	})
	// 	builder.addCase(getListStepsAPI.fulfilled, (state, action) => {
	// 		// state.selectedUser = action.payload.data.steps[0]
	// 	})
	// }
})

export const stepperSlice = slice.reducer
export const { setListSteps, setSteps, setCurrentStep, $resetStateStepper } = slice.actions

export const getCurrentCheckListAPI = createAsyncThunk<any>(
	"stepper/fetch",
	async (args: any, thunkAPI: any) => {
		try {
			const { rejectWithValue, dispatch } = thunkAPI
			const { idApp, idCheckList } = args

			const { data } = await serviceCheckList.getById(idApp, idCheckList)
			await dispatch(setSteps(data.steps[0]))
		} catch (error) {
			console.log(error)
		}
	}
)

export const getListStepsAPI = createAsyncThunk<any>("stepper/fetch", async (args?: any, thunkAPI: any) => {
	const { rejectWithValue, dispatch } = thunkAPI
	const { link } = args
	try {
		const {
			data: { elements_step }
		} = await serviceCheckList.getListSteps(link)
		await dispatch(setListSteps(elements_step))
		await dispatch(setCurrentStep(elements_step[0]?.key))
	} catch (error) {
		console.log(error)
	}
})

export const updateCurrentStepAPI = createAsyncThunk<any>(
	"stepper/fetch",
	async (args: any, thunkAPI: any) => {
		const { rejectWithValue, dispatch } = thunkAPI
		const { idApp, idCheckList, nameStep, pickValueStep } = args
		try {
			const { data } = await serviceCheckList.updateCurrentStep(idApp, idCheckList, {
				[nameStep]: pickValueStep
			})
			// const { data } = await serviceCheckList.getById(idApp, idCheckList)
			// await dispatch(setSteps(data.steps[0]))
			// await dispatch(setSteps(data.steps[0]))

			toast.success("Шаг успешно обновлен", { position: "bottom-right" })
		} catch (error) {
			console.log(error)
		}
	}
)
