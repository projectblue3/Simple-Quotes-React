import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import gitLogo from '../../icons/GitHub-Mark-Light-64px.png';
import liLogo from '../../icons/LI-In-Bug-White.png';
import instaLogo from '../../icons/instagram-white.png';
import './Home.css';

//Components
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

const Home = (props) => {
    //states
    const [featuredQuotes, setFeaturedQuotes] = useState([]);
    const [featuredAuthors, setFeaturedAuthors] = useState([]);
    const [searchText, setSearchText] = useState('');

    //hooks
    //Change Tab Title
    useEffect(() => {
        document.title = 'Home - Simple Quotes';
    }, []);

    //grab all quotes from api
    useEffect(() => {
        (async function () {
            try {
                const { data } = await axios.get(`/api/quotes/?searchterms=isFeatured`);
                setFeaturedQuotes(data);
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
        navigate(`/search?q=${searchText}`, { replace: true });
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
                                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi nisi cumque excepturi. Id officiis
                                                alias, eligendi nisi reiciendis libero repellat. Labore voluptatibus, accusamus hic corrupti eos
                                                tempora consequatur obcaecati vero!
                                            </p>
                                        </li>
                                        <li className="des-item">
                                            <p>
                                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam sed minima rem cupiditate
                                                praesentium architecto! Perferendis quos doloribus pariatur molestiae nostrum, itaque, deleniti quidem
                                                odit suscipit harum mollitia dolore porro?
                                            </p>
                                        </li>
                                        <li className="des-item">
                                            <p>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla sapiente eum, atque velit voluptates
                                                aliquam blanditiis ut commodi saepe qui. Deleniti nulla id fugit corrupti repellat culpa vel molestias
                                                aperiam?
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="home-authors home-card">
                                <h3 className="home-heading">Featured Authors</h3>
                                <div className="home-card-content">
                                    <div className="authors-list">
                                        {featuredAuthors.map((a) => (
                                            <div className="authors-item" key={a.id}>
                                                <Link className="author-name" to={`/author/${a.id}`}>
                                                    {a.name}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="home-socials home-card">
                                <h3 className="home-heading">Where To Find Me</h3>
                                <div className="home-card-content">
                                    <div className="home-social-links">
                                        <a href="https://github.com/projectblue3" target="_blank" rel="noreferrer" className="home-sl-link">
                                            <div className="home-social-link">
                                                <img src={gitLogo} alt="github icon" className="home-sl-icon" />
                                                <span>GitHub</span>
                                            </div>
                                        </a>
                                        <a href="https://linkedin.com/in/caldwin-cason" target="_blank" rel="noreferrer" className="home-sl-link">
                                            <div className="home-social-link linked-in">
                                                <img src={liLogo} alt="linkedin icon" className="home-sl-icon" />
                                                <span>LinkedIn</span>
                                            </div>
                                        </a>
                                        <a href="#" target="_blank" rel="noreferrer" className="home-sl-link">
                                            <div className="home-social-link">
                                                <img src={instaLogo} alt="insta icon" className="home-sl-icon" />
                                                <span>Instagram</span>
                                            </div>
                                        </a>
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
                                <div className="quotes-list">
                                    {featuredQuotes.map((q) => (
                                        <div className="home-quotes-item" key={q.id}>
                                            <p className="quote-text">{q.text}</p>

                                            <Link to={`/author/${q.authorId}`} className="author-name">
                                                {q.authorName}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="page-footer">
                <Footer />
            </footer>
        </div>
    );
};

export default Home;
