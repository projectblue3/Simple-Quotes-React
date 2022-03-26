import axios from 'axios';
import React, { useState } from 'react';

const EditQuote = (props) => {
    //first render values
    const oldQuoteText = props.quote.text;
    const oldQuoteFeatured = props.quote.isFeatured;

    //states
    const [quoteText, setQuoteText] = useState(props.quote.text);
    const [quoteFeatured, setQuoteFeatured] = useState(props.quote.isFeatured);

    //handles patch requests
    const patchHandler = async (e) => {
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
    };

    //handles delete requests
    const deleteHandler = async (e) => {
        try {
            await axios.delete(`/api/quotes/${props.quote.id}`);
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
        <div className="edit-page">
            <form onSubmit={patchHandler} className="edit-form">
                <div className="form-group">
                    <label htmlFor="text">
                        <span className="req-icon">*</span>New Text:
                    </label>
                    <input
                        type="text"
                        required
                        id="text"
                        placeholder="Enter Edits Here"
                        onChange={(e) => setQuoteText(e.target.value)}
                        value={quoteText}
                        tabIndex={1}
                    />
                </div>
                <div className="form-group">
                    <input type="checkbox" id="quoteIsFeatured" checked={quoteFeatured} onChange={handleChecked} />
                    <label htmlFor="quoteIsFeatured">Featured</label>
                </div>
                <button type="submit" className="submit-btn" tabIndex={2}>
                    Submit
                </button>

                <button className="delete-button" onClick={deleteHandler} tabIndex={3}>
                    Delete
                </button>

                <button className="cancel-button" type="button" onClick={props.onCancel} tabIndex={4}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditQuote;
