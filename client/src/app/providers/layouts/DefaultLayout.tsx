import { ReactNode } from "react"
import { UIHeader, UILogo, UIButton } from "@/shared/UI"
import { Link, useNavigate } from "react-router-dom"

type Props = {
	children: ReactNode
}

const DefaultLayout = ({ children }: Props) => {
	const navigate = useNavigate()

	return (
		<div>
			<UIHeader
				leftElement={<UILogo>LOGO</UILogo>}
				rightElement={<UIButton onClick={() => navigate("/dashboard")}>Вход</UIButton>}
			/>
			{children}
		</div>
	)
}

export default DefaultLayout
