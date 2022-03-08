import React from 'react';
import './Authors.css';

//Components
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import DisplayAuthors from '../DisplayAuthors/DisplayAuthors';

//jsx
const Authors = (props) => {
    return (
        <div className="comp-parent" id="authors-page">
            <header className="page-header">
                <Nav />
            </header>
            <main className="authors-main">
                <div className="page-content" id="authors-content">
                    <h2 className="big-home-heading">All Authors</h2>
                    <p className="page-description">View all our lovely authors.</p>
                    <DisplayAuthors />
                </div>
            </main>

            <footer className="page-footer">
                <Footer />
            </footer>
        </div>
    );
};

export default Authors;
