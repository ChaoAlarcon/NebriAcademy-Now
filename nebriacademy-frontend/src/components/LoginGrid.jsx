import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../api/api";
import "../style/Auth.css";

/**
 * Componente que renderiza el formulario de inicio de sesión genérico.
 * Maneja la autenticación contra el endpoint 'usuarios/login'.
 */
function LoginGrid() {
  const [formData, setFormData] = useState({
    email: "",
    contrasena: ""
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
      // Petición de login al backend
      const data = await postData("usuarios/login", formData);

      if (data.error) {
        setError(data.error);
      } else {
        // Guardar sesión del usuario en localStorage
        localStorage.setItem("usuario", JSON.stringify(data));
        // Redirigir al inicio (Dashboard)
        navigate("/");
        // Recargar página para actualizar estado global (Nav, etc.)
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
        <h2 className="auth-title">Iniciar Sesión</h2>
        {error && <p className="error-message">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
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
          <button type="submit" className="nebri-button" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="auth-footer">
          <a className="register-button" href="/register" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>¿No tienes cuenta? Regístrate aquí</a>
        </div>
      </div>
    </div>
  );
}

export default LoginGrid;
