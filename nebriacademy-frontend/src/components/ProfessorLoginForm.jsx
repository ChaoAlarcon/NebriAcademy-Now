import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData, postData } from "../api/api";
import "../style/Auth.css";

/**
 * Formulario de inicio de sesión específico para profesores.
 * Carga una lista de profesores existentes para facilitar la selección (en lugar de escribir el email manualmente).
 */
function ProfessorLoginForm() {
    const [profesores, setProfesores] = useState([]);
    const [formData, setFormData] = useState({
        email: "",
        contrasena: ""
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const navigate = useNavigate();

    // Cargar la lista de profesores al iniciar el componente
    useEffect(() => {
        const getProfesores = async () => {
            try {
                const data = await fetchData("profesores");
                const lista = data.Profesores || (Array.isArray(data) ? data : []);
                setProfesores(lista);
            } catch (err) {
                console.error("Error fetching profesores:", err);
                setError(`Error al cargar la lista de profesores: ${err.message}`);
            } finally {
                setFetching(false);
            }
        };
        getProfesores();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Validar que se haya seleccionado un profesor
        if (!formData.email) {
            setError("Por favor, selecciona un profesor");
            setLoading(false);
            return;
        }

        try {
            // Intentar login contra el backend
            const data = await postData("usuarios/login", formData);

            if (data.error) {
                setError(data.error);
            } else {
                // Si el login es exitoso, guardar usuario y redirigir
                localStorage.setItem("usuario", JSON.stringify(data));
                navigate("/");
                window.location.reload();
            }
        } catch (err) {
            console.error("Error en login:", err);
            setError("Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-grid">
            <div className="auth-card">
                <h2 className="auth-title">Acceso Profesores</h2>
                <p className="auth-subtitle">Selecciona tu perfil de la lista para continuar.</p>

                {error && <p className="error-message">{error}</p>}
                {fetching && <p>Cargando lista de profesores...</p>}

                {!fetching && (
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <select
                            name="email"
                            className="nebri-select"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Selecciona tu Email</option>
                            {profesores.map((prof) => (
                                <option key={prof.id} value={prof.email}>
                                    {prof.nombre} {prof.apellidos} ({prof.email})
                                </option>
                            ))}
                        </select>

                        <input
                            type="password"
                            name="contrasena"
                            placeholder="Contraseña"
                            className="nebri-input"
                            value={formData.contrasena}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit" className="nebri-button" disabled={loading}>
                            {loading ? "Verificando..." : "Iniciar Sesión"}
                        </button>
                    </form>
                )}

                <div className="auth-footer">
                    <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Volver a selección</a>
                </div>
            </div>
        </div>
    );
}

export default ProfessorLoginForm;
