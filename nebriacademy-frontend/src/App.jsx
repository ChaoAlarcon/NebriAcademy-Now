import "./style/global.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
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

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
	const user = localStorage.getItem("usuario");
	if (!user) {
		return <Navigate to="/login" replace />;
	}
	return children;
};

//Esto es con React Router versión 6.

const router = createBrowserRouter([
	{
		path: "/", //Ruta de la URL, en este caso HOME
		element: <AppLayout />,//Componente que debe renderizarse
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <ProtectedRoute><Home /></ProtectedRoute>,
			},
			{
				path: "/cursos",
				element: <ProtectedRoute><Cursos /></ProtectedRoute>,
			},
			{
				path: "/masterclass",
				element: <ProtectedRoute><MasterClass /></ProtectedRoute>,
			},
			{
				path: "/alumnos",
				element: <ProtectedRoute><AlumnosList /></ProtectedRoute>,
			},
			{
				path: "/profesores",
				element: <ProtectedRoute><Profesores /></ProtectedRoute>,
			},
			{
				path: "/perfil",
				element: <ProtectedRoute><Perfil /></ProtectedRoute>,
			},
			{
				path: "/cursos/:id",
				element: <ProtectedRoute><Curso /></ProtectedRoute>,
			},
			{
				path: "/login",
				element: <LoginSelection />,
			},
			{
				path: "/login-form",
				element: <Login />,
			},
			{
				path: "/login-profesor",
				element: <LoginProfesor />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/nuevo-curso",
				element: <ProtectedRoute><CourseUploadForm /></ProtectedRoute>,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
