import { ReactNode } from "react"
import styles from "@/shared/UI/UIButton/UIButton.module.scss"

// import { Link } from "react-router-dom"

interface Props {
	children: ReactNode
}

// Sizes xl / md / sm
export default function UIButton({ children, onClick }: Props) {
	return (
		<button onClick={onClick} className={styles.button}>
			{children}
		</button>
	)
}
