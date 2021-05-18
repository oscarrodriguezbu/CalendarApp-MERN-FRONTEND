//es la lista de las acciones y cada uno es un action.type

export const types = {
    uiOpenModal: '[ui] Open modal',
    uiCloseModal:  '[ui] Close modal',

    eventSetActive:  '[event] Set Active',
    eventStartAddNew:  '[event] Start the process to add new event',
    eventAddNew:  '[event] Add new event',
    eventClearActiveEvent:  '[event] Clear active event',
    eventUpdate:  '[event] Event updated',
    eventDeleted:  '[event] Event deleted',
    eventLoaded: '[event] Events loaded',
    eventLoggout: '[event] Clean events at the loggout moment',

    authChekingFinish: '[auth] Finish cheking login state',
    authStartLogin: '[auth] Start login',
    authLogin: '[auth] Login',
    authStartRegister: '[auth] Strart register',
    authStartTokenRenew: '[auth] Start token renew',
    authLoggout: '[auth] Loggout',




}