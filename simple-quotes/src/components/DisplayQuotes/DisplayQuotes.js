import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//Components
import EditQuote from '../EditQuote/EditQuote';

const DisplayQuotes = (props) => {
    //states
    const [quotes, setQuotes] = useState([]);
    const [editDisplay, setEditDisplay] = useState(false);
    const [quoteToEdit, setQuoteToEdit] = useState({});

    //hooks
    //grab all quotes from api
    useEffect(() => {
        (async function () {
            try {
                const { data } = await axios.get(props.url);
                setQuotes(data);
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
        setEditDisplay(false);
    }

    function handleEdit(quote) {
        setQuoteToEdit(quote);
        setEditDisplay(true);
    }

    //jsx
    return (
        <div className="quotes-container">
            {quotes.map((q) => {
                return (
                    <div className="quotes-item" key={q.id}>
                        <p className="quote-text">{q.text}</p>

                        {q.authorId ? (
                            <Link to={`/author/${q.authorId}`} className="author-name">
                                {q.authorName}
                            </Link>
                        ) : (
                            <p className="author-name">{q.authorName}</p>
                        )}

                        <button className="edit-button" onClick={() => handleEdit(q)}>
                            Edit Quote
                        </button>
                    </div>
                );
            })}

            {editDisplay && (
                <div className="edit-container">
                    <EditQuote onCancel={handleCancel} quote={quoteToEdit} />
                </div>
            )}
        </div>
    );
};

export default DisplayQuotes;
