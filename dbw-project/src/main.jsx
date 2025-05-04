import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css'
import Login from './containers/Login/LoginSignup.jsx'
import Time_theme from './containers/select_time_theme/time_theme.jsx'
import BrainStormingPage from './containers/brainStormPage/BrainStormPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
   {/* <Time_theme /> */}
     <BrainStormingPage /> 
    {/* <Login /> */}
    </BrowserRouter>
  </StrictMode>,
)
