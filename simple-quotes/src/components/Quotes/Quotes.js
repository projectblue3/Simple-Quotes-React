import React from 'react';

//Components
import Nav from '../Nav/Nav';
import DisplayQuotes from '../DisplayQuotes/DisplayQuotes';
import Footer from '../Footer/Footer';

const Quotes = (props) => {
    //jsx
    return (
        <div className="quotes-page">
            <Nav />
            <h2 className="quotes-title">All Quotes</h2>
            <p className="quotes-description">
                Feel free to read and share some amazing quotes that motivate, inspire, and teach.
            </p>
            <DisplayQuotes url={'/api/quotes'} />
            <Footer />
        </div>
    );
};

export default Quotes;
