import styles from "./UIAvatar.module.scss"
const UIAvatar = ({ onClick }) => {
	return (
		<div onClick={onClick} className={styles.wrapper}>
			Ava
		</div>
	)
}

export default UIAvatar
