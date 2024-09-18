import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { mockApp } from "@/shared/mockData/mockApp"
import { UIButton, UINavigation } from "@/shared/UI"
import { serviceApp } from "@/shared/api/transport"

const TemplateApp = () => {
	const params = useParams()
	const navigate = useNavigate()

	const [app, setApp] = useState([])
	const apiGetByIdApp = async () => {
		const { data } = await serviceApp.getById(params.id)
		setApp(data)
	}

	useEffect(() => {
		console.log(params)
		apiGetByIdApp()
	}, [])

	return (
		<div style={{ display: "flex" }}>
			<div style={{ width: "30%", background: "white", marginTop: "25px" }}>
				<UINavigation>Навигация</UINavigation>
				<ul>
					<li>Список вещей</li>
					<li>Расширение функционала</li>
					<li>Настройки</li>
				</ul>
			</div>
			<div style={{ width: "70%" }}>
				<div>
					<p>Название - {app.name}</p>
					<p>Описание - {app.description}</p>
					<p>ID - {app.id}</p>
					<br />
					<UIButton onClick={() => navigate(`/dashboard/app/${mockApp.hashApp}/step-sex`)}>
						Собрать вещи
					</UIButton>
				</div>
			</div>
		</div>
	)
}

export default TemplateApp
