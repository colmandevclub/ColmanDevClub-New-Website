import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SITE } from '@/constants/site'

createRoot(document.getElementById(SITE.ROOT_ELEMENT_ID)!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
