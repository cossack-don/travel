import { useNavigate } from "react-router-dom"
import { FormCreateApp } from "@/entities/App"
import { serviceApp } from "@/shared/api/transport"

const CreateNewApp = () => {
	const navigate = useNavigate()

	const handlerSubmitForm = async (name: any, description: any) => {
		try {
			const payload = {
				name,
				description
			}

			const { data } = await serviceApp.create(payload)
			await navigate(`/dashboard/app/${data?.id_app}`)
		} catch (e: any) {
			console.log(e)
		}
	}

	return (
		<>
			<FormCreateApp handlerSubmitForm={handlerSubmitForm} />
		</>
	)
}

export default CreateNewApp
