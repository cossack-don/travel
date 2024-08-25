import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

import { store } from './store'
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
