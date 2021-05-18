import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar'; //import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es-us'; //us para dejar Mayusculas y am y pm

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';




moment.locale('es-us');

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

/* 
 Esto era solo para hacer pruebas, ahora se usa el useSelector para agregar info

    const events = [{
    title: 'Cumpleaños',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar el pastel',
    user: {
        _id: '123',
        name: 'Oscar'
    }
}];
 */


export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar);
    const { uid } = useSelector(state => state.auth);

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch])

    const onDoubleClickEvent = (e) => {
        // console.log(e);
        dispatch(uiOpenModal());
    }

    const onSelectEvent = (e) => {
        // console.log(e);
        dispatch(eventSetActive(e));

    }

    //ver vistas de dia mes semana y agenda
    const onViewChange = (e) => {
        //console.log(e);
        setLastView(e);
        localStorage.setItem('lastView', e); //almacenar en localstorage
    }

    //tiene el lugar donde se hace click en cualquier slot y se puede trabajar algunos cositas aqui
    //tal vez se podria quitar el boton de agregar evento y en su lugar, seleccionar el campo donde se desee agregar y listo
    const onSelectSlot = (e) => {
        // console.log(e);

        dispatch(eventClearActiveEvent());
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        //console.log(event, start, end, isSelected );

        //console.log(event);

        const style = { //personalizar el calendario
            backgroundColor: (uid === event.user._id) ? '#367cf7' : '#465660', //poner colores diferentes por usuario
            borderRadius: '0px',
            opacity: 0.8,
            //display: 'block',
            color: 'white',
            outline: 'none'
        }
        if (isSelected) {
            style.backgroundColor = "#023E8A"
        } /* else {
            style.backgroundColor = "#367cf7"
        } */

        // console.log(event);
        return {
            style
        }

    }


    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClickEvent}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />


            <CalendarModal />

            <div className="botones-container">               
                {
                    (activeEvent) && <DeleteEventFab />
                }
                 <AddNewFab />
            </div>
        </div>


    )
}
