import { ReactNode } from "react"

interface Props {
	children: ReactNode
}

export default function UIFooter({ children }: Props) {

	return (
		<footer >{children}</footer>
	)
}
