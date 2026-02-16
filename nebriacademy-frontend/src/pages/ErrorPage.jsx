/**
 * Página de Error genérica.
 * Se muestra cuando ocurre un fallo en la carga de datos o navegación.
 */
function ErrorPage() {
    return (
        <div>
            <h1>¡Error al cargar los usuarios!</h1>
            <p>Hubo un problema al intentar obtener la lista de usuarios. Por favor, inténtalo de nuevo más tarde.</p>
        </div>
    );
}

export default ErrorPage;