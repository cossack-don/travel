import { ReactNode } from "react"
import style from "./UIInput.module.scss"

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
}

const UIInput = ({
	children,
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
	name
}: Props) => {
	return (
		<div className={style.wrapper}>
			<span className={style.label}>{label}</span>
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
				className={`${style.input} ${fullWidth ? style.fullWidth : ""} ${listClasses} ${isError ? style.errorInput : ""}`}
				type={type}
			/>
			<span className={style.errorText}>{isError ? errorText : ""}</span>
		</div>
	)
}

export default UIInput
