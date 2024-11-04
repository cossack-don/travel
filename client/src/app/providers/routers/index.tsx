import * as React from "react"

import { createBrowserRouter } from "react-router-dom"
import WrapperTypeLayout from "@/app/providers/layouts/WrapperTypeLayout"

import {
	CreateApp,
	Dashboard,
	Home,
	NotFoundPage,
	StepListOfThings,
	StepNumberOfDays,
	StepSex,
	StepTypeOfTrip,
	StepTypePlace,
	StepTypeSeasons,
	TemplateApp,
	StepCreateCheckList,
	Apps,
	Auth,
	Registration,
	SettingApp,
	ResetPassword,
	Features
} from "@/pages"

export const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<WrapperTypeLayout name="default">
				<Home />
			</WrapperTypeLayout>
		)
	},
	{
		path: "/auth",
		element: (
			// <WrapperTypeLayout name="default">
			<Auth />
			// </WrapperTypeLayout>
		)
	},
	{
		path: "/registration",
		element: (
			// <WrapperTypeLayout name="default">
			<Registration />
			// </WrapperTypeLayout>
		)
	},
	{
		path: "/reset-password",
		element: (
			// <WrapperTypeLayout name="default">
			<ResetPassword />
			// </WrapperTypeLayout>
		)
	},
	{
		path: "/dashboard",
		element: (
			<WrapperTypeLayout name="dashboard">
				<Dashboard />
			</WrapperTypeLayout>
		)
	},
	{
		path: "/dashboard/create-app",
		element: (
			<WrapperTypeLayout name="dashboard">
				<CreateApp />
			</WrapperTypeLayout>
		)
	},
	{
		path: "/dashboard/app/:idApp",
		element: (
			<WrapperTypeLayout name="app">
				<TemplateApp />
			</WrapperTypeLayout>
		)
	},
	{
		path: "/dashboard/app/:idApp/features",
		element: (
			<WrapperTypeLayout name="app">
				<Features />
			</WrapperTypeLayout>
		)
	},
	{
		path: "/dashboard/app/:idApp/settings",
		element: (
			<WrapperTypeLayout name="app">
				<SettingApp />
			</WrapperTypeLayout>
		)
	},
	{
		path: "/dashboard/apps",
		element: (
			<WrapperTypeLayout name="dashboard">
				<Apps />
			</WrapperTypeLayout>
		)
	},
	{
		path: "/dashboard/app/:idApp/check-list/create",
		element: (
			<WrapperTypeLayout name="dashboard">
				<StepCreateCheckList />
			</WrapperTypeLayout>
		)
	},
	{
		path: "/dashboard/app/:idApp/check-list/:idCheckList/step-sex",
		element: (
			<WrapperTypeLayout name="dashboard">
				<StepSex />
			</WrapperTypeLayout>
		)
	},
	{
		path: "/dashboard/app/:idApp/check-list/:idCheckList/step-number-of-days",
		element: (
			<WrapperTypeLayout name="dashboard">
				<StepNumberOfDays />
			</WrapperTypeLayout>
		)
	},
	{
		path: "/dashboard/app/:idApp/check-list/:idCheckList/step-type-place",
		element: (
			<WrapperTypeLayout name="dashboard">
				<StepTypePlace />
			</WrapperTypeLayout>
		)
	},
	{
		path: "/dashboard/app/:idApp/check-list/:idCheckList/step-type-seasons",
		element: (
			<WrapperTypeLayout name="dashboard">
				<StepTypeSeasons />
			</WrapperTypeLayout>
		)
	},
	{
		path: "/dashboard/app/:idApp/check-list/:idCheckList/step-type-of-trip",
		element: (
			<WrapperTypeLayout name="dashboard">
				<StepTypeOfTrip />
			</WrapperTypeLayout>
		)
	},
	{
		path: "/dashboard/app/:idApp/check-list/:idCheckList/step-list-of-things",
		element: (
			<WrapperTypeLayout name="dashboard">
				<StepListOfThings />
			</WrapperTypeLayout>
		)
	},
	{
		path: "*",
		element: <NotFoundPage />
	}
])
