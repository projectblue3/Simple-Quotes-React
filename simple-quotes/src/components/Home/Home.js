import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//Components
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

const Home = (props) => {
    //states
    const [featuredQuotes, setFeaturedQuotes] = useState([]);
    const [featuredAuthors, setFeaturedAuthors] = useState([]);

    //hooks
    //grab all quotes from api
    useEffect(() => {
        (async function () {
            try {
                const { data } = await axios.get(`/api/quotes/?searchterms=isFeatured`);
                setFeaturedQuotes(data);
                console.log(data);
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

    useEffect(() => {
        (async function () {
            try {
                const { data } = await axios.get(`/api/authors/?searchterms=isFeatured`);
                setFeaturedAuthors(data);
                console.log(data);
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

    //JSX
    return (
        <div className="home-page">
            <Nav />
            <div className="home-content">
                <h2 className="big-home-heading">Welcome To Simple Quotes</h2>
                <div className="site-description">
                    <h3 className="home-heading">The Benefits Of Quotes</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla sapiente eum, atque
                        velit voluptates aliquam blanditiis ut commodi saepe qui. Deleniti nulla id fugit
                        corrupti repellat culpa vel molestias aperiam?
                    </p>
                </div>
                <div className="home-authors">
                    <h3 className="home-heading">Featured Authors</h3>
                    {featuredAuthors.map((a) => {
                        return (
                            <div className="authors-item" key={a.id}>
                                <Link className="author-name" to={`/author/${a.id}`}>
                                    {a.name}
                                </Link>
                            </div>
                        );
                    })}
                </div>
                <div className="home-quotes">
                    <h3 className="home-heading">Featured Quotes</h3>
                    {featuredQuotes.map((q) => {
                        return (
                            <div className="quotes-item" key={q.id}>
                                <p className="quote-text">{q.text}</p>

                                <Link to={`/author/${q.authorId}`} className="author-name">
                                    {q.authorName}
                                </Link>
                            </div>
                        );
                    })}
                </div>
                <div className="home-socials">
                    <h3 className="home-heading">Where To Find Me</h3>
                    <div className="social-links">
                        <a
                            href="https://github.com/projectblue3"
                            target="_blank"
                            rel="noreferrer"
                            className="sl-link"
                        >
                            github
                        </a>

                        <a
                            href="https://linkedin.com/in/caldwin-cason"
                            target="_blank"
                            rel="noreferrer"
                            className="sl-link"
                        >
                            linkedin
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
