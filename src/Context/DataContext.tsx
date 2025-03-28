'use client'

import { createContext, useContext, useState } from "react";

interface DataInterface {
    name: string
    setName: (pkmnName: string) => void
}

const PkmnContext = createContext<DataInterface>({
    name: '',
    setName: (pkmnName) => ''
});

export function AppWrapper({ children }: { children: React.ReactNode }){
    const [name, setName] = useState('');

    return(
        <PkmnContext.Provider value={ { name, setName } }>
            {children}
        </PkmnContext.Provider>
    )
}

export function usePkmncontext() {
    return useContext(PkmnContext);
}