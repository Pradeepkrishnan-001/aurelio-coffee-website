
import { ShoppingBag } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "./FloatingCart.css";

interface FloatingCartProps {
    cartCount: number;
}

function FloatingCart({ cartCount }: FloatingCartProps) {
    const navigate = useNavigate();
    const location = useLocation();

    // Hide on cart and checkout pages
    if (
        location.pathname === "/cart" ||
        location.pathname === "/checkout"
    ) {
        return null;
    }

    return (
        <button
            className="floating-cart"
            onClick={() => navigate("/cart")}
            aria-label="Open shopping cart"
        >
            <ShoppingBag size={23} />

            {cartCount > 0 && (
                <span className="floating-cart-count">
                    {cartCount}
                </span>
            )}
        </button>
    );
}

export default FloatingCart;
