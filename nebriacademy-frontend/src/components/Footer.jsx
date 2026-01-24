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
						<a href="#">Cursos</a>
						<a href="#">Profesores</a>
					</div>
				</div>
				<div className="footer-bottom">
					© 2025 NebriAcademy. Todos los derechos reservados.
				</div>
			</footer>
		</>
	);
}

export default Footer;
