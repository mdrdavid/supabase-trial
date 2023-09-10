import Image from 'next/image';
import React from 'react';
import whatsapp from '../../../public/whatsapp.svg';

type Props = {
    phone: string;
    message: string;
};

const WhatsAppButton: React.FC<Props> = ({ phone, message }) => {
    const link = `https://wa.me/${phone}`;

    const buttonStyle = {
        backgroundColor: '#25D366',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10px',
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[50px] h-[50px] md:w-[80px] md:h-[80px]"
                style={Object.assign({}, buttonStyle, {
                    borderRadius: '50%',
                })}
            >
                <Image
                    src={whatsapp}
                    alt="WhatsApp logo"
                    className="w-8 h-8 md:w-12 md:h-12 animate-pulse ripple"
                    style={{ borderRadius: '30%' }}
                />
                {message}
            </a>
        </div>
    );
};

export default WhatsAppButton;
