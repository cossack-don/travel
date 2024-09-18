import "flexboxgrid/dist/flexboxgrid.min.css"
import "react-toastify/dist/ReactToastify.css"

import "@/app//style/reset.scss"
import "@/app/style/palette.scss"
import "@/app/style/helpers.scss"
import "@/app/style/index.scss"

import StoreProvider from "@/app/providers/store"
import { router } from "@/app/providers/routers"
import { RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"

const App = () => {
	return (
		<StoreProvider>
			<RouterProvider router={router} />
			<ToastContainer />
		</StoreProvider>
	)
}

export default App
