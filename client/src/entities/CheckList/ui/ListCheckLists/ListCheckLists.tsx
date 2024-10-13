import { UICard, UICol, UIContainer, UIParagraphTypography } from "@/shared/UI"

interface Props {
	list: any
	isBadRequest?: any
	onDeleteCardById?: any
	isButtonDelete?: boolean
	appId: number | string
}
const ListCheckLists = ({ list, isBadRequest, onDeleteCardById, isButtonDelete = false,appId }: Props) => {
	return (
		<UIContainer listClasses="row between-xs">
			{isBadRequest && <div>Бекенд упал - заглушка</div>}

			{list.map((item: any) => {
				return (
					<UICol key={item.id} listClasses="col-xs-6">
						<UICard
							to={`/dashboard/app/${appId}/check-list/${item.id}/step-list-of-things`}
							header={`Check List: ${item.name}`}
							footer={
								<div style={{ display: "flex", justifyContent: "space-between" }}>
									{isButtonDelete && <button onClick={() => onDeleteCardById(item.id)}>DEL CheckList</button>}
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

export default ListCheckLists
