import '@/app//style/reset.scss'
import '@/app/style/palette.scss'
import '@/app/style/index.scss'
import 'flexboxgrid/dist/flexboxgrid.min.css'
import StoreProvider from '@/app/providers/store'
import Router from "@/app/providers/routers";


const App = () => {
  return (
        <StoreProvider>
            <Router/>
        </StoreProvider>
  )
}

export default App
