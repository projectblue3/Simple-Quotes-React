import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

//components
import NewQuote from '../NewQuote/NewQuote';

const Nav = (props) => {
    //states
    const [newQuoteDisplay, setNewQuoteDisplay] = useState(false);

    //handlers
    function handleCancel() {
        setNewQuoteDisplay(false);
    }

    //jsx
    return (
        <nav className="site-nav">
            <h1 className="site-title">Simple Quotes</h1>
            <div className="nav-links">
                <Link to="/" className="nav-link">
                    Home
                </Link>

                <Link to="/quotes" className="nav-link">
                    Quotes
                </Link>

                <button
                    className="nav-link new-quote-link"
                    type="button"
                    onClick={() => setNewQuoteDisplay(true)}
                >
                    New Quote
                </button>

                {newQuoteDisplay && (
                    <div className="new-quote-container">
                        <NewQuote onCancel={handleCancel} />
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Nav;
