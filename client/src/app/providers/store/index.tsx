import { Provider } from "react-redux"
import { store } from "@/app/providers/store/store"
import { ReactNode } from "react"

type Props = {
	children: ReactNode
}

const StoreProvider = ({ children }: Props) => <Provider store={store}> {children}</Provider>

export default StoreProvider
