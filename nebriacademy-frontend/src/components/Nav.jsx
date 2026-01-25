import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Nav.css";

function Nav() {
	const [usuario, setUsuario] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const userStr = localStorage.getItem("usuario");
		if (userStr) {
			setUsuario(JSON.parse(userStr));
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("usuario");
		setUsuario(null);
		navigate("/");
		window.location.reload();
	};

	return (
		<nav className="navbar">
			<div className="navbar-container">
				{/* Logo */}
				<Link to="/" className="navbar-logo">
					<img
						src="/nebrija.png"
						alt="NebriAcademy Logo"
						className="navbar-logo-image"
					/>
					<p className="navbar-logo-text">NebriAcademy</p>
				</Link>

				{/* Links */}
				<div className="navbar-links">
					<Link to="/">Mi Academia</Link>
					<Link to="/cursos">Cursos</Link>
					<Link to="/profesores">Profesores</Link>
					<Link to="/masterclass">Masterclass</Link>
				</div>

				{/* Auth Section */}
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
