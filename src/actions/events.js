//todo esto se llama atraves de un dispatch cuando se requieran

import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";



export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {

        const { uid, name } = getState().auth; //esto viene del redux

        try {
            const resp = await fetchConToken('events', event, 'POST'); //event ES EL PAYLOAD
            const body = await resp.json();
            // console.log(body);
            if (body.ok) {
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                //console.log(event);
                dispatch(eventAddNew(event));
            }

        } catch (error) {
            console.log(error);
        }



        //console.log(event);
    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});


/* export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});
 */
export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent,
});


export const eventStartUpdate = (event) => {
    return async (dispatch) => {
        try {
            //console.log(event);
            const resp = fetchConToken(`events/${event.id}`, event, 'PUT');
            const body = await (await resp).json();


            if (body.ok) {
                dispatch(eventUpdate(event));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }
}


const eventUpdate = (event) => ({
    type: types.eventUpdate,
    payload: event
});


export const eventStartDelete = () => {
    return async (dispatch, getState) => {
        const { id } = getState().calendar.activeEvent;
        //console.log(id);

        try {
            //console.log(event);
            const resp = fetchConToken(`events/${id}`, {}, 'DELETE');
            const body = await (await resp).json();


            if (body.ok) {
                dispatch(eventDeleted());
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const eventDeleted = () => ({
    type: types.eventDeleted,
});

export const eventStartLoading = () => {
    return async (dispatch) => {
        //console.log('xxx');

        try {
            const resp = await fetchConToken('events');
            const body = await resp.json();
            //console.log(body);

            const events = prepareEvents(body.evento);

            dispatch(eventLoaded(events));
            //console.log(events);

        } catch (error) {
            console.log(error);
        }

    }
};


const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});

export const eventLoggout = () => ({ type: types.eventLoggout });
