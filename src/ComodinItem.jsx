// src/ComodinItem.jsx
import React, { useState } from 'react';

const ComodinItem = ({ comodin, usarComodin, user }) => {
    const [motivo, setMotivo] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        usarComodin(comodin.id, motivo);
        setMostrarFormulario(false);
        setMotivo('');
    };

    return (
        <div className="comodin-item">
            <div>
                <span>{comodin.nombre}</span>
            </div>
            <div>
                {console.log(comodin.usuario)}
                {comodin.usuario === user && (
                    <button onClick={() => setMostrarFormulario(true)}>Usar</button>
                )}
            </div>
            {mostrarFormulario && (
                <div className="form-popup">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Motivo:
                            <input type="text" value={motivo} onChange={(e) => setMotivo(e.target.value)} required />
                        </label>
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ComodinItem;
