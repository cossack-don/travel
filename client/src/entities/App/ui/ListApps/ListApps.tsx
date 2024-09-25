import { UICard, UICol, UIContainer, UILink, UIParagraphTypography } from "@/shared/UI"

interface Props {
	list:any
	isBadRequest:any
	onDeleteCardById?:any
}
const ListApps = ({apps,isBadRequest, onDeleteCardById}:Props) => {


	return (
		<UIContainer listClasses="row between-xs">
			{isBadRequest && <div>Бекенд упал - заглушка</div>}

			{apps.map((item:any) => {
				return (
					<UICol key={item.id} listClasses="col-xs-3">
						<UICard
							// listStyles={{ background: getRandomColor(colorsArray) }}
							header={`App: ${item.name}`}
							footer={
								<div style={{ display: "flex", justifyContent: "space-between" }}>
									<button onClick={() => onDeleteCardById(item.id)}>DEL App</button>
									<UILink color="blue" to={`/dashboard/app/${item.id}`}>
										Открыть
									</UILink>
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
