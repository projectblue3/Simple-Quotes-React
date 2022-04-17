import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './AuthorQuotes.css';

//Components
import Nav from '../Nav/Nav';
import DisplayQuotes from '../DisplayQuotes/DisplayQuotes';
import EditAuthor from '../EditAuthor/EditAuthor';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';

const AuthorQuotes = (props) => {
    //navigate
    const navigate = useNavigate();

    //Get ID from URL
    const params = useParams();

    //states
    const [author, setAuthor] = useState({});
    const [editAuthorDisplay, setEditAuthorDisplay] = useState(false);

    //hooks
    //grab author info from api
    useEffect(() => {
        (async function () {
            try {
                const { data } = await axios.get(`/api/authors/${params.id}`);
                setAuthor(data);
            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);

                    if (error.response.status === 404) {
                        navigate('/404');
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            }
        })();
    }, []);

    //Change Tab Title
    useEffect(() => {
        document.title = `${author.name}'s Quotes - Simple Quotes`;
    }, [author]);

    //handlers
    function handleCancel() {
        setEditAuthorDisplay(false);
    }

    function handleEdit() {
        setEditAuthorDisplay(true);
    }

    //jsx
    return (
        <div className="comp-parent" id="author-quotes-page">
            <header className="page-header">
                <Nav />
            </header>

            <main className="author-quotes-main">
                <div className="page-content" id="author-quotes-content">
                    <h2 className="big-home-heading">
                        {author.name}'s Quotes{' '}
                        {author.isFeatured && <span className="featured-text">Featured Author</span>}
                    </h2>

                    <button className="edit-button form-button" onClick={() => handleEdit()}>
                        Edit
                    </button>

                    <div className="author-details">
                        <p className="author-info">
                            <h3 className="small-home-heading">Date Of Birth:</h3>
                            <span className="info-text"> {author.dateOfBirth}</span>
                        </p>
                        {author.dateOfDeath && (
                            <p className="author-info">
                                <h3 className="small-home-heading">Date Of Death:</h3>
                                <span className="info-text"> {author.dateOfDeath}</span>
                            </p>
                        )}
                        <p className="author-info">
                            <h3 className="small-home-heading">Occupation:</h3>
                            <span className="info-text"> {author.occupation}</span>
                        </p>
                        <p className="author-info">
                            <h3 className="small-home-heading">Biography:</h3>
                            <span className="info-text"> {author.bio}</span>
                        </p>
                    </div>
                    <DisplayQuotes url={`/api/authors/${params.id}/quotes`} />

                    {editAuthorDisplay && (
                        <div className="edit-container">
                            <Popup
                                content={<EditAuthor onCancel={handleCancel} author={author} />}
                                onCancel={handleCancel}
                            />
                        </div>
                    )}
                </div>
            </main>

            <footer className="page-footer">
                <Footer />
            </footer>
        </div>
    );
};

export default AuthorQuotes;
