import * as React from "react"

import { Routes, Route } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"
import WrapperTypeLayout from "@/app/providers/layouts/WrapperTypeLayout"

import {
	NotFoundPage,
	CreateApp,
	TemplateApp,
	StepSex,
	Home,
	Dashboard,
	StepNumberOfDays,
	StepTypePlace,
	StepTypeOfTrip,
	StepTypeSeasons,
	StepListOfThings
} from "@/pages"


const Routers = () => {
	return (

		<Routes>

			<Route path="/" element={
				<WrapperTypeLayout name="default">
					<Home />
				</WrapperTypeLayout>}
			/>
			<Route path="/dashboard" element={
				<WrapperTypeLayout name="dashboard">
					<Dashboard />
				</WrapperTypeLayout>}
			/>

			<Route path="/dashboard/create-app" element={
				<WrapperTypeLayout name="dashboard">
					<CreateApp />
				</WrapperTypeLayout>}
			/>

			<Route path="/dashboard/app/:id" element={
				<WrapperTypeLayout name="dashboard">
					<TemplateApp />
				</WrapperTypeLayout>}
			/>

			<Route path="/dashboard/app/:id/step-sex" element={
				<WrapperTypeLayout name="dashboard">
					<StepSex />
				</WrapperTypeLayout>}
			/>

			<Route path="/dashboard/app/:id/step-number-of-days" element={
				<WrapperTypeLayout name="dashboard">
					<StepNumberOfDays />
				</WrapperTypeLayout>}
			/>

			<Route path="/dashboard/app/:id/step-type-place" element={
				<WrapperTypeLayout name="dashboard">
					<StepTypePlace />
				</WrapperTypeLayout>}
			/>

			<Route path="/dashboard/app/:id/step-type-seasons" element={
				<WrapperTypeLayout name="dashboard">
					<StepTypeSeasons />
				</WrapperTypeLayout>}
			/>
			<Route path="/dashboard/app/:id/step-type-of-trip" element={
				<WrapperTypeLayout name="dashboard">
					<StepTypeOfTrip />
				</WrapperTypeLayout>}
			/>

			<Route path="/dashboard/app/:id/step-list-of-things" element={
				<WrapperTypeLayout name="dashboard">
					<StepListOfThings />
				</WrapperTypeLayout>}
			/>


			<Route path="*" element={<NotFoundPage />} />
		</Routes>

	)
}

const Router = () => <BrowserRouter><Routers /></BrowserRouter>

export default Router
