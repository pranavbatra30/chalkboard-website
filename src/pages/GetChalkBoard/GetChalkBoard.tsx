import { useEffect, useRef } from 'react';
import './GetChalkBoard.css';

const APP_STORE_URL = 'https://apps.apple.com/app/chalkboard/id0000000000';

const HIGHLIGHTS = [
    { icon: '🛡️', title: 'Verified Community', desc: 'Every user is vetted — real researchers only.' },
    { icon: '🧠', title: 'AI Peer Review', desc: 'Get instant AI critique before you publish.' },
    { icon: '📝', title: 'Rich Citations', desc: 'Paste a DOI and get a beautiful reference card.' },
    { icon: '🔬', title: 'Research Groups', desc: 'Create or join private groups in your domain.' },
    { icon: '📊', title: 'Micro-Polls', desc: 'Settle methodology debates with your peers.' },
    { icon: '🎯', title: 'Lab Openings', desc: 'Recruit or find funded PhD & Post-Doc positions.' },
];

/**
 * Screenshots can be added by placing images in `public/screenshots/`
 * and listing them here. They will render inside the placeholder grid.
 * Example: ['screenshot-1.png', 'screenshot-2.png', 'screenshot-3.png']
 */
const SCREENSHOTS: string[] = ['screenshot1.png', 'screenshot2.png', 'screenshot3.png'];


function useReveal() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
            { threshold: 0.12 },
        );
        el.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
        return () => el.querySelectorAll('.reveal').forEach((item) => observer.unobserve(item));
    }, []);
    return ref;
}

export default function GetChalkBoard() {
    const revealRef = useReveal();

    return (
        <div className="get-page" ref={revealRef}>
            {/* Hero */}
            <section className="get-hero">
                <div className="container get-hero-content">
                    <span className="badge badge-primary" style={{ marginBottom: 'var(--space-lg)', display: 'inline-flex' }}>
                        Available Now on iOS
                    </span>
                    <h1>
                        Get <span className="gradient-text">ChalkBoard</span>
                    </h1>
                    <p>
                        Download the app and join the most exclusive academic community.
                        Your next Eureka moment is one tap away.
                    </p>
                </div>
            </section>

            {/* Platform Cards */}
            <section className="container">
                <div className="platform-cards reveal">
                    <div className="platform-card">
                        <div className="platform-icon">🍎</div>
                        <h3>iOS</h3>
                        <p>Available on the App Store for iPhone and iPad.</p>
                        <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download on App Store
                        </a>
                    </div>
                    <div className="platform-card">
                        <div className="platform-icon">🤖</div>
                        <h3>Android</h3>
                        <p>We're working hard to bring ChalkBoard to Android.</p>
                        <div className="coming-soon-badge">
                            🚧 Coming Soon
                        </div>
                    </div>
                </div>
            </section>

            {/* Screenshots */}
            <section className="screenshots-section section">
                <div className="container">
                    <div className="screenshots-header reveal">
                        <h2 className="section-title">
                            See It in <span className="text-primary">Action</span>
                        </h2>
                        <p className="section-subtitle">
                            A sneak peek at the ChalkBoard experience.
                        </p>
                    </div>

                    <div className="screenshots-grid reveal">
                        {SCREENSHOTS.length > 0 ? (
                            SCREENSHOTS.map((src, idx) => (
                                <div key={idx} className="screenshot-placeholder">
                                    <img src={`/screenshots/${src}`} alt={`ChalkBoard screenshot ${idx + 1}`} />
                                </div>
                            ))
                        ) : (
                            <>
                                <div className="screenshot-placeholder">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
                                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                                        <line x1="12" y1="18" x2="12.01" y2="18" />
                                    </svg>
                                    <span>Screenshot 1</span>
                                </div>
                                <div className="screenshot-placeholder">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
                                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                                        <line x1="12" y1="18" x2="12.01" y2="18" />
                                    </svg>
                                    <span>Screenshot 2</span>
                                </div>
                                <div className="screenshot-placeholder">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
                                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                                        <line x1="12" y1="18" x2="12.01" y2="18" />
                                    </svg>
                                    <span>Screenshot 3</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Feature highlights */}
            <section className="get-features section">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }} className="reveal">
                        <h2 className="section-title">
                            Why You'll <span className="text-accent">Love It</span>
                        </h2>
                    </div>
                    <div className="get-features-grid">
                        {HIGHLIGHTS.map((h, idx) => (
                            <div key={h.title} className={`get-feature-item reveal reveal-delay-${(idx % 4) + 1}`}>
                                <div className="icon">{h.icon}</div>
                                <h4>{h.title}</h4>
                                <p>{h.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
