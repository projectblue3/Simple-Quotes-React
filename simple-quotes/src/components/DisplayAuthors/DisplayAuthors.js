import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import loadGif from '../../icons/640px-Loader.gif';
import './DisplayAuthors.css';

const DisplayAuthors = (props) => {
    //states
    const [authors, setAuthors] = useState([]);
    const [contentLoaded, setContentLoaded] = useState(false);

    //hooks
    useEffect(() => {
        (async function () {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/authors`);
                setAuthors(data);
                setContentLoaded(true);
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            }
        })();
    }, []);

    //jsx
    return (
        <div>
            {contentLoaded === false ? (
                <div className="load-container">
                    <img src={loadGif} alt="loading..." className="loading-icon" />
                </div>
            ) : (
                <div className="authors-container">
                    {!authors.length > 0 && <h3 className="big-home-heading">No Authors</h3>}
                    {authors.map((a) => {
                        return (
                            <div className="authors-item" key={a.id}>
                                <div className="item-group">
                                    <Link className="author-name" to={`/author/${a.id}`}>
                                        {a.name}
                                    </Link>
                                </div>

                                <div className="item-group">
                                    {a.isFeatured && <span className="featured-text">Featured Author</span>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default DisplayAuthors;
