import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import loadGif from '../../icons/640px-Loader.gif';
import './DisplayQuotes.css';

//Components
import EditQuote from '../EditQuote/EditQuote';
import Popup from '../Popup/Popup';

const DisplayQuotes = (props) => {
    //states
    const [quotes, setQuotes] = useState([]);
    const [editDisplay, setEditDisplay] = useState(false);
    const [quoteToEdit, setQuoteToEdit] = useState({});
    const [contentLoaded, setContentLoaded] = useState(false);

    //hooks
    //grab all quotes from api
    useEffect(() => {
        (async function () {
            try {
                const { data } = await axios.get(props.url);
                setQuotes(data);
                setContentLoaded(true);
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
    }, [props.url]);

    //handlers
    function handleCancel() {
        setEditDisplay(false);
    }

    function handleEdit(quote) {
        setQuoteToEdit(quote);
        setEditDisplay(true);
    }

    //jsx
    return (
        <div>
            {contentLoaded === false ? (
                <div className="load-container">
                    <img src={loadGif} alt="loading..." className="loading-icon" />
                </div>
            ) : (
                <div className="quotes-container">
                    {!quotes.length > 0 && <h3 className="big-home-heading">No Quotes</h3>}
                    {quotes.map((q) => {
                        return (
                            <div className="quotes-item" key={q.id}>
                                <div className="item-group quote-edit">
                                    <button className="edit-button form-button" onClick={() => handleEdit(q)}>
                                        Edit
                                    </button>
                                </div>

                                <div className="item-group">
                                    <p className="quote-text">{q.text}</p>
                                </div>

                                {q.authorId ? (
                                    <div className="item-group">
                                        <Link to={`/author/${q.authorId}`} className="author-name">
                                            {q.authorName}
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="item-group">
                                        <p className="author-name">{q.authorName}</p>
                                    </div>
                                )}

                                {q.isFeatured && (
                                    <div className="item-group">
                                        <span className="featured-text">Featured Quote</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {editDisplay && (
                        <div className="edit-container">
                            <Popup
                                content={<EditQuote onCancel={handleCancel} quote={quoteToEdit} />}
                                onCancel={handleCancel}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DisplayQuotes;
