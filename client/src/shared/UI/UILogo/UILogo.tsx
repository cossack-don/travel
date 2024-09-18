import { ReactNode } from "react"

interface Props {
	children: ReactNode
}

export default function UILogo({ children }: Props) {
	return <div>{children}</div>
}
