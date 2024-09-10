import "flexboxgrid/dist/flexboxgrid.min.css"

import "@/app//style/reset.scss"
import "@/app/style/palette.scss"
import "@/app/style/helpers.scss"
import "@/app/style/index.scss"

import StoreProvider from "@/app/providers/store"
import Router from "@/app/providers/routers"

const App = () => {
	return (
		<StoreProvider>
			<Router />
		</StoreProvider>
	)
}

export default App
