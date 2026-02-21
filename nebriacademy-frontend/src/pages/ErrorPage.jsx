import { useRouteError, Link } from "react-router-dom";
import "../style/ErrorPage.css";

/**
 * Página de Error
 * Maneja errores de enrutamiento (404, etc.) y errores inesperados.
 * Proporciona una interfaz amigable y una forma de volver al inicio.
 */
function ErrorPage() {
    const error = useRouteError();
    console.error("Detalles del error de ruta:", error);

    // Determinar el tipo de error para mostrar mensajes personalizados
    const is404 = error?.status === 404;
    const errorCode = error?.status || "Error";
    const errorTitle = is404 ? "Página no encontrada" : "¡Ups! Algo salió mal";
    const errorMessage = is404
        ? "Lo sentimos, la página que buscas no existe o ha sido movida."
        : (error?.statusText || error?.message || "Ha ocurrido un error inesperado al procesar tu solicitud.");

    return (
        <div className="error-container">
            <div className="error-content">
                <div className="error-icon-container">
                    <div className="error-circle"></div>
                    <div className="error-exclamation">!</div>
                </div>

                <div className="error-code">{errorCode}</div>
                <h1 className="error-title">{errorTitle}</h1>
                <p className="error-message">{errorMessage}</p>

                <div className="error-actions">
                    <Link to="/" className="nebri-button error-button">
                        Volver al inicio
                    </Link>
                    <button
                        className="nebri-button error-button error-button-secondary"
                        onClick={() => window.location.reload()}
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;