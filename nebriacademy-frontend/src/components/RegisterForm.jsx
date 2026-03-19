import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../api/api";
import ReCAPTCHA from "react-google-recaptcha";
import "../style/Auth.css";

/**
 * Formulario de registro para nuevos alumnos externos.
 * Recopila datos personales y crea un nuevo registro en la base de datos via API.
 */
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
    const [captchaToken, setCaptchaToken] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // Enviar datos al endpoint de creación de alumnos (POST /alumnos)
            const data = await postData("alumnos", { ...formData, captchaToken });
            if (data.error) {
                setError(data.error);
            } else {
                alert("Registro completado con éxito. Ahora puedes iniciar sesión.");
                // Redirigir al formulario de login tras registro exitoso
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


                    <select
                        name="pais"
                        className="nebri-select"
                        value={formData.pais}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Selecciona un país</option>
                        <option value="España">España</option>
                        <option value="México">México</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Perú">Perú</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Chile">Chile</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="República Dominicana">República Dominicana</option>
                        <option value="Honduras">Honduras</option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Puerto Rico">Puerto Rico</option>
                        <option value="Panamá">Panamá</option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Guinea Ecuatorial">Guinea Ecuatorial</option>
                    </select>



                    <div className="captcha-container">
                        <ReCAPTCHA
                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                            onChange={handleCaptchaChange}
                        />
                    </div>

                    <button type="submit" className="nebri-button" disabled={loading || !captchaToken}>
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
