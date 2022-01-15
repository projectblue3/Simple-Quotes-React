import React from 'react';

//Components
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import DisplayAuthors from '../DisplayAuthors/DisplayAuthors';

//jsx
const Authors = (props) => {
    return (
        <div className="authors-page">
            <Nav />
            <h2 className="page-title">All Authors</h2>
            <p className="page-description">View all our lovely authors.</p>
            <DisplayAuthors />
            <Footer />
        </div>
    );
};

export default Authors;
