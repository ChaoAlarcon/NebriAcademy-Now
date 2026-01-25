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


//Esto es con React Router versión 6.

const router = createBrowserRouter([
	{
		path: "/", //Ruta de la URL, en este caso HOME
		element: <AppLayout />,//Componente que debe renderizarse
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/cursos",
				element: <Cursos />,
			},
			{
				path: "/masterclass",
				element: <MasterClass />,
			},
			{
				path: "/alumnos",
				element: <AlumnosList />,
			},
			{
				path: "/profesores",
				element: <Profesores />,
			},
			{
				path: "/perfil",
				element: <Perfil />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/cursos/:id",
				element: <Curso />,
			},
			
		], 
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
