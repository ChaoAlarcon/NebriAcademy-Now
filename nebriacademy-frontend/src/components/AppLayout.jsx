import Nav from './Nav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom'

// Componente para pruebas de conexión (opcional)
import TestConnection from './TestConnection';

/**
 * AppLayout define la estructura visual común para todas las páginas.
 * Incluye la navegación superior, el contenido dinámico (Outlet) y el pie de página.
 */
function AppLayout() {
  return (
    <div className='App'>
      {/* Barra de navegación superior */}
      <Nav />

      {/* Aquí se renderizarán las páginas hijas según la ruta activa */}
      <Outlet />

      {/* Pie de página común */}
      <Footer />
    </div>
  )
}

export default AppLayout;
