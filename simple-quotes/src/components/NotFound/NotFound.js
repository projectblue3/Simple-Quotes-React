import React from 'react';
import './NotFound.css';
import notfoundlogo from '../../icons/notfoundlogo.png';

//Components
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

const NotFound = (props) => {
    return (
        <div className="comp-parent" id="notfound-page">
            <header className="page-header">
                <Nav />
            </header>

            <main className="notfound-main">
                <div className="page-content" id="notfound-content">
                    <h2 className="big-home-heading">404 Not Found</h2>
                    <img className="not-found-logo" src={notfoundlogo} alt="Not Found Logo" />
                </div>
            </main>

            <footer className="page-footer">
                <Footer />
            </footer>
        </div>
    );
};

export default NotFound;
