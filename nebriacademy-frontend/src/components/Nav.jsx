import { Link } from "react-router-dom";
import "../style/Nav.css";

function Nav() {
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
					<Link to="/users">Alumnos</Link>
					<Link to="/cursos">Cursos</Link>
					<Link to="/masterclass">Masterclass</Link>
				</div>

				{/* Auth (opcional, puedes quitarlo si no lo usas) */}
				<div className="navbar-auth">
					<Link to="/login" className="navbar-login">
						Login
					</Link>
					<Link to="/register" className="navbar-register">
						Registro
					</Link>
				</div>
			</div>
		</nav>
	);
}

export default Nav;
