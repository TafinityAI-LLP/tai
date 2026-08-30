import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;
