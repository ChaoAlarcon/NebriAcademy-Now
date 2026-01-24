import "./style/global.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Cursos from "./pages/Cursos";
import AppLayout from "./Components/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import MasterClass from "./pages/MasterClass";

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
				path: "/users",
				element: <Users />,

				loader: async () => {
					const res = await fetch("https://jsonplaceholder.typicode.com/users");
					return res.json();
				},
			},
			{
				path: "/cursos",
				element: <Cursos />,
			},
			{
				path: "/masterclass",
				element: <MasterClass />,
			},
		], //Componentes navegables del elemento
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
