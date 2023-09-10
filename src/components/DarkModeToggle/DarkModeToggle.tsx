'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
function DarkModeToggle() {
    const { toggleHandler, mode } = useContext(ThemeContext);
    return (
        <div
            className="relative flex flex-row justify-between items-center w-[42px] h-[24px] border-[1.5px] rounded-[30px] p-2 cursor-pointer"
            onClick={toggleHandler}
        >
            <div>
                <MoonIcon className="h-4 w-4 text-blue-500 text-[12px]" />
            </div>
            <div>
                <SunIcon className="w-4 h-4 text-yellow-500 text-12px" />
            </div>
            <div
                className={`w-[15px] h-[15px] rounded-full absolute bg-green-400 ${
                    mode === 'dark' ? 'right-4' : 'left-4'
                }`}
            />
        </div>
    );
}

export default DarkModeToggle;
