import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../api/api";
import "../style/Login.css";

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
    <div className="login-grid">
      <div className="formulario-login-contenedor">
        <h2>Iniciar Sesión</h2>
        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
        
        <form className="formulario-login" onSubmit={handleSubmit}>
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input 
            type="password" 
            name="contrasena"
            placeholder="Contraseña" 
            value={formData.contrasena}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        <a href="/register">Crear cuenta</a>
      </div>
    </div>
  );
}

export default LoginGrid;
