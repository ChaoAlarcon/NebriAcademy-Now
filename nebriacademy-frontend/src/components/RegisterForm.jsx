import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../api/api";
import "../style/Auth.css";

function RegisterForm() {
    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        email: "",
        contrasena: "",
        dni: "",
        numTelefono: "",
        pais: "",
        localidad: ""
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

        try {
            const data = await postData("alumnos", formData);
            if (data.error) {
                setError(data.error);
            } else {
                alert("Registro completado con éxito. Ahora puedes iniciar sesión.");
                navigate("/login-form");
            }
        } catch (err) {
            console.error("Error en registro:", err);
            setError("Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-grid">
            <div className="auth-card register-form-width">
                <h2 className="auth-title">Registrarse</h2>
                <p className="auth-subtitle">Completa tus datos para crear una cuenta externa.</p>

                {error && <p className="error-message">{error}</p>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="register-form-row">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            className="nebri-input"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="apellidos"
                            placeholder="Apellidos"
                            className="nebri-input"
                            value={formData.apellidos}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="nebri-input"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="contrasena"
                        placeholder="Contraseña"
                        className="nebri-input"
                        value={formData.contrasena}
                        onChange={handleChange}
                        required
                    />

                    <div className="register-form-row">
                        <input
                            type="text"
                            name="dni"
                            placeholder="DNI"
                            className="nebri-input"
                            value={formData.dni}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="numTelefono"
                            placeholder="Teléfono"
                            className="nebri-input"
                            value={formData.numTelefono}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="register-form-row">
                        <select
                            name="pais"
                            className="nebri-select"
                            value={formData.pais}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Selecciona un país</option>
                            <option value="España">España</option>
                            <option value="Francia">Francia</option>
                            <option value="Alemania">Alemania</option>
                            <option value="Italia">Italia</option>
                            <option value="Portugal">Portugal</option>
                        </select>
                        <select
                            name="localidad"
                            className="nebri-select"
                            value={formData.localidad}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Selecciona una localidad</option>
                            <option value="Madrid">Madrid</option>
                            <option value="Barcelona">Barcelona</option>
                            <option value="Valencia">Valencia</option>
                            <option value="Sevilla">Sevilla</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    <button type="submit" className="nebri-button" disabled={loading}>
                        {loading ? "Registrando..." : "Crear cuenta"}
                    </button>
                </form>

                <div className="auth-footer">
                    <a href="/login-form" onClick={(e) => { e.preventDefault(); navigate('/login-form'); }}>¿Ya tienes cuenta? Inicia sesión</a>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
