import { UIButton, UIInput, UICol, UIContainer, UITextArea, UIHeadingTypography } from "@/shared/UI"
import { useEffect, useState } from "react"
import style from "./FormCreateApp.module.scss"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { getChecklist } from "@/shared/api/axios/api.ts"
import { toast } from "react-toastify"

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
			label: "Название события"
		},
		description: {
			label: "Описание события"
		}
	}

	const handlerUpdateInputName = (e: any) => setName(e.target.value)
	const handlerUpdateInputDescription = (e: any) => setDescription(e.target.value)

	useEffect(() => {
		if (name === "" || description === "") setError(true)
		else if (name.length <= infoFields.name.MAX_LENGTH) setError(true)
		else setError(false)
	}, [name, description])

	const schema = z.object({
		name: z.string().min(1, "Название события обязательно!"),
		description: z.string().min(5, "Минимум 5 символов")
	})

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(schema)
	})

	const onSubmitFormHandler = (data: any) => {
		handlerSubmitForm(data.name, data.description, isError)
	}
	return (
		<>
			<UIContainer listClasses={`row`}>
				<UICol listClasses={" cols-sm-12 col-md-12"}>
					<UIHeadingTypography as={"h2"} bold="medium">
						Новое событие
					</UIHeadingTypography>
				</UICol>
				<form onSubmit={handleSubmit(onSubmitFormHandler)} style={{ width: "100%" }}>
					<UICol listClasses={`col-sm-12`}>
						<div className={style.wrapperForm}>
							<UIInput
								placeholder={"Название события"}
								label={infoFields.name.label}
								value={name}
								style={{ width: "80%" }}
								onInput={handlerUpdateInputName}
								validation={register("name", { minLength: 3 })}
							/>
							{errors.name ? (
								<p style={{ color: "red", marginBottom: "15px" }}>{errors.name.message as string}</p>
							) : null}
							<UITextArea
								placeholder={"Описание события"}
								style={{ width: "80%" }}
								rows={2}
								label={infoFields.description.label}
								value={description}
								onInput={handlerUpdateInputDescription}
								validation={register("description", { minLength: 5 })}
							/>
							{errors.description ? (
								<p style={{ color: "red" }}>{errors.description.message as string}</p>
							) : null}
						</div>
					</UICol>

					<UICol listClasses={"col-md-12"}>
						<div className="d-flex justify-content-center">
							<UIButton className={style.button} type="submit">
								Создать событие
							</UIButton>
						</div>
					</UICol>
				</form>
			</UIContainer>
		</>
	)
}

export default FormCreateApp
