import React from 'react';
import styles from '../assets/styles/generateForm.module.css'

function AccessCodeInput({ accessCode, inputCode, handleCodeChange, isValidCode, showMessage }) {
    const darkStyle = {
        backgroundColor: '#2d3436', // color oscuro
        color: '#b2bec3', // color claro para el texto
    };

    const inputStyle = {
        backgroundColor: '#636e72', // color medio oscuro para el input
        color: '#ffffff', // texto blanco para el input
        borderColor: '#b2bec3', // borde claro para el input
    };

    return (
        <div>
            <div className="mb-3" style={darkStyle}>
                <label htmlFor="accessCode" className="form-label">Código de Acceso</label>
                <input type="text" className="form-control" id="accessCode" value={accessCode} readOnly style={inputStyle} />
            </div>
            <div className="mb-3" style={darkStyle}>
                <label htmlFor="inputCode" className="form-label">Ingrese el Código de Acceso</label>
                <input type="text" className="form-control" id="inputCode" value={inputCode} onChange={handleCodeChange} style={inputStyle} />
                {showMessage && (
                    isValidCode
                        ? <p className={styles.curp}>Código de acceso válido</p>
                        : <p className={styles.error}>Código de acceso inválido</p>
                )}
            </div>
        </div>
    );
}

export default AccessCodeInput;
