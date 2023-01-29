import React, { createContext, useContext, useEffect, useReducer, useState } from "react";

export const CurrentUserContext = createContext();

export const currentUserReducer = (state, action) => {
    switch (action.type) {
        case 'PATIENT':
            return { patient: action.payload }
        case 'DOCTOR':
            return { doctor: action.payload }
        default:
            return state
    }
}

export const CurrentUserProvider = ({ children }) => {

    const [state, dispatch] = useReducer(currentUserReducer, {
        patient: null,
        doctor: null
    })

    useEffect(() => {
        const patient = JSON.parse(localStorage.getItem('patient'));
        if (patient) {
            dispatch({ type: 'PATIENT', payload: patient })
        }

        const doctor = JSON.parse(localStorage.getItem('doctor'));
        if (doctor) {
            dispatch({ type: 'DOCTOR', payload: doctor })
        }
        console.log(patient);
    }, [])

    return (
        <CurrentUserContext.Provider value={{ ...state, dispatch }}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export const CurrentUser = () => {
    return useContext(CurrentUserContext);
}