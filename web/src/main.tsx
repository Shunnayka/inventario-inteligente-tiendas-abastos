import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setApiBaseUrl } from '@sgb/shared'
import './index.css'
import App from './App.tsx'

setApiBaseUrl(import.meta.env.VITE_API_URL)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
