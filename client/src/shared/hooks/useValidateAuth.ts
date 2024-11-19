import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const useOnMountedValidateAuth = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const isAuthenticated: string | null = localStorage.getItem("auth")
		if (isAuthenticated) navigate("/dashboard")
	}, [])
}
