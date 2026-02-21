import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/Login.jsx"
import Home from "../pages/Home.jsx"
import Curso from "../pages/Curso.jsx"
import Cursos from "../pages/Cursos.jsx"
import Perfil from "../pages/Perfil.jsx"

/**
 * Componente de enrutamiento alternativo (AppRouter).
 *
 * NOTA: Este router no está activo en producción.
 * La aplicación utiliza el enrutador definido en `App.jsx`,
 * que incluye rutas protegidas (ProtectedRoute) y una
 * estructura de layout consistente (AppLayout).
 *
 * Este archivo se conserva como referencia o para pruebas rápidas.
 *
 * Rutas definidas:
 * - "/" → Página de Login
 * - "/Home" → Panel principal (Dashboard)
 *
 * Importaciones que no se usan aquí pero estaban presentes:
 * - Curso, Cursos, Perfil (guardados para posible extensión)
 */
function AppRouter() {
  return (
    // BrowserRouter activa la navegación basada en el historial del navegador
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz: muestra el formulario de Login */}
        <Route path="/" element={<Login />} />

        {/* Ruta del panel principal: muestra el Dashboard según el rol */}
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter