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

	// Estado para controlar el menú móvil (hamburguesa)
	const [menuAbierto, setMenuAbierto] = useState(false);

	// Al montar el componente, verificamos si hay un usuario autenticado en localStorage
	useEffect(() => {
		const userStr = localStorage.getItem("usuario");
		if (userStr) {
			setUsuario(JSON.parse(userStr));
		}
	}, []);

	const toggleMenu = () => {
		setMenuAbierto(!menuAbierto);
	};

	// Función para cerrar sesión: limpia el usuario del almacenamiento local y redirige al inicio
	const handleLogout = () => {
		localStorage.removeItem("usuario");
		setUsuario(null);
		setMenuAbierto(false); // Cerrar menú al salir
		navigate("/");
		window.location.reload();
	};

	return (
		<nav className="navbar">
			<div className="navbar-container">
				{/* Sección del Logo */}
				<Link to="/" className="navbar-logo" onClick={() => setMenuAbierto(false)}>
					<img
						src="/NebriAcademy Now - Logo.png"
						alt="NebriAcademy Logo"
						className="navbar-logo-image"
					/>
					<p className="navbar-logo-text">NebriAcademy Now</p>
				</Link>

				{/* Botón de Hamburguesa para móvil */}
				<button className={`hamburger ${menuAbierto ? 'is-active' : ''}`} onClick={toggleMenu} aria-label="Menu">
					<span className="line"></span>
					<span className="line"></span>
					<span className="line"></span>
				</button>

				{/* Enlaces de navegación principales */}
				<div className={`navbar-menu ${menuAbierto ? 'is-open' : ''}`}>
					<div className="navbar-links">
						<Link to="/" onClick={() => setMenuAbierto(false)}>Mi Academia</Link>
						<Link to="/cursos" onClick={() => setMenuAbierto(false)}>Cursos</Link>
						<Link to="/profesores" onClick={() => setMenuAbierto(false)}>Profesores</Link>
						{/* Solo los profesores y administradores pueden ver el enlace para subir cursos */}
						{usuario && (usuario.tipo === 'profesor' || usuario.tipo === 'administrador') && (
							<Link to="/nuevo-curso" className="nav-link-special" onClick={() => setMenuAbierto(false)}>Subir Curso</Link>
						)}
					</div>

					{/* Sección de autenticación / perfil */}
					<div className="navbar-auth">
						{usuario ? (
							<div className="navbar-profile">
								<Link to="/perfil" className="navbar-profile-link" onClick={() => setMenuAbierto(false)}>
									Hola, {usuario.nombre}
								</Link>
								<button className="navbar-register" onClick={handleLogout}>Salir</button>
							</div>
						) : (
							<>
								<div className="navbar-auth-buttons">
									<Link to="/login" className="navbar-login" onClick={() => setMenuAbierto(false)}>
										Login
									</Link>
								</div>
								<Link to="/register" className="navbar-register" onClick={() => setMenuAbierto(false)}>
									Registro
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav >
	);
}

export default Nav;
