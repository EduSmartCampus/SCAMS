import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filter, setFilter] = useState({
        building: "",
        floor: "",
    });

    const applyFilter = (building, floor) => {
        if (building === "" | floor === "") {
            toast.warning("Please select a building and floor")
            return;
        }

        setFilter({
            building: building,
            floor: floor,
        });
    }

    const clearFilter = () => {
        setFilter({
            building: "",
            floor: "",
        })
    }

    const ctxValue = {
        filter,
        applyFilter,
        clearFilter
    }

    return (
        <FilterContext.Provider value={ctxValue}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilter = () => {
    return useContext(FilterContext);
}