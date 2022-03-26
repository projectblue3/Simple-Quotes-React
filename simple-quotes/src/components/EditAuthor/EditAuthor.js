import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditAuthor = (props) => {
    //navigation
    const navigate = useNavigate();

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
            <form onSubmit={patchHandler} className="edit-form">
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
                    <input type="checkbox" id="authorIsFeatured" checked={authorFeatured} onChange={handleChecked} />
                    <label htmlFor="authorIsFeatured">Featured</label>
                </div>

                <button type="submit" className="submit-btn" tabIndex={6}>
                    Submit
                </button>

                <button className="delete-button" onClick={deleteHandler} tabIndex={7}>
                    Delete
                </button>

                <button className="cancel-button" type="button" onClick={props.onCancel} tabIndex={8}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditAuthor;
