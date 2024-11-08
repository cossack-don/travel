import style from "./UICardRadioButton.module.scss"

interface Props {
	defaultValue: string
	isActive: any
	onChange: any
	children: any
}

export default function UICardRadioButton({ children, defaultValue, isActive, onChange }: Props) {
	console.log(defaultValue)
	console.log(isActive)
	return (
		<label
			className={`${style.wrapper} ${defaultValue === isActive ? style.activeButton : style.notActiveButton}`}
		>
			{children}
			<input type="radio" onChange={onChange} value={defaultValue} checked={defaultValue === isActive} />
		</label>
	)
}
