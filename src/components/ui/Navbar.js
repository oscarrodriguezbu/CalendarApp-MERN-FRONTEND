import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLoggout } from '../../actions/auth';

export const Navbar = () => {
    const dispatch = useDispatch();
    const { name } = useSelector(state => state.auth);

    const handleLoggout = () => {
        dispatch( startLoggout());
    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                {name}
            </span>
            <button 
            onClick={handleLoggout}
            className="btn btn-outline-danger"
            >
                <i className="fas fa-sign-out-alt"></i>
                <span>
                    Salir
                </span>
            </button>
        </div>
    )
}
