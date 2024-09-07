import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { mockApp } from "@/shared/mockData/mockApp"
import {UINavigation, UIButton, UIInput} from "@/shared/UI";

const TemplateApp = () => {
	const params = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		console.log(params)
	}, [])

	return (
		<div style={{ display: "flex" }}>
			<div style={{ width: "30%", background: "white", marginTop:'25px' }}>
				<UINavigation>
					Навигация
				</UINavigation>
				<ul>
					<li>Список вещей</li>
					<li>Расширение функционала</li>
					<li>Настройки</li>
				</ul>
			</div>
			<div style={{ width: "70%", background: "yellow" }}>
				<div>
					HASH APP - {params.id}
					<br />

					<UIButton onClick={() => navigate(`/dashboard/app/${mockApp.hashApp}/step-sex`)}>Собрать вещи</UIButton>
				</div>
			</div>
		</div>

	)
}

export default TemplateApp
