import { useParams } from "react-router-dom"
import { UILink } from "@/shared/UI"

const UIBreadCrumbs = () => {
	const params = useParams()

	const generateURL = (idApp: string | undefined, idCheckList: string | undefined, nameStep: string) => {
		if (idCheckList === undefined) {
			return `/dashboard/app/${idApp}/check-list/${nameStep}`
		}
		if (idCheckList !== undefined) {
			return `/dashboard/app/${idApp}/check-list/${idCheckList}/${nameStep}`
		}
	}

	interface IItemsNav {
		id: number
		name: string
		path: string | undefined
	}
	const listNavigation: IItemsNav[] = [
		{
			id: 1,
			name: "Создать новый чек-лист",
			path: generateURL(params.idApp, undefined, "create")
		},
		{
			id: 2,
			name: "Выбор пола",
			path: generateURL(params.idApp, params.idCheckList, "step-sex")
		},
		{
			id: 3,
			name: "Кол-во дней",
			path: generateURL(params.idApp, params.idCheckList, "step-number-of-days")
		},
		{
			id: 4,
			name: "По стране или заграницу",
			path: generateURL(params.idApp, params.idCheckList, "step-type-place")
		},
		{
			id: 5,
			name: "Температура",
			path: generateURL(params.idApp, params.idCheckList, "step-type-seasons")
		},
		{
			id: 6,
			name: "Тип поездки",
			path: generateURL(params.idApp, params.idCheckList, "step-type-of-trip")
		}
	]

	return (
		<ul style={{ display: "flex" }}>
			{listNavigation.map((item: any) => {
				return (
					<li key={item.id}>
						<UILink to={item.path}>{item.name}</UILink>
						<span style={{ marginRight: "5px" }}> / </span>
					</li>
				)
			})}
		</ul>
	)
}

export default UIBreadCrumbs
