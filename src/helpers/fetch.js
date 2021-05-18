//Al parecer todo este proceso de fetch se puede hacer mas facil con algo que se llama axios


const baseUrl = process.env.REACT_APP_API_URL;


export const fetchSinToken = (endpoint, data, method= 'GET') => { //el valor por defecto de method es GET pero puede cambiar segun lo que venga
    const url = `${baseUrl}/${endpoint}`; // esto crea algo como http://localhost:4000/api/auth/

    if (method ==='GET') {
        return fetch(url);
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json' //esto toca ponerlo asi porque estamos trabajando cn json
            },
            body: JSON.stringify(data)
        });
    }
}


export const fetchConToken = (endpoint, data, method= 'GET') => { 
    const url = `${baseUrl}/${endpoint}`; 
    const token = localStorage.getItem('token') || ''; // '' es para evitar un posible valor null

    if (method ==='GET') {
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        });
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        });
    }
}