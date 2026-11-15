
import Navbar from "./navbar";
import "./VisitUs.css";

interface VisitUsProps {
    search: string;
    setSearch: (value: string) => void;
    cartCount: number;
    wishlistCount: number;
}

function VisitUs({
    search,
    setSearch,
    cartCount,
    wishlistCount
}: VisitUsProps) {
    return (
        <div className="visit-page">
            <Navbar
                search={search}
                setSearch={setSearch}
                cartCount={cartCount}
                wishlistCount={wishlistCount}
            />

            <section className="visit-hero">
                <div className="visit-hero-overlay"></div>
                <div className="visit-hero-content">
                    <p>EXPERIENCE AURELIO</p>
                    <h1>Your Italian<br />Escape Awaits.</h1>
                    <span>
                        A little taste of Italy, a moment of pure elegance.
                    </span>
                    <a href="#visit-details" className="visit-hero-button">
                        DISCOVER OUR CAFÉ
                    </a>
                </div>
            </section>

            <section className="visit-intro" id="visit-details">
                <p className="visit-subtitle">CIAO, MILANO</p>
                <h2>Where Every Moment Feels Special.</h2>
                <p>
                    Step into the world of AURELIO, inspired by the timeless
                    beauty of Italian café culture. Enjoy handcrafted coffee,
                    beautiful desserts and moments worth slowing down for.
                </p>
            </section>

            <section className="visit-details">
                <div className="visit-info">
                    <p className="visit-subtitle">COME FIND US</p>
                    <h2>Visit AURELIO</h2>
                    <p className="visit-location">
                        Milan, Italy
                    </p>
                    <p>
                        Inspired by the charm and elegance of Milan,
                        our café brings Italian coffee culture to life.
                    </p>

                    <h3>Opening Hours</h3>
                    <div className="visit-hours">
                        <span>Monday – Friday</span>
                        <span>8:00 AM – 9:00 PM</span>
                    </div>
                    <div className="visit-hours">
                        <span>Saturday – Sunday</span>
                        <span>9:00 AM – 10:00 PM</span>
                    </div>

                    <a
                        href="https://www.google.com/maps/search/?api=1&query=Milan+Italy"
                        target="_blank"
                        rel="noreferrer"
                        className="visit-map-button"
                    >
                        EXPLORE MILAN
                    </a>
                </div>

                <div className="visit-image">
                    <img
                        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=85"
                        alt="Elegant Italian café interior"
                    />
                </div>
            </section>

            <section className="visit-experience">
                <p className="visit-subtitle">THE AURELIO EXPERIENCE</p>
                <h2>More Than Just Coffee.</h2>

                <div className="visit-experience-grid">
                    <div className="visit-experience-card">
                        <span>01</span>
                        <h3>Italian Elegance</h3>
                        <p>
                            A warm and sophisticated café atmosphere
                            inspired by Italy.
                        </p>
                    </div>

                    <div className="visit-experience-card">
                        <span>02</span>
                        <h3>Crafted With Passion</h3>
                        <p>
                            Beautifully prepared coffee and carefully
                            selected flavours.
                        </p>
                    </div>

                    <div className="visit-experience-card">
                        <span>03</span>
                        <h3>Sweet Moments</h3>
                        <p>
                            Enjoy delicious desserts and special
                            moments with every visit.
                        </p>
                    </div>
                </div>
            </section>

            <section className="visit-ending">
                <p>YOUR TABLE, YOUR MOMENT</p>
                <h2>Make Time for Something Beautiful.</h2>
                <a href="/menu">EXPLORE OUR MENU</a>
            </section>
        </div>
    );
}

export default VisitUs;
