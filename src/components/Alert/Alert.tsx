import React from 'react';

interface AlertProps {
    text: string;
    className: string;
}

const Alert: React.FC<AlertProps> = ({ text, className }) => {
    return <div className={`alert ${className}`}>{text}</div>;
};

export default Alert;
