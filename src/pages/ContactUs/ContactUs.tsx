import { useState, useEffect, useRef, FormEvent } from 'react';
import './ContactUs.css';

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

export default function ContactUs() {
    const revealRef = useReveal();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // For now, show success message. Can integrate with Formspree or similar later.
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="contact-page" ref={revealRef}>
            {/* Hero */}
            <section className="contact-hero">
                <div className="container">
                    <span className="badge badge-primary" style={{ marginBottom: 'var(--space-lg)', display: 'inline-flex' }}>
                        Get in Touch
                    </span>
                    <h1>
                        Contact <span className="gradient-text">Us</span>
                    </h1>
                    <p>
                        Have a question, feedback, or need assistance? We're here to help!
                    </p>
                </div>
            </section>

            {/* Contact Grid */}
            <section className="container">
                <div className="contact-grid">
                    {/* Form */}
                    <div className="contact-form-card reveal">
                        <h2>Send Us a Message</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="contact-name">Name</label>
                                <input type="text" id="contact-name" placeholder="Your name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact-email">Email</label>
                                <input type="email" id="contact-email" placeholder="your@email.com" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact-subject">Subject</label>
                                <select id="contact-subject" required>
                                    <option value="">Select a topic</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="feedback">Feedback</option>
                                    <option value="bug">Report a Bug</option>
                                    <option value="partnership">Partnership</option>
                                    <option value="press">Press</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact-message">Message</label>
                                <textarea id="contact-message" placeholder="Tell us more..." required />
                            </div>
                            <button type="submit" className="btn btn-primary form-submit">
                                Send Message
                            </button>
                            {submitted && (
                                <div className="form-success">
                                    ✓ Thank you! We'll get back to you soon.
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Info cards */}
                    <div className="contact-info reveal reveal-delay-2">
                        <div className="contact-info-card">
                            <div className="contact-info-icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="M22 7l-10 7L2 7" />
                                </svg>
                            </div>
                            <div>
                                <h3>Email Support</h3>
                                <p>
                                    Reach out directly at<br />
                                    <a href="mailto:thechalkboardofficial@gmail.com">thechalkboardofficial@gmail.com</a>
                                </p>
                            </div>
                        </div>

                        <div className="contact-info-card">
                            <div className="contact-info-icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="2" y1="12" x2="22" y2="12" />
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                </svg>
                            </div>
                            <div>
                                <h3>Website</h3>
                                <p>
                                    <a href="https://chalkboardresearch.com">www.chalkboardresearch.com</a>
                                </p>
                            </div>
                        </div>

                        <div className="contact-info-card">
                            <div className="contact-info-icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <circle cx="12" cy="12" r="5.5" fill="none" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </div>
                            <div>
                                <h3>Instagram</h3>
                                <p>
                                    Follow us at<br />
                                    <a href="https://www.instagram.com/chalkboardresearch/" target="_blank" rel="noopener noreferrer">
                                        @chalkboardresearch
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div className="contact-info-card">
                            <div className="contact-info-icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            </div>
                            <div>
                                <h3>Response Time</h3>
                                <p>
                                    We typically respond within 24-48 hours during business days.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
