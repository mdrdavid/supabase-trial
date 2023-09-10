interface CardProps {
    icon: string;
    title: string;
    text: string;
}
export const Card: React.FC<CardProps> = ({ icon, title, text }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg">
            <div className="flex items-center justify-center h-16">
                <span className={`icon ${icon}`} />
            </div>
            <div className="flex justify-center align-center text-center">
                <h1 className="text-lg font-bold mb-2 ">{title}</h1>
            </div>
            <p className="">{text}</p>
        </div>
    );
};
