import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData, putData } from '../api/api';
import '../style/Perfil.css';

/**
 * Página de Perfil de Usuario.
 * Permite visualizar y editar la información personal, de contacto y profesional.
 */
function Perfil() {
  const [user, setUser] = useState(null); // Información básica de la sesión
  const [detailedInfo, setDetailedInfo] = useState(null); // Información extendida del backend (alumnos/profesores)
  const [isEditing, setIsEditing] = useState(false); // Estado para alternar entre vista y edición
  const [formData, setFormData] = useState({}); // Datos temporales durante la edición
  const [loading, setLoading] = useState(true); // Control de carga de datos
  const [saving, setSaving] = useState(false); // Control de guardado
  const [error, setError] = useState(null); // Gestión de errores
  const navigate = useNavigate();

  useEffect(() => {
    // Verificamos si hay una sesión activa
    const userStr = localStorage.getItem("usuario");
    if (!userStr) {
      navigate('/login');
      return;
    }

    const currentUser = JSON.parse(userStr);
    setUser(currentUser);

    /**
     * Obtiene los datos detallados del usuario dependiendo de si es alumno o profesor.
     */
    const getDetailedData = async () => {
      try {
        const endpoint = currentUser.tipo === 'profesor' ? 'profesores' : 'alumnos';
        const data = await fetchData(`${endpoint}/${currentUser.id}`);
        setDetailedInfo(data);
        setFormData(data); // Inicializamos el formulario con los datos actuales
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar datos detallados:", err);
        setError("No se pudo cargar la información detallada del perfil.");
        setLoading(false);
      }
    };

    getDetailedData();
  }, [navigate]);

  // Cierra sesión eliminando los datos de localStorage
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
    window.location.reload();
  };

  // Maneja cambios en los campos de los inputs durante la edición
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Envía los cambios realizados en el perfil al backend.
   */
  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const endpoint = user.tipo === 'profesor' ? 'profesores' : 'alumnos';
      const updatedData = await putData(`${endpoint}/${user.id}`, formData);

      setDetailedInfo(updatedData);
      setIsEditing(false); // Volvemos a la vista normal
      alert("Perfil actualizado correctamente");
    } catch (err) {
      console.error("Error al actualizar el perfil:", err);
      setError("No se pudo actualizar el perfil. Inténtalo de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="profile-container">Cargando perfil...</div>;
  if (error && !isEditing) return <div className="profile-container">{error}</div>;

  const info = detailedInfo || {};

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Cabecera con Avatar (inicial del nombre) */}
        <div className="profile-header">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              {user.nombre.charAt(0)}
            </div>
          </div>
        </div>

        <div className="profile-body">
          <div className="profile-info-header">
            <div className="profile-name-role">
              <h1>{user.nombre} {user.apellidos}</h1>
              <span className={`profile-role-badge ${user.tipo}`}>
                {user.tipo === 'profesor' ? 'Profesor' : 'Alumno'}
              </span>
            </div>

            {/* Botones de acción dinámicos */}
            <div className="profile-actions">
              {!isEditing ? (
                <>
                  <button className="btn-profile btn-secondary" onClick={() => setIsEditing(true)}>Editar Perfil</button>
                  <button className="btn-profile btn-primary" onClick={handleLogout}>Cerrar Sesión</button>
                </>
              ) : (
                <>
                  <button className="btn-profile btn-primary" onClick={handleSave} disabled={saving}>
                    {saving ? "Guardando..." : "Guardar Cambios"}
                  </button>
                  <button className="btn-profile btn-secondary" onClick={() => setIsEditing(false)}>Cancelar</button>
                </>
              )}
            </div>
          </div>

          {error && <p className="text-danger mb-1rem">{error}</p>}

          {/* Vista Detallada (no edición) */}
          {!isEditing ? (
            <div className="profile-grid">
              <div className="profile-section">
                <h2>Información Personal</h2>
                <div className="profile-detail-item">
                  <span className="profile-detail-label">Email</span>
                  <span className="profile-detail-value">{user.email}</span>
                </div>
                <div className="profile-detail-item">
                  <span className="profile-detail-label">DNI</span>
                  <span className="profile-detail-value">{info.dni || 'No proporcionado'}</span>
                </div>
                <div className="profile-detail-item">
                  <span className="profile-detail-label">Teléfono</span>
                  <span className="profile-detail-value">{info.numTelefono || 'No proporcionado'}</span>
                </div>
              </div>

              <div className="profile-section">
                <h2>Ubicación y Otros</h2>
                <div className="profile-detail-item">
                  <span className="profile-detail-label">País</span>
                  <span className="profile-detail-value">{info.pais || 'No proporcionado'}</span>
                </div>
                <div className="profile-detail-item">
                  <span className="profile-detail-label">Localidad</span>
                  <span className="profile-detail-value">{info.localidad || 'No proporcionado'}</span>
                </div>
                {/* Campos específicos según el rol */}
                {user.tipo === 'profesor' ? (
                  <div className="profile-detail-item">
                    <span className="profile-detail-label">Especialización</span>
                    <span className="profile-detail-value">{info.especializacion || 'No proporcionada'}</span>
                  </div>
                ) : (
                  <div className="profile-detail-item">
                    <span className="profile-detail-label">Método de Pago</span>
                    <span className="profile-detail-value">
                      {info.numeroTarjeta ? `**** **** **** ${info.numeroTarjeta.slice(-4)}` : 'No vinculado'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Formulario de Edición */
            <form className="profile-edit-form" onSubmit={handleSave}>
              <div className="profile-grid">
                <div className="profile-section">
                  <h2>Editar Info Personal</h2>
                  <div className="profile-detail-item">
                    <label className="profile-detail-label">Nombre</label>
                    <input type="text" name="nombre" className="nebri-input profile-edit-input" value={formData.nombre || ''} onChange={handleChange} />
                  </div>
                  <div className="profile-detail-item">
                    <label className="profile-detail-label">Apellidos</label>
                    <input type="text" name="apellidos" className="nebri-input profile-edit-input" value={formData.apellidos || ''} onChange={handleChange} />
                  </div>
                  <div className="profile-detail-item">
                    <label className="profile-detail-label">DNI</label>
                    <input type="text" name="dni" className="nebri-input profile-edit-input" value={formData.dni || ''} onChange={handleChange} />
                  </div>
                  <div className="profile-detail-item">
                    <label className="profile-detail-label">Teléfono</label>
                    <input type="text" name="numTelefono" className="nebri-input profile-edit-input" value={formData.numTelefono || ''} onChange={handleChange} />
                  </div>
                </div>

                <div className="profile-section">
                  <h2>Editar Ubicación</h2>
                  <div className="profile-detail-item">
                    <label className="profile-detail-label">País</label>
                    <input type="text" name="pais" className="nebri-input profile-edit-input" value={formData.pais || ''} onChange={handleChange} />
                  </div>
                  <div className="profile-detail-item">
                    <label className="profile-detail-label">Localidad</label>
                    <input type="text" name="localidad" className="nebri-input profile-edit-input" value={formData.localidad || ''} onChange={handleChange} />
                  </div>
                  {user.tipo === 'profesor' ? (
                    <div className="profile-detail-item">
                      <label className="profile-detail-label">Especialización</label>
                      <input type="text" name="especializacion" className="nebri-input profile-edit-input" value={formData.especializacion || ''} onChange={handleChange} />
                    </div>
                  ) : (
                    <div className="profile-detail-item">
                      <label className="profile-detail-label">Número Tarjeta</label>
                      <input type="text" name="numeroTarjeta" className="nebri-input profile-edit-input" value={formData.numeroTarjeta || ''} onChange={handleChange} />
                    </div>
                  )}
                </div>
              </div>

              <div className="profile-section mt-2rem">
                <h2>Redes Sociales (separadas por coma)</h2>
                <input
                  type="text"
                  name="redes"
                  className="nebri-input profile-social-input"
                  value={formData.redes || ''}
                  onChange={handleChange}
                  placeholder="linkedin.com/in/usuario, twitter.com/usuario"
                />
              </div>
            </form>
          )}

          {/* Enlaces a Redes Sociales extraídos dinámicamente de la cadena de texto */}
          {!isEditing && info.redes && (
            <div className="profile-section mt-2rem">
              <h2>Redes Sociales</h2>
              <div className="profile-social-list">
                {info.redes.split(',').map((red, idx) => (
                  <a key={idx} href={red.trim().startsWith('http') ? red.trim() : `https://${red.trim()}`}
                    target="_blank" rel="noopener noreferrer" className="profile-social-link">
                    {red.includes('linkedin') ? 'LinkedIn' : red.includes('twitter') ? 'Twitter' : 'Enlace'}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Perfil;
