import { Link, useNavigate, useParams } from "react-router-dom"
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

		data["arrCheckList"] = [
			{
				id: 1,
				name: "Cписок вещей 1",
				descr: "descr"
			},
			{
				id: 2,
				name: "Cписок вещей 2",
				descr: "descr"
			},
			{
				id: 3,
				name: "Cписок вещей 3",
				descr: "descr"
			}
		]
		console.log(data, 3)
		setApp(data)
	}

	useEffect(() => {
		console.log(params)
		apiGetByIdApp()
	}, [])

	const Test = () => {
		return app?.arrCheckList?.map(item => {
			return (
				<div key={item.id} style={{ border: "solid 2px green", width: "300px", marginBottom: "15px" }}>
					<p>{item.name}</p>
					<p> {item.descr}</p>

					<Link to="/dashboard/app/8743b52063cd84097a65d1633f5c74f5/check-list/:id/step-list-of-things">
						Перейти
					</Link>
				</div>
			)
		})
	}
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

					<Test />

					<UIButton onClick={() => navigate(`/dashboard/app/${mockApp.hashApp}/check-list/:id/step-sex`)}>
						Создать новый список вещей
					</UIButton>
				</div>
			</div>
		</div>
	)
}

export default TemplateApp
