import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery, useQueryClient } from 'react-query';

// Create a single supabase client for interacting with your database
const supabase = createClientComponentClient({
    supabaseUrl: 'https://qmixtxydxviqyjplvbit.supabase.co',
    supabaseKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaXh0eHlkeHZpcXlqcGx2Yml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5MTYzODgsImV4cCI6MjAwOTQ5MjM4OH0.p4xR4FxOFAgnFvDHCPT8vwyloZA56EqKuuE4kF0pAck',
});

export function useAuth() {
    const queryClient = useQueryClient();

    // Function to get the current user
    const getCurrentUser = async () => {
        const user = supabase.auth.getUser;
        return user;
    };

    const { data: user, isLoading: isUserLoading } = useQuery(
        'currentUser',
        getCurrentUser
    );

    // Function to sign up
    const signUp = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        return user;
    };

    // Function to sign in
    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return user;
    };

    // Function to sign out
    const signOut = async () => {
        await supabase.auth.signOut();
        queryClient.invalidateQueries('currentUser');
    };
    const validateEmail = (str: string) => {
        if (!str) return false;
        const pattern =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(str);
    };

    return {
        user,
        isUserLoading,
        signUp,
        signIn,
        signOut,
        validateEmail,
    };
}
