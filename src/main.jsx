import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import global app styles
import './index.css'
// Bootstrap CSS (installed via npm)
import 'bootstrap/dist/css/bootstrap.min.css'
// Optional: Bootstrap JS bundle (popper + bootstrap) for components that need JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
