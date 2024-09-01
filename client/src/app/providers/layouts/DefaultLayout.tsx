import { ReactNode } from "react"
import { UIHeader } from "@/shared/UI"

type Props = {
	children: ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
	return (
		<div>
			<UIHeader />
			{children}
		</div>
	)
}

export default DefaultLayout
