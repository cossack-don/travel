import { Outlet } from "react-router-dom"
import { ReactNode } from "react"

const AuthGuard = ({ children }: ReactNode) => {
	const isAuthenticated: string | null = localStorage.getItem("auth")

	if (!isAuthenticated) {
		//<Navigate to="/" replace />
		return window.location.assign("/")
	}

	return children ?? <Outlet />
}

export default AuthGuard
