import { Route, Routes } from "react-router-dom"
import WrapperTypeLayout from "@/app/providers/layouts/WrapperTypeLayout.tsx"
import {
	StepCreateCheckList,
	StepListOfThings,
	StepNumberOfDays,
	StepSex,
	StepTypeOfTrip,
	StepTypePlace,
	StepTypeSeasons
} from "@/pages"

const RoutesStepperCheckList = () => (
	<>
		<Routes>
			<Route
				path="app/:idApp/check-list/create"
				element={
					<WrapperTypeLayout name="dashboard">
						<StepCreateCheckList />
					</WrapperTypeLayout>
				}
			/>

			<Route
				path="app/:idApp/check-list/:idCheckList/step-sex"
				element={
					<WrapperTypeLayout name="dashboard">
						<StepSex />
					</WrapperTypeLayout>
				}
			/>

			<Route
				path="app/:idApp/check-list/:idCheckList/step-number-of-days"
				element={
					<WrapperTypeLayout name="dashboard">
						<StepNumberOfDays />
					</WrapperTypeLayout>
				}
			/>

			<Route
				path="app/:idApp/check-list/:idCheckList/step-type-place"
				element={
					<WrapperTypeLayout name="dashboard">
						<StepTypePlace />
					</WrapperTypeLayout>
				}
			/>

			<Route
				path="app/:idApp/check-list/:idCheckList/step-type-seasons"
				element={
					<WrapperTypeLayout name="dashboard">
						<StepTypeSeasons />
					</WrapperTypeLayout>
				}
			/>

			<Route
				path="app/:idApp/check-list/:idCheckList/step-type-of-trip"
				element={
					<WrapperTypeLayout name="dashboard">
						<StepTypeOfTrip />
					</WrapperTypeLayout>
				}
			/>

			<Route
				path="app/:idApp/check-list/:idCheckList/step-list-of-things"
				element={
					<WrapperTypeLayout name="dashboard">
						<StepListOfThings />
					</WrapperTypeLayout>
				}
			/>
		</Routes>
	</>
)

export default RoutesStepperCheckList
