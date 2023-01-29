import React from 'react';
import Features from './Features';
import Main from './Main';
import Navbar from './Navbar';
import Sequence from './Sequence';
import Stats from './Stats';
import Team from './Team';
import Footer from './Footer';

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <Main />
            <Sequence />
            <Features />
            <Team />
            <Stats />
            <Footer />
        </div>
    )
}

export default HomePage;