import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './mainRoutes';

import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
            {/*<Time_theme /> */}
            {/*<BrainStormingPage />*/}
            {/*<MainPage /> */}
            {/*<Login /> */}

      <div className="App">
        <AppRoutes /> {/* as paginas vao ser renderizadas de acordo com o url que for fornecido */}
      </div>

    </Router>

  </StrictMode>,
)




