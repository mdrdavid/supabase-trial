'use client';
import Link from 'next/link';

import { links } from '@/constants/links';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import Button from '../Button/Button';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import LogoutButton from '../LogoutButton/LogoutButton';

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { mode } = useContext(ThemeContext);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div
            className={`sticky top-0 inset-0 z-40 flex flex-row justify-between items-center w-full p-10 ${
                mode === 'dark'
                    ? 'bg-gray-600 text-white'
                    : 'bg-white text-[#111]'
            }`}
        >
            {!menuOpen && (
                <Link
                    href="/"
                    className={`text-[20px] font-bold text-${
                        mode === 'dark' ? ' text-white' : '#111'
                    }`}
                >
                    New Heritage
                </Link>
            )}
            <div className="flex gap-[10px] items-center">
                <button
                    className="text-white sm:hidden"
                    onClick={toggleMenu}
                    aria-expanded={menuOpen}
                    aria-label="Toggle navigation menu"
                >
                    <svg
                        className="w-6 h-6 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        {menuOpen ? (
                            <path d="M19 15H5v-2h14v2zm0-6H5V7h14v2zm0-6H5V1h14v2z" />
                        ) : (
                            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                        )}
                    </svg>
                </button>
                <div
                    className={`flex flex-col sm:flex-row gap-4 sm:gap-10 ${
                        menuOpen ? 'block' : 'hidden'
                    } sm:flex`}
                >
                    <div className="flex flex-col sm:flex-row gap-[10px] items-center">
                        <DarkModeToggle />
                        {links.map((link) => (
                            <Link
                                key={link.id}
                                href={link.url}
                                className={`text-${
                                    mode === 'dark' ? '#bbb' : '#111'
                                }`}
                            >
                                {link.title}
                            </Link>
                        ))}
                        <Button url="/donations" text="Make a Donation" />
                    </div>
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
}

export default NavBar;
