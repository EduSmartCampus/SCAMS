import { createContext, useContext } from "react";
import { useState } from 'react';

const ScheduleContext = createContext({
    isScheduleOpen: false,
    roomName: '',
    isEdit: false,
    selectedEvent: null,
    setIsScheduleOpen: () => {},
    setRoomName: () => {},
    toggleEdit: () => {},
    setSelectedEvent: () => {}
});

export const ScheduleProvider = ({ children }) => {
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const toggleSchedule = () => {
        setIsScheduleOpen((prev) => !prev);
    };

    const changeRoomName = (name) => {
        setRoomName(name);
    }

    const toggleEdit = () => {
        setIsEdit((prev) => !prev);
    }

    const valueCtx = {
        isScheduleOpen,
        roomName,
        isEdit,
        selectedEvent,
        toggleSchedule,
        changeRoomName,
        toggleEdit,
        setSelectedEvent
    };

    return (
        <ScheduleContext.Provider value={valueCtx}>
            {children}
        </ScheduleContext.Provider>
    );
}

export const useSchedule = () => {
    return useContext(ScheduleContext);
}