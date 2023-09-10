'use client';
import Image from 'next/image';
import { useState } from 'react';

import Button from '@/components/Button/Button';
import hero from '../../../public/helo1.jpg';
import ngo6 from '../../../public/ngo6.jpg';
import styles from './contact.module.css';

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };
    return (
        <div className="container mx-auto w-full flex flex-col justify-between  text-white mt-10">
            <h1 className="text-[#bbb] text-center mb-[50px] text-[60px]">
                Let&apos;s keep in touch
            </h1>
            <div className="flex flex-row gap-[100px] align-center">
                <div className="flex-1 relative h-[500px]">
                    <Image
                        src={ngo6}
                        alt="helo"
                        className={`flex-1 relative h-[500px] ${styles.imageContainer}`}
                    />
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md mx-auto flex flex-col gap-[20px]"
                >
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-lg text-gray-800"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border-[1px] border-[#bbb] rounded text-[#bbb] text-[20px] font-light focus:outline-none focus:border-blue-500 bg-transparent"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-lg text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border-[1px] border-[#bbb] rounded text-[#bbb] text-[20px] font-light focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="message"
                            className="block mb-2 text-lg text-gray-800"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-4 py-2 border-[1px] border-[#bbb] rounded text-[#bbb] text-[20px] font-light focus:outline-none focus:border-blue-500 "
                            rows={4}
                            cols={30}
                        />
                    </div>
                    <Button url="#" text="Talk to us" />
                </form>
            </div>
        </div>
    );
}

export default Contact;
