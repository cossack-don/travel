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
	ResetPassword
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
		path: "/dashboard/app/:id",
		element: (
			<WrapperTypeLayout name="dashboard">
				<TemplateApp />
			</WrapperTypeLayout>
		)
	},
	{
		path: "/dashboard/app/:id/url2",
		element: (
			<WrapperTypeLayout name="dashboard">
				<div>test2-page</div>
				<TemplateApp />
			</WrapperTypeLayout>
		)
	},
	{
		path: "/dashboard/app/:id/settings",
		element: (
			<WrapperTypeLayout name="dashboard">
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
		path: "/dashboard/app/:id/check-list/:id/create",
		element: (
			<WrapperTypeLayout name="dashboard">
				<StepCreateCheckList />
			</WrapperTypeLayout>
		)
	},
	{
		path: "/dashboard/app/:id/check-list/:id/step-sex",
		element: (
			<WrapperTypeLayout name="dashboard">
				<StepSex />
			</WrapperTypeLayout>
		)
	},
	{
		path: "/dashboard/app/:id/check-list/:id/step-number-of-days",
		element: (
			<WrapperTypeLayout name="dashboard">
				<StepNumberOfDays />
			</WrapperTypeLayout>
		)
	},
	{
		path: "/dashboard/app/:id/check-list/:id/step-type-place",
		element: (
			<WrapperTypeLayout name="dashboard">
				<StepTypePlace />
			</WrapperTypeLayout>
		)
	},
	{
		path: "/dashboard/app/:id/check-list/:id/step-type-seasons",
		element: (
			<WrapperTypeLayout name="dashboard">
				<StepTypeSeasons />
			</WrapperTypeLayout>
		)
	},
	{
		path: "/dashboard/app/:id/check-list/:id/step-type-of-trip",
		element: (
			<WrapperTypeLayout name="dashboard">
				<StepTypeOfTrip />
			</WrapperTypeLayout>
		)
	},
	{
		path: "/dashboard/app/:id/check-list/:id/step-list-of-things",
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
