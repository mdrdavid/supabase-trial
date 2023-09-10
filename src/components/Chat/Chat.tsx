'use client';
import { useState } from 'react';

export const Chat = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputValue.trim() !== '') {
            setMessages((prevMessages) => [...prevMessages, inputValue]);
            setInputValue('');
        }
    };

    return (
        <div className="p-4 border border-gray-300 rounded-lg">
            <div className="mb-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className="bg-gray-100 p-2 mb-2 rounded-lg"
                    >
                        {message}
                    </div>
                ))}
            </div>
            <form onSubmit={handleFormSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-2 py-1"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded px-4 py-2"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;
