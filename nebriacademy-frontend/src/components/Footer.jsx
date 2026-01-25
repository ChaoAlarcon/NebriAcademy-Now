import { Link } from "react-router-dom";
import "../style/Footer.css";

function Footer() {
	return (
		<>
			<footer className="footer">
				<div className="footer-container">
					<div className="footer-column">
						<div className="footer-brand">NebriAcademy</div>
						<p>Plataforma de aprendizaje online</p>
					</div>
					<div className="footer-column">
						<h4>Academia</h4>
						<Link to="/cursos">Cursos</Link>
						<Link to="/profesores">Profesores</Link>
					</div>
				</div>
				<div className="footer-bottom">
					© 2026 NebriAcademy. Todos los derechos reservados.
				</div>
			</footer>
		</>
	);
}

export default Footer;
