// Importaciones de estilos globales y utilidades de React Router
import "./style/global.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Importación de páginas y componentes principales
import Home from "./pages/Home";
import Cursos from "./pages/Cursos";
import AppLayout from "./Components/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import MasterClass from "./pages/MasterClass";
import AlumnosList from "./components/AlumnosList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profesores from "./pages/Profesores";
import Curso from "./pages/Curso";
import Perfil from "./pages/Perfil";
import LoginSelection from "./Components/LoginSelection";
import LoginProfesor from "./pages/LoginProfesor";
import CourseUploadForm from "./Components/CourseUploadForm";
import { Navigate } from "react-router-dom";

/**
 * Componente Higher-Order para proteger rutas.
 * Redirige al login si no hay un usuario autenticado en localStorage.
 */
const ProtectedRoute = ({ children }) => {
	const user = localStorage.getItem("usuario");
	if (!user) {
		return <Navigate to="/login" replace />;
	}
	return children;
};

// Configuración del enrutador de React con rutas protegidas y públicas
const router = createBrowserRouter([
	{
		path: "/", // Ruta base que carga el layout común (Nav + Footer)
		element: <AppLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/", // Dashboard principal según el rol
				element: <ProtectedRoute><Home /></ProtectedRoute>,
			},
			{
				path: "/cursos", // Listado general de cursos
				element: <ProtectedRoute><Cursos /></ProtectedRoute>,
			},
			{
				path: "/masterclass", // Página de Masterclass (placeholder)
				element: <ProtectedRoute><MasterClass /></ProtectedRoute>,
			},
			{
				path: "/alumnos", // Listado de alumnos (vista para profesores)
				element: <ProtectedRoute><AlumnosList /></ProtectedRoute>,
			},
			{
				path: "/profesores", // Listado de profesores
				element: <ProtectedRoute><Profesores /></ProtectedRoute>,
			},
			{
				path: "/perfil", // Perfil de usuario (ver y editar)
				element: <ProtectedRoute><Perfil /></ProtectedRoute>,
			},
			{
				path: "/cursos/:id", // Detalle de un curso específico
				element: <ProtectedRoute><Curso /></ProtectedRoute>,
			},
			{
				path: "/login", // Selección de tipo de login
				element: <LoginSelection />,
			},
			{
				path: "/login-form", // Formulario de login para alumnos
				element: <Login />,
			},
			{
				path: "/login-profesor", // Formulario de login para profesores
				element: <LoginProfesor />,
			},
			{
				path: "/register", // Formulario de registro para nuevos alumnos
				element: <Register />,
			},
			{
				path: "/nuevo-curso", // Formulario para que profesores suban cursos
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
