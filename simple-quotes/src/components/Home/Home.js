import React, { useState, useEffect } from 'react';
import Footer from '../Footer/Footer';

//Components
import Nav from '../Nav/Nav';

const Home = (props) => {
    return (
        <div>
            <Nav />
            <h2>This is the homepage</h2>
            <Footer />
        </div>
    );
};

export default Home;
