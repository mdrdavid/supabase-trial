import Head from 'next/head';

export default function LayoutComponent({ children }: any) {
    return (
        <>
            <Head>
                <title>Client List</title>
                <meta name="description" content="Client List from Supabase" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-gray-100 min-h-screen">
                <main>{children}</main>
            </div>
        </>
    );
}
