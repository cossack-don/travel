import { UINavigation, UICol, UIContainer, UIHeadingTypography } from "@/shared/UI"
import { listNavigation } from "@/shared/UI/UINavigation/listNavigation"

const Features = () => {
	return (
		<UIContainer>
			<UICol listClasses={"col-sm-12"}>
				<div>
					<UIHeadingTypography as="h2">Будущие фичи</UIHeadingTypography>
				</div>
			</UICol>
		</UIContainer>
	)
}

export default Features
