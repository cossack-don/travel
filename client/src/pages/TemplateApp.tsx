import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { mockApp } from "@/shared/mockData/mockApp"
import {
	UIButton,
	UINavigation,
	UICol,
	UIContainer,
	UIHeadingTypography,
	UIParagraphTypography,
	UICard
} from "@/shared/UI"
import {serviceApp, serviceCheckList} from "@/shared/api/transport"
import { listNavigation } from "@/shared/UI/UINavigation/listNavigation"

const TemplateApp = () => {
	const params = useParams()
	const navigate = useNavigate()

	const [app, setApp] = useState([])
	const apiGetByIdApp = async () => {
		const { data } = await serviceApp.getById(params.id)
		setApp(data)
	}

	const [idCurrentCheckList,setIdCurrentCheckList] = useState(null)
	const [idCurrentApp,setIdCurrentApp] = useState(null)

	const [checkLists, setCheckLists] = useState([])
	const apiGetAllCheckLists = async(id)=>{
		const {data} =  await serviceCheckList.getAll(id)
		setCheckLists(data.data)
	}

	useEffect(() => {
		setIdCurrentCheckList(params.id)
		setIdCurrentApp(params.id)
		apiGetByIdApp()
		// TODO тут хардкод, по текущему не выводится, так как нужно БД актуализировать
		apiGetAllCheckLists('ebd6113a81a343c2a01a35b9b80ef53c')
	}, [])

	const ListCheckList = () => {
		return checkLists?.map(item => {
			return (
				<UICard
					key={item.id}
					to={`/dashboard/app/${idCurrentApp}/check-list/${item.id}/step-list-of-things`}
					header={`Check List: ${item.name}`}
					listClasses="mr-15 mb-15"
				>
					<UIParagraphTypography>
						Описание:{item.description}
					</UIParagraphTypography>
					ID - {item.id}
				</UICard>
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
							<ListCheckList />
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
