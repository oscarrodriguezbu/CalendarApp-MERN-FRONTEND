import { types } from "../types/types";

const initialState = {
    checking: true,
    // uid: null,
    // name: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) { //por ejemplo trae a authStartLogin: '[auth] Start login'

        case types.authLogin:
            return {
                ...state,
                checking: false,
                ...action.payload
            }
        /* 
            y hace los cambios respectivos segun lo que esté en la accion en auth.js:
            {
                type: '[auth] Login',
                    payload: {
                    uid: '60a1f57f80f71000155a0b16',
                    name: 'Cosita'
                }
            }
    
        */

        case types.authChekingFinish:
            return {
                ...state,
                checking: false
            }

        case types.authLoggout:
            return {
                checking: false
            }

        default:
            return state;
    }
}
