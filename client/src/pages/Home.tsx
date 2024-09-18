import { useEffect, useState } from "react"
import {
	UIButton,
	UICard,
	UICardRadioButton,
	UIInput,
	UISpinner,
	UIWrapperCardRadioButtons
} from "@/shared/UI"

const Home = () => {
	//TODO для теста бекенда что работает

	const usePickActiveCardRadio = (defaultValue: string) => {
		const [value, setValue] = useState(defaultValue)

		const onChangeRadio = e => {
			setValue(e.target.value)
		}
		return [value, onChangeRadio]
	}
	const [isActiveValue, setActiveValue] = useState("man")
	const dataCards = [
		{
			id: 1,
			value: "man",
			text: "Мужчина"
		},
		{
			id: 2,
			value: "woman",
			text: "Женщина"
		}
	]
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

		return <UIWrapperCardRadioButtons>{cards}</UIWrapperCardRadioButtons>
	}

	return (
		<div className="row between-xs" style={{ height: "100vh", padding: "15px", background: "var(--gray)" }}>
			<div className="col-xs-12">
				<div className="box">
					<div>
						<h3>Примеры draft компонентов</h3>
						<UISpinner />
						<UIButton to="/dadaa" size="md">
							Button
						</UIButton>
						<UICard isLink>Card</UICard>
						<UIInput type="text" />
						<ListCards setActiveValue={setActiveValue} listData={dataCards} defaultValue={isActiveValue} />
						{isActiveValue}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
