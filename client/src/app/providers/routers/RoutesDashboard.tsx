import { Route, Routes } from "react-router-dom"
import WrapperTypeLayout from "@/app/providers/layouts/WrapperTypeLayout.tsx"
import { Dashboard } from "@/pages"
import RoutesApp from "@/app/providers/routers/RoutesApp.tsx"
import RoutesStepperCheckList from "@/app/providers/routers/RoutesStepper.tsx"

const DashboardRoutes = () => (
	<>
		<Routes>
			<Route
				index
				element={
					<WrapperTypeLayout name="dashboard">
						<Dashboard />
					</WrapperTypeLayout>
				}
			/>
		</Routes>
		<RoutesApp />
		<RoutesStepperCheckList />
	</>
)

export default DashboardRoutes
