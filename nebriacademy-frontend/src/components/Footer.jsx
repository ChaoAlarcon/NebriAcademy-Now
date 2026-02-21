import { Link } from "react-router-dom";
import "../style/Footer.css";

/**
 * Componente del pie de página común.
 * Se muestra en todas las páginas via AppLayout.
 * Contiene información de la marca y enlaces directos a las secciones principales.
 */
function Footer() {
	return (
		<>
			<footer className="footer">
				<div className="footer-container">
					{/* Información de la marca */}
					<div className="footer-column">
						<div className="footer-brand">NebriAcademy Now</div>
						<p>Plataforma de aprendizaje online</p>
					</div>

					{/* Enlaces rápidos */}
					<div className="footer-column">
						<h4>Academia</h4>
						<Link to="/cursos">Cursos</Link>
						<Link to="/profesores">Profesores</Link>
					</div>
				</div>

				{/* Derechos de autor */}
				<div className="footer-bottom">
					© 2026 NebriAcademy Now. Todos los derechos reservados.
				</div>
			</footer>
		</>
	);
}

export default Footer;
