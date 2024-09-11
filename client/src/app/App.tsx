import "flexboxgrid/dist/flexboxgrid.min.css"

import "@/app//style/reset.scss"
import "@/app/style/palette.scss"
import "@/app/style/helpers.scss"
import "@/app/style/index.scss"

import StoreProvider from "@/app/providers/store"
import { router } from "@/app/providers/routers"
import { RouterProvider } from "react-router-dom"

const App = () => {
	return (
		<StoreProvider>
			<RouterProvider router={router} />
		</StoreProvider>
	)
}

export default App
