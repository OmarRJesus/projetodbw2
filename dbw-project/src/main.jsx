import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './containers/Login/LoginSignup.jsx'
import Time_theme from './containers/select_time_theme/time_theme.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Time_theme />
    {/* <Login /> */}
  </StrictMode>,
)
