import UIHeadingTypography from "../shared/UI/UIHeadingTypography/UIHeadingTypography"
import { RenderListApps } from "@/features/App/RenderListApps"

const Apps = () => {
	return (
		<div>
			<UIHeadingTypography>Все приложения</UIHeadingTypography>
			<RenderListApps />
		</div>
	)
}

export default Apps
