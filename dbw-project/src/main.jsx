import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import ChooseTheme from './containers/brainstorming/choosetheme.jsx'
import LoginSignup from './containers/Login/LoginSignup.jsx'


createRoot(document.getElementById('root')).render(
<StrictMode>
       <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginSignup />} />
                <Route path="/theme" element={<ChooseTheme />} />
            </Routes>
        </BrowserRouter>  
</StrictMode>,

) 
