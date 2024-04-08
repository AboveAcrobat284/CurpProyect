import React, { useEffect } from 'react';

function PersonalInfoForm({ formData, handleInputChange, handleGenderChange }) {
    const [diasDelMes, setDiasDelMes] = React.useState(31);
    const actualizarDiasDelMes = () => {
        const mes = parseInt(formData.mes, 10);
        const anio = parseInt(formData.anio, 10);
        let dias = 31;

        if (mes === 2) {
            if (anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0)) {
                dias = 29;
            } else {
                dias = 28;
            }
        } else if ([4, 6, 9, 11].includes(mes)) {
            dias = 30;
        }

        setDiasDelMes(dias);

        if (parseInt(formData.dia, 10) > dias) {
            handleInputChange({ target: { id: 'dia', value: '' } });
        }
    };

    useEffect(() => {
        actualizarDiasDelMes();
    }, [formData.mes, formData.anio]);

    const inputStyle = {
        backgroundColor: '#636e72', // color medio oscuro para el input
        color: '#ffffff', // texto blanco para el input
        borderColor: '#b2bec3', // borde claro para el input
    };

    return (
        <div style={{ color: '#b2bec3' }}> {/* Texto claro */}
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre(s)</label>
                <input type="text" className="form-control" id="nombre" value={formData.nombre} onChange={handleInputChange} style={inputStyle} />
            </div>
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <label htmlFor="apellidoPaterno" className="form-label">Apellido Paterno</label>
                        <input type="text" className="form-control" id="apellidoPaterno" value={formData.apellidoPaterno} onChange={handleInputChange} style={inputStyle} />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <label htmlFor="apellidoMaterno" className="form-label">Apellido Materno</label>
                        <input type="text" className="form-control" id="apellidoMaterno" value={formData.apellidoMaterno} onChange={handleInputChange} style={inputStyle} />
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">Fecha de nacimiento</label>
                <div className="row">
                    <div className="col">
                        <select className="form-select" id="dia" value={formData.dia} onChange={handleInputChange} style={inputStyle}>
                            <option value="">Día</option>
                            {[...Array(diasDelMes)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                        </select>
                    </div>
                    <div className="col">
                        <select className="form-select" id="mes" value={formData.mes} onChange={handleInputChange} style={inputStyle}>
                            <option value="">Mes</option>
                            {[...Array(12)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                        </select>
                    </div>
                    <div className="col">
                        <select className="form-select" id="anio" value={formData.anio} onChange={handleInputChange} style={inputStyle}>
                            <option value="">Año</option>
                            {[...Array(101)].map((_, i) => {
                                const year = new Date().getFullYear() - i;
                                return <option key={year} value={year}>{year}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">Género</label> <br />
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="genero" id="generoMale" value="H" checked={formData.genero === 'H'} onChange={handleGenderChange} style={inputStyle} />
                    <label className="form-check-label" htmlFor="generoMale" style={{ color: '#b2bec3' }}>
                        Hombre
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="genero" id="generoFemale" value="M" checked={formData.genero === 'M'} onChange={handleGenderChange} style={inputStyle} />
                    <label className="form-check-label" htmlFor="generoFemale" style={{ color: '#b2bec3' }}>
                        Mujer
                    </label>
                </div>
            </div>
        </div>

    );
}

export default PersonalInfoForm;
