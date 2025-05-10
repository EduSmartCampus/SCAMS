import { createContext, useContext } from "react";
import { useState } from 'react';

const ScheduleContext = createContext({
    isScheduleOpen: false,
    roomName: '',
    setIsScheduleOpen: () => {},
    setRoomName: () => {}
});

export const ScheduleProvider = ({ children }) => {
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);
    const [roomName, setRoomName] = useState('');

    const toggleSchedule = () => {
        setIsScheduleOpen((prev) => !prev);
    };

    const changeRoomName = (name) => {
        setRoomName(name);
    }

    const valueCtx = {
        isScheduleOpen,
        roomName,
        toggleSchedule,
        changeRoomName
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