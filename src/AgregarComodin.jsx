// src/AgregarComodin.jsx
import React, { useState } from 'react';

const AgregarComodin = ({ agregarComodin, usuario }) => {
    const [nombre, setNombre] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nombre) {
            agregarComodin(nombre, usuario);
            setNombre('');
        }
    };

    return (
        <form className="agregar-comodin" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder={`Nombre del comodín (${usuario})`}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <button type="submit">Agregar</button>
        </form>
    );
};

export default AgregarComodin;
