import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingActions from './FloatingActions';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                {children}
            </main>
            <FloatingActions />
            <Footer />
        </>
    );
};

export default Layout;
