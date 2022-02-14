import React from 'react';

//Components
import Nav from '../Nav/Nav';
import DisplayQuotes from '../DisplayQuotes/DisplayQuotes';
import Footer from '../Footer/Footer';

const Quotes = (props) => {
    //jsx
    return (
        <div className="main-page" id="quotes-page">
            <header className="page-header">
                <Nav />
            </header>

            <main className="page-main">
                <div className="page-content" id="quotes-content">
                    <h2 className="big-home-heading">All Quotes</h2>
                    <p className="page-description">
                        Feel free to read and share some amazing quotes that motivate, inspire, and teach.
                    </p>
                    <DisplayQuotes url={'/api/quotes'} />
                </div>
            </main>

            <footer className="page-footer">
                <Footer />
            </footer>
        </div>
    );
};

export default Quotes;
