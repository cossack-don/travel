import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts"
import { useEffect } from "react"
import { getInfoCurrentCheckList } from "@/entities/model/stepperSlice.ts"
import { useParams, NavLink, Link } from "react-router-dom"
import UIBreadCrumbs from "../../../../shared/UI/UIBreadCrumbs/UIBreadCrumbs.tsx"

const StepListOfThings = () => {
	const params = useParams()
	const dispatch = useAppDispatch()
	const stepper = useAppSelector(state => state.stepperF)

	useEffect(() => {
		dispatch(
			getInfoCurrentCheckList({
				idApp: params.idApp,
				idCheckList: params.idCheckList
			})
		)
	}, [])

	const listsCategories = stepper?.listsCategories?.map((item: any) => {
		return (
			<div key={item.id}>
				<p>Категория - {item.name}</p>
				<ul>
					{item.clothes.map((elem: any) => {
						return (
							<li key={elem.id}>
								ID:{elem.id} - Name:{elem.name}
							</li>
						)
					})}
				</ul>
			</div>
		)
	})

	return (
		<div>
			<UIBreadCrumbs />
			{listsCategories}
		</div>
	)
}

export default StepListOfThings
