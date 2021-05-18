import moment from 'moment';
import 'moment/locale/es-us'; //us para dejar Mayusculas y am y pm
moment.locale('es-us');



export const prepareEvents = ( events = []) => {
    //console.log(events);

    return events.map( //traer el todo y convertir las fechas de string a date
        (e) => ({
            ...e,
            end: moment(e.end).toDate(),
            start: moment(e.start).toDate()
        })
    );
}