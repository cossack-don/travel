import { mockApp } from "@/shared/mockData/mockApp"
import { useNavigate } from "react-router-dom"
import { FormCreateApp } from "@/entities/App"
import { serviceApp } from "@/shared/api/transport"

const CreateNewApp = () => {
	const navigate = useNavigate()

	const handlerSubmitForm = async (name: any, description: any, isError: any) => {
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

	return (
		<>
			<FormCreateApp handlerSubmitForm={handlerSubmitForm} />
		</>
	)
}

export default CreateNewApp
