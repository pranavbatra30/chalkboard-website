import { useEffect, useRef } from 'react';
import './AboutUs.css';

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

const VALUES = [
    {
        icon: '🔐',
        title: 'Quality Over Quantity',
        description: 'Every user is verified, ensuring the discourse stays high-signal and free from noise.',
    },
    {
        icon: '💡',
        title: 'Ideas First',
        description: 'We believe unfiltered brainstorming leads to breakthroughs. Share rough ideas without fear.',
    },
    {
        icon: '🤝',
        title: 'True Collaboration',
        description: 'Connect with peers across domains — your next co-author could be one post away.',
    },
    {
        icon: '🎯',
        title: 'Academic Integrity',
        description: 'Granular privacy controls protect your intellectual property while fostering open discussion.',
    },
    {
        icon: '🧪',
        title: 'Built for Science',
        description: 'From LaTeX equations to DOI citations, every feature is designed for the way researchers work.',
    },
    {
        icon: '🌍',
        title: 'Inclusive Community',
        description: 'Professors, PhD students, undergrads, and independent researchers — all welcome.',
    },
];

export default function AboutUs() {
    const revealRef = useReveal();

    return (
        <div className="about-page" ref={revealRef}>
            {/* Hero */}
            <section className="about-hero">
                <div className="container">
                    <span className="badge badge-accent" style={{ marginBottom: 'var(--space-lg)', display: 'inline-flex' }}>
                        Our Story
                    </span>
                    <h1>
                        About <span className="gradient-text">ChalkBoard</span>
                    </h1>
                    <p>
                        Born from frustration with noisy social media and stuffy academic platforms,
                        ChalkBoard is where real research conversations happen.
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="about-story section">
                <div className="container">
                    <div className="story-grid">
                        <div className="story-content reveal">
                            <h2>
                                The <span className="text-primary">Problem</span> We Saw
                            </h2>
                            <p>
                                Every great scientific breakthrough started as a messy scribble on a chalkboard.
                                But where do those late-night, unfiltered "Eureka!" moments go today?
                            </p>
                            <p>
                                Traditional social media is loud, unverified, and frankly, making us less smart.
                                Platforms like ResearchGate are too formal — nobody wants to post a half-baked
                                hypothesis where it permanently impacts their official academic profile.
                            </p>
                            <p>
                                We needed something in between. A place where a nerdy PhD student could share raw ideas
                                with peers without the pressure. A place built by researchers, for researchers.
                            </p>
                            <p>
                                So we built <strong style={{ color: 'var(--color-primary)' }}>ChalkBoard</strong> — the
                                informal "Reddit for Academics," but strictly vetted.
                            </p>
                        </div>
                        <div className="story-visual reveal reveal-delay-2">
                            <div className="story-quote-card">
                                <blockquote>
                                    A solo developer and a nerdy PhD student who decided that regular social media
                                    is too much to handle, and academia deserves its own nerdy alternative.
                                </blockquote>
                                <cite>— The ChalkBoard Team</cite>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="about-values section">
                <div className="container">
                    <div className="values-header reveal">
                        <h2 className="section-title">
                            Our <span className="text-accent">Core Values</span>
                        </h2>
                        <p className="section-subtitle">
                            The principles that guide everything we build.
                        </p>
                    </div>

                    <div className="values-grid">
                        {VALUES.map((value, idx) => (
                            <div key={value.title} className={`value-card reveal reveal-delay-${(idx % 4) + 1}`}>
                                <div className="value-icon">{value.icon}</div>
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="about-team section">
                <div className="container">
                    <div className="team-header reveal">
                        <h2 className="section-title">
                            Meet the <span className="text-primary">Team</span>
                        </h2>
                        <p className="section-subtitle">
                            A small team with a big mission.
                        </p>
                    </div>

                    <div className="team-card reveal">
                        <div className="team-avatar">🧑‍💻</div>
                        <h3>The ChalkBoard Team</h3>
                        <p className="team-role">Founder & Developer + PhD Researcher</p>
                        <p>
                            We're a duo — a passionate solo developer and a nerdy PhD student who got tired of
                            doomscrolling through mainstream social media. We decided that the research community
                            deserves its own space: informal enough for raw ideas, exclusive enough for real discourse.
                            ChalkBoard is our answer.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
