import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UserContext from './context/userContext.jsx'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <BrowserRouter>
        <App />
        <Analytics/>
      </BrowserRouter>
    </UserContext>
  </StrictMode>
)
