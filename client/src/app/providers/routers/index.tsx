import { createBrowserRouter } from "react-router-dom"
import WrapperTypeLayout from "@/app/providers/layouts/WrapperTypeLayout"
import { Home, NotFoundPage, Auth, Registration, ResetPassword } from "@/pages"
import AuthGuard from "@/app/providers/auth-guard/AuthGuard.tsx"
import DashboardRoutes from "@/app/providers/routers/RoutesDashboard.tsx"

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
		element: <Auth />
	},
	{
		path: "/registration",
		element: <Registration />
	},
	{
		path: "/reset-password",
		element: <ResetPassword />
	},
	{
		path: "/dashboard/*",
		element: (
			<AuthGuard>
				<DashboardRoutes />
			</AuthGuard>
		)
	},
	{
		path: "*",
		element: <NotFoundPage />
	}
])
