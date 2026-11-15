import { Link } from "react-router-dom";
import Navbar from "./navbar";
import "./story.css";

interface StoryProps {
    search: string;
    setSearch: (value: string) => void;
    cartCount: number;
    wishlistCount: number;
}

function Story({
    search,
    setSearch,
    cartCount,
    wishlistCount
}: StoryProps) {
    return (
        <div className="story-page">

            {/* NAVBAR */}
            <Navbar
                search={search}
                setSearch={setSearch}
                cartCount={cartCount}
                wishlistCount={wishlistCount}
            />

            {/* STORY INTRODUCTION */}
            <section className="story-intro">
                <p className="story-subtitle">THE STORY OF AURELIO</p>

                <h1>
                    More Than Coffee.
                    <br />
                    It's An Experience.
                </h1>

                <p className="story-description">
                    Inspired by the timeless charm of Italy,
                    AURELIO brings together the beauty of coffee,
                    craftsmanship and meaningful moments.
                </p>
            </section>

            {/* STORY VIDEO */}
            <section className="story-video-section">
                <video
                    className="story-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                >
                    <source
                        src="Story.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support this video.
                </video>
            </section>

            {/* OUR PHILOSOPHY */}
            <section className="story-philosophy">
                <p className="story-subtitle">WHAT MAKES US SPECIAL</p>

                <h2>Our Philosophy</h2>

                <div className="philosophy-grid">

                    <div className="philosophy-card">
                        <h3>Quality</h3>
                        <p>
                            Every cup begins with a love for quality
                            and carefully selected coffee.
                        </p>
                    </div>

                    <div className="philosophy-card">
                        <h3>Craftsmanship</h3>
                        <p>
                            We believe that great coffee is an art,
                            created with passion and attention to detail.
                        </p>
                    </div>

                    <div className="philosophy-card">
                        <h3>Experience</h3>
                        <p>
                            More than a coffee break, we want every
                            moment at AURELIO to feel special.
                        </p>
                    </div>

                </div>
            </section>

            {/* CLOSING SECTION */}
            <section className="story-ending">
                <p className="story-subtitle">YOUR MOMENT OF ELEGANCE</p>

                <h2>Every Cup Has A Story.</h2>

                <p>
                    Discover your favourite coffee and become
                    part of the AURELIO experience.
                </p>

                <Link to="/menu" className="story-menu-button">
                    EXPLORE OUR MENU
                </Link>
            </section>

        </div>
    );
}

export default Story;