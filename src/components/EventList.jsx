import React from 'react';
import EventItem from './EventItem';

const EventList = ({ events, onRemoveEvent, onCompleteEvent }) => {
    return (
        <ul>
            {events.map(event => (
                <EventItem 
                    key={event.id} 
                    event={event} 
                    onRemoveEvent={onRemoveEvent} 
                    onCompleteEvent={onCompleteEvent} 
                />
            ))}
        </ul>
    );
};

export default EventList;