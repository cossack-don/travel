import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { mockApp } from "@/shared/mockData/mockApp"
import { UIButton, UINavigation, UICol, UIContainer, UIHeadingTypography } from "@/shared/UI"
import { serviceApp } from "@/shared/api/transport"
import { listNavigation } from "@/shared/UI/UINavigation/listNavigation"

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
				<div key={item.id} style={{ border: "solid 2px green", marginBottom: "15px" }}>
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
		<UIContainer>
			<UICol listClasses={"col-sm-3"}>
				<div>
					<UINavigation listNavigation={listNavigation} />
				</div>
			</UICol>

			<UICol listClasses={"col-sm-9"}>
				<div>
					<UIHeadingTypography as="h2">Обзор</UIHeadingTypography>
					<Test />

					<UIButton onClick={() => navigate(`/dashboard/app/${mockApp.hashApp}/check-list/:id/create`)}>
						Создать новый список вещей
					</UIButton>
				</div>
			</UICol>
		</UIContainer>
	)
}

export default TemplateApp
