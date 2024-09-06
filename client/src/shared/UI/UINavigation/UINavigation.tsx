import { ReactNode } from "react"

interface Props {
	children: ReactNode
}

const UINavigation = ({ children }: Props) =>{
	return (
		<div>{children}</div>
	)
}

export default UINavigation
