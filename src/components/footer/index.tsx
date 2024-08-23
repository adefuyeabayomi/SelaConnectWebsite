
import { Link } from 'react-router-dom';
import './style.css';

function Footer() {
    return (
        <footer className="footer">
            <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/payment">Payment</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
            </ul>
            <p>© 2024 Selaconnect Logistics. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
