import { ReactNode } from "react"
import styles from "./UIInput.module.scss"

interface Props {
	children?: ReactNode
	type?: string
	value?: string
	onClick?: () => void
	onInput?: (e: any) => any
	onChange?: () => void
	onFocus?: () => void
	onBlur?: () => void
	fullWidth?: boolean
	listClasses?: any
	size?: string
	label?: string
	errorText?: string
	isError?: boolean
	maxLength?: number | undefined
	name?: string
	placeholder?: string
	style?: any
	validation?: any
}

const UIInput = ({
	label = "Label",
	errorText = "Error text",
	isError,
	onClick,
	value,
	onInput,
	onChange,
	onFocus,
	onBlur,
	maxLength,
	type = "text",
	fullWidth = false,
	listClasses,
	placeholder = "Placeholder",
	name,
	style,
	validation
}: Props) => {
	return (
		<div className={styles.wrapper} style={style}>
			<span className={styles.label}>{label}</span>
			<input
				placeholder={placeholder}
				name={name}
				maxLength={maxLength}
				value={value}
				onInput={onInput}
				onClick={onClick}
				onBlur={onBlur}
				onFocus={onFocus}
				onChange={onChange}
				className={`${styles.input} ${fullWidth ? styles.fullWidth : ""} ${listClasses} ${isError ? styles.errorInput : ""}`}
				type={type}
				{...validation}
			/>
			<span className={styles.errorText}>{isError ? errorText : ""}</span>
		</div>
	)
}

export default UIInput
