import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../api/api";
import "../style/Auth.css"; // Unified form styles

/**
 * Componente de formulario para que los profesores suban nuevos cursos.
 * Incluye validación de usuario (solo profesores) y selección de iconos.
 */
function CourseUploadForm() {
	const [formData, setFormData] = useState({
		nombreCurso: "",
		categoria: "",
		nivel: "Principiante",
		descripcion: "",
		profesor: null,
		icono: "📚",
		videoUrl: "",
	});

	const icons = ["📚", "💻", "🎨", "🧪", "🌍", "📊", "🚀", "🧠", "⚖️", "🎭", "🔐", "📱", "🛠️", "💾", "🌐", "📡", "⚙️", "🔧"];
	
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		// Verificar si el usuario es profesor antes de permitir el acceso
		const userStr = localStorage.getItem("usuario");
		if (userStr) {
			const user = JSON.parse(userStr);
			if (user.tipo === "profesor") {
				setFormData((prev) => ({ ...prev, profesor: user.id }));
			} else {
				// Si no es profesor, redirigir al inicio
				navigate("/");
			}
		} else {
			// Si no hay usuario, redirigir al login
			navigate("/login");
		}
	}, [navigate]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			// Enviar datos del curso al backend (POST /cursos)
			const response = await postData("cursos", formData);
			if (response.error) {
				setError(response.error);
			} else {
				alert("Curso creado con éxito");
				navigate("/"); // Redirigir al dashboard tras éxito
			}
		} catch (err) {
			console.error("Error creating course:", err);
			setError("Error al crear el curso. Inténtalo de nuevo.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="auth-grid">
			<div className="auth-card register-form-width">
				<h2 className="auth-title">Subir Nuevo Curso</h2>
				<p className="auth-subtitle">
					Completa la información para publicar tu curso.
				</p>

				{error && <p className="error-message">{error}</p>}

				<form className="auth-form" onSubmit={handleSubmit}>
					<input
						type="text"
						name="nombreCurso"
						placeholder="Nombre del Curso"
						className="nebri-input"
						value={formData.nombreCurso}
						onChange={handleChange}
						required
					/>

					<div style={{ textAlign: "left" }}>
						<label
							style={{
								display: "block",
								marginBottom: "5px",
								fontSize: "0.9rem",
								color: "#666",
							}}>
							Categoría:
						</label>
						<select
							id="categoria"
							name="categoria"
							className="nebri-select"
							value={formData.categoria}
							onChange={handleChange}
							required>
							<option value="">Selecciona una categoría</option>
							<option value="Programación">Programación</option>
							<option value="Desarrollo">Desarrollo</option>
						</select>
					</div>

					<div style={{ textAlign: "left" }}>
						<label
							style={{
								display: "block",
								marginBottom: "5px",
								fontSize: "0.9rem",
								color: "#666",
							}}>
							Nivel del curso:
						</label>
						<select
							name="nivel"
							className="nebri-select"
							value={formData.nivel}
							onChange={handleChange}
							required>
							<option value="Principiante">Principiante</option>
							<option value="Intermedio">Intermedio</option>
							<option value="Avanzado">Avanzado</option>
						</select>
					</div>

					<div style={{ textAlign: "left" }}>
						<label
							style={{
								display: "block",
								marginBottom: "10px",
								marginTop: "5px",
								fontSize: "0.9rem",
								color: "#666",
							}}>
							Elige un icono para el curso:
						</label>
						<div
							style={{
								display: "flex",
								flexWrap: "wrap",
								gap: "10px",
								marginBottom: "10px",
							}}>
							{icons.map((icon) => (
								<div
									key={icon}
									onClick={() =>
										setFormData((prev) => ({ ...prev, icono: icon }))
									}
									style={{
										fontSize: "1.5rem",
										padding: "10px",
										cursor: "pointer",
										borderRadius: "8px",
										border:
											formData.icono === icon
												? "2px solid var(--nebrija-red)"
												: "2px solid #eee",
										backgroundColor:
											formData.icono === icon ? "#fff5f6" : "white",
										transition: "all 0.2s",
									}}>
									{icon}
								</div>
							))}
						</div>
					</div>

					<textarea
						name="descripcion"
						placeholder="Descripción del curso"
						className="nebri-input"
						style={{ minHeight: "100px", padding: "10px" }}
						value={formData.descripcion}
						onChange={handleChange}
						required
					/>

					<input
						type="url"
						name="videoUrl"
						placeholder="URL del Vídeo (ej: YouTube, Vimeo)"
						className="nebri-input"
						value={formData.videoUrl}
						onChange={handleChange}
						required
					/>

					<button type="submit" className="nebri-button" disabled={loading}>
						{loading ? "Publicando..." : "Publicar Curso"}
					</button>

					<button
						type="button"
						className="nebri-button"
						style={{ backgroundColor: "#6c757d" }}
						onClick={() => navigate("/")}>
						Cancelar
					</button>
				</form>
			</div>
		</div>
	);
}

export default CourseUploadForm;
