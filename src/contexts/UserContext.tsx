import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
    initialUser: any;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, initialUser }) => {
    const [user, setUser] = useState(initialUser);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}