import React from 'react';
import gitLogo from '../../icons/GitHub-Mark-64px.png';
import liLogo from '../../icons/LI-In-Bug.png';
import './Footer.css';

const Footer = (props) => {
    return (
        <div className="footer">
            <div className="copyright">
                <small>Copyright &copy; 1010 - 1850 Simple Quotes</small>
            </div>
            <div className="social-links">
                <a href="https://github.com/projectblue3" target="_blank" className="sl-link">
                    <img src={gitLogo} alt="github icon" className="sl-icon" />
                </a>

                <a href="https://linkedin.com/in/caldwin-cason" target="_blank" className="sl-link">
                    <img src={liLogo} alt="github icon" className="sl-icon" />
                </a>
            </div>
        </div>
    );
};

export default Footer;
