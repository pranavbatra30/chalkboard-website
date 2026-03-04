import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo';
import './Home.css';

/* ---- Scroll reveal hook ---- */
function useReveal() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.12 },
        );

        const items = el.querySelectorAll('.reveal');
        items.forEach((item) => observer.observe(item));
        return () => items.forEach((item) => observer.unobserve(item));
    }, []);

    return ref;
}

/* ---- Feature data ---- */
const FEATURES = [
    {
        icon: '🛡️',
        iconClass: 'feature-icon-1',
        title: 'The Vetted, High-Signal Ecosystem',
        description:
            'An ecosystem free from the noise of the general public. Every user is verified — real peers, professors, and students only.',
        bullets: [
            'Strict audience vetting',
            'Granular privacy controls',
            'Role-based networking with badges',
        ],
    },
    {
        icon: '✍️',
        iconClass: 'feature-icon-2',
        title: 'Tailored Academic Content',
        description:
            'Built for science from the ground up. Rich citations, math equations, code blocks, and an AI peer-reviewer at your fingertips.',
        bullets: [
            'Automated rich-card citations',
            'Native math & code support',
            'AI "Devil\'s Advocate" critique',
        ],
    },
    {
        icon: '🔍',
        iconClass: 'feature-icon-3',
        title: 'Smart Discovery & Organization',
        description:
            'A dynamic feed tailored to your exact niche. Filter by domain, tags, expertise level, or peers you follow.',
        bullets: [
            'Intelligent recommendation engine',
            'Advanced feed filtering',
            'Bookmarks & private folders',
        ],
    },
    {
        icon: '🎯',
        iconClass: 'feature-icon-4',
        title: 'Premium Community Engagement',
        description:
            'Live Journal Clubs, recruitment boards for lab openings, and comprehensive academic profiles.',
        bullets: [
            'Live "Journal Club" debates',
            '"Lab Openings" recruitment board',
            'Academic business-card profiles',
        ],
    },
];

/* ---- Steps data ---- */
const STEPS = [
    {
        number: 1,
        title: 'Join the Community',
        description:
            'Sign up and get verified. We ensure every member is a genuine researcher, professor, or student.',
    },
    {
        number: 2,
        title: 'Share Your Ideas',
        description:
            'Post raw hypotheses, debate methodologies, and share insights with a vetted audience who truly understands.',
    },
    {
        number: 3,
        title: 'Discover & Collaborate',
        description:
            'Find peers in your niche domain, join research groups, and participate in live journal club discussions.',
    },
];

/* ---- FAQ data ---- */
const FAQS = [
    {
        question: 'Who can join ChalkBoard?',
        answer:
            'ChalkBoard is exclusively for verified researchers, professors, and students. We vet every user to ensure a high-signal, spam-free academic community.',
    },
    {
        question: 'Is ChalkBoard free to use?',
        answer:
            'Yes! ChalkBoard is completely free to download and use. We believe that great academic collaboration should be accessible to everyone.',
    },
    {
        question: 'How is ChalkBoard different from ResearchGate or Twitter?',
        answer:
            'Unlike ResearchGate, ChalkBoard is informal — share half-baked ideas without impacting your official profile. Unlike Twitter, every user is vetted, so the discourse stays high quality and relevant.',
    },
    {
        question: 'Can I control who sees my posts?',
        answer:
            'Absolutely. ChalkBoard offers granular privacy controls. Share with all verified users, limit to specific academic levels, or keep posts within your private Research Group.',
    },
    {
        question: 'Is Android supported?',
        answer:
            'ChalkBoard is currently available on iOS. Android support is coming soon — stay tuned!',
    },
    {
        question: 'How does the AI "Devil\'s Advocate" work?',
        answer:
            'Before publishing a post, you can activate the built-in AI to critique your idea. It acts as a private peer-reviewer, pointing out potential methodological flaws so you can strengthen your hypothesis.',
    },
];

export default function Home() {
    const revealRef = useReveal();
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = useCallback(
        (idx: number) => setOpenFaq((prev) => (prev === idx ? null : idx)),
        [],
    );

    return (
        <div ref={revealRef}>
            {/* ========== HERO ========== */}
            <section className="hero" id="hero">
                <div className="hero-bg" />
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge badge-primary">🎓 Built Exclusively for Researchers</span>
                    </div>

                    <div className="hero-logo" style={{ display: 'flex', justifyContent: 'center' }}>
                        <Logo size="xl" />
                    </div>

                    <h1 className="hero-tagline">
                        Where Great Minds{' '}
                        <span className="gradient-text">Think Freely</span>
                    </h1>

                    <p className="hero-description">
                        The exclusive, informal collaborative hub for researchers. Share raw ideas,
                        debate methodologies, and connect with verified peers — without the pressure of
                        official publication.
                    </p>

                    <div className="hero-actions">
                        <Link to="/get-chalkboard" className="btn btn-primary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download for iOS
                        </Link>
                        <Link to="/about" className="btn btn-outline">
                            Learn More
                        </Link>
                    </div>
                </div>

                <div className="hero-scroll-indicator">
                    <span>Scroll</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>
            </section>

            {/* ========== FEATURES ========== */}
            <section className="features-section section" id="features">
                <div className="container">
                    <div className="features-header reveal">
                        <span className="badge badge-accent" style={{ marginBottom: 'var(--space-md)', display: 'inline-flex' }}>
                            Core Pillars
                        </span>
                        <h2 className="section-title">
                            Everything Researchers{' '}
                            <span className="text-primary">Actually Need</span>
                        </h2>
                        <p className="section-subtitle">
                            Built around four core pillars designed to make ChalkBoard the definitive
                            must-have app for the academic community.
                        </p>
                    </div>

                    <div className="features-grid">
                        {FEATURES.map((feature, idx) => (
                            <div
                                key={feature.title}
                                className={`feature-card reveal reveal-delay-${idx + 1}`}
                            >
                                <div className={`feature-icon ${feature.iconClass}`}>{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                                <ul>
                                    {feature.bullets.map((b) => (
                                        <li key={b}>{b}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== HOW IT WORKS ========== */}
            <section className="how-it-works section" id="how-it-works">
                <div className="container">
                    <div className="how-it-works-header reveal">
                        <h2 className="section-title">
                            Get Started in{' '}
                            <span className="text-accent">3 Simple Steps</span>
                        </h2>
                        <p className="section-subtitle">
                            From sign-up to your first Eureka moment, it takes less than 5 minutes.
                        </p>
                    </div>

                    <div className="steps-container">
                        {STEPS.map((step, idx) => (
                            <div key={step.number} className={`step-item reveal reveal-delay-${idx + 1}`}>
                                <div className="step-number">{step.number}</div>
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== AUDIENCE CTAs ========== */}
            <section className="audience-section section" id="audience">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }} className="reveal">
                        <h2 className="section-title">
                            Built for <span className="gradient-text">Every Researcher</span>
                        </h2>
                    </div>

                    <div className="audience-grid">
                        <div className="audience-card reveal reveal-delay-1">
                            <div className="audience-card-icon">🎓</div>
                            <h3>For Professors</h3>
                            <p>
                                Recruit top talent, lead journal clubs, and share insights with a
                                guaranteed audience of verified academics.
                            </p>
                            <ul>
                                <li>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    Post "Lab Openings" to recruit PhD & Post-Doc candidates
                                </li>
                                <li>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    Host Live Journal Club sessions for real-time debate
                                </li>
                                <li>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    Invite and sponsor your students directly
                                </li>
                            </ul>
                        </div>

                        <div className="audience-card reveal reveal-delay-2">
                            <div className="audience-card-icon">🧪</div>
                            <h3>For Students & Researchers</h3>
                            <p>
                                Share rough ideas freely, get AI-powered feedback, and discover
                                peers in your exact niche.
                            </p>
                            <ul>
                                <li>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    Share half-baked ideas without career risk
                                </li>
                                <li>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    Use the AI Devil's Advocate before posting
                                </li>
                                <li>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    Discover lab openings in your domain
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== FAQ ========== */}
            <section className="faq-section section" id="faq">
                <div className="container">
                    <div className="faq-header reveal">
                        <h2 className="section-title">
                            Frequently Asked{' '}
                            <span className="text-primary">Questions</span>
                        </h2>
                        <p className="section-subtitle">
                            Everything you need to know about ChalkBoard.
                        </p>
                    </div>

                    <div className="faq-list">
                        {FAQS.map((faq, idx) => (
                            <div key={idx} className="faq-item reveal">
                                <button
                                    className={`faq-question ${openFaq === idx ? 'open' : ''}`}
                                    onClick={() => toggleFaq(idx)}
                                >
                                    {faq.question}
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>
                                <div className={`faq-answer ${openFaq === idx ? 'open' : ''}`}>
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== FINAL CTA ========== */}
            <section className="final-cta section" id="final-cta">
                <div className="container">
                    <div className="final-cta-inner reveal">
                        <h2>
                            Ready to Join the{' '}
                            <span className="gradient-text">Conversation?</span>
                        </h2>
                        <p>
                            Download ChalkBoard today and connect with the brightest minds in your field.
                        </p>
                        <div className="hero-actions">
                            <Link to="/get-chalkboard" className="btn btn-primary">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                Download for iOS
                            </Link>
                            <a
                                href="https://www.instagram.com/chalkboardresearch/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-ghost"
                            >
                                Follow on Instagram
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
