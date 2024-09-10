import styles from "./UIWrapperCardRadioButtons.module.scss"

const UIWrapperCardRadioButtons = ({ children, listClasses, style }: any) => {
	return (
		<div className={`${styles.wrapper} ${listClasses}`} style={style}>
			{children}
		</div>
	)
}

export default UIWrapperCardRadioButtons
