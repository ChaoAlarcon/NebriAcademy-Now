import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData, putData } from '../api/api';
import '../style/Perfil.css';

function Perfil() {
  const [user, setUser] = useState(null);
  const [detailedInfo, setDetailedInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("usuario");
    if (!userStr) {
      navigate('/login');
      return;
    }

    const currentUser = JSON.parse(userStr);
    setUser(currentUser);

    const getDetailedData = async () => {
      try {
        const endpoint = currentUser.tipo === 'profesor' ? 'profesores' : 'alumnos';
        const data = await fetchData(`${endpoint}/${currentUser.id}`);
        setDetailedInfo(data);
        setFormData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching detailed user data:", err);
        setError("No se pudo cargar la información detallada del perfil.");
        setLoading(false);
      }
    };

    getDetailedData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
    window.location.reload();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const endpoint = user.tipo === 'profesor' ? 'profesores' : 'alumnos';
      const updatedData = await putData(`${endpoint}/${user.id}`, formData);

      setDetailedInfo(updatedData);
      setIsEditing(false);
      alert("Perfil actualizado correctamente");
    } catch (err) {
      console.error("Error updating profile:", err);
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

          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

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
            <form className="profile-edit-form" onSubmit={handleSave}>
              <div className="profile-grid">
                <div className="profile-section">
                  <h2>Editar Info Personal</h2>
                  <div className="profile-detail-item">
                    <label className="profile-detail-label">Nombre</label>
                    <input type="text" name="nombre" className="register-input" value={formData.nombre || ''} onChange={handleChange} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
                  </div>
                  <div className="profile-detail-item">
                    <label className="profile-detail-label">Apellidos</label>
                    <input type="text" name="apellidos" className="register-input" value={formData.apellidos || ''} onChange={handleChange} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
                  </div>
                  <div className="profile-detail-item">
                    <label className="profile-detail-label">DNI</label>
                    <input type="text" name="dni" className="register-input" value={formData.dni || ''} onChange={handleChange} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
                  </div>
                  <div className="profile-detail-item">
                    <label className="profile-detail-label">Teléfono</label>
                    <input type="text" name="numTelefono" className="register-input" value={formData.numTelefono || ''} onChange={handleChange} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
                  </div>
                </div>

                <div className="profile-section">
                  <h2>Editar Ubicación</h2>
                  <div className="profile-detail-item">
                    <label className="profile-detail-label">País</label>
                    <input type="text" name="pais" className="register-input" value={formData.pais || ''} onChange={handleChange} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
                  </div>
                  <div className="profile-detail-item">
                    <label className="profile-detail-label">Localidad</label>
                    <input type="text" name="localidad" className="register-input" value={formData.localidad || ''} onChange={handleChange} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
                  </div>
                  {user.tipo === 'profesor' ? (
                    <div className="profile-detail-item">
                      <label className="profile-detail-label">Especialización</label>
                      <input type="text" name="especializacion" className="register-input" value={formData.especializacion || ''} onChange={handleChange} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
                    </div>
                  ) : (
                    <div className="profile-detail-item">
                      <label className="profile-detail-label">Número Tarjeta</label>
                      <input type="text" name="numeroTarjeta" className="register-input" value={formData.numeroTarjeta || ''} onChange={handleChange} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
                    </div>
                  )}
                </div>
              </div>

              <div className="profile-section" style={{ marginTop: '2rem' }}>
                <h2>Redes Sociales (separadas por coma)</h2>
                <input
                  type="text"
                  name="redes"
                  className="register-input"
                  value={formData.redes || ''}
                  onChange={handleChange}
                  placeholder="linkedin.com/in/usuario, twitter.com/usuario"
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
            </form>
          )}

          {!isEditing && info.redes && (
            <div className="profile-section" style={{ marginTop: '2rem' }}>
              <h2>Redes Sociales</h2>
              <div className="social-links" style={{ display: 'flex', gap: '15px' }}>
                {info.redes.split(',').map((red, idx) => (
                  <a key={idx} href={red.trim().startsWith('http') ? red.trim() : `https://${red.trim()}`}
                    target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: 'var(--nebrija-red)', textDecoration: 'none' }}>
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