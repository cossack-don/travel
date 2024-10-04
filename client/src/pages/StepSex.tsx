import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { UICardRadioButton, UILink, UIWrapperCardRadioButtons } from "@/shared/UI"
import { useSelector } from "react-redux"
import { RootState } from "@/app/providers/store/store.ts"

const StepSex = () => {
	const dataCards = useSelector<RootState>(state => state.sexSelect)
	const usePickActiveCardRadio = (defaultValue: string) => {
		const [value, setValue] = useState(defaultValue)

		const onChangeRadio = e => {
			setValue(e.target.value)
		}
		return [value, onChangeRadio]
	}
	const [isActiveValue, setActiveValue] = useState("man")

	const ListCards = ({ listData, defaultValue, setActiveValue }: any) => {
		const [value, onChangeRadio] = usePickActiveCardRadio(defaultValue)

		useEffect(() => {
			setActiveValue(value)
		}, [value])

		const cards = listData.map(item => {
			return (
				<UICardRadioButton key={item.id} onChange={onChangeRadio} defaultValue={item.value} isActive={value}>
					{item.text}
				</UICardRadioButton>
			)
		})

		return (
			<UIWrapperCardRadioButtons style={{ background: "#fff", padding: "35px" }}>
				{cards}
			</UIWrapperCardRadioButtons>
		)
	}

	return (
		<div>
			<p>ШАГ 1- StepSex </p>
			<p>Выбор пола</p>
			<UILink to={"/dashboard/app/8743b52063cd84097a65d1633f5c74f5"}>Назад</UILink>
			<ListCards setActiveValue={setActiveValue} listData={dataCards} defaultValue={isActiveValue} />
			Выбран - {isActiveValue}
			<br />
			<br />
			<Link
				to="/dashboard/app/8743b52063cd84097a65d1633f5c74f5/check-list/:id/step-number-of-days"
				style={{ width: "200px", height: "200px", marginRight: "15px" }}
			>
				На 2-й шаг
			</Link>
		</div>
	)
}

export default StepSex
