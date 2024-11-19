import { useNavigate, useParams } from "react-router-dom"
import { mockApp } from "@/shared/mockData/mockApp.ts"
import { UIButton, UIInput, UICol, UIContainer } from "@/shared/UI"
import { useEffect, useState } from "react"
import style from "../../../../pages/CreateApp.module.scss"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { serviceCheckList } from "@/shared/api/transport"
import { createCheckList } from "@/entities/model/stepperSlice.ts"
import { useAppDispatch } from "@/shared/hooks/hooks.ts"

const StepCreateCheckList = () => {
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [isError, setError] = useState(false)
	const navigate = useNavigate()
	const params = useParams()
	const dispatch = useAppDispatch()

	const infoFields = {
		name: {
			MAX_LENGTH: 2,
			textError: "Минимум 3 символа",
			label: "Название чек-листа"
		},
		description: {
			label: "Описание"
		}
	}

	const handlerUpdateInputName = (e: any) => setName(e.target.value)
	const handlerUpdateInputDescription = (e: any) => setDescription(e.target.value)

	const handlerSubmitForm = async () => {
		try {
			const payloadForm = {
				name: name,
				description: description
			}
			const { payload } = await dispatch(createCheckList({ idApp: params?.idApp, payload: payloadForm }))

			await navigate(`/dashboard/app/${params?.idApp}/check-list/${payload.checkListId}/step-sex`)
		} catch (e: any) {
			console.log(e)
		}
	}

	useEffect(() => {
		if (name === "" || description === "") setError(true)
		else if (name.length <= infoFields.name.MAX_LENGTH) setError(true)
		else setError(false)
	}, [name, description])

	useEffect(() => {
		console.log(params, 3333)
	}, [])
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
						<UIButton type="submit">Создать чек-лист</UIButton>
					</form>
				</UICol>
			</UIContainer>
		</>
	)
}
export default StepCreateCheckList
