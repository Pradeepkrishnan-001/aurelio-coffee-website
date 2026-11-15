
import { coffeeData } from "../coffeeData";
import { Minus, Plus, Trash2 } from "lucide-react";
import "./cart.css";

interface CartProps {
    cart: { id: number; quantity: number }[];
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    onPlaceOrder: () => void;
}

function Cart({
    cart,
    removeFromCart,
    updateQuantity,
    onPlaceOrder,
}: CartProps) {
    const total = cart.reduce((sum, item) => {
        const coffee = coffeeData.find((c) => c.id === item.id);
        return sum + (coffee ? coffee.price * item.quantity : 0);
    }, 0);

    return (
        <section className="cart-section">
            <div className="cart-header">
                <h2>Your Shopping Cart</h2>
                <p>Your favourite coffee, all in one place.</p>
            </div>

            {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
            ) : (
                <>
                    {cart.map((item) => {
                        const coffee = coffeeData.find(
                            (c) => c.id === item.id
                        );

                        if (!coffee) return null;

                        return (
                            <div className="cart-item" key={item.id}>
                                <img
                                    src={coffee.image}
                                    alt={coffee.name}
                                    className="cart-product-image"
                                />

                                <div className="cart-product">
                                    <h3>{coffee.name}</h3>
                                    <p>€{coffee.price.toFixed(2)} each</p>

                                    <div className="quantity-controls">
                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    item.quantity - 1
                                                )
                                            }
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    item.quantity + 1
                                                )
                                            }
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="cart-item-actions">
                                    <span className="cart-item-price">
                                        €{(
                                            coffee.price * item.quantity
                                        ).toFixed(2)}
                                    </span>

                                    <button
                                        className="remove-cart-item"
                                        onClick={() =>
                                            removeFromCart(item.id)
                                        }
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    <div className="cart-total">
                        <h3>Total: €{total.toFixed(2)}</h3>

                        <button
                            className="place-order-btn"
                            onClick={onPlaceOrder}
                        >
                            Place Order
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}

export default Cart;
