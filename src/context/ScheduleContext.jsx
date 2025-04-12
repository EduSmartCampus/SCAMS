import { createContext, useContext } from "react";
import { useState } from 'react';

const ScheduleContext = createContext({
    isScheduleOpen: false,
    setIsScheduleOpen: () => {}
});

export const ScheduleProvider = ({ children }) => {
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);

    const toggleSchedule = () => {
        setIsScheduleOpen((prev) => !prev);
    };

    const valueCtx = {
        isScheduleOpen,
        toggleSchedule
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