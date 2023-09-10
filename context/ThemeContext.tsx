'use client';

import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext<any>(null);
export const ThemeProvider = ({ children }: any) => {
    const [mode, setMode] = useState('dark');

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('dark', 'light');
        root.classList.add(mode);
    }, [mode]);

    const toggleHandler = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ toggleHandler, mode }}>
            <div className={`theme ${mode === 'dark' ? 'dark' : 'light'}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};
