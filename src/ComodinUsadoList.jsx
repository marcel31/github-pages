// src/ComodinUsadoList.jsx
import React from 'react';

const ComodinUsadoList = ({ comodines }) => {
    return (
        <div className="comodin-usado-list">
            {comodines.map(comodin => (
                <div key={comodin.id} className="comodin-usado-item">
                    <div className="comodin-usado-info">
                        <span className="comodin-usado-name">{comodin.nombre}</span>
                        <span className="comodin-usado-motivo">Motivo: {comodin.motivo}</span>
                        <span className="comodin-usado-date">Fecha y Hora: {comodin.fechaHora}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ComodinUsadoList;
