import { ReactNode } from "react"
import styles from './UIFooter.module.scss'
interface Props {
	children: ReactNode
}

export default function UIFooter({ children }: Props) {
	return <footer className={styles.footer}>{children}</footer>
}
