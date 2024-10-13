import DefaultLayout from "@/app/providers/layouts/DefaultLayout"
import MainDashboardLayout from "@/app/providers/layouts/MainDashboardLayout"
import AppLayout from "@/app/providers/layouts/AppLayout"

const listLayouts = {
	default: "default",
	dashboard: "dashboard",
	app:'app'
}

const WrapperTypeLayout = ({ children, name }: any) => {
	return (
		<>
			{name === listLayouts.default && <DefaultLayout>{children}</DefaultLayout>}
			{name === listLayouts.dashboard && <MainDashboardLayout>{children}</MainDashboardLayout>}
			{name === listLayouts.app && <AppLayout>{children}</AppLayout>}
		</>
	)
}

export default WrapperTypeLayout
