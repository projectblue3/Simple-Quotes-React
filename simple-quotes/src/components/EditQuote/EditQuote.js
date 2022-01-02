import axios from 'axios';
import React, { useState } from 'react';

const EditQuote = (props) => {
    //states
    const [quoteText, setQuoteText] = useState(props.quote.text);

    //handles patch requests
    const patchHandler = async (e) => {
        e.preventDefault();

        const patchData = [
            {
                op: 'replace',
                path: '/text',
                value: quoteText,
            },
        ];

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
        e.preventDefault();

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

    //jsx
    return (
        <div className="edit-page">
            <form onSubmit={patchHandler} className="edit-form">
                <div className="form-group">
                    <label htmlFor="text">New Text:</label>
                    <input
                        type="text"
                        required
                        id="text"
                        placeholder="Enter Edits Here"
                        onChange={(e) => setQuoteText(e.target.value)}
                        value={quoteText}
                        tabIndex={1}
                    />
                    <button type="submit" className="submit-btn" tabIndex={2}>
                        Submit
                    </button>

                    <button className="delete-button" onClick={deleteHandler} tabIndex={3}>
                        Delete
                    </button>

                    <button className="cancel-button" type="button" onClick={props.onCancel} tabIndex={4}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditQuote;
