import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { UIButton, UICol, UIContainer, UIHeadingTypography } from "@/shared/UI"
import { serviceCheckList } from "@/shared/api/transport"
import { ListCheckLists } from "../entities/CheckList/ui"

const TemplateApp = () => {
	const params = useParams()
	const navigate = useNavigate()

	const [idCurrentCheckList, setIdCurrentCheckList] = useState(null)
	const [, setIdCurrentApp] = useState(null)

	const [checkLists, setCheckLists] = useState([])
	const apiGetAllCheckLists = async id => {
		const { data } = await serviceCheckList.getAll(id)
		setCheckLists(data.data)
	}

	const listApi = async () => {
		await setIdCurrentCheckList(params.idCheckListF)
		await setIdCurrentApp(params.idApp)
		await apiGetAllCheckLists(params?.idApp)
	}

	useEffect(() => {
		console.log(params)
		listApi()
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
							<ListCheckLists list={checkLists} appId={params.idApp} />
						</div>
					</UICol>
				</UIContainer>

				<UIContainer listClasses={"row center-md"}>
					<UICol listClasses={"col-lg-12 col-md-12"}>
						<div>
							<UIButton onClick={() => navigate(`/dashboard/app/${params.idApp}/check-list/create`)}>
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
