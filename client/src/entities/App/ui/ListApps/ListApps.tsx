import { UICard, UICol, UIContainer, UIParagraphTypography } from "@/shared/UI"

interface Props {
	list: any
	isBadRequest: any
	onDeleteCardById?: any
	isButtonDelete?: boolean
}
const ListApps = ({ apps, isBadRequest, onDeleteCardById, isButtonDelete = false }: Props) => {
	return (
		<UIContainer listClasses="row">
			{isBadRequest && <div>Бекенд упал - заглушка</div>}

			{apps.map((item: any) => {
				return (
					<UICol key={item.id} listClasses="col-xs-3">
						<UICard
							to={`/dashboard/app/${item.id}`}
							header={`App: ${item.name}`}
							footer={
								<div style={{ display: "flex", justifyContent: "space-between" }}>
									{isButtonDelete && <button onClick={() => onDeleteCardById(item.id)}>DEL App</button>}
								</div>
							}
							listClasses="mr-15 mb-15"
						>
							<UIParagraphTypography>
								Описание: <br />
								{item.description}
							</UIParagraphTypography>
							ID - {item.id}
						</UICard>
					</UICol>
				)
			})}
		</UIContainer>
	)
}

export default ListApps
