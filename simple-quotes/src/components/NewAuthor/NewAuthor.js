import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewAuthor = (props) => {
    //states
    const [authorName, setAuthorName] = useState('');
    const [authorDob, setAuthorDob] = useState('');
    const [authorDod, setAuthorDod] = useState('');
    const [authorJob, setAuthorJob] = useState('');
    const [authorBio, setAuthorBio] = useState('');
    const [authorFeatured, setAuthorFeatured] = useState(false);

    //history
    let navigate = useNavigate();

    //handle post requests
    const postHandler = async (e) => {
        e.preventDefault();
        try {
            const author = await axios.post('/api/authors/', {
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
        setAuthorFeatured(!authorFeatured);
    }

    //jsx
    return (
        <div className="new-item-page">
            <form onSubmit={postHandler} className="new-item-form">
                <div className="form-group">
                    <label htmlFor="author-name">Name:</label>
                    <input
                        type="text"
                        required
                        id="author-name"
                        placeholder="Enter their name"
                        onChange={(e) => setAuthorName(e.target.value)}
                        value={authorName}
                        tabIndex={1}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author-dob">Date Of Birth:</label>
                    <input type="date" required id="author-dob" onChange={(e) => setAuthorDob(e.target.value)} value={authorDob} tabIndex={2} />
                </div>
                <div className="form-group">
                    <label htmlFor="author-dod">Date Of Death:</label>
                    <input type="date" id="author-dod" onChange={(e) => setAuthorDod(e.target.value)} value={authorDod} tabIndex={3} />
                </div>
                <div className="form-group">
                    <label htmlFor="author-job">Occupation:</label>
                    <input
                        type="text"
                        required
                        id="author-job"
                        placeholder="Enter their occupation"
                        onChange={(e) => setAuthorJob(e.target.value)}
                        value={authorJob}
                        tabIndex={4}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author-bio">Bio:</label>
                    <textarea
                        required
                        id="author-bio"
                        placeholder="Enter their biography"
                        onChange={(e) => setAuthorBio(e.target.value)}
                        value={authorBio}
                        tabIndex={5}
                    />
                </div>
                <div className="form-group">
                    <input type="checkbox" id="authorIsFeaturedC" checked={authorFeatured} onChange={handleChecked} />
                    <label htmlFor="authorIsFeaturedC">Featured</label>
                </div>
                <button type="submit" className="submit-btn" tabIndex={6}>
                    Submit
                </button>

                <button className="cancel-button" type="button" onClick={props.onCancel} tabIndex={7}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default NewAuthor;
