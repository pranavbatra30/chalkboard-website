import '../Legal.css';

export default function PrivacyPolicy() {
    return (
        <div className="legal-page">
            <section className="legal-hero">
                <div className="container">
                    <h1>Privacy Policy</h1>
                    <p>Last Updated: March 2026</p>
                </div>
            </section>

            <div className="legal-content">
                <div className="legal-section">
                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to Chalkboard. We respect your privacy and are committed to protecting your personal data.
                        This privacy policy will inform you as to how we look after your personal data when you visit our
                        application and tell you about your privacy rights and how the law protects you.
                    </p>
                </div>

                <div className="legal-section">
                    <h2>2. The Data We Collect About You</h2>
                    <p>
                        Personal data, or personal information, means any information about an individual from which
                        that person can be identified.
                    </p>
                    <ul>
                        <li>Identity Data: includes username, title, date of birth, and gender.</li>
                        <li>Contact Data: includes email address and telephone numbers.</li>
                        <li>Profile Data: includes your interests, preferences, feedback, and survey responses.</li>
                    </ul>
                </div>

                <div className="legal-section">
                    <h2>3. How We Use Your Data</h2>
                    <p>
                        We will only use your personal data when the law allows us to. Most commonly, we will use your
                        personal data in the following circumstances:
                    </p>
                    <ul>
                        <li>To register you as a new user.</li>
                        <li>To manage our relationship with you.</li>
                        <li>To improve our app, products/services, marketing or customer relationships.</li>
                    </ul>
                </div>

                <div className="legal-section">
                    <h2>4. Data Security</h2>
                    <p>
                        We have put in place appropriate security measures to prevent your personal data from being
                        accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed.
                    </p>
                </div>
            </div>
        </div>
    );
}
