import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Nav.css";

/**
 * Componente de barra de navegación.
 * Gestiona el estado del usuario autenticado y muestra enlaces dinámicos.
 */
function Nav() {
	const [usuario, setUsuario] = useState(null);
	const navigate = useNavigate();

	// Al montar el componente, verificamos si hay un usuario autenticado en localStorage
	// Esto permite mostrar opciones personalizadas (ej: "Hola, Juan" o "Salir")
	useEffect(() => {
		const userStr = localStorage.getItem("usuario");
		if (userStr) {
			setUsuario(JSON.parse(userStr));
		}
	}, []);

	// Función para cerrar sesión: limpia el usuario del almacenamiento local y redirige al inicio
	const handleLogout = () => {
		localStorage.removeItem("usuario");
		setUsuario(null);
		navigate("/");
		// Recargamos la página para asegurar que todos los componentes actualicen su estado (limpiar caché, etc.)
		window.location.reload();
	};

	return (
		<nav className="navbar">
			<div className="navbar-container">
				{/* Sección del Logo */}
				<Link to="/" className="navbar-logo">
					<img
						src="/nebrija.png"
						alt="NebriAcademy Logo"
						className="navbar-logo-image"
					/>
					<p className="navbar-logo-text">NebriAcademy</p>
				</Link>

				{/* Enlaces de navegación principales */}
				<div className="navbar-links">
					<Link to="/">Mi Academia</Link>
					<Link to="/cursos">Cursos</Link>
					<Link to="/profesores">Profesores</Link>
					{/* Solo los profesores pueden ver el enlace para subir cursos */}
					{usuario && usuario.tipo === 'profesor' && (
						<Link to="/nuevo-curso" className="nav-link-special">Subir Curso</Link>
					)}
				</div>

				{/* Sección de autenticación / perfil */}
				<div className="navbar-auth">
					{usuario ? (
						<div className="navbar-profile">
							<div className="navbar-links">
								<Link to="/perfil">Hola, {usuario.nombre}</Link>
							</div>
							<button onClick={handleLogout}>Salir</button>
						</div>
					) : (
						<>
							{/* Si no hay usuario, mostramos Login y Registro */}
							<Link to="/login" className="navbar-login">
								Login
							</Link>
							<Link to="/register" className="navbar-register">
								Registro
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Nav;
