import * as React from "react"

export default function UICheckBox({ children, defaultValue, onChange }) {
	const [checked, setChecked] = React.useState(defaultValue)

	const handleOnChange = () => {
		setChecked(!checked)
		onChange?.(!checked)
	}

	return (
		<label>
			<input type="checkbox" checked={checked} onChange={handleOnChange} />

			{children}
		</label>
	)
}
