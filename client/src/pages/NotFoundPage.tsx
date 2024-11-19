import * as React from "react"
import { useEffect } from "react"

export default function NotFoundPage() {
	useEffect(() => {
		const isAuthenticated: string | null = localStorage.getItem("auth")

		if (!isAuthenticated) {
			return window.location.assign("/")
		}
	}, [])

	return <div>404 ERROR NotFoundPage</div>
}
