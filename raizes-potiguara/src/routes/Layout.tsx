import Footer from '@/components/general/Footer';
import { Outlet } from 'react-router';
import { Toaster } from "@/components/ui/toaster";

export default function Layout() {
    return (
        <>
            {/*<Header />*/}
            <Outlet />
            <Footer />
            <Toaster />
        </>
    );
}
