// Importaciones de estilos globales y utilidades de React Router
import "./style/global.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Importación de páginas y componentes principales
import Home from "./pages/Home";
import Cursos from "./pages/Cursos";
import AppLayout from "./components/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import MasterClass from "./pages/MasterClass";
import AlumnosList from "./components/AlumnosList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profesores from "./pages/Profesores";
import Curso from "./pages/Curso";
import Perfil from "./pages/Perfil";
import LoginSelection from "./components/LoginSelection";
import LoginProfesor from "./pages/LoginProfesor";
import CourseUploadForm from "./components/CourseUploadForm";
import { Navigate } from "react-router-dom";

/**
 * Componente Higher-Order (HOC) para proteger rutas privadas.
 * Verifica si existe un usuario autenticado en localStorage ('usuario').
 * Si no hay usuario, redirige a la página de login (/login).
 */
const ProtectedRoute = ({ children }) => {
	const user = localStorage.getItem("usuario");
	if (!user) {
		return <Navigate to="/login" replace />;
	}
	return children;
};

// Configuración del enrutador de React (React Router)
// Define la estructura de navegación de la aplicación
const router = createBrowserRouter([
	{
		path: "/", // Ruta raíz
		element: <AppLayout />, // Layout principal que envuelve a las páginas (Navbar, Footer, etc.)
		errorElement: <ErrorPage />, // Componente a mostrar en caso de error (404, etc.)
		children: [
			{
				path: "/", // Página de Inicio (Dashboard) - Protegida
				element: <ProtectedRoute><Home /></ProtectedRoute>,
			},
			{
				path: "/cursos", // Catálogo de cursos - Protegida
				element: <ProtectedRoute><Cursos /></ProtectedRoute>,
			},
			{
				path: "/masterclass", // Sección Masterclass - Protegida
				element: <ProtectedRoute><MasterClass /></ProtectedRoute>,
			},
			{
				path: "/alumnos", // Gestión de alumnos (para profesores/admin) - Protegida
				element: <ProtectedRoute><AlumnosList /></ProtectedRoute>,
			},
			{
				path: "/profesores", // Lista de profesores - Protegida
				element: <ProtectedRoute><Profesores /></ProtectedRoute>,
			},
			{
				path: "/perfil", // Perfil del usuario actual - Protegida
				element: <ProtectedRoute><Perfil /></ProtectedRoute>,
			},
			{
				path: "/cursos/:id", // Detalle de curso (ruta dinámica con ID) - Protegida
				element: <ProtectedRoute><Curso /></ProtectedRoute>,
			},
			// Rutas públicas (Login y Registro)
			{
				path: "/login", // Pantalla de selección de rol para login
				element: <LoginSelection />,
			},
			{
				path: "/login-form", // Login específico para alumnos
				element: <Login />,
			},
			{
				path: "/login-profesor", // Login específico para profesores
				element: <LoginProfesor />,
			},
			{
				path: "/register", // Registro de nuevos alumnos
				element: <Register />,
			},
			{
				path: "/nuevo-curso", // Formulario para crear curso - Protegida
				element: <ProtectedRoute><CourseUploadForm /></ProtectedRoute>,
			},
		],
	},
]);

/**
 * Componente principal de la aplicación que provee el enrutador.
 */
function App() {
	return <RouterProvider router={router} />;
}

export default App;
