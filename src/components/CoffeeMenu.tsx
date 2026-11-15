
import { useState, useEffect } from "react";
import { Heart, Star, X } from "lucide-react";
import { coffeeData } from "../coffeeData";
import "./coffeeMenu.css";

interface Review {
    id: number;
    coffeeId: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
}

function CoffeeMenu({
    search,
    addToCart,
    wishlist,
    toggleWishlist,
    showAll = false
}: {
    search: string;
    addToCart: (id: number) => void;
    wishlist: number[];
    toggleWishlist: (id: number) => void;
    showAll?: boolean;
}) {

    const [reviews, setReviews] = useState<Review[]>(() => {
        const savedReviews = localStorage.getItem("aurelio-reviews");
        return savedReviews ? JSON.parse(savedReviews) : [];
    });

    const [selectedCoffee, setSelectedCoffee] = useState<number | null>(null);
    const [reviewName, setReviewName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [selectedRating, setSelectedRating] = useState(5);

    // Save reviews
    useEffect(() => {
        localStorage.setItem("aurelio-reviews", JSON.stringify(reviews));
    }, [reviews]);

    // Search products
    const filteredCoffee = coffeeData.filter((coffee) =>
        `${coffee.name} ${coffee.description} ${coffee.category}`
            .toLowerCase()
            .includes(search.trim().toLowerCase())
    );

    // Display products
    // Homepage featured products
const homeCoffee = coffeeData.slice(0, 4);

const espressoIndex = homeCoffee.findIndex(
    (coffee) => coffee.name.toLowerCase() === "espresso"
);

const pistachioRoseLatte = coffeeData.find(
    (coffee) => coffee.name.toLowerCase() === "pistachio rose latte"
);

if (espressoIndex !== -1 && pistachioRoseLatte) {
    const updatedHomeCoffee = homeCoffee.filter(
        (coffee) =>
            coffee.name.toLowerCase() !== "espresso" &&
            coffee.name.toLowerCase() !== "pistachio rose latte"
    );

    updatedHomeCoffee.splice(espressoIndex, 0, pistachioRoseLatte);

    homeCoffee.splice(0, homeCoffee.length, ...updatedHomeCoffee);
}

// Display products
const displayedCoffee = search.trim()
    ? filteredCoffee
    : showAll
        ? coffeeData
        : homeCoffee;

    // Submit review
    const handleReviewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (selectedCoffee === null || !reviewText.trim()) return;

        const newReview: Review = {
            id: Date.now(),
            coffeeId: selectedCoffee,
            name: reviewName.trim() || "Guest",
            rating: selectedRating,
            comment: reviewText.trim(),
            date: new Date().toLocaleDateString()
        };

        setReviews((prev) => [...prev, newReview]);

        setReviewName("");
        setReviewText("");
        setSelectedRating(5);
    };

    const getCoffeeReviews = (coffeeId: number) =>
        reviews.filter((review) => review.coffeeId === coffeeId);

    const selectedCoffeeData = coffeeData.find(
        (coffee) => coffee.id === selectedCoffee
    );

    const selectedCoffeeReviews = selectedCoffee !== null
        ? getCoffeeReviews(selectedCoffee)
        : [];

    return (
        <section className="coffee-menu" id="menu">

            <h2>{showAll ? "Our Complete Coffee Collection" : "Our Signature Coffee"}</h2>

            <p className="menu-subtitle">
                Crafted with passion, served with elegance.
            </p>

            <div className="coffee-grid">

                {displayedCoffee.map((coffee) => {

                    const coffeeReviews = getCoffeeReviews(coffee.id);

                    const averageRating = coffeeReviews.length
                        ? coffeeReviews.reduce(
                            (sum, review) => sum + review.rating, 0
                        ) / coffeeReviews.length
                        : 0;

                    return (
                        <div className="coffee-card" key={coffee.id}>

                            <div className="coffee-image-container">

                                <img
                                    src={coffee.image}
                                    alt={coffee.name}
                                />

                                <button
                                    className={`wishlist-button ${
                                        wishlist.includes(coffee.id) ? "active" : ""
                                    }`}
                                    onClick={() => toggleWishlist(coffee.id)}
                                    aria-label="Add to wishlist"
                                >
                                    <Heart
                                        size={21}
                                        fill={
                                            wishlist.includes(coffee.id)
                                                ? "currentColor"
                                                : "none"
                                        }
                                    />
                                </button>

                            </div>

                            <div className="coffee-info">

                                <h3>{coffee.name}</h3>

                                <p>{coffee.description}</p>

                                {/* CUSTOMER RATING */}
                                <div className="coffee-rating">

                                    <Star
                                        size={16}
                                        fill="#C49A45"
                                        color="#C49A45"
                                    />

                                    {coffeeReviews.length > 0 ? (
                                        <>
                                            <span>
                                                {averageRating.toFixed(1)}
                                            </span>
                                            <small>
                                                ({coffeeReviews.length} reviews)
                                            </small>
                                        </>
                                    ) : (
                                        <small>No reviews yet</small>
                                    )}

                                </div>

                                <button
                                    className="review-link"
                                    onClick={() => setSelectedCoffee(coffee.id)}
                                >
                                    Read Reviews / Write a Review
                                </button>

                                <div className="coffee-bottom">

                                    <span>€{coffee.price.toFixed(2)}</span>

                                    <button
                                        onClick={() => addToCart(coffee.id)}
                                    >
                                        Add to Cart
                                    </button>

                                </div>

                            </div>
                        </div>
                    );
                })}

            </div>

            {/* REVIEW MODAL */}
            {selectedCoffeeData && (

                <div className="review-overlay">

                    <div className="review-modal">

                        <button
                            className="review-close"
                            onClick={() => setSelectedCoffee(null)}
                        >
                            <X size={22} />
                        </button>

                        <p className="review-subtitle">
                            AURELIO CUSTOMER EXPERIENCE
                        </p>

                        <h2>{selectedCoffeeData.name}</h2>

                        <h3>Customer Reviews</h3>

                        <div className="review-list">

                            {selectedCoffeeReviews.length === 0 ? (
                                <p>No reviews yet. Be the first to review!</p>
                            ) : (
                                selectedCoffeeReviews.map((review) => (

                                    <div className="review-item" key={review.id}>

                                        <strong>{review.name}</strong>

                                        <div className="review-stars">

                                            {Array.from(
                                                { length: 5 },
                                                (_, index) => (
                                                    <Star
                                                        key={index}
                                                        size={15}
                                                        fill={
                                                            index < review.rating
                                                                ? "#C49A45"
                                                                : "none"
                                                        }
                                                        color="#C49A45"
                                                    />
                                                )
                                            )}

                                        </div>

                                        <p>{review.comment}</p>

                                        <small>{review.date}</small>

                                    </div>
                                ))
                            )}

                        </div>

                        <div className="review-divider"></div>

                        <h3>Write Your Review</h3>

                        <form onSubmit={handleReviewSubmit}>

                            <input
                                type="text"
                                placeholder="Your Name (optional)"
                                value={reviewName}
                                onChange={(e) => setReviewName(e.target.value)}
                            />

                            <p className="rating-label">
                                Select Your Rating
                            </p>

                            <div className="rating-selector">

                                {Array.from({ length: 5 }, (_, index) => (

                                    <button
                                        type="button"
                                        key={index}
                                        onClick={() => setSelectedRating(index + 1)}
                                    >
                                        <Star
                                            size={27}
                                            fill={
                                                index < selectedRating
                                                    ? "#C49A45"
                                                    : "none"
                                            }
                                            color="#C49A45"
                                        />
                                    </button>

                                ))}

                            </div>

                            <textarea
                                placeholder="Share your coffee experience..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                required
                            />

                            <button
                                type="submit"
                                className="submit-review-button"
                            >
                                Submit Review
                            </button>

                        </form>

                    </div>

                </div>
            )}

        </section>
    );
}

export default CoffeeMenu;
