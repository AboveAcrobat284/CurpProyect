import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import useFormState from './useFormState';
import PersonalInfoForm from './personalInfoForm';
import StateSelection from './stateSelection';
import AccessCodeInput from './accessCodeInput';
import styles from '../assets/styles/generateForm.module.css';

function GenerateCurpForm() {
    const {
        formData,
        accessCode,
        inputCode,
        isValidCode,
        showMessage,
        usuarios,
        setUsuarios,
        handleClearForm,
        handleInputChange,
        handleGenderChange,
        handleCodeChange,
        handleSubmit,
        generatePDF
    } = useFormState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        dia: '',
        mes: '',
        anio: '',
        genero: '',
        estado: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [rowIndexToDelete, setRowIndexToDelete] = useState(null);

    useEffect(() => {
        const savedUsuarios = localStorage.getItem('usuarios');
        if (savedUsuarios) {
            setUsuarios(JSON.parse(savedUsuarios));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }, [usuarios]);

    const handleDeleteRow = () => {
        const updatedUsuarios = [...usuarios];
        updatedUsuarios.splice(rowIndexToDelete, 1);
        setUsuarios(updatedUsuarios);
        setShowModal(false);
    };

    return (
        <div className={styles.container}>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid justify-content-center">
                    <a className="navbar-brand">
                    Proyecto Individual
                    </a>
                </div>
            </nav>
            <div className={styles.container2}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <PersonalInfoForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleGenderChange={handleGenderChange}
                    />

                    <StateSelection
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />

                    <AccessCodeInput
                        accessCode={accessCode}
                        inputCode={inputCode}
                        handleCodeChange={handleCodeChange}
                        isValidCode={isValidCode}
                        showMessage={showMessage}
                    />

                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={handleClearForm}>Limpiar</button>
                        <button type="submit" className="btn btn-primary">Generar</button>
                    </div>
                </form>
            </div>

            <div className="container">
                <table className="table mb-0">
                    <thead className='text-white'>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido Paterno</th>
                            <th>Apellido Materno</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Género</th>
                            <th>Estado</th>
                            <th>CURP</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario, index) => (
                            <tr key={index} className='text-white'>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellidoPaterno}</td>
                                <td>{usuario.apellidoMaterno}</td>
                                <td>{`${usuario.dia}/${usuario.mes}/${usuario.anio}`}</td>
                                <td>{usuario.genero}</td>
                                <td>{usuario.estado}</td>
                                <td>{usuario.curp}</td>
                                <td>
                                    <button onClick={() => { setRowIndexToDelete(index); setShowModal(true); }}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)} className="rounded">
                <Modal.Header closeButton className="bg-dark text-white">
                    <Modal.Title>Confirmación</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    ¿Estás seguro de que deseas eliminar esta fila?
                </Modal.Body>
                <Modal.Footer className="bg-dark text-white">
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={handleDeleteRow}>Eliminar</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default GenerateCurpForm;
