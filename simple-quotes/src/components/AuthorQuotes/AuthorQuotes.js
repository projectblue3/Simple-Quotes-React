import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

//Components
import Nav from '../Nav/Nav';
import DisplayQuotes from '../DisplayQuotes/DisplayQuotes';
import EditAuthor from '../EditAuthor/EditAuthor';
import Footer from '../Footer/Footer';

const AuthorQuotes = (props) => {
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

    //handlers
    function handleCancel() {
        setEditAuthorDisplay(false);
    }

    function handleEdit() {
        setEditAuthorDisplay(true);
    }

    //jsx
    return (
        <div className="author-quotes-page">
            <Nav />
            <h2 className="quotes-title">{author.name}'s Quotes</h2>

            {author.isFeatured && <span className="featured-text">Featured Author</span>}

            <button className="edit-button" onClick={() => handleEdit()}>
                Edit Author
            </button>

            <div className="author-details">
                <p className="author-dates">
                    Date Of Birth:
                    <span className="date-text"> {author.dateOfBirth}</span>
                </p>
                {author.dateOfDeath && (
                    <p className="author-dates">
                        Date Of Death:
                        <span className="date-text"> {author.dateOfDeath}</span>
                    </p>
                )}
                <p className="author-info">
                    Occupation:
                    <span className="info-text"> {author.occupation}</span>
                </p>
                <p className="author-info">
                    Biography:
                    <span className="info-text"> {author.bio}</span>
                </p>
            </div>
            <DisplayQuotes url={`/api/authors/${params.id}/quotes`} />

            {editAuthorDisplay && (
                <div className="edit-container">
                    <EditAuthor onCancel={handleCancel} author={author} />
                </div>
            )}

            <Footer />
        </div>
    );
};

export default AuthorQuotes;
