import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../api/api";
import "../style/Auth.css";

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
      const data = await postData("usuarios/login", formData);

      if (data.error) {
        setError(data.error);
      } else {
        // Guardar usuario en localStorage
        localStorage.setItem("usuario", JSON.stringify(data));
        // Redirigir al home
        navigate("/");
        // Forzar recarga o actualización del Nav (en un App real usaríamos Context, pero esto es más directo para este caso)
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
          <a href="/register" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>¿No tienes cuenta? Regístrate aquí</a>
        </div>
      </div>
    </div>
  );
}

export default LoginGrid;
