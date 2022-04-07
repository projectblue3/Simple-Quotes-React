import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditAuthor = (props) => {
    //navigation
    const navigate = useNavigate();

    //get current date
    const date = new Date();

    //first render values
    const oldName = props.author.name;
    const oldDob = props.author.dateOfBirth;
    const oldDod = props.author.dateOfDeath;
    const oldJob = props.author.occupation;
    const oldBio = props.author.bio;
    const oldAuthorFeatured = props.author.isFeatured;

    //states
    const [authorName, setAuthorName] = useState(props.author.name);
    const [authorDob, setAuthorDob] = useState(props.author.dateOfBirth);
    const [authorDod, setAuthorDod] = useState(props.author.dateOfDeath);
    const [authorJob, setAuthorJob] = useState(props.author.occupation);
    const [authorBio, setAuthorBio] = useState(props.author.bio);
    const [authorFeatured, setAuthorFeatured] = useState(props.author.isFeatured);

    //handles patch requests
    const patchHandler = async (e) => {
        const patchData = [];

        if (oldName !== authorName) {
            patchData.push({
                op: 'replace',
                path: '/name',
                value: authorName,
            });
        }

        if (oldDob !== authorDob) {
            patchData.push({
                op: 'replace',
                path: '/dateOfBirth',
                value: authorDob,
            });
        }

        if (oldDod !== authorDod) {
            patchData.push({
                op: 'replace',
                path: '/dateOfDeath',
                value: authorDod,
            });
        }

        if (oldJob !== authorJob) {
            patchData.push({
                op: 'replace',
                path: '/occupation',
                value: authorJob,
            });
        }

        if (oldBio !== authorBio) {
            patchData.push({
                op: 'replace',
                path: '/bio',
                value: authorBio,
            });
        }

        if (oldAuthorFeatured !== authorFeatured) {
            patchData.push({
                op: 'replace',
                path: '/isFeatured',
                value: authorFeatured,
            });
        }

        try {
            console.log(patchData);
            await axios.patch(`/api/authors/${props.author.id}`, patchData);
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
            await axios.delete(`/api/authors/${props.author.id}`);
            navigate('/authors');
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
        <div className="edit-page">
            <h2 className="big-home-heading">Edit Author</h2>
            <form onSubmit={patchHandler} className="edit-form">
                <div className="form-group labeled-group">
                    <label htmlFor="author-name">Name*</label>
                    <input
                        type="text"
                        required
                        id="author-name"
                        className="form-text-box"
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
                    <label htmlFor="author-dod">Date Of Death:</label>
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
                    <input type="checkbox" id="authorIsFeatured" checked={authorFeatured} onChange={handleChecked} />
                    <label htmlFor="authorIsFeatured">Featured</label>
                </div>
                <div className="form-group buttons-group">
                    <button type="submit" className="submit-button form-button" tabIndex={6}>
                        Submit
                    </button>

                    <button className="delete-button form-button" onClick={deleteHandler} tabIndex={7}>
                        Delete
                    </button>

                    <button className="cancel-button form-button" type="button" onClick={props.onCancel} tabIndex={8}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditAuthor;
