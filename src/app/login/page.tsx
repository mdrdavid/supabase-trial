'use client';
import Login from '@/components/Login/Login';

const SignIn = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 w-full px-4 p-[clamp(8vh,12vh,6vh)]">
            <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <Login />
            </div>
        </div>
    );
};

export default SignIn;
