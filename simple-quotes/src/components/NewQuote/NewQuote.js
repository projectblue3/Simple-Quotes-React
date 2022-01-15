import axios from 'axios';
import React, { useState, useEffect } from 'react';

const NewQuote = (props) => {
    //states
    const [authors, setAuthors] = useState([]);
    const [quoteText, setQuoteText] = useState('');
    const [authorSelected, setAuthorSelected] = useState(0);

    //get all authors
    useEffect(() => {
        (async function () {
            try {
                const { data } = await axios.get('/api/authors');
                setAuthors(data);
                setAuthorSelected(data[0].id);
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

    //handle post requests
    const postHandler = async (e) => {
        e.preventDefault();

        try {
            const post = await axios.post('/api/quotes/', { authorId: authorSelected, text: quoteText });
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
        }
    };

    //jsx
    return (
        <div className="new-item-page">
            <form onSubmit={postHandler} className="new-item-form">
                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <select
                        name="author"
                        id="author-list"
                        tabIndex={1}
                        onChange={(e) => setAuthorSelected(parseInt(e.target.value))}
                    >
                        {authors.map((a) => {
                            return (
                                <option value={a.id} className="author-list-item" key={a.id}>
                                    {a.name}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="quote-text">Quote Text:</label>
                    <input
                        type="text"
                        required
                        id="quote-text"
                        placeholder="Enter Quote Text"
                        onChange={(e) => setQuoteText(e.target.value)}
                        value={quoteText}
                        tabIndex={2}
                    />
                    <button type="submit" className="submit-btn" tabIndex={3}>
                        Submit
                    </button>

                    <button className="cancel-button" type="button" onClick={props.onCancel} tabIndex={4}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewQuote;
