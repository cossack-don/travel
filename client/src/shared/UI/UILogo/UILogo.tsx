import { ReactNode } from "react"
import { UILink } from "@/shared/UI"

interface Props {
	children: ReactNode
	style?: any
}

export default function UILogo({ children, style }: Props) {
	return (
		<UILink style={style} to="/dashboard">
			{children}
		</UILink>
	)
}
