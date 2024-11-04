import styles from "./UIAfterHeader.module.scss"
import { useSelector } from "react-redux"
import { RootState } from "@/app/providers/store/store.ts"

const UIAfterHeader = () => {
	const infoEvent = useSelector((state: RootState) => state.infoEvent.data)

	return (
		<nav className={styles.wrapper}>
			<p>ID: {infoEvent?.id}</p>
			<p>Название события: {infoEvent?.name}</p>
		</nav>
	)
}

export default UIAfterHeader
