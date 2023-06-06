import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import gitLogo from '../../icons/GitHub-Mark-Light-64px.png';
import liLogo from '../../icons/LI-In-Bug-White.png';
import tubeLogo from '../../icons/tube.png';
import loadGif from '../../icons/640px-Loader.gif';
import './Home.css';

//Components
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

const Home = (props) => {
    //states
    const [featuredQuotes, setFeaturedQuotes] = useState([]);
    const [featuredAuthors, setFeaturedAuthors] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [quotesLoaded, setQuotesLoaded] = useState(false);
    const [authorsLoaded, setAuthorsLoaded] = useState(false);

    //hooks
    //Change Tab Title
    useEffect(() => {
        document.title = 'Home - Simple Quotes';
    }, []);

    //grab all featured quotes from api
    useEffect(() => {
        (async function () {
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/quotes/?searchterms=isFeatured`
                );
                setFeaturedQuotes(data);
                setQuotesLoaded(true);
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

    //grab all featured authors
    useEffect(() => {
        (async function () {
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/authors/?searchterms=isFeatured`
                );
                setFeaturedAuthors(data);
                setAuthorsLoaded(true);
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

    //history
    let navigate = useNavigate();

    //handlers
    function searchHandler(e) {
        e.preventDefault();
        navigate(`/search?q=${searchText}`);
    }

    //JSX
    return (
        <div className="comp-parent" id="home-page">
            <header className="page-header">
                <Nav />
            </header>

            <main className="home-main">
                <div className="main-top">
                    <div className="page-content">
                        <div className="content-top">
                            <h2 className="big-home-heading">Welcome To Simple Quotes</h2>

                            <div id="home-search">
                                <form onSubmit={searchHandler} className="home-search-form">
                                    <input
                                        type="search"
                                        id="home-search-input"
                                        className="home-search-box"
                                        placeholder="Search"
                                        onChange={(e) => setSearchText(e.target.value)}
                                        value={searchText}
                                    />
                                </form>
                            </div>
                        </div>

                        <div className="content-bottom">
                            <div className="site-description home-card">
                                <h3 className="home-heading">The Benefits Of Quotes</h3>
                                <div className="home-card-content">
                                    <ul className="des-ul">
                                        <li className="des-item">
                                            <p>
                                                Reading quotes can provide inspiration and motivation,
                                                offering concise nuggets of wisdom from individuals who have
                                                experienced similar challenges or achieved great success.
                                            </p>
                                        </li>
                                        <li className="des-item">
                                            <p>
                                                Quotes can offer new perspectives and insights, expanding your
                                                understanding of various topics and encouraging critical
                                                thinking.
                                            </p>
                                        </li>
                                        <li className="des-item">
                                            <p>
                                                Quotes can be uplifting and comforting, providing a sense of
                                                connection and resonance with the thoughts and emotions
                                                expressed by others.
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="home-authors home-card">
                                <h3 className="home-heading">Featured Authors</h3>
                                <div className="home-card-content">
                                    {authorsLoaded === false ? (
                                        <div className="load-container">
                                            <img src={loadGif} alt="loading..." className="loading-icon" />
                                        </div>
                                    ) : (
                                        <div className="authors-list">
                                            {!featuredAuthors.length > 0 && (
                                                <h3 className="big-home-heading">No Authors</h3>
                                            )}
                                            {featuredAuthors.map((a) => (
                                                <div className="authors-item" key={a.id}>
                                                    <Link className="author-name" to={`/author/${a.id}`}>
                                                        {a.name}
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="home-socials home-card">
                                <h3 className="home-heading">Where To Find Me</h3>
                                <div className="home-card-content">
                                    <div className="home-social-links">
                                        <div className="home-social-link">
                                            <a
                                                href="https://github.com/projectblue3"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="home-sl-link"
                                            >
                                                <img
                                                    src={gitLogo}
                                                    alt="github icon"
                                                    className="home-sl-icon"
                                                />
                                                <span>GitHub</span>
                                            </a>
                                        </div>
                                        <div className="home-social-link linked-in">
                                            <a
                                                href="https://linkedin.com/in/caldwin-cason"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="home-sl-link"
                                            >
                                                <img
                                                    src={liLogo}
                                                    alt="linkedin icon"
                                                    className="home-sl-icon"
                                                />
                                                <span>LinkedIn</span>
                                            </a>
                                        </div>
                                        <div className="home-social-link">
                                            <a
                                                href="https://youtube.com/@AniCodingLab-if3ix"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="home-sl-link"
                                            >
                                                <img
                                                    src={tubeLogo}
                                                    alt="youtube icon"
                                                    className="home-sl-icon"
                                                />
                                                <span>YouTube</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="main-bottom">
                    <div className="page-content">
                        <div className="home-quotes">
                            <h3 className="home-heading">Featured Quotes</h3>
                            <div className="home-card-content">
                                {quotesLoaded === false ? (
                                    <div className="load-container">
                                        <img src={loadGif} alt="loading..." className="loading-icon" />
                                    </div>
                                ) : (
                                    <div className="quotes-list">
                                        {!featuredQuotes.length > 0 && (
                                            <h3 className="big-home-heading">No Quotes</h3>
                                        )}
                                        {featuredQuotes.map((q) => (
                                            <div className="home-quotes-item" key={q.id}>
                                                <p className="quote-text">{q.text}</p>

                                                <Link to={`/author/${q.authorId}`} className="author-name">
                                                    {q.authorName}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* <footer className="page-footer">
                <Footer />
            </footer> */}
        </div>
    );
};

export default Home;
