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
        <div className="search-page">
            <Nav />
            <h2 className="page-title">Search Results For: {searchParams.get('q')}</h2>
            <DisplayQuotes url={`/api/quotes/?searchterms=${searchParams.get('q')}`} />
            <Footer />
        </div>
    );
};

export default SearchResults;
