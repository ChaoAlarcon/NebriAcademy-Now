import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Auth.css';

function LoginSelection() {
    const navigate = useNavigate();

    const handleSelection = (type) => {
        if (type === 'interno') {
            navigate('/login-form');
        } else if (type === 'profesor') {
            navigate('/login-profesor');
        } else if (type === 'externo') {
            navigate('/register');
        }
    };

    return (
        <div className="auth-grid">
            <div className="auth-card register-form-width">
                <h1 className="auth-title">¿Cómo quieres acceder?</h1>
                <div className="selection-grid">
                    <div
                        className="selection-item"
                        data-type="interno"
                        onClick={() => handleSelection('interno')}
                    >
                        <div className="selection-icon">🎓</div>
                        <h2>Alumno Interno</h2>
                        <p>Estudio actualmente en un centro asociado a Nebrija.</p>
                    </div>

                    <div
                        className="selection-item"
                        data-type="externo"
                        onClick={() => handleSelection('externo')}
                    >
                        <div className="selection-icon">🌍</div>
                        <h2>Alumno Externo</h2>
                        <p>No estudio actualmente en un centro asociado a Nebrija. (Necesitas registrarte)</p>
                    </div>

                    <div
                        className="selection-item"
                        data-type="profesor"
                        onClick={() => handleSelection('profesor')}
                    >
                        <div className="selection-icon">👨‍🏫</div>
                        <h2>Profesor</h2>
                        <p>Acceso exclusivo para personal docente autorizado.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginSelection;
