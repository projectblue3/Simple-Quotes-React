import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import autosize from 'autosize';

const NewAuthor = (props) => {
    //states
    const [authorName, setAuthorName] = useState('');
    const [authorDob, setAuthorDob] = useState('');
    const [authorDod, setAuthorDod] = useState('');
    const [authorJob, setAuthorJob] = useState('');
    const [authorBio, setAuthorBio] = useState('');
    const [authorFeatured, setAuthorFeatured] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorExists, setErrorExists] = useState(false);

    //history
    let navigate = useNavigate();

    //Enable autosize for textarea
    autosize(document.querySelector('textarea'));

    //get current date
    const date = new Date();

    //handle post requests
    const postHandler = async (e) => {
        e.preventDefault();
        try {
            const author = await axios.post(`${process.env.REACT_APP_API_URL}/api/authors/`, {
                Name: authorName,
                DateOfBirth: authorDob,
                DateOfDeath: authorDod,
                Occupation: authorJob,
                Bio: authorBio,
                IsFeatured: authorFeatured,
            });

            navigate(`/author/${author.data.id}`);
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
    }, [authorName]);

    //handle quote featured checkbox
    function handleChecked() {
        setAuthorFeatured(!authorFeatured);
    }

    //jsx
    return (
        <div className="new-item-page">
            <h2 className="big-home-heading">New Author</h2>
            <form onSubmit={postHandler} className="item-form author-form">
                <div className="form-group labeled-group">
                    <label htmlFor="author-name">Name*</label>
                    <input
                        type="text"
                        required
                        id="author-name"
                        className="form-text-box"
                        placeholder="Enter Their Name"
                        onChange={(e) => setAuthorName(e.target.value)}
                        value={authorName}
                        tabIndex={1}
                    />
                </div>

                <div className="form-group labeled-group">
                    <label htmlFor="author-job">Occupation*</label>
                    <input
                        type="text"
                        required
                        id="author-job"
                        className="form-text-box"
                        placeholder="Enter Their Job"
                        onChange={(e) => setAuthorJob(e.target.value)}
                        value={authorJob}
                        tabIndex={4}
                    />
                </div>
                <div className="form-group labeled-group">
                    <label htmlFor="author-bio">Biography*</label>
                    <textarea
                        required
                        id="author-bio"
                        className="form-text-box form-text-area"
                        placeholder="Enter Their Biography"
                        rows={1}
                        onChange={(e) => setAuthorBio(e.target.value)}
                        value={authorBio}
                        tabIndex={5}
                    />
                </div>
                <div className="form-group labeled-group">
                    <label htmlFor="author-dob">
                        Date Of Birth<span className="req-icon">*</span>
                    </label>
                    <input
                        type="date"
                        required
                        id="author-dob"
                        className="form-text-box"
                        onChange={(e) => setAuthorDob(e.target.value)}
                        value={authorDob}
                        tabIndex={2}
                    />
                </div>
                <div className="form-group labeled-group">
                    <label htmlFor="author-dod">Date Of Death</label>
                    <input
                        type="date"
                        id="author-dod"
                        className="form-text-box"
                        onChange={(e) => setAuthorDod(e.target.value)}
                        value={authorDod}
                        tabIndex={3}
                    />
                </div>
                <div className="form-group featured-group">
                    <input
                        type="checkbox"
                        id="authorIsFeaturedC"
                        className="featured-check"
                        checked={authorFeatured}
                        onChange={handleChecked}
                    />
                    <label htmlFor="authorIsFeaturedC">Featured</label>
                </div>

                <div className="form-group error-group">
                    {errorExists && <p className="error-text">{errorMessage}</p>}
                </div>

                <div className="form-group buttons-group">
                    <button type="submit" className="submit-btn form-button" tabIndex={6}>
                        Submit
                    </button>

                    <button
                        className="cancel-button form-button"
                        type="button"
                        onClick={props.onCancel}
                        tabIndex={7}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewAuthor;
