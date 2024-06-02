import React, { useEffect, useState } from 'react';
import ComodinList from './ComodinList';
import ComodinUsadoList from './ComodinUsadoList';
import Login from './Login';
import { db } from './firebase-config';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import Cookies from 'js-cookie';
import './styles.css';

const monthOrder = {
    'Enero': 1,
    'Febrero': 2,
    'Marzo': 3,
    'Abril': 4,
    'Mayo': 5,
    'Junio': 6,
    'Julio': 7,
    'Agosto': 8,
    'Septiembre': 9,
    'Octubre': 10,
    'Noviembre': 11,
    'Diciembre': 12,
};

const sortComodinesByMonth = (comodines) => {
    return comodines.sort((a, b) => monthOrder[a.nombre] - monthOrder[b.nombre]);
};

export function App() {
    const [user, setUser] = useState(null);
    const [comodines, setComodines] = useState([]);
    const [comodinesUsados, setComodinesUsados] = useState([]);

    useEffect(() => {
        const savedUser = Cookies.get('user');
        if (savedUser) {
            setUser(savedUser);
        }
    }, []);

    const getData = async () => {
        const comodinesCol = collection(db, 'comodines');
        const comodinesSnapshot = await getDocs(comodinesCol);
        const comodinesList = comodinesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const comodinesNoUsados = comodinesList.filter(c => !c.usado);
        const comodinesUsadosList = comodinesList.filter(c => c.usado);

        setComodines(sortComodinesByMonth(comodinesNoUsados));
        setComodinesUsados(sortComodinesByMonth(comodinesUsadosList));
    };

    useEffect(() => {
        if (user) {
            getData();
        }
    }, [user]);

    const usarComodin = async (id, motivo) => {
        const comodinIndex = comodines.findIndex(c => c.id === id);
        if (comodinIndex !== -1 && comodines[comodinIndex].usuario === user) {
            const comodinUsado = { ...comodines[comodinIndex], usado: true, motivo, fechaHora: new Date().toLocaleString() };

            // Actualizar Firestore
            const comodinRef = doc(db, 'comodines', id);
            await updateDoc(comodinRef, { usado: true, motivo, fechaHora: new Date().toLocaleString() });

            // Actualizar el estado local
            const updatedComodines = [...comodines];
            updatedComodines.splice(comodinIndex, 1);
            setComodines(updatedComodines);
            setComodinesUsados([...comodinesUsados, comodinUsado]);
        }
    };

    const cambiarNombreComodin = async (id, nuevoNombre) => {
        const comodinIndex = comodines.findIndex(c => c.id === id);
        if (comodinIndex !== -1 && comodines[comodinIndex].usuario === user) {
            setComodines(comodines.map(c => c.id === id ? { ...c, nombre: nuevoNombre } : c));
            // Actualizar Firestore
            const comodinRef = doc(db, 'comodines', id);
            await updateDoc(comodinRef, { nombre: nuevoNombre });
        }
    };

    const handleLogout = () => {
        Cookies.remove('user');
        setUser(null);
    };

    if (!user) {
        return <Login setUser={setUser} />;
    } else {
        console.log(user);
    }

    const comodinesMarcel = comodines.filter(c => c.usuario === 'Marcel');
    const comodinesClaudia = comodines.filter(c => c.usuario === 'Claudia');
    const comodinesUsadosMarcel = comodinesUsados.filter(c => c.usuario === 'Marcel');
    const comodinesUsadosClaudia = comodinesUsados.filter(c => c.usuario === 'Claudia');

    return (
        <div className="app">
            <h1>Comodines</h1>
            <div className="logout-button">
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="listas-container">
                <div className="lista">
                    <h2>Marcel</h2>
                    <ComodinList comodines={comodinesMarcel} usarComodin={usarComodin} cambiarNombreComodin={cambiarNombreComodin} user={user} />
                    <h3>Usados</h3>
                    <ComodinUsadoList comodines={comodinesUsadosMarcel} />
                </div>
                <div className="lista">
                    <h2>Claudia</h2>
                    <ComodinList comodines={comodinesClaudia} usarComodin={usarComodin} cambiarNombreComodin={cambiarNombreComodin} user={user} />
                    <h3>Usados</h3>
                    <ComodinUsadoList comodines={comodinesUsadosClaudia} />
                </div>
            </div>
        </div>
    );
}
