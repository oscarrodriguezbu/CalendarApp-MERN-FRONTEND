import React from 'react';

export const CalendarEvent = ({event}) => {


    const { title, user } = event;

    const {name} = user;
    //console.log(name);

    return (
        <div className="evento">
            <strong> {title} </strong>
            <span>{name} </span>
        </div>
    )
}
