import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { mockApp } from "@/shared/mockData/mockApp"
import { UIButton, UINavigation, UICol, UIContainer, UIHeadingTypography } from "@/shared/UI"
import { serviceApp, serviceCheckList } from "@/shared/api/transport"
import { listNavigation } from "@/shared/UI/UINavigation/listNavigation"
import { ListCheckLists } from "../entities/CheckList/ui"

const TemplateApp = () => {
	const params = useParams()
	const navigate = useNavigate()

	const [, setApp] = useState([])
	const apiGetByIdApp = async () => {
		const { data } = await serviceApp.getById(params.id)
		setApp(data)
	}

	const [idCurrentCheckList, setIdCurrentCheckList] = useState(null)
	const [, setIdCurrentApp] = useState(null)

	const [checkLists, setCheckLists] = useState([])
	const apiGetAllCheckLists = async id => {
		const { data } = await serviceCheckList.getAll(id)
		setCheckLists(data.data)
	}

	useEffect(() => {
		console.log(params?.id, 111)
		setIdCurrentCheckList(params.id)
		setIdCurrentApp(params.id)
		apiGetByIdApp()
		apiGetAllCheckLists(params?.id)
	}, [])

	return (
		<UIContainer listClasses={"row"}>
			<UICol listClasses={"col-sm-12"}>
				<UIContainer listClasses={"row"}>
					<UICol listClasses={"col-lg-12 col-md-12"}>
						<div>
							<UIHeadingTypography as="h2">Обзор</UIHeadingTypography>
						</div>
					</UICol>
				</UIContainer>

				<UIContainer listClasses={"row"}>
					<UICol listClasses={"col-lg-12 col-md-12"}>
						<div>
							<ListCheckLists list={checkLists} appId={idCurrentCheckList} />
						</div>
					</UICol>
				</UIContainer>

				<UIContainer listClasses={"row center-md"}>
					<UICol listClasses={"col-lg-12 col-md-12"}>
						<div>
							<UIButton onClick={() => navigate(`/dashboard/app/${mockApp.hashApp}/check-list/:id/create`)}>
								Создать новый список вещей
							</UIButton>
						</div>
					</UICol>
				</UIContainer>
			</UICol>
		</UIContainer>
	)
}

export default TemplateApp
