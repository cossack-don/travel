import { ReactNode } from "react"
import styles from "@/shared/UI/UILogo/UILogo.module.scss"


interface Props {
	children: ReactNode
}

export default function UILogo({ children }: Props) {
	return (
		<div>{children}</div>
	)
}
