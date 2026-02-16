import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/Login.jsx"
import Home from "../pages/Home.jsx"
import Curso from "../pages/Curso.jsx"
import Cursos from "../pages/Cursos.jsx"
import Perfil from "../pages/Perfil.jsx"

// Componente de enrutamiento alternativo (posiblemente en desuso, ver App.jsx)
// Define rutas básicas sin protección explícita en este archivo
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter