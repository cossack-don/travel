import { ReactNode } from "react"

interface Props {
	children: ReactNode
}

const UIInput = ({ children }: Props) =>{
	return (
		<div>{children}</div>
	)
}

export default UIInput
