import User from "~/JsonModels/JsonUser";
import Employee from "~/JsonModels/JsonEmployee";
import { createContext, useContext } from "react";


type ServerContextType = {
    user?: User,
    employee?: Employee,
};

const ServerContext = createContext<ServerContextType>({});

export const ServerContextProvider = ({ children, context }) => {
    return (
        <ServerContext.Provider value={{
            ...context
        }}>
            {children}
        </ServerContext.Provider>
    )
};
export const useServerContext = () => useContext(ServerContext);


