import React from 'react';

//Components
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

const NotFound = (props) => {
    return (
        <div className="404-page">
            <Nav />
            <div className="404-content">
                <h2>404 Not Found</h2>
                <p>Maybe add some picture here</p>
            </div>
            <Footer />
        </div>
    );
};

export default NotFound;
