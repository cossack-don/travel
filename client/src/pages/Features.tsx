import { UINavigation, UICol, UIContainer, UIHeadingTypography } from "@/shared/UI"
import { listNavigation } from "@/shared/UI/UINavigation/listNavigation"

const Features = () => {
	return (
		<UIContainer>
			<UICol listClasses={"col-sm-3"}>
				<div>
					<UINavigation listNavigation={listNavigation} />
				</div>
			</UICol>

			<UICol listClasses={"col-sm-9"}>
				<div>
					<UIHeadingTypography as="h2">Будущие фичи</UIHeadingTypography>
				</div>
			</UICol>
		</UIContainer>
	)
}

export default Features
