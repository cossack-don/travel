import { ReactNode } from "react"
import { UILink } from "@/shared/UI"

interface Props {
	children: ReactNode
}

export default function UILogo({ children }: Props) {
	return <UILink to="/dashboard">{children}</UILink>
}
