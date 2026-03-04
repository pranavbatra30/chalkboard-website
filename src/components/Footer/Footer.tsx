import { Link } from 'react-router-dom';
import Logo from '../Logo';
import './Footer.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer" id="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand column */}
                    <div className="footer-brand">
                        <Logo size="sm" />
                        <p>
                            The exclusive, informal collaborative hub built for researchers.
                            Share ideas, debate methodologies, and connect with verified peers.
                        </p>
                        <div className="footer-social">
                            <a
                                href="https://www.instagram.com/chalkboardresearch/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-link"
                                aria-label="Instagram"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <circle cx="12" cy="12" r="5.5" fill="none" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>
                            <a
                                href="mailto:thechalkboardofficial@gmail.com"
                                className="footer-social-link"
                                aria-label="Email"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="M22 7l-10 7L2 7" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-column">
                        <h4>Quick Links</h4>
                        <Link to="/">Home</Link>
                        <Link to="/get-chalkboard">Get ChalkBoard</Link>
                        <Link to="/about">About Us</Link>
                        <Link to="/contact">Contact Us</Link>
                    </div>

                    {/* Features */}
                    <div className="footer-column">
                        <h4>Features</h4>
                        <Link to="/get-chalkboard">Vetted Ecosystem</Link>
                        <Link to="/get-chalkboard">Academic Content</Link>
                        <Link to="/get-chalkboard">Smart Discovery</Link>
                        <Link to="/get-chalkboard">Community</Link>
                    </div>

                    {/* Legal */}
                    <div className="footer-column">
                        <h4>Legal</h4>
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Use</Link>
                        <a href="mailto:thechalkboardofficial@gmail.com">Support</a>
                    </div>
                </div>

                <div className="footer-divider" />

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {currentYear} ChalkBoard. All rights reserved.
                    </p>
                    <div className="footer-legal">
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/terms">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
