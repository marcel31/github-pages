// src/Login.jsx
import React, { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase-config';
import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const q = query(collection(db, 'users'), where('username', '==', username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            const passwordMatch = await bcrypt.compare(password, userData.password);

            if (passwordMatch) {
                Cookies.set('user', username, { expires: 0.02083 }); // 30 mins = 0.02083 days
                setUser(username);
            } else {
                setError('Usuario o contraseña incorrectos');
            }
        } else {
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div className="login">
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Login;
