import React, { createContext, useContext } from 'react';
import { AuthSession } from '../types/index.js';
import { useAuth } from '../hooks/useAuth.js';

interface AuthContextType {
    session: AuthSession | null;
    loading: boolean;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
    bypassLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const auth = useAuth();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
