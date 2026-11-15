
import "./Contact.css";

function Contact() {
    return (
        <section className="contact-section" id="contact">

            <div className="contact-heading">
                <p className="contact-subtitle">
                    WE WOULD LOVE TO HEAR FROM YOU
                </p>

                <h2>Visit Our World</h2>

                <p className="contact-description">
                    A little taste of Italy, a moment to remember.
                    We would love to welcome you.
                </p>
            </div>

            <div className="contact-main">

                <div className="contact-details">

                    <div className="contact-item">
                        <h3>Our Location</h3>
                        <p>Near the Colosseum, Rome, Italy</p>
                    </div>

                    <div className="contact-item">
                        <h3>Email Us</h3>
                        <p>hello@aureliocoffee.com</p>
                    </div>

                    <div className="contact-item">
                        <h3>Call Us</h3>
                        <p>+39 XXX XXX XXXX</p>
                    </div>

                    <div className="contact-item">
                        <h3>Opening Hours</h3>
                        <p>Monday – Sunday</p>
                        <p>9:00 AM – 10:00 PM</p>
                    </div>

                </div>

                <div className="contact-map">
                    <iframe
                        src="https://maps.google.com/maps?q=Colosseum%2C%20Rome%2C%20Italy&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        title="AURELIO Location Map"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

            </div>

            <div className="contact-bottom">
                <h3>AURELIO</h3>
                <p>AN ITALIAN COFFEE EXPERIENCE</p>
                <span>© 2026 AURELIO. ALL RIGHTS RESERVED.</span>
            </div>

        </section>
    );
}

export default Contact;
