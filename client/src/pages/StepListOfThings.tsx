import { useAppSelector } from "@/shared/hooks/hooks.ts"

const StepListOfThings = () => {

	const user = useAppSelector(state => state.user)
	console.log(user)
	return (
		<div>
			<p>StepListOfThings</p>
			<p>Готовый список вещей по категориям</p>
			<hr />
			<ul>
				<li>Одежда</li>
				<li>нижнее бельё × 14</li>
				<li>шорты × 5</li>
			</ul>
			<hr />
			<ul>
				<li>Деньги и документы</li>
				<li>паспорт</li>
				<li>водительские права</li>
			</ul>
			<hr />

			<ul>
				<li>Дополнительное снаряжение</li>
				<li>рюкзак</li>
				<li>подушка</li>
			</ul>
			<hr />
			<ul>
				<li>Аптечка</li>
				<li>лейкопластырь</li>
				<li>бинт</li>
			</ul>
		</div>
	)
}

// const userData = (dataList: any) => {
// 	return dataList.map((item: any) => {
// 		<div>
// 			<p>StepListOfThings</p>
// 			<p>Готовый список вещей по категориям</p>
// 			<hr/>
// 			<ul>
// 				<li>{item.}</li>
// 				<li>нижнее бельё × 14</li>
// 				<li>шорты × 5</li>
// 			</ul>
// 			<hr/>
// 			<ul>
// 				<li>Деньги и документы</li>
// 				<li>паспорт</li>
// 				<li>водительские права</li>
// 			</ul>
// 			<hr/>
//
// 			<ul>
// 				<li>Дополнительное снаряжение</li>
// 				<li>рюкзак</li>
// 				<li>подушка</li>
// 			</ul>
// 			<hr/>
// 			<ul>
// 				<li>Аптечка</li>
// 				<li>лейкопластырь</li>
// 				<li>бинт</li>
// 			</ul>
// 		</div>
// 	})
// }

export default StepListOfThings
