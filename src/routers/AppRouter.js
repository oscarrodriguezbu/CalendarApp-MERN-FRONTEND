import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';


export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);

    //saber si el usuario está autenticado o no para proteger las rutas
    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch])

    //console.log(checking);
    if (checking) { //se puede crear un componente para mostrar por ejemplo un circulito animado mientras carga
        //en este caso me dio pereza hacer un componente aparte y lo dejo aquí
        return (
            <div className="cargando">
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />
            </div>); 
    }

    return (

        <Router>
            <div>
                <Switch>                 
                    <PublicRoute 
                    exact 
                    path="/login" 
                    component={LoginScreen} 
                    isAuthenticated={!!uid} /* !!es para convertir a un string a booleano que es lo que necesita el isAuthenticated */
                    />

                    <PrivateRoute 
                    exact 
                    path="/" 
                    component={CalendarScreen} 
                    isAuthenticated={!!uid}
                    />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>

    )
}
