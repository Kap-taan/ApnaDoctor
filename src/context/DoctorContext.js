import React, { createContext, useReducer, useContext } from "react";

export const DoctorContext = createContext();

export const doctorReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return { doctor: action.payload.id, doctorName: action.payload.name }
        case 'REMOVE':
            return { doctor: null, doctorName: null }
        default:
            return state
    }
}

export const DoctorContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(doctorReducer, {
        doctor: null,
        doctorName: null
    })

    return (
        <DoctorContext.Provider value={{ ...state, dispatch }}>
            {children}
        </DoctorContext.Provider>
    );
}

export const SelectedDoctor = () => {
    return useContext(DoctorContext);
}