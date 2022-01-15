import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DisplayAuthors = (props) => {
    //states
    const [authors, setAuthors] = useState([]);

    //hooks
    useEffect(() => {
        (async function () {
            try {
                const { data } = await axios.get('/api/authors');
                setAuthors(data);
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

    //jsx
    return (
        <div className="authors-container">
            {authors.map((a) => {
                return (
                    <div className="authors-item" key={a.id}>
                        <Link className="author-name" to={`/author/${a.id}`}>
                            {a.name}
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default DisplayAuthors;
