import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo';
import './Navbar.css';

const NAV_LINKS = [
    { to: '/', label: 'Home' },
    { to: '/get-chalkboard', label: 'Get ChalkBoard' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact Us' },
];

export default function Navbar() {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="container-lg navbar-inner">
                <Link to="/" aria-label="ChalkBoard Home">
                    <Logo size="sm" />
                </Link>

                {/* Desktop links */}
                <div className="navbar-links">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`navbar-link ${location.pathname === link.to ? 'active' : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop CTA */}
                <Link to="/get-chalkboard" className="btn btn-primary navbar-cta navbar-cta-desktop">
                    Download App
                </Link>

                {/* Mobile hamburger */}
                <button
                    className={`navbar-mobile-toggle ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            {/* Mobile overlay */}
            <div
                className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen(false)}
            />

            {/* Mobile drawer */}
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                {NAV_LINKS.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className={`mobile-menu-link ${location.pathname === link.to ? 'active' : ''}`}
                    >
                        {link.label}
                    </Link>
                ))}
                <div className="mobile-menu-cta">
                    <Link to="/get-chalkboard" className="btn btn-primary" style={{ width: '100%' }}>
                        Download App
                    </Link>
                </div>
            </div>
        </nav>
    );
}
