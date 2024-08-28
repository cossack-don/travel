import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import '@/shared/assets/reset.css'
import '@/shared/assets/palette.css'
import '@/shared/assets/index.css'
import { BrowserRouter } from 'react-router-dom';

import { store } from './app/store/store.ts'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
      <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
      </Provider>
  // </StrictMode>,
)
