import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./style/global.css";

// Punto de entrada principal de la aplicación React
// Renderiza el componente raíz 'App' dentro del elemento con id 'root' del HTML
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

