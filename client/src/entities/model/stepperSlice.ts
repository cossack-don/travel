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

export interface IStepper {
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
export const { setListCards, setSteps, setPickedCard, $resetStateStepper } = slice.actions

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
	"step2per/fetch",
	async (args: any, thunkAPI: any) => {
		const { dispatch } = thunkAPI
		const { idApp, idCheckList, nameStep, link } = args

		try {
			//Берем инфу по текущему чек-листу => steps
			const { data } = await serviceCheckList.getById(idApp, idCheckList)
			await dispatch(setSteps(data.steps[0]))

			// получаем список элементов для карточек
			const {
				data: { elements_step }
			} = await serviceCheckList.getListSteps(link)
			await dispatch(setListCards(elements_step))

			if (data.steps[0][nameStep] === null) {
				await dispatch(setPickedCard(elements_step[0]?.key))
			} else {
				await dispatch(setPickedCard(data.steps[0][nameStep])) //обновляем текущий шаг // переменовать в card
			}
		} catch (error) {
			console.log(error)
		}
	}
)
