import '../Legal.css';

export default function TermsOfUse() {
    return (
        <div className="legal-page">
            <section className="legal-hero">
                <div className="container">
                    <h1>Terms of Use</h1>
                    <p>Last Updated: March 2026</p>
                </div>
            </section>

            <div className="legal-content">
                <div className="legal-section">
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using the Chalkboard application, you agree to be bound by these Terms of Use
                        and all applicable laws and regulations. If you do not agree with any part of these terms, you
                        may not use our service.
                    </p>
                </div>

                <div className="legal-section">
                    <h2>2. User Accounts</h2>
                    <p>
                        When you create an account with us, you must provide information that is accurate, complete,
                        and current at all times. Failure to do so constitutes a breach of the Terms, which may result
                        in immediate termination of your account.
                    </p>
                    <p>
                        You are responsible for safeguarding the password that you use to access the service and for
                        any activities or actions under your password.
                    </p>
                </div>

                <div className="legal-section">
                    <h2>3. Content</h2>
                    <p>
                        Our service allows you to post, link, store, share and otherwise make available certain information,
                        text, graphics, videos, or other material ("Content"). You are responsible for the Content that you
                        post to the service, including its legality, reliability, and appropriateness.
                    </p>
                    <p>
                        By posting Content to the service, you grant us the right and license to use, modify, publicly
                        perform, publicly display, reproduce, and distribute such Content on and through the service.
                    </p>
                </div>

                <div className="legal-section">
                    <h2>4. Prohibited Conduct</h2>
                    <p>You agree not to use the service to:</p>
                    <ul>
                        <li>Violate any applicable laws or regulations.</li>
                        <li>Infringe upon the rights of others.</li>
                        <li>Transmit any viruses or harmful code.</li>
                        <li>Harass, abuse, or harm another person.</li>
                    </ul>
                </div>

                <div className="legal-section">
                    <h2>5. Termination</h2>
                    <p>
                        We may terminate or suspend your account immediately, without prior notice or liability, for any
                        reason whatsoever, including without limitation if you breach the Terms.
                    </p>
                </div>
            </div>
        </div>
    );
}
