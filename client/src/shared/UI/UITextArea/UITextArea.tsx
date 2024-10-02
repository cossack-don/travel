import * as React from "react"
import styles from "./UITextArea.module.scss"

interface Props {
	label?: string
	textError?: string
	onInput?: (e: any) => any
	value?: string
	maxLength?: number | undefined
	cols?: number | undefined
	rows?: number | undefined
	style?: any
	isError?: boolean
	placeholder?: string
}
const UITextArea = ({
	label = "Label",
	textError = "Text Error",
	onInput,
	value,
	maxLength = undefined,
	cols,
	rows,
	style,
	isError,
	placeholder
}: Props) => {
	return (
		<div className={styles.wrapper} style={style}>
			<span className={styles.label}>{label}</span>

			<textarea
				placeholder={placeholder}
				onInput={onInput}
				value={value}
				maxLength={maxLength}
				className={`${styles.textarea}`}
				cols={cols}
				rows={rows}
			/>

			{isError && <span className={styles.errorText}>{textError}</span>}
		</div>
	)
}

export default UITextArea
