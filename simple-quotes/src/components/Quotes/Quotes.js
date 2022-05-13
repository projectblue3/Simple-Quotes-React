import React, { useEffect } from 'react';
import './Quotes.css';

//Components
import Nav from '../Nav/Nav';
import DisplayQuotes from '../DisplayQuotes/DisplayQuotes';
import Footer from '../Footer/Footer';

const Quotes = (props) => {
    //Change Tab Title
    useEffect(() => {
        document.title = 'All Quotes - Simple Quotes';
    }, []);

    //jsx
    return (
        <div className="comp-parent" id="quotes-page">
            <header className="page-header">
                <Nav />
            </header>

            <main className="quotes-main">
                <div className="page-content" id="quotes-content">
                    <h2 className="big-home-heading">All Quotes</h2>
                    <p className="page-description">
                        Feel free to read and share some amazing quotes that motivate, inspire, and teach.
                    </p>
                    <DisplayQuotes url={`${process.env.REACT_APP_API_URL}/api/quotes`} />
                </div>
            </main>

            <footer className="page-footer">
                <Footer />
            </footer>
        </div>
    );
};

export default Quotes;
