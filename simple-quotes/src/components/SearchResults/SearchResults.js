import React from 'react';
import { useSearchParams } from 'react-router-dom';

//Components
import Nav from '../Nav/Nav';
import DisplayQuotes from '../DisplayQuotes/DisplayQuotes';
import Footer from '../Footer/Footer';

const SearchResults = (props) => {
    //Get query from url
    let [searchParams, setSearchParams] = useSearchParams();

    //jsx
    return (
        <div className="comp-parent" id="search-page">
            <header className="page-header">
                <Nav />
            </header>

            <main className="quotes-main">
                <div className="page-content" id="search-content">
                    <h2 className="big-home-heading">Search Results For: {searchParams.get('q')}</h2>
                    <DisplayQuotes url={`/api/quotes/?searchterms=${searchParams.get('q')}`} />
                </div>
            </main>

            <footer className="page-footer">
                <Footer />
            </footer>
        </div>
    );
};

export default SearchResults;
