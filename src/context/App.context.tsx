import {apiProvider} from "../types";
import {createContext, ReactNode} from "react";

export interface IAppContext {
    contract: any
    provider: apiProvider
}

export const AppContext = createContext<IAppContext>({
    contract: null,
    provider: null
})

export const AppContextProvider = ({ contract, provider, children }: IAppContext & { children: ReactNode }): JSX.Element => {
    return (
        <AppContext.Provider value={{
            contract,
            provider
        }}>
            {children}
        </AppContext.Provider>
    )
}