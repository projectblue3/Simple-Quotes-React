import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Nav.css';

//components
import NewQuote from '../NewQuote/NewQuote';
import NewAuthor from '../NewAuthor/NewAuthor';
import Popup from '../Popup/Popup';

const Nav = (props) => {
    //states
    const [newQuoteDisplay, setNewQuoteDisplay] = useState(false);
    const [newAuthorDisplay, setNewAuthorDisplay] = useState(false);
    const [searchText, setSearchText] = useState('');

    //history
    let navigate = useNavigate();

    //handlers
    function handleCancel() {
        setNewQuoteDisplay(false);
        setNewAuthorDisplay(false);
    }

    function searchHandler(e) {
        e.preventDefault();
        navigate(`/search?q=${searchText}`, { replace: true });
    }

    //jsx
    return (
        <nav id="site-nav">
            <div id="nav-links">
                <Link to="/" className="nav-link">
                    <h1 id="nav-title">Simple Quotes</h1>
                </Link>

                <Link to="/" className="nav-link small">
                    Home
                </Link>

                <Link to="/quotes" className="nav-link small">
                    Quotes
                </Link>

                <Link to="/authors" className="nav-link small">
                    Authors
                </Link>

                <Link to="#" className="nav-link small new-item-link" onClick={() => setNewQuoteDisplay(true)}>
                    New Quote
                </Link>

                <Link to="#" className="nav-link small new-item-link" onClick={() => setNewAuthorDisplay(true)}>
                    New Author
                </Link>
            </div>

            <div id="nav-search">
                <form onSubmit={searchHandler} className="search-form">
                    <input
                        type="search"
                        id="search-input"
                        className="search-box"
                        placeholder="Search"
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                    />
                </form>
            </div>

            {newQuoteDisplay && <Popup content={<NewQuote onCancel={handleCancel} />} onCancel={handleCancel} />}

            {newAuthorDisplay && <Popup content={<NewAuthor onCancel={handleCancel} />} onCancel={handleCancel} />}
        </nav>
    );
};

export default Nav;
