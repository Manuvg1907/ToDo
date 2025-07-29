import React from 'react';

const EventItem = ({ event, onComplete, onRemove }) => {
    return (
        <div className={`event-item ${event.completed ? 'completed' : ''}`}>
            <h3>{event.title}</h3>
            <p>{event.date}</p>
            <button onClick={() => onComplete(event.id)}>
                {event.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => onRemove(event.id)}>Remove</button>
        </div>
    );
};

export default EventItem;