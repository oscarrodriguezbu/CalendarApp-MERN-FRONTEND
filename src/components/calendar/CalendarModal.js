import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker'; //selector de fechas
import moment from 'moment';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventStartAddNew, eventStartUpdate, eventUpdate } from '../../actions/events';


//import 'moment/locale/es-us'; //us para dejar Mayusculas y am y pm

//moment.locale('es-us');
//esto se puede dejar en un helper
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours'); //3:00:00 formtato
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    title: 'Evento',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}

export const CalendarModal = () => {

    const { modalOpen } = useSelector(state => state.ui);

    const { activeEvent } = useSelector(state => state.calendar); //para mirar el state es bueno revisar las herramientas de redux en el navegador

    const dispatch = useDispatch();

    //const [isOpen, setIsOpen] = useState(true);

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
    const [titleValid, setTitleValid] = useState(true)

    const [formValues, setFormValues] = useState(initEvent);

    const { title, notes, start, end } = formValues;

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
        } else {
            setFormValues(initEvent);
        }
    }, [activeEvent, setFormValues])


    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    //se recomienda usar el isOpen con useState pero en este ejercicio se hace con Redux
    const closeModal = () => {
        //setIsOpen(false);
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setFormValues(initEvent); //para reestablecer el formulario
    }

    const afterOpenModal = () => {

    }

    const handleStartDateChange = (e) => { //maneja el date de js y no del moment
        // console.log(e);
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        //  console.log(e);
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        // console.log(formValues);

        const momentStart = moment(start);
        const momentEnd = moment(end);

        //validaciones
        if (momentStart.isSameOrAfter(momentEnd, 'hour')) {
            console.log('La fecha numero dos debe ser mayor');
            Swal.fire('Error', 'La fecha numero dos debe ser mayor', 'error');
            return;
        }

        if (title.trim().length < 2) {
            return setTitleValid(false);
        }

        //se pueden agregar mas validaciones

        //actualizar o crear un nuevo evento si hay o no algun valor en el evento activo
        if (activeEvent) {
            /* dispatch(eventUpdate(formValues))  */ 
            dispatch(eventStartUpdate(formValues)) 
        } else {
            /*  dispatch(eventStartAddNew({
                 ...formValues,
                 id: new Date().getTime(), //agrega un id temporalmente, mas adelante se hace con base de datos
                 user: {
                     _id: '123',
                     name: 'Leonardo'
                 }
             })); */
            dispatch(eventStartAddNew(formValues));
        }



        setTitleValid(true);
        closeModal();
    }



    return (
        <Modal

            isOpen={modalOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            //contentLabel="Example Modal"
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> {(activeEvent) ? 'Editar evento' : 'Nuevo evento'} </h1>
            <hr />
            <form
                //onSubmit={handleSubmitForm}
                className="container">

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        //maxDate={dateEnd}  creo que mejor no porque me impide seleccionar fechas posteriores
                        className="form-control"
                        //format="MMMM d, yyyy - h:mm:ss a"
                        format="y-MM-dd h:mm:ss a"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={dateStart}
                        className="form-control"
                        format="y-MM-dd h:mm:ss a"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    //type="submit" //Me generaba un error y ahora con el onClick se soluciona pero 
                    //desde la hora de arriba no valida las horas iguales con la de abajo
                    type="button"
                    onClick={handleSubmitForm}
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}
