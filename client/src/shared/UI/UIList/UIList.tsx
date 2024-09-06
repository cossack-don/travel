import { ReactNode } from "react"

interface Props {
	children: ReactNode
}

export default function UIList({ children }: Props) {
	return (
		<div>{children}</div>
	)
}
