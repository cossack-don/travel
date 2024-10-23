import UIHeadingTypography from "../shared/UI/UIHeadingTypography/UIHeadingTypography"
import { RenderListApps } from "@/features/App/RenderListApps"

import { TLogo } from "../../packages/ui/dist/ui-kit.js"

const Apps = () => {
	return (
		<div>
			<TLogo />
			<UIHeadingTypography>Все приложения</UIHeadingTypography>
			<RenderListApps />
		</div>
	)
}

export default Apps
