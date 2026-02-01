import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../api/api';
import '../style/Login.css'; // Reusing some form styles

function CourseUploadForm() {
    const [formData, setFormData] = useState({
        nombreCurso: '',
        categoria: '',
        nivel: 'Principiante',
        descripcion: '',
        profesor: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userStr = localStorage.getItem("usuario");
        if (userStr) {
            const user = JSON.parse(userStr);
            if (user.tipo === 'profesor') {
                setFormData(prev => ({ ...prev, profesor: user.id }));
            } else {
                navigate('/');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await postData('cursos', formData);
            if (response.error) {
                setError(response.error);
            } else {
                alert('Curso creado con éxito');
                navigate('/');
            }
        } catch (err) {
            console.error("Error creating course:", err);
            setError("Error al crear el curso. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-grid">
            <div className="formulario-login-contenedor" style={{ maxWidth: '600px' }}>
                <h2>Subir Nuevo Curso</h2>
                <p className="register-form-subtitle">Completa la información para publicar tu curso.</p>

                {error && <p className="error-message">{error}</p>}

                <form className="formulario-login" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="nombreCurso"
                        placeholder="Nombre del Curso"
                        className="register-input"
                        value={formData.nombreCurso}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="categoria"
                        placeholder="Categoría (ej: Programación, Diseño)"
                        className="register-input"
                        value={formData.categoria}
                        onChange={handleChange}
                        required
                    />

                    <label style={{ textAlign: 'left', display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Nivel del curso:</label>
                    <select
                        name="nivel"
                        className="register-select"
                        value={formData.nivel}
                        onChange={handleChange}
                        required
                    >
                        <option value="Principiante">Principiante</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                    </select>

                    <textarea
                        name="descripcion"
                        placeholder="Descripción del curso"
                        className="register-input"
                        style={{ minHeight: '100px', padding: '10px' }}
                        value={formData.descripcion}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="register-button" disabled={loading}>
                        {loading ? "Publicando..." : "Publicar Curso"}
                    </button>

                    <button
                        type="button"
                        className="register-button"
                        style={{ backgroundColor: '#6c757d', marginTop: '10px' }}
                        onClick={() => navigate('/')}
                    >
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CourseUploadForm;
