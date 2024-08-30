import '@/app//style/reset.css'
import '@/app/style/palette.css'
import '@/app/style/index.css'
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
