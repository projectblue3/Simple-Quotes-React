import axios from 'axios';
import React, { useState, useEffect } from 'react';
import autosize from 'autosize';
import { useNavigate } from 'react-router-dom';

const EditQuote = (props) => {
    //first render values
    const oldQuoteText = props.quote.text;
    const oldQuoteFeatured = props.quote.isFeatured;

    //states
    const [quoteText, setQuoteText] = useState(props.quote.text);
    const [quoteFeatured, setQuoteFeatured] = useState(props.quote.isFeatured);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorExists, setErrorExists] = useState(false);

    //history
    let navigate = useNavigate();

    //Enable autosize for textarea
    autosize(document.querySelector('textarea'));

    //handles patch requests
    const patchHandler = async (e) => {
        e.preventDefault();
        const patchData = [];

        if (oldQuoteText !== quoteText) {
            patchData.push({
                op: 'replace',
                path: '/text',
                value: quoteText,
            });
        }

        if (oldQuoteFeatured !== quoteFeatured) {
            patchData.push({
                op: 'replace',
                path: '/isFeatured',
                value: quoteFeatured,
            });
        }

        try {
            await axios.patch(`/api/quotes/${props.quote.id}`, patchData);
            navigate(`/quotes/`);
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.messages[0]);
                setErrorExists(true);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    };

    //handles delete requests
    const deleteHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`/api/quotes/${props.quote.id}`);
            navigate(`/quotes/`);
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.messages[0]);
                setErrorExists(true);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }
    };

    //clear error message on text change
    useEffect(() => {
        setErrorExists(false);
    }, [quoteText]);

    //handle quote featured checkbox
    function handleChecked() {
        setQuoteFeatured(!quoteFeatured);
    }

    //jsx
    return (
        <div className="edit-page">
            <h2 className="big-home-heading">Edit Quote</h2>
            <form onSubmit={patchHandler} className="item-form">
                <div className="form-group">
                    <textarea
                        type="text"
                        required
                        id="text"
                        className="form-text-box form-text-area"
                        onChange={(e) => setQuoteText(e.target.value)}
                        value={quoteText}
                        tabIndex={1}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="checkbox"
                        id="quoteIsFeatured"
                        className="featured-check"
                        checked={quoteFeatured}
                        onChange={handleChecked}
                    />
                    <label htmlFor="quoteIsFeatured">Featured</label>
                </div>

                <div className="form-group error-group">
                    {errorExists && <p className="error-text">{errorMessage}</p>}
                </div>

                <div className="form-group buttons-group">
                    <button type="submit" className="submit-button form-button" tabIndex={2}>
                        Submit
                    </button>

                    <button className="delete-button form-button" onClick={deleteHandler} tabIndex={3}>
                        Delete
                    </button>

                    <button
                        className="cancel-button form-button"
                        type="button"
                        onClick={props.onCancel}
                        tabIndex={4}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditQuote;
