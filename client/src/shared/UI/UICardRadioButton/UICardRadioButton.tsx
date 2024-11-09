import style from "./UICardRadioButton.module.scss"
import { ReactNode } from "react"

interface Props {
	defaultValue: string
	isActive: string
	onChange: any
	children: ReactNode
}

export default function UICardRadioButton({ children, defaultValue, isActive, onChange }: Props) {
	return (
		<label
			className={`${style.wrapper} ${defaultValue === isActive ? style.activeButton : style.notActiveButton}`}
		>
			{children}
			<input type="radio" onChange={onChange} value={defaultValue} checked={defaultValue === isActive} />
		</label>
	)
}
