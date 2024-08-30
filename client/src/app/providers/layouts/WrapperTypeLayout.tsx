
import DefaultLayout from '@/app/providers/layouts/DefaultLayout'
import MainDashboardLayout from '@/app/providers/layouts/MainDashboardLayout'

const listLayouts = {
    default:'default',
    dashboard:'dashboard'
}

const WrapperTypeLayout = ({children, name}:any) => {

    return (
        <>
        {name === listLayouts.default &&  <DefaultLayout>{children}</DefaultLayout>}
        {name === listLayouts.dashboard &&  <MainDashboardLayout>{children}</MainDashboardLayout>}
       </>)
}

export default WrapperTypeLayout