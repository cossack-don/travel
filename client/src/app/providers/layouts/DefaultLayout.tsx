import { ReactNode } from "react"
import { UIHeader, UILogo, UIButton, UIFooter } from "@/shared/UI"
import { useNavigate } from "react-router-dom"
import styles from './DefaultLayout.module.scss'

type Props = {
	children: ReactNode
}

const DefaultLayout = ({ children }: Props) => {
	const navigate = useNavigate()

	return (
		<>
			<UIHeader
				leftElement={<UILogo>LOGO</UILogo>}
				rightElement={<UIButton onClick={() => navigate("/dashboard")}>Вход</UIButton>}
			/>
			<main className={styles.wrapper}>{children}</main>
			<UIFooter>Footer</UIFooter>
		</>
	)
}

export default DefaultLayout
