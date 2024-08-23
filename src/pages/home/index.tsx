
import './style.css';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faBox, faMobileAlt, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { ContactUs } from '../../components/contactSection';

function Home() {
    return (
        <div className="home">
            <section className="hero py-2">
                <div className="hero-content">
                    <h1>Fast and Reliable Logistics Solutions</h1>
                    <p>Sela Connect Offers dispatch delivery services within Lagos. Our wide network guarantees that your packages arrives exactly on your schedule..</p>
                </div>
            </section>
            <div className='py-2'/>
            <section className="services container py-2">
                <h2>Our Services</h2>
                <div className="row">
                    <div className="col-md-4">
                        <motion.div className="card service-card" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 50 }} transition={{ duration: 1 }}>
                            <FontAwesomeIcon icon={faTruck} size="3x" color="#FF9B09" />
                            <h3>Express Delivery</h3>
                            <p>Get your packages delivered within the same day with our express delivery service.</p>
                        </motion.div>
                    </div>
                    <div className="col-md-4">
                        <motion.div className="card service-card" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 50 }} transition={{ duration: 1, delay: 0.2 }}>
                            <FontAwesomeIcon icon={faBox} size="3x" color="#FF9B09" />
                            <h3>Warehouse Storage</h3>
                            <p>Secure and reliable storage solutions for your goods in our state-of-the-art warehouses.</p>
                        </motion.div>
                    </div>
                    <div className="col-md-4">
                        <motion.div className="card service-card" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 50 }} transition={{ duration: 1, delay: 0.4 }}>
                            <FontAwesomeIcon icon={faMobileAlt} size="3x" color="#FF9B09" />
                            <h3>Real-Time Tracking</h3>
                            <p>Track your packages in real-time with our advanced tracking system.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <div className='py-2'/>
            <section className="discount-section py-5">
                <div className="container">
                    <h2>Special Discounts</h2>
                    <p>Get up to 20% off on your first three deliveries! Sign up now and start saving.</p>
                </div>
            </section>

            <div className='py-2'/>
            <section className="how-it-works container py-2">
                <h2>How Our Service Works</h2>
                <div className="row">
                    <div className="col-md-3">
                        <motion.div className="card how-it-works-card" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 50 }} transition={{ duration: 1 }}>
                            <FontAwesomeIcon icon={faMobileAlt} size="3x" color="#FF9B09" />
                            <h3>Step 1</h3>
                            <p>Open the app or contact us via our hotline.</p>
                        </motion.div>
                    </div>
                    <div className="col-md-3">
                        <motion.div className="card how-it-works-card" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 50 }} transition={{ duration: 1, delay: 0.2 }}>
                            <FontAwesomeIcon icon={faBox} size="3x" color="#FF9B09" />
                            <h3>Step 2</h3>
                            <p>Tell us what you are delivering.</p>
                        </motion.div>
                    </div>
                    <div className="col-md-3">
                        <motion.div className="card how-it-works-card" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 50 }} transition={{ duration: 1, delay: 0.4 }}>
                            <FontAwesomeIcon icon={faTruck} size="3x" color="#FF9B09" />
                            <h3>Step 3</h3>
                            <p>Provide pickup and drop-off locations.</p>
                        </motion.div>
                    </div>
                    <div className="col-md-3">
                        <motion.div className="card how-it-works-card" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 50 }} transition={{ duration: 1, delay: 0.6 }}>
                            <FontAwesomeIcon icon={faCreditCard} size="3x" color="#FF9B09" />
                            <h3>Step 4</h3>
                            <p>Proceed to payment and we take care of the rest.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <div className='py-2'/>
            <ContactUs />

            <div className='py-2'/>
        </div>
    );
}

export default Home;







