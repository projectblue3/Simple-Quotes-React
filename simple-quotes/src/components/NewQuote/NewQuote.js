import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewQuote.css';

const NewQuote = (props) => {
    //states
    const [authors, setAuthors] = useState([]);
    const [quoteText, setQuoteText] = useState('');
    const [authorSelected, setAuthorSelected] = useState(0);
    const [quoteFeatured, setQuoteFeatured] = useState(false);

    //history
    let navigate = useNavigate();

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
        try {
            const quote = await axios.post('/api/quotes/', {
                authorId: authorSelected,
                text: quoteText,
                isFeatured: quoteFeatured,
            });
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

    //handle quote featured checkbox
    function handleChecked() {
        setQuoteFeatured(!quoteFeatured);
    }

    //jsx
    return (
        <div className="new-item-page">
            <h2 className="big-home-heading">New Quote</h2>
            <form onSubmit={postHandler} className="item-form">
                <div className="form-group">
                    <textarea
                        type="text"
                        required
                        id="quote-text"
                        rows={1}
                        className="form-text-box form-text-area"
                        placeholder="Quote"
                        onChange={(e) => setQuoteText(e.target.value)}
                        value={quoteText}
                        tabIndex={2}
                    />
                </div>

                <div className="form-group">
                    <select
                        name="author"
                        id="author-list"
                        className="form-text-box"
                        required
                        tabIndex={1}
                        onChange={(e) => setAuthorSelected(parseInt(e.target.value))}
                    >
                        <option value="" disabled selected>
                            Author
                        </option>
                        {authors.map((a) => {
                            return (
                                <option value={a.id} className="author-list-item" key={a.id}>
                                    {a.name}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="form-group featured-group">
                    <input type="checkbox" id="quoteIsFeaturedC" className="featured-check" checked={quoteFeatured} onChange={handleChecked} />
                    <label htmlFor="quoteIsFeaturedC">Featured?</label>
                </div>

                <div className="form-group buttons-group">
                    <button type="submit" className="submit-button form-button" tabIndex={3}>
                        Submit
                    </button>

                    <button className="cancel-button form-button" type="button" onClick={props.onCancel} tabIndex={4}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewQuote;
