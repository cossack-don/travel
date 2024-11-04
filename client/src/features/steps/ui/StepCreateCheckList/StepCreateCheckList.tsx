import { useNavigate } from "react-router-dom"
import { mockApp } from "@/shared/mockData/mockApp.ts"
import { UIButton, UIInput, UICol, UIContainer } from "@/shared/UI"
import { useEffect, useState } from "react"
import style from "../../../pages/CreateApp.module.scss"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const StepCreateCheckList = () => {
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

	const handlerUpdateInputName = (e: any) => setName(e.target.value)
	const handlerUpdateInputDescription = (e: any) => setDescription(e.target.value)

	const handlerSubmitForm = async (data: any) => {
		try {
			//api fetch
			navigate(`/dashboard/app/${mockApp.hashApp}/check-list/:id/step-sex`)
			console.log("FORM", data.name, data.description, isError)
			// if (!isError) {
			// 	await navigate(`/dashboard/app/${mockApp.hashApp}/step-sex`)
			// }
		} catch (e: any) {
			console.log(e)
		}
	}

	useEffect(() => {
		if (name === "" || description === "") setError(true)
		else if (name.length <= infoFields.name.MAX_LENGTH) setError(true)
		else setError(false)
	}, [name, description])

	const schema = z.object({
		name: z.string().min(1, "Название приложения обязательно! Минимум 1 символ"),
		description: z.string().min(5, "Описание обязательно! Минимум 5 символов")
	})

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(schema)
	})

	return (
		<>
			<UIContainer listClasses={`center-xs middle-xs`}>
				<p>Создание Чек листа</p>
				<UICol listClasses={`col-sm-4 ${style.wrapperForm}`}>
					<form onSubmit={handleSubmit(handlerSubmitForm)}>
						<UIInput
							// errorText={infoFields.name.textError}
							// isError={isError}
							label={infoFields.name.label}
							value={name}
							onInput={handlerUpdateInputName}
							validation={register("name", { minLength: 1 })}
						/>
						{errors.name ? <p style={{ color: "red" }}>{errors.name.message as string}</p> : null}
						<UIInput
							label={infoFields.description.label}
							value={description}
							onInput={handlerUpdateInputDescription}
							validation={register("description", { minLength: 5 })}
						/>
						{errors.description ? (
							<p style={{ color: "red" }}>{errors.description.message as string}</p>
						) : null}
						<UIButton type="submit">Создать приложение</UIButton>
					</form>
				</UICol>
			</UIContainer>
		</>
	)
}
export default StepCreateCheckList
