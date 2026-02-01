import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData, postData } from "../api/api";
import "../style/Login.css";

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

        if (!formData.email) {
            setError("Por favor, selecciona un profesor");
            setLoading(false);
            return;
        }

        try {
            const data = await postData("usuarios/login", formData);

            if (data.error) {
                setError(data.error);
            } else {
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
        <div className="login-grid">
            <div className="formulario-login-contenedor">
                <h2>Acceso Profesores</h2>
                <p className="register-form-subtitle">Selecciona tu perfil de la lista para continuar.</p>

                {error && <p className="error-message">{error}</p>}
                {fetching && <p>Cargando lista de profesores...</p>}

                {!fetching && (
                    <form className="formulario-login" onSubmit={handleSubmit}>
                        <select
                            name="email"
                            className="register-select"
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
                            className="register-input"
                            value={formData.contrasena}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit" className="register-button" disabled={loading}>
                            {loading ? "Verificando..." : "Iniciar Sesión"}
                        </button>
                    </form>
                )}

                <div className="register-footer">
                    <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Volver a selección</a>
                </div>
            </div>
        </div>
    );
}

export default ProfessorLoginForm;
