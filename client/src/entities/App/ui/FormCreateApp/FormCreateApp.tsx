import { UIButton, UIInput, UICol, UIContainer, UITextArea, UIHeadingTypography } from "@/shared/UI"
import { useEffect, useState } from "react"
import style from "./FormCreateApp.module.scss"

interface Props {
	handlerSubmitForm: any
}

const FormCreateApp = ({ handlerSubmitForm }: Props) => {
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [isError, setError] = useState(false)

	const infoFields = {
		name: {
			MAX_LENGTH: 2,
			textError: "Минимум 3 символа",
			label: "Название приложения"
		},
		description: {
			label: "Описание"
		}
	}

	const handlerUpdateInputName = e => setName(e.target.value)
	const handlerUpdateInputDescription = e => setDescription(e.target.value)

	useEffect(() => {
		if (name === "" || description === "") setError(true)
		else if (name.length <= infoFields.name.MAX_LENGTH) setError(true)
		else setError(false)
	}, [name, description])

	return (
		<>
			<UIContainer listClasses={`row`}>
				<UICol listClasses={" cols-sm-12 col-md-12"}>
					<UIHeadingTypography as={"h2"} bold="medium">
						Новое приложение
					</UIHeadingTypography>
				</UICol>

				<UICol listClasses={`col-sm-12`}>
					<div className={style.wrapperForm}>
						<UIInput
							placeholder={"Название приложения"}
							label={infoFields.name.label}
							value={name}
							style={{ width: "80%" }}
							onInput={handlerUpdateInputName}
						/>
						<UITextArea
							placeholder={"Для чего используется приложение"}
							style={{ width: "80%" }}
							rows={2}
							label={infoFields.description.label}
							value={description}
							onInput={handlerUpdateInputDescription}
						/>
					</div>
				</UICol>

				<UICol listClasses={"col-md-12"}>
					<div className="d-flex justify-content-center">
						<UIButton className={style.button} onClick={() => handlerSubmitForm(name, description, isError)}>
							Создать приложение
						</UIButton>
					</div>
				</UICol>
			</UIContainer>
		</>
	)
}
export default FormCreateApp
