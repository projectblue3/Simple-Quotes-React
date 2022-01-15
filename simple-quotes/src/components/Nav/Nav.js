import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

//components
import NewQuote from '../NewQuote/NewQuote';
import NewAuthor from '../NewAuthor/NewAuthor';

const Nav = (props) => {
    //states
    const [newQuoteDisplay, setNewQuoteDisplay] = useState(false);
    const [newAuthorDisplay, setNewAuthorDisplay] = useState(false);

    //handlers
    function handleCancel() {
        setNewQuoteDisplay(false);
        setNewAuthorDisplay(false);
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

                <Link to="/authors" className="nav-link">
                    Authors
                </Link>

                <button
                    className="nav-link new-quote-link"
                    type="button"
                    onClick={() => setNewQuoteDisplay(true)}
                >
                    New Quote
                </button>

                <button
                    className="nav-link new-quote-link"
                    type="button"
                    onClick={() => setNewAuthorDisplay(true)}
                >
                    New Author
                </button>

                {newQuoteDisplay && (
                    <div className="new-item-container">
                        <NewQuote onCancel={handleCancel} />
                    </div>
                )}

                {newAuthorDisplay && (
                    <div className="new-item-container">
                        <NewAuthor onCancel={handleCancel} />
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Nav;
