import { ReactNode } from "react"
import styles from "@/shared/UI/UILink/UILink.module.scss"

interface Props {
	children: ReactNode
}

export default function UILink({ children }: Props) {

	return (
		<button className={}>{children}</button>
	)
}
