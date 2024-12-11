'use client'

import React, { useContext, useState, createContext, ReactNode } from 'react';


type LogInContextType = {
    loggedInStatus: null|boolean;
    setLoggedInStatus: React.Dispatch<React.SetStateAction<null|boolean>>;
}

const LogInContext = createContext<LogInContextType | undefined>(undefined);


export function useLogInStatus() {
    const context = useContext(LogInContext);
    if (!context) {
        throw new Error('useLogInStatus must be used within a LoggedInContextProvider');
    }
    return context;
}



export function LoggedInContextProvider({ children }: {children: ReactNode}) {
    const [loggedInStatus, setLoggedInStatus] = useState<null|boolean>(null);

    return (
        <LogInContext.Provider value={{ loggedInStatus, setLoggedInStatus }}>
            {children}
        </LogInContext.Provider>
    );
}
