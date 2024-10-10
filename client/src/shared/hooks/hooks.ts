import { TypedUseSelectorHook, useSelector } from "react-redux"
import { RootState } from "@/app/providers/store/store.ts"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
