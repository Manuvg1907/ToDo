import React, { useState } from 'react';

const EventForm = ({ addEvent }) => {
    const [eventName, setEventName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (eventName.trim()) {
            addEvent(eventName);
            setEventName('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Add new event"
            />
            <button type="submit">Add Event</button>
        </form>
    );
};

export default EventForm;