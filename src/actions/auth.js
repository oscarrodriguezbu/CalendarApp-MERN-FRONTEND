import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';
import { eventLoggout } from './events';

export const startLogin = (email, password) => {
    return async (dispatch) => {
        //console.log(email, password);

        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();
        //console.log(body);

        if (body.ok) {
            localStorage.setItem('token', body.token); //guarda el token en localstorage
            localStorage.setItem('token-init-date', new Date().getTime()); //guarda la hora en que se genera el token que por cierto tiene dos horas de validacion

            dispatch(login({ //este dispatch se lo envia a LoginScreen con el return
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}



export const startRegiser = (name, email, password, password2) => { //EL ORDEN IMPORTA Y DEBE SER TAL CUAL COMO ESTÁ EN EL BACKEND
    return async (dispatch) => {
        //console.log(email, password, name, password2);

        const resp = await fetchSinToken('auth/new', { name, email, password, password2 }, 'POST');
        const body = await resp.json();
        //console.log(body);
        //console.log(body.errors.name.msg);

        if (body.ok) {

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            if (body.errors) {

                if (body.errors.name) {
                    Swal.fire('Error', body.errors.name.msg, 'error');
                } else if (body.errors.email) {
                    Swal.fire('Error', body.errors.email.msg, 'error');
                } else if (body.errors.password) {
                    Swal.fire('Error', body.errors.password.msg, 'error');
                } else if (body.errors.password2) {
                    Swal.fire('Error', body.errors.password2.msg, 'error');
                }

            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        }
    }
}


export const startChecking = () => {
    return async (dispatch) => {
        //console.log(email, password, name, password2);

        const resp = await fetchConToken('auth/renew'); //siempre va a eser get
        const body = await resp.json();
        //console.log(body);
        //console.log(body.errors.name.msg);

        if (body.ok) {

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            //Swal.fire('Error', body.msg, 'error'); //No hace falta el mensaje de error del token pero lo comento por si acaso hay que hacer pruebas
            dispatch(checkingFinish()) //esto se va a inicializar en el AppRouter
        }
    }
}


export const startLoggout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(eventLoggout()); //limpia la consola de los eventos que tenia el usuario. Esto se aprecia mejor en el state de la consola de redux
        dispatch(loggout());
    }
}

const login = (user) => ({ //tambien lo usa el register porque estan en la misma vista
    type: types.authLogin,
    payload: user
});

const loggout = () => ({type: types.authLoggout});

const checkingFinish = () => ({type: types.authChekingFinish});