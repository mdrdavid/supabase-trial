'use client';
import { useState, useEffect } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import LayoutComponent from '@/components/LayoutComponent/LayoutComponent';

const supabase = createClientComponentClient({
    supabaseUrl: 'https://qmixtxydxviqyjplvbit.supabase.co',
    supabaseKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaXh0eHlkeHZpcXlqcGx2Yml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5MTYzODgsImV4cCI6MjAwOTQ5MjM4OH0.p4xR4FxOFAgnFvDHCPT8vwyloZA56EqKuuE4kF0pAck',
});

// Define the type for a client object
type Client = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    address: string;
};

export default function Clients() {
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        async function fetchClients() {
            try {
                const { data: clients, error } = await supabase
                    .from('clients')
                    .select('*');

                if (error) {
                    throw error;
                }
                if (clients) {
                    console.log(clients);
                }
                setClients(clients);
            } catch (error: any) {
                console.error('Error fetching clients:', error.message);
            }
        }

        fetchClients();
    }, []);

    // Function to fetch a file by ID
    const fetchClientById = async (id: number) => {
        try {
            const { data: client, error } = await supabase
                .from('clients')
                .select('*')
                .eq('id', id)
                .single(); // Use single() to fetch a single record

            if (error) {
                throw error;
            }

            return client;
        } catch (error: any) {
            console.error('Error fetching client by ID:', error.message);
        }
    };

    // Handle clicking on a file
    const handleClientClick = async (id: number) => {
        const client = await fetchClientById(id);
        if (client) {
            console.log('Client Data', client);
            // window.location.href = `/file/${file.id}`;

            // router.push(`/file/${file.id}`); // Assuming you have a route for file details
        }
    };

    return (
        <LayoutComponent>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-semibold mb-4">Clients</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {clients.map((client) => (
                        <div
                            key={client.id}
                            className="bg-white shadow-lg p-4 rounded-lg hover:shadow-xl transition duration-300"
                            onClick={() => handleClientClick(client.id)}
                        >
                            <h2 className="text-xl font-semibold mb-2">
                                {client.firstname} {client.lastname}
                            </h2>
                            <p className="text-gray-600">{client.email}</p>
                            <p className="text-gray-600">
                                {client.phonenumber}
                            </p>
                            <p className="text-gray-600">{client.address}</p>
                        </div>
                    ))}
                </div>
            </div>
        </LayoutComponent>
    );
}
