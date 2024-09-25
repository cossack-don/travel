import { UIHeadingTypography, UIParagraphTypography } from "@/shared/UI"

const BannerInfo = () => {
	return (
		<div
			style={{
				borderRadius: "var(--border-radius-16)",
				// margin: "0 auto",
				background: "var(--blue)",
				color: "white",
				padding: "30px"
			}}
		>
			<UIHeadingTypography>Инструкция по функционалу</UIHeadingTypography>
			<UIParagraphTypography>описание</UIParagraphTypography>
		</div>
	)
}

export default BannerInfo
