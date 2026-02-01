import React, { useEffect, useState } from 'react';
import StudentDashboard from './StudentDashboard';
import ProfessorDashboard from './ProfessorDashboard';

function Home() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userStr = localStorage.getItem("usuario");
        if (userStr) {
            setUser(JSON.parse(userStr));
        }
        setLoading(false);
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (!user) return null;

    return (
        <>
            {user.tipo === 'profesor' ? (
                <ProfessorDashboard userName={user.nombre} userId={user.id} />
            ) : (
                <StudentDashboard userName={user.nombre} userId={user.id} />
            )}
        </>
    );
}

export default Home;
