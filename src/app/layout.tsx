import Footer from '@/components/Footer/Footer';
import NavBar from '@/components/NavBar/NavBar';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../../context/ThemeContext';
import './globals.css';
import WhatsAppButton from '@/components/WhatsUpButton/WhatsUpButton';
import { QueryClient, QueryClientProvider } from 'react-query';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

// Create a QueryClient instance
// const queryClient = new QueryClient();
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider>
                    {/* <QueryClientProvider client={queryClient}> */}
                    <div
                        className={`flex flex-col justify-between max-w-[1366px] min-h-[100vh] my-0 mx-auto py-0 px-[0px] ${inter.className}`}
                    >
                        <NavBar />
                        {children}
                        <div className="fixed bottom-0 right-0 mr-4 mb-4">
                            <WhatsAppButton phone="+256702629361" message="" />
                        </div>
                        <Footer />
                    </div>
                    {/* </QueryClientProvider> */}
                </ThemeProvider>
            </body>
        </html>
    );
}
