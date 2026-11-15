
import { coffeeData } from "../coffeeData";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./wishlist.css";

function Wishlist({
    wishlist,
    toggleWishlist,
    addToCart
}: {
    wishlist: number[];
    toggleWishlist: (id: number) => void;
    addToCart: (id: number) => void;
}) {
    const navigate = useNavigate();

    const savedItems = coffeeData.filter((item) =>
        wishlist.includes(item.id)
    );

    return (
        <section className="wishlist-page">
            <h2>My Wishlist</h2>
            <p className="wishlist-subtitle">
                Your favourite treats, all in one place.
            </p>

            {savedItems.length === 0 ? (
                <div className="wishlist-empty">
                    <Heart size={40} />
                    <h3>Your wishlist is empty</h3>
                    <p>Explore our menu and save your favourites.</p>
                    <button onClick={() => navigate("/")}>
                        Explore Menu
                    </button>
                </div>
            ) : (
                <div className="wishlist-grid">
                    {savedItems.map((item) => (
                        <div className="wishlist-card" key={item.id}>
                            <img src={item.image} alt={item.name} />

                            <div className="wishlist-info">
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>

                                <div className="wishlist-bottom">
                                    <span>€{item.price.toFixed(2)}</span>

                                    <button
                                        onClick={() => addToCart(item.id)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>

                                <button
                                    className="remove-wishlist"
                                    onClick={() => toggleWishlist(item.id)}
                                >
                                    <Heart size={16} fill="currentColor" />
                                    Remove from Wishlist
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Wishlist;
