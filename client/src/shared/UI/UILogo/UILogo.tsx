import { ReactNode } from "react"
import { UILink } from "@/shared/UI"

interface Props {
	children: ReactNode
	style?: any
}

const UILogo = ({ children, style }: Props) => {
	return (
		<UILink style={style} to="/dashboard">
			{children}
		</UILink>
	)
}

export default UILogo
