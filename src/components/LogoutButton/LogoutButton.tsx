import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';

const supabase = createClientComponentClient({
    supabaseUrl: 'https://qmixtxydxviqyjplvbit.supabase.co',
    supabaseKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaXh0eHlkeHZpcXlqcGx2Yml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5MTYzODgsImV4cCI6MjAwOTQ5MjM4OH0.p4xR4FxOFAgnFvDHCPT8vwyloZA56EqKuuE4kF0pAck',
});
const LogoutButton = () => {
    // const router = useRouter();
    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            // Redirect to the login page
            // router.push('/login');
            window.location.href = '/login';
            console.log('Logged out');
        } catch (error: any) {
            console.error('Error logging out:', error.message);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="text-indigo-600 hover:text-indigo-500 cursor-pointer"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
