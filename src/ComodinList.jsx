// src/ComodinList.jsx
import React, { useState } from 'react';
import ComodinItem from './ComodinItem';

const ComodinList = ({ comodines, usarComodin, cambiarNombreComodin, user }) => {
    const [nombreEditado, setNombreEditado] = useState('');

    return (
        <div className="comodin-list">
            {comodines.map(comodin => (
                <ComodinItem
                    key={comodin.id}
                    comodin={comodin}
                    usarComodin={usarComodin}
                    cambiarNombreComodin={cambiarNombreComodin}
                    nombreEditado={nombreEditado}
                    setNombreEditado={setNombreEditado}
                    user={user}
                />
            ))}
        </div>
    );
};

export default ComodinList;
