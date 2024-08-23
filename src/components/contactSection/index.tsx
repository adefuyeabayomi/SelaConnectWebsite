import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './style.css'
export function ContactUs() {
    return (
        <section className="contact-us container py-2">
            <h2>Contact Us</h2>
            <div className="contact-info">
                <p><FontAwesomeIcon icon={faPhone} /> Call: 081 3080 0906</p>
                <p><FontAwesomeIcon icon={faEnvelope} /> Email: <a href="mailto:selaconnectlogistics@gmail.com">selaconnectlogistics@gmail.com</a></p>
            </div>
        </section>
    );
}
