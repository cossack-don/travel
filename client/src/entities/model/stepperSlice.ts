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
	pickedCard: null
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
		setSteps: (state, action: PayloadAction<any>) => {
			state.stepsLifeCycle = action.payload
		},
		setListSteps: (state, action: PayloadAction<any>) => {
			state.listSteps = action.payload
		},
		setListCards: (state, action: PayloadAction<any>) => {
			state.listCards = action.payload
		},
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
			.addCase(getListSteps.fulfilled, (state: any, action) => {
				state.listSteps = action.payload
				// console.log(state.listSteps, 321)
			})
			.addCase(getListCards.fulfilled, (state, action) => {
				state.listCards = action.payload
				// await dispatch(setListCards(responseListCards.data))
			})
	}
})

export const stepperSlice = slice.reducer
export const { setListCards, setSteps, setPickedCard, $resetStateStepper, setListSteps } = slice.actions

export const updateCurrentStepAPI = createAsyncThunk<any>(
	"stepp3er/fetch",
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

export const getAllInfoCurrentCheckListAPI = createAsyncThunk<IAllInfoCurrentCheckListAPI>(
	"getAllInfoCurrentCheckList/api",
	async (args: any, thunkAPI: any) => {
		const { dispatch } = thunkAPI
		const { idApp, idCheckList, nameStep } = args

		try {
			//Берем инфу по текущему чек-листу => steps
			const { data } = await serviceCheckList.getById(idApp, idCheckList)
			await dispatch(setSteps(data.steps[0]))

			// получаем список элементов для карточек
			const responseListCards = await serviceCheckList.getListCards(nameStep)
			await dispatch(setListCards(responseListCards.data))

			if (data.steps[0][nameStep] === null) {
				await dispatch(setPickedCard(responseListCards[0].data?.key))
			} else {
				console.log(123, nameStep)
				await dispatch(setPickedCard(data.steps[0][nameStep])) //обновляем текущий шаг // переменовать в card
			}

			return 1
		} catch (error) {
			console.log(error)
		}
	}
)

export const getListCards = createAsyncThunk<IAllInfoCurrentCheckListAPI>("getListCards/api", async args => {
	const { step } = args

	try {
		const responseListCards = await serviceCheckList.getListCards(step) //name step из запроса
		return responseListCards.data
	} catch (error) {
		console.log(error)
	}
})

export const getListSteps = createAsyncThunk<IAllInfoCurrentCheckListAPI>(
	"getListSteps/api",
	async (_, thunkAPI: any) => {
		// const { dispatch } = thunkAPI
		try {
			//получаем какие шаги вообще есть
			const responseListSteps = await serviceCheckList.getListSteps()
			return responseListSteps.data
		} catch (error) {
			console.log(error)
		}
	}
)
