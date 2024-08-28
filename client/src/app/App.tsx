import '@/app//style/reset.css'
import '@/app/style/palette.css'
import '@/app/style/index.css'

import StoreProvider from '@/app/providers/store'
import Router from "@/app/providers/routers";
import DefaultLayout from "@/app/providers/layouts/DefaultLayout";

const App = () => {
  return (
        <StoreProvider>
            <DefaultLayout>
                <Router/>
            </DefaultLayout>
        </StoreProvider>
  )
}

export default App
