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

export interface ICard {
	key: string
	name: string
}

export interface ISteps {
	sex: string
	days: string
	destination: string
	weather: string
	trip_type: string
}

export interface IStepper {
	listSteps: ISteps | null
	listCards: ICard[] | []
	stepsLifeCycle: {
		sex?: string | null | undefined
		days?: number | null | undefined
		destination?: string | null | undefined
		weather?: string | null | undefined
		trip_type?: string | null | undefined
	}
	pickedCard: string | null | undefined
	listsCategories: [] | any
}

const initialState: IStepper = {
	listCards: [],
	listSteps: null,
	stepsLifeCycle: {
		sex: undefined,
		days: undefined,
		destination: undefined,
		weather: undefined,
		trip_type: undefined
	},
	pickedCard: null,
	listsCategories: []
}

export const listResetsStates = {
	isResetListCards: true,
	isResetPickedCard: true,
	isResetStepsLifeCycle: true
}

const slice = createSlice({
	name: "stepper",
	initialState,
	reducers: {
		setPickedCard: (state, action: PayloadAction<any>) => {
			state.pickedCard = action.payload
		},

		$resetStateStepper: (state, action: PayloadAction<any>) => {
			if (action.payload.isResetPickedCard) {
				state.pickedCard = null
			}

			if (action.payload.isResetStepsLifeCycle) {
				state.stepsLifeCycle = {
					sex: undefined,
					days: undefined,
					destination: undefined,
					weather: undefined,
					trip_type: undefined
				}
			}

			if (action.payload.isResetListCards) {
				state.listCards = []
			}
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getInfoCurrentCheckList.fulfilled, (state: any, { payload }) => {
				state.stepsLifeCycle = payload.steps[0]

				//TODO бага, бек должен отдавать массив а не объект
				state.listsCategories.push(payload.items)
				console.log(JSON.stringify(state))
			})
			.addCase(getListSteps.fulfilled, (state: any, action) => {
				state.listSteps = action.payload
			})
			.addCase(getListCards.fulfilled, (state: any, action) => {
				state.listCards = action.payload
			})
			.addCase(chainApiStepper.fulfilled, (state: any, { payload }) => {
				if (payload?.currentSteps[payload?.currentStep] === null) {
					state.pickedCard = payload.listCards[0].key
					console.log(JSON.stringify(state))
				} else {
					state.pickedCard = payload.currentSteps[payload.currentStep]
				}
			})
	}
})

export const stepperSlice = slice.reducer
export const { setPickedCard, $resetStateStepper } = slice.actions

export const updateCurrentStepAPI = createAsyncThunk<any>(
	"stepp3er/api",
	async (args: any, thunkAPI: any) => {
		const { rejectWithValue, dispatch } = thunkAPI
		const { idApp, idCheckList, nameStep, pickValueStep } = args
		try {
			await serviceCheckList.updateCurrentStep(idApp, idCheckList, {
				[nameStep]: pickValueStep
			})
			await toast.success("Шаг успешно обновлен", { position: "bottom-right" })
		} catch (error) {
			console.log(error)
		}
	}
)

export interface IAllInfoCurrentCheckListAPI {
	idApp: string | undefined
	idCheckList: string | undefined
	nameStep: EnumNamesSteps
	link: string
}

export const getInfoCurrentCheckList = createAsyncThunk<any>("getInfoCurrentCheckList/api", async args => {
	const { idApp, idCheckList } = args
	try {
		const { data } = await serviceCheckList.getById(idApp, idCheckList)
		return data
	} catch (error) {
		console.log(error)
	}
})

export const getListCards = createAsyncThunk<IAllInfoCurrentCheckListAPI>("getListCards/api", async args => {
	const { step } = args
	try {
		const responseListCards = await serviceCheckList.getListCards(step) //name step из запроса
		return responseListCards.data
	} catch (error) {
		console.log(error)
	}
})

export const getListSteps = createAsyncThunk<IAllInfoCurrentCheckListAPI>("getListSteps/api", async () => {
	try {
		const responseListSteps = await serviceCheckList.getListSteps()
		return responseListSteps.data
	} catch (error) {
		console.log(error)
	}
})

export const chainApiStepper = createAsyncThunk<IAllInfoCurrentCheckListAPI>(
	"chainApiStepper/api",
	async (args: any, thunkAPI: any) => {
		const { dispatch } = thunkAPI
		const { idApp, idCheckList, nameStep } = args

		try {
			const currentCheckList = await dispatch(
				getInfoCurrentCheckList({ idApp: idApp, idCheckList: idCheckList })
			)
			const listSteps = await dispatch(getListSteps())
			const listCards = await dispatch(getListCards({ step: nameStep }))

			return {
				currentSteps: currentCheckList.payload.steps[0],
				currentStep: nameStep,
				listSteps: listSteps.payload,
				listCards: listCards.payload
			}
		} catch (error) {
			console.log(error)
		}
	}
)
