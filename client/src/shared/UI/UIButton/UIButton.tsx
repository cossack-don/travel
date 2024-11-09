import { ReactNode } from "react"
import styles from "@/shared/UI/UIButton/UIButton.module.scss"
import { Link } from "react-router-dom"
import { EnumSizes } from "./listSizes"
import { UISpinner } from "@/shared/UI"

interface Props {
	children: ReactNode
	onClick?: () => void
	to?: string
	size?: EnumSizes
	target?: string
	iconLeft?: ReactNode
	iconRight?: ReactNode
	disabled?: boolean
	className?: any
	type?: any
	isLoading?: boolean
}

const listTypesButton = {
	danger: styles.buttonDanger
}

export default function UIButton({
	children,
	onClick,
	to = undefined,
	size = EnumSizes.MD,
	iconLeft,
	iconRight,
	target,
	disabled,
	className,
	type,
	isLoading = false
}: Props) {
	const buttonClassName = `${styles.button} ${listTypesButton[type]} ${className} ${styles[size]}`

	const content = (
		<>
			{iconLeft && <span className={styles.icon}>{iconLeft}</span>}
			{children}
			{iconRight && <span className={styles.icon}>{iconRight}</span>}
		</>
	)
	return (
		<>
			{to && (
				<Link to={to} onClick={onClick} target={target}>
					{content}
				</Link>
			)}

			{!to && (
				<button disabled={disabled} className={buttonClassName} onClick={onClick}>
					<div className={"d-flex align-items-center"}>
						{isLoading && (
							<UISpinner
								style={{ marginRight: "4px" }}
								fill={type === "danger" ? "var(--white)" : "var(--white)"}
								size="xs"
							/>
						)}

						{content}
					</div>
				</button>
			)}
		</>
	)
}
