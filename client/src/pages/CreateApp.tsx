import { useNavigate } from "react-router-dom"
import { mockApp } from "@/shared/mockData/mockApp"

const CreateApp = () => {
	let navigate = useNavigate()

	return (
		<>
			<div style={{ background: "gray", width: "300px", padding: "15px", margin: "0 auto" }}>
				<p>Название приложения</p>
				<input type="text" />
				<p>Описание</p>
				<input type="text" /> <br />
				<button style={{ marginTop: "15px" }} onClick={() => navigate(`/dashboard/app/${mockApp.hashApp}`)}>Создать
					приложение
				</button>
			</div>

		</>
	)
}
export default CreateApp
