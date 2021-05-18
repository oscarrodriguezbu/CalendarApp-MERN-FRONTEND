import { types } from "../types/types";

const initiaSstate = {
    modalOpen: false,
}

export const uiReducer = (state = initiaSstate, action) => {
    switch (action.type) {
        case types.uiOpenModal:

            return {
                ...state,
                modalOpen: true
            };

        case types.uiCloseModal:

            return {
                ...state,
                modalOpen: false
            };

        default:
            return state;
    }
}