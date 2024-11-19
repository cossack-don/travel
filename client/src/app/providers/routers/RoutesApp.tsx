import { Route, Routes } from "react-router-dom"
import WrapperTypeLayout from "@/app/providers/layouts/WrapperTypeLayout.tsx"
import { Apps, CreateApp, Features, SettingApp, TemplateApp } from "@/pages"

const RoutesApp = () => (
	<>
		<Routes>
			<Route
				path="create-app"
				element={
					<WrapperTypeLayout name="dashboard">
						<CreateApp />
					</WrapperTypeLayout>
				}
			/>
			<Route
				path="apps"
				element={
					<WrapperTypeLayout name="dashboard">
						<Apps />
					</WrapperTypeLayout>
				}
			/>
			<Route
				path="app/:idApp"
				element={
					<WrapperTypeLayout name="app">
						<TemplateApp />
					</WrapperTypeLayout>
				}
			/>
			<Route
				path="app/:idApp/features"
				element={
					<WrapperTypeLayout name="app">
						<Features />
					</WrapperTypeLayout>
				}
			/>
			<Route
				path="app/:idApp/settings"
				element={
					<WrapperTypeLayout name="app">
						<SettingApp />
					</WrapperTypeLayout>
				}
			/>
		</Routes>
	</>
)

export default RoutesApp
