
import { useState, useEffect } from "react";
import { Heart, Star, X } from "lucide-react";
import { coffeeData } from "../coffeeData";
import "./coffeeMenu.css";
import "./searchResults.css";

interface Review {
    id: number;
    coffeeId: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
}

interface SearchResultsProps {
    search: string;
    addToCart: (id: number) => void;
    wishlist: number[];
    toggleWishlist: (id: number) => void;
}

function SearchResults({
    search,
    addToCart,
    wishlist,
    toggleWishlist
}: SearchResultsProps) {

    // Reviews from localStorage
    const [reviews, setReviews] = useState<Review[]>(() => {
        const savedReviews = localStorage.getItem("aurelio-reviews");
        return savedReviews ? JSON.parse(savedReviews) : [];
    });

    const [selectedCoffee, setSelectedCoffee] =
        useState<number | null>(null);

    const [reviewName, setReviewName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [selectedRating, setSelectedRating] = useState(5);

    // Save reviews
    useEffect(() => {
        localStorage.setItem("aurelio-reviews", JSON.stringify(reviews));
    }, [reviews]);

    // Search products
    const results = coffeeData.filter((item) =>
        `${item.name} ${item.description} ${item.category}`
            .toLowerCase()
            .includes(search.trim().toLowerCase())
    );

    // Get reviews for a product
    const getCoffeeReviews = (coffeeId: number) =>
        reviews.filter((review) => review.coffeeId === coffeeId);

    // Selected product
    const selectedCoffeeData = coffeeData.find(
        (coffee) => coffee.id === selectedCoffee
    );

    const selectedCoffeeReviews =
        selectedCoffee !== null
            ? getCoffeeReviews(selectedCoffee)
            : [];

    // Submit review
    const handleReviewSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
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

    return (
        <section className="search-results">

            <div className="search-results-heading">
                <p>THE AURELIO COLLECTION</p>
                <h2>Search Results</h2>
                <span>Results for "{search}"</span>
            </div>

            {results.length === 0 ? (
                <p className="no-results">
                    No matching products found.
                </p>
            ) : (
                <div className="coffee-grid">

                    {results.map((coffee) => {

                        const coffeeReviews =
                            getCoffeeReviews(coffee.id);

                        const averageRating =
                            coffeeReviews.length > 0
                                ? coffeeReviews.reduce(
                                    (sum, review) =>
                                        sum + review.rating,
                                    0
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
                                            wishlist.includes(coffee.id)
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            toggleWishlist(coffee.id)
                                        }
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
                                        onClick={() =>
                                            setSelectedCoffee(coffee.id)
                                        }
                                    >
                                        Read Reviews / Write a Review
                                    </button>

                                    <div className="coffee-bottom">

                                        <span>
                                            €{coffee.price.toFixed(2)}
                                        </span>

                                        <button
                                            onClick={() =>
                                                addToCart(coffee.id)
                                            }
                                        >
                                            Add to Cart
                                        </button>

                                    </div>

                                </div>

                            </div>
                        );
                    })}

                </div>
            )}

            {/* Review Modal */}
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
                                <p>
                                    No reviews yet. Be the first to review!
                                </p>
                            ) : (
                                selectedCoffeeReviews.map((review) => (

                                    <div
                                        className="review-item"
                                        key={review.id}
                                    >
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
                                onChange={(e) =>
                                    setReviewName(e.target.value)
                                }
                            />

                            <p className="rating-label">
                                Select Your Rating
                            </p>

                            <div className="rating-selector">

                                {Array.from(
                                    { length: 5 },
                                    (_, index) => (
                                        <button
                                            type="button"
                                            key={index}
                                            onClick={() =>
                                                setSelectedRating(index + 1)
                                            }
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
                                    )
                                )}

                            </div>

                            <textarea
                                placeholder="Share your coffee experience..."
                                value={reviewText}
                                onChange={(e) =>
                                    setReviewText(e.target.value)
                                }
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

export default SearchResults;
