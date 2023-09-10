const Programs: React.FC = () => {
    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center text-[#00325a]">
                Our Programs
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card
                    icon="icon-1"
                    title="Education"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                />
                <Card
                    icon="icon-2"
                    title="Vocational Skills"
                    text="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
                <Card
                    icon="icon-3"
                    title="Health"
                    text="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
                />
                <Card
                    icon="icon-4"
                    title="Family Empowerment"
                    text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum."
                />
                <Card
                    icon="icon-5"
                    title="Human Rights"
                    text="Excepteur sint occaecat cupidatat non proident, sunt in culpa qui."
                />
                <Card
                    icon="icon-6"
                    title="Talent Growth"
                    text="Officia deserunt mollit anim id est laborum."
                />
            </div>
        </div>
    );
};

interface CardProps {
    icon: string;
    title: string;
    text: string;
}

const Card: React.FC<CardProps> = ({ icon, title, text }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg">
            <div className="flex items-center justify-center h-16">
                <span className={`icon ${icon}`} />
            </div>
            <h1 className="text-lg font-bold mb-2">{title}</h1>
            <p>{text}</p>
        </div>
    );
};

export default Programs;
