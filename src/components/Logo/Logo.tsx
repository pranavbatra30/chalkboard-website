import './Logo.css';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    onClick?: () => void;
}

export default function Logo({ size = 'md', onClick }: LogoProps) {
    return (
        <div className={`logo logo-${size}`} onClick={onClick} role="img" aria-label="ChalkBoard Logo">
            {/* [6 C] */}
            <div className="logo-element-box">
                <span className="logo-atomic-number">6</span>
                <span className="logo-element-symbol">C</span>
            </div>
            <span className="logo-text">halk</span>

            {/* [5 B] */}
            <div className="logo-element-box">
                <span className="logo-atomic-number">5</span>
                <span className="logo-element-symbol">B</span>
            </div>
            <span className="logo-text">oard</span>
        </div>
    );
}
