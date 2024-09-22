import { useNavigate } from "react-router-dom"
import { mockApp } from "@/shared/mockData/mockApp"
import { UIButton, UIInput, UICol, UIContainer, UITextArea } from "@/shared/UI"
import { useEffect, useState } from "react"
import style from "./CreateApp.module.scss"
import { serviceApp } from "@/shared/api/transport"

const CreateApp = () => {
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [isError, setError] = useState(false)
	const navigate = useNavigate()

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

	const handlerSubmitForm = async () => {
		try {
			//api fetch
			const payload = {
				name,
				description
			}
			await serviceApp.create(payload)
			console.log("FORM", name, description, isError)
			if (!isError) {
				await navigate(`/dashboard/app/${mockApp.hashApp}`)
			}
		} catch (e: any) {
			console.log(e)
		}
	}

	useEffect(() => {
		if (name === "" || description === "") setError(true)
		else if (name.length <= infoFields.name.MAX_LENGTH) setError(true)
		else setError(false)
	}, [name, description])

	return (
		<>
			<UIContainer listClasses={`row center-xs middle-xs`}>
				<UICol listClasses={`col-sm-4 ${style.wrapperForm}`}>
					<UIInput
						errorText={infoFields.name.textError}
						isError={isError}
						label={infoFields.name.label}
						value={name}
						onInput={handlerUpdateInputName}
					/>
					<UITextArea
						rows={8}
						label={infoFields.description.label}
						value={description}
						onInput={handlerUpdateInputDescription}
					/>

					<UIButton onClick={handlerSubmitForm}>Создать приложение</UIButton>
				</UICol>
			</UIContainer>
		</>
	)
}
export default CreateApp
