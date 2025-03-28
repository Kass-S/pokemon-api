'use client'

import { createContext, useContext, useState } from "react";

interface DataInterface {
    fav: string
    setFav: (pkmnName: string) => void
}

const PkmnContext = createContext<DataInterface>({
    fav: '',
    setFav: () => ''
});

export function AppWrapper({ children }: { children: React.ReactNode }){
    const [fav, setFav] = useState<string>('');

    return(
        <PkmnContext.Provider value={ { fav, setFav } }>
            {children}
        </PkmnContext.Provider>
    )
}

export function usePkmncontext() {
    return useContext(PkmnContext);
}