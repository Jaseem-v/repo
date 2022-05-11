// import { createContext, FC, useState } from 'react';


// export type CompanyContextType = {
//     is: boolean,
//     setIs: React.Dispatch<React.SetStateAction<boolean>>
// }

// export const CompanyContext = createContext<CompanyContextType | object>({});

// export const CompanyContextProvider: FC = ({ children }) => {
//     const [is, setIs] = useState<boolean>(false)

//     return (
//         <CompanyContext.Provider value={{ is, setIs }} >
//             {children}
//         </CompanyContext.Provider>

//     )
// }

// context/todoContext.tsx
import * as React from 'react';
// import { TodoContextType, ITodo } from '../@types/todo';

export type CompanyContextType = {
    isEdit: boolean,
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
};

export const CompanyContext = React.createContext<CompanyContextType | null>(null);

const CompanyContextProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [isEdit, setIsEdit] = React.useState<boolean>(true);

    return <CompanyContext.Provider value={{ isEdit, setIsEdit }}>{children}</CompanyContext.Provider>;
};

export default CompanyContextProvider;